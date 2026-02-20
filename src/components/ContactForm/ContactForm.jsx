import { useContext, useState, useEffect } from 'react'
import './ContactForm.css'

//COMPONENTS
import Button from '../Button/Button'

//CONTEXT
import { AppContext } from '../../contexts/AppContext'

function ContactForm() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [formSubmitLoading, setFormSubmitLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const appContext = useContext(AppContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isFormValid) {
      setFormSubmitLoading(true)
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...formData, access_key: "25bbb2b8-57bf-4bc2-ba6e-58d20ade7f82"})
        })

        if (response.ok) {
          setFormSubmitted(true)
        }else {
          alert('Error ao enviar')
        }
      }catch (e) {
        alert('Erro: ', e)
      }finally {
        setFormSubmitLoading(false)
      }
    }
  }
  useEffect(() => {
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
      }

      const isValid = formData.name.trim() &&
      formData.email.trim() &&
      isValidEmail(formData.email) &&
      formData.message.trim()

      setIsFormValid(isValid)
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    })
  }

  return (
            <div className="contact-form d-flex fd-column al-center">
                <h2>{appContext.languages[appContext.language].contact.title}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="d-flex form-group">
                    <input 
                      type="text" 
                      className="form-input"
                      name="name"
                      id="name"
                      placeholder={appContext.languages[appContext.language].contact.pl1}
                      onChange={handleChange}
                     />
                     <input 
                      type="email" 
                      className="form-input"
                      name="email"
                      id="email"
                      placeholder={appContext.languages[appContext.language].contact.pl2}
                      onChange={handleChange}
                     />
                  </div>
                  <div className="d-flex form-group">
                    <textarea 
                      className="form-input"
                      name="message"
                      id="message"
                      placeholder={appContext.languages[appContext.language].contact.pl3}
                      rows="4"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="al-center d-flex jc-end form-group">
                    {formSubmitted && <p className="text-primary">{appContext.languages[appContext.language].contact.successMsg}</p>}
                    <Button type="submit" buttonStyle="secondary" disabled={!isFormValid || formSubmitLoading}>
                      {appContext.languages[appContext.language].general.send}
                    </Button>
                  </div>
                </form>
            </div>
  )
}
export default ContactForm