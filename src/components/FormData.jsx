import React, {useEffect, useState} from 'react'
import items from '../data/jsonData'
import { useNavigate } from 'react-router-dom'
//import Inputs from './Inputs'
import appFirebase from '../firebaseCredentials'
import { getFirestore, collection, addDoc } from 'firebase/firestore' 
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../Styles/formData.css'
import Input from './Inputs'



const db = getFirestore(appFirebase)


const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('*required'),
  selectOption: Yup.string()
    .required('*required'),
  date: Yup.string()
    .required('*required'),
  email: Yup.string()
    .required('*required'),
  checkbox: Yup.boolean().default(false).required('*required')
})

const itemsMap = items[3].options.map((e, ind) =>(
  <option key={ind} value={e.value}>{e.label}</option>
))

const FormData = () => {

  const navigate = useNavigate()

  

  const dataProperties = {
    pregunta1: {
      label: "Nombre completo",
      name: ''
    },
    pregunta2: {
      label: "Correo electrónico",
      name: ''
    },
    pregunta3: {
      label: "Fecha de nacimiento",
      name: ''
    },
    pregunta4: {
      label: "¿Cuál es tu país de origen?",
      name: ''
    },
  }

  const [click, setClick] = useState(false)
  const [data, setData] = useState(dataProperties);
  const validateData = data.pregunta1.name && true

  useEffect(()=>{  
    const aux = async () => {
      await addDoc(collection(db, 'respuestas'), {
        ...data
      });
    }
     validateData && aux()

  }, [data, validateData])

  const handleSubmit = async (values) => {

    setData({
      ...data,
      pregunta1: {...data.pregunta1, name: values.name},
      pregunta2: {...data.pregunta2, name: values.email},
      pregunta3: {...data.pregunta3, name: values.date},
      pregunta4: {...data.pregunta4, name: values.selectOption}
    }); 

      

}

  const handleRedirect = () => {
    setTimeout(() => {      
      window.confirm('Presiona aceptar para ver los formularios cargados') && navigate('/responses')
    }, 500);
  }

  const handleCheckbox = () => {
    setClick(!click)
  }

   

  const renderError = (message) => <p className="help is-danger">{message}</p>;
  
  return (
    <div className='form'>
      <div className='form-title'>
        <h2>GREY DIVE CHALLENGE</h2>
        <p className='tomasbartoldi'>TOMÁS BARTOLDI</p>        
      </div>
    <Formik
      
      initialValues={{ name: '', selectOption: '', date: '', checkbox: false }}
      validationSchema={FormSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form
        className='form-container'
        >
          <div className='form-inputs-container'>

          <div className='form-group'>
          <Input
          id='name'
          type='text'
          name='name'
          placeholder=' '
          className='form-input'
          render={renderError}
          />
          <label for='name' className='form-label'>{dataProperties.pregunta1.label}:</label>
          <span className='form-line'></span>
          </div>

          <div className='form-group'>
          <Input
          id='email'
          type='email'
          name='email'
          placeholder=' '
          className='form-input'
          render={renderError}
          /> 
          <label for='email' className='form-label'>{dataProperties.pregunta2.label}:</label>
          <span className='form-line'></span>
          </div>
          


          <div className='form-group'>
          <Input
          type='date'
          name='date'
          className='form-input'
          render={renderError}
          placeholder=' '
          />
          <label className='form-label'>{dataProperties.pregunta3.label}:</label>
          </div>

        <div className='form-group'>
          <Field
          as="select" 
          name="selectOption"
          className='form-input'
          >
          <option value={'default'} className='date-select-color'>Selecciona tu país</option>
            {itemsMap}            
          </Field>
          <ErrorMessage
          name='selectOption'
          render={renderError}
          />
        </div>
          <div className='terms-conditions'>
          <label htmlFor="checkbox" className='date-select-color'>
          Términos y condiciones 
          </label>
          <input
          className='checkbox'
          type="checkbox" 
          value={click} 
          onChange={handleCheckbox} />
          </div>

          {
            click &&
          <button 
          className='form-submit'
          type="submit" 
          disabled={isSubmitting}
          onClick={handleRedirect}
          >
            Enviar
          </button>
           
          }
          </div>
        </Form>
      )}
    </Formik>
    </div>
  )
}

export default FormData
