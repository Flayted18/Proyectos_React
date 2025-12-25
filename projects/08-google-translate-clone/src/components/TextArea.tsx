/* eslint-disable react/react-in-jsx-scope */
import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"


interface Props {
    type: SectionType
    placeholder: string
    loading?: boolean
    onChange: (value: string) => void
    value: string
}



export const TextArea = ({ placeholder, loading, type, value, onChange }: Props) => {
    const commonStyles = {
        height: '200px'
    }

    return (
        <Form.Control
            autoFocus={type === SectionType.From}
            as='textarea'
            placeholder={placeholder}
            style={{height: '150px'}}
        />
    )
}