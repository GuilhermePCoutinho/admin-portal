import { useState } from "react";
import { ToastContainer } from "react-toastify";

import { Container, Form, Input, Button } from "./styles";
import api from "../../services/api"
import SigninValidation from "../../utils/validation/SigninValidation";
import Message from "../../components/Message";


function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function HandleSubmit() {
        const data = { email, password };

        let validation = await SigninValidation(data);

        if (validation) {
            await api.post("/signin", data)
                .then(response => {
                    Message(response);
                })
                .catch(error => {
                    Message(error.response.data.message)
                })

        }else {
            Message ("Preencha um email válido e uma senha de no mínimo 6 caracteres!", "error")
        }

    }
    return (
        <Container>
            <Form>
                <ToastContainer />
                <Input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} required />
                <Button onClick={HandleSubmit}>Entrar</Button>
            </Form>
        </Container>
    )
}

export default SignIn;