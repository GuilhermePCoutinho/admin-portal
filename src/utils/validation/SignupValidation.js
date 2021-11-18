import * as yup from 'yup';

async function SigninValidation(data){
  let schema = yup.object().shape({
    password: yup.string().required().min(6),
    phone: yup.string().min(11).required(),
    email: yup.string().email().required(),
    name: yup.string().required()
  });

  return await schema.validate(data);
  // return await schema.isValid(data);
}

export default SigninValidation;