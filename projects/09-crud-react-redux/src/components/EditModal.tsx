import React, { useEffect, useState } from "react"
import type { UserWithId } from "../store/users/slice"
import { Button, Dialog, DialogPanel, TextInput, Title } from "@tremor/react";


interface EditModalProps {
    user: UserWithId
    onSave: (updatedUser: UserWithId) => void;
    onClose: () => void
}


export function EditModal ({user, onSave, onClose}: EditModalProps) {
    const [isOpen, setIsOpen] = useState(true);


    const [formData, setFormData] = useState<UserWithId>(user)

    useEffect(()=>{
        setFormData(user)
    }, [user])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave(formData)
    }

    return(
        <Dialog 
            open={isOpen}
            onClose={()=> setIsOpen(false)}
            static={true}
            className="z-[100]"
            >
            <DialogPanel className="sm:max-w-md">
                <Title>Editar Usuario: {user.id}</Title>

                <form style={{display:'flex', gap:'4px', flexDirection:'column'}} onSubmit={handleSubmit}>
                    <TextInput 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                     />
                    <TextInput 
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                     />
                    <TextInput 
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="GitHub"
                     />

                     <Button style={{marginRight:'16px', marginTop:'8px'}} type="submit">Guardar Cambios</Button>
                     <Button style={{marginRight:'16px', marginTop:'8px'}} type="button" onClick={onClose}>Cancelar</Button>

                </form>
            </DialogPanel>
        </Dialog>
    )
}