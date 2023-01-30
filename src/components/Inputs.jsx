import React /* {useState} */ from 'react'
import { Field, ErrorMessage } from 'formik'
import '../Styles/inputs.css'


const Input = ({type, name, placeholder, className, render}) => {



  return (
    <div>
    <Field
    type={type}
    name={name}
    placeholder={placeholder}
    className={className}
    />      
    <ErrorMessage
    className='error-message'
    name={name}
    render={render}
    />
    </div>
  )
}

export default Input


