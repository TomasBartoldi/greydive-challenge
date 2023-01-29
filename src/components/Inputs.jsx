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
    name={name}
    render={render}
    />
    </div>
  )
}

export default Input


/* 
    {
            
           type === items[0].type && (<div className='inputs'>
            <label>Nombre Completo</label>
            <input name='pregunta1' value={data.pregunta1.name} onChange={(e) => handleChange(e)} type='text'/>
            {errors.name&&(<p className="warning">{errors.name}</p>)}
            </div>)
            
        }
        {
           type === items[1].type && (<div>
            <label>Email</label>
            <input name='pregunta2' value={data.pregunta2.name} onChange={(e) => handleChange(e)} type='email'/>
            {errors.email&&(<p className="warning">{errors.email}</p>)}
            </div>)
        }
        {
           type === items[2].type && (<div>
            <label>Fecha de nacimiento</label>
            <input name='pregunta3' value={data.pregunta3.name} onChange={(e) => handleChange(e)} type='date'/>
            {errors.date&&(<p className="warning">{errors.date}</p>)}
            </div>)
        }
        {
           type === items[3].type && (<div>
            
            <select  defaultValue={'default'} name='pregunta4' onChange={e=>handleChange(e)}>
                <option value={'default'}>Selecciona tu país</option>
                    {items[3].options.map((e, ind) =>(
                        <option key={ind} value={e.value}>{e.label}</option>
                    ))}
                
                </select>
                {errors.country&&(<p className="warning">{errors.country}</p>)}
            </div>)
        }
        {
            type === items[4].type && (<div>
                <label>¿Acepta los términos y condiciones?</label>
                <input type='checkbox' />
            </div>)
        }
*/