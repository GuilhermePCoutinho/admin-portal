import { useEffect } from 'react';
import { 
  Image, 
  Container, 
  Link,
  ContainerLinks,
  LinkMenu
} from './styles';
import Logo from '../../assets/images/logo-overstack-novo.png';

function Header() {

  async function handleAuthenticated() {
    let token = await localStorage.getItem("over_token");

    if(!token) {
      window.location = "/signin";
    }
  }

  async function handleLogout() {
    localStorage.clear();
    handleAuthenticated();
  }

  useEffect(()=>{
    handleAuthenticated();
  }, [])

  return(
    <Container>
      <Link href="/">
        <Image src={Logo}/>
      </Link>
      <ContainerLinks>
        <LinkMenu href="/course">Novo Curso</LinkMenu>
        <LinkMenu href="/course">Novo Curso</LinkMenu>
        <LinkMenu onClick={handleLogout} href="#">Sair</LinkMenu>
      </ContainerLinks>
    </Container>
    
  )
}

export default Header;