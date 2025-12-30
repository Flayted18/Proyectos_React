/* eslint-disable react/react-in-jsx-scope */
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import './App.css'
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon, ClipboardIconFromTranslator, SpeakerIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';


function App() {
  const {fromLanguage, 
    toLanguage, 
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    fromText,
    result,
    setFromText,
    setResult,
    loading
  } = useStore()

  const debouncedText = useDebounce(fromText)

  useEffect(()=> {
    if (fromText==='' || fromText.length < 2) return

    translate({fromLanguage, toLanguage, text: fromText})
    .then(result => {
      if(result == null) return
      setResult(result)
    })
    .catch((error)=> {setResult(`El error es:   ${error}`)} )

  }, [debouncedText, fromLanguage, toLanguage])

  const handleClipboard = () => {
   navigator.clipboard.writeText(result)

  }

  const handleSpeaker =()=>{
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
        <h2>Google Translate</h2>

        <Row>
          <Col xs='auto'>
            <Stack gap={2}>
              <LanguageSelector 
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}

              />
            </Stack>
          </Col>

          <Col>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Col xs='auto'>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />
              <div style={{position: 'relative' }}>
                <TextArea
                  loading={loading}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                />
                <div style={{position:'absolute', left: 0, bottom: 0, display: 'flex'}}>
                  <Button 
                    variant='link' 
                    onClick={handleClipboard}>
                    <ClipboardIconFromTranslator />
                  </Button>
                  <Button 
                    variant='link' 
                    onClick={handleSpeaker}>
                    <SpeakerIcon />
                  </Button>
                </div>
              </div>
            </Stack>
            

          </Col>
        </Row>
    </Container>
  )
}

export default App
