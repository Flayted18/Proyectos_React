import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import type React from "react";
import { useUserActions } from '../hooks/useUserActions'
import { useState } from "react";

export function CreateNewUser (){
    // const [userInput, setUserInput] = useState('')

    const {addUser} = useUserActions()

    const [result, setResult] = useState< 'ok' | 'empty' | null >(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setResult(null)
        const form = event.currentTarget
        // console.log('este es el formulario con event.currentTarget: ', form)

        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        if( !name || !email || !github) {
            // form.reset()

            return setResult('empty')
        }

        addUser({name, email, github})
        setResult('ok')
        form.reset()
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        
        if (result === 'empty' || result === 'ok') {setResult(null)}    
        // console.log(input)
    }

    return (
        <Card style={{ marginTop: '16px' }}>
            <Title>Create New User</Title>

            <form style={{display:'flex', gap:'4px', flexDirection:'column'}} onSubmit= {handleSubmit} className="">
                <TextInput onChange={handleChange} name='name' placeholder="Aqui el nombre"/>
                <TextInput onChange={handleChange} name='email' placeholder="Aqui el Email"/>
                <TextInput onChange={handleChange} name='github' placeholder="Aqui el usuario de GitHub"/>
                <div>
                    <Button
                        type="submit"
                        style={{marginTop: '16px', marginRight: '16px   '}}>
                        Crear usuario
                    </Button>
                    <span>
                        {result === 'ok' && <Badge color='green'>Guardado Correctamente!</Badge>}
                        {result === 'empty' && <Badge color='orange'>Error con los Campos!</Badge>}
                    </span>
                </div>
            </form>


        </Card>
    )
}