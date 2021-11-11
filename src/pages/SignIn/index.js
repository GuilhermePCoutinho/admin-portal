import{ useState } from "react";
import { Container, Form, Input, Button } from "./styles";
import api from "../../services/api"

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function HandleSubmit() {
       const data = { email, password };

       await api.post("/user", data)
       .then ( response => {
           console.log(response);
       })
       .catch(error => {
           console.log(error);
       })
        
    }
    return(
        <Container>
            <Form>
                <Input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required/>
                <Input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} required/>
                <Button onClick={HandleSubmit}>Entrar</Button>
            </Form>

        </Container>
    )
}

export default SignIn;