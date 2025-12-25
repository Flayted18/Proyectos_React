/* eslint-disable react/react-in-jsx-scope */
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import './App.css'
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';


function App() {
  const {fromLanguage, 
    toLanguage, 
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    fromText,
    result,
    setFromText,
    setResult
  } = useStore()

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
                placeholder='Introducir texto'
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
              <TextArea
                placeholder='Traduccion'
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
            </Stack>
            

          </Col>
        </Row>
    </Container>
  )
}

export default App
