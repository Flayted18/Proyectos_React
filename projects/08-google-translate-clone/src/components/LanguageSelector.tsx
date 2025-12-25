/* eslint-disable react/react-in-jsx-scope */
import { Form } from "react-bootstrap"
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants"
import type { FC } from 'react'
import { SectionType, type FromLanguage, type Language } from "../types.d"

type Props =
 | {type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void}
 | {type: SectionType.To, value: Language, onChange: (language: Language) => void}


export const LanguageSelector: FC<Props> =({ onChange, type, value }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }


    return(
        <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
            {type === SectionType.From && <option value ={AUTO_LANGUAGE}>Detectar idioma</option>}
            {
                //como SUPPORTED_LANGUAGES es un objeto y no un array...
                //Hacemos el object.entries para obtener un array con 
                // las llaves y los valores del objeto, y asi las
                // desestructuramos con los corchetes, dentro del parametro de la funcion DENTRO del map.
                //Recuerda que el map lleva un callback (funcion) por parametro.
                //Eso quiere decir que el map tiene que hacer algo con la informacion que itera.

                Object.entries(SUPPORTED_LANGUAGES).map(([key, literal])=>(
                    <option key={key} value={key}>
                        {literal}
                    </option>
                ))
            }
        </Form.Select>
    )
}