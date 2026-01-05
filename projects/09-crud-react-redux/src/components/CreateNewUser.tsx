import { Button, Card, TextInput, Title } from "@tremor/react";

export function CreateNewUser (){
    return (
        <Card style={{ marginTop: '16px' }}>
            <Title>Create New User</Title>
            <form className="">
                <TextInput placeholder="Aqui el nombre"/>
                <TextInput placeholder="Aqui el Email"/>
                <TextInput placeholder="Aqui el usuario de GitHub"/>
            
                <div>
                    <Button
                        type="submit"
                        style={{marginTop: '16px'}}>
                        Crear usuario
                    </Button>
                </div>
            </form>


        </Card>
    )
}