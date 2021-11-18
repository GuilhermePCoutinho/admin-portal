import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Container, CourseContainer } from './styles';
import CardCourse from '../../components/CardCourse';
import api from '../../services/api';

function Home() {
  const [course, setCourse] = useState(
    [
      {
        name: "Teste"
      },
      {
        name:"Teste 2"
      }
    ]
  );

  async function handleGetCourses() {
    let response = await api.get("/courses");

    console.log(response)
    setCourse(response.data.courses.docs);
  }

  useEffect(() => {
    handleGetCourses()
  }, [])

  return(
    <Container>
      <Header />
      <CourseContainer>
        {
          course.length ? 
            course.map((courseItem, index) => (
              <CardCourse course={courseItem} key={index}/>
            ))
          :
            <p style={{ color: '#fff'}}>Nenhum curso encontrado</p>
        }

      </CourseContainer>
    </Container>
  )
}

export default Home;