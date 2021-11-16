import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Lottie from 'react-lottie';

import {
  Container,
  Form,
  Input,
  Button,
  Image,
  Animation,
  SignIn,
  Span,
  Title,
  AnimationContainer,
  TitleAnimation,
  RedirectLogin
} from './styles';
import api from '../../services/api';
import SignUpValidation from '../../utils/validation/SignUpValidation';
import Message from '../../components/Message';

import checkAnimation from '../../assets/animations/9953-loading-round.json';
import successAnimation from '../../assets/animations/9637-check.json';
import Logo from '../../assets/images/logo-overstack-novo.png';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const optionsLoading = {
    loop: true,
    autoplay: true,
    animationData: checkAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const optionsSuccess = {
    loop: true,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  async function HandleSubmit() {
    setLoading(true);
    const data = { name, email, phone, password };
    try {
      await SignUpValidation(data);
      handleRequest(data);
    } catch (err) {
      setLoading(false);
      Message(err.errors[0]);
    }  
  }

  async function handleRequest(data) {
    await api.post('/user', data)
      .then(response => {
        Message(response.data.message);
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 2000);
      })
      .catch(error =>  {
        Message(error.response.data.message)
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
  }

  async function handleAuthenticated() {
    let token = await localStorage.getItem("over_token");

    if (token) {
      window.location = "/";
    }
  }

  useEffect(() => {
    handleAuthenticated();
  }, [])

  return (
    <Container>
      {
        success ?
          <AnimationContainer>
            <TitleAnimation>Deu certo</TitleAnimation>
            <RedirectLogin href="/signin">Ir para o Login</RedirectLogin>
            <Lottie options={optionsSuccess} />
          </AnimationContainer>
          :
          <Form>
            <ToastContainer />
            <Image
              src={Logo}
              alt="Logo Overstack"
            />
            <Title>Cadastre-se!</Title>
            <Input
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Celular"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              onClick={HandleSubmit}
            >
              {loading ?
                <Animation>
                  <Lottie options={optionsLoading} />
                </Animation>

                :
                "Entrar"
              }
            </Button>
            <SignIn href="/signin">Já tem cadastro? <Span>Clique aqui!</Span></SignIn>
          </Form>
      }
    </Container>
  )
}

export default SignUp;