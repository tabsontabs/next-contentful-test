import Head from 'next/head'
import Nav from '../components/nav'
import { useState } from 'react'
import styles from '../styles/Contact.module.css';

export default function ContactPage() {

  // name states
  const [name, setName] = useState('')
  const [nameDisplay, setNameDisplay] = useState(true)
  const [nameErrorMessage, setNameErrorMessage] = useState(false)

  // email states 
  const [email, setEmail] = useState('')
  const [emailDisplay, setEmailDisplay] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState(false)

  // message states
  const [message, setMessage] = useState('')
  const [messageDisplay, setMessageDisplay] = useState(false)
  const [messageErrorMessage, setMessageErrorMessage] = useState(false)

  // submitted state
  const [submitted, setSubmitted] = useState(false)

  // the form starts off showing only the name input field and a 'next' button that brings you to the email input field
  // when clicking on the first 'next' button, if the name input field is not empty, it will hide the name input field and first 'next' button and then display the email input field and 2nd 'next' button
  // if the user clicks the first 'next' button and the name input field is empty, an error message will display
  const showEmailForm = (e) => {
    e.preventDefault()
    if (name != '' & name!= ' ') {
      setNameErrorMessage(false)
      setNameDisplay(false)
      setEmailDisplay(true)
    } else {
      setNameErrorMessage(true)
    }
  }

  // when the 1st 'back' button is clicked, the email input field and 2nd 'next' button are hidden, the name input field and 1st 'next' button are displayed
  const showNameFormBack = (e) => {
    e.preventDefault()
    setEmailDisplay(false)
    setEmailErrorMessage(false)
    setNameDisplay(true)
  }

  // when clicking on the 2nd 'next' button, if the email input field is not empty, it will hide the email input field and 2nd 'next button and then display message input field and 'submit' button
  // if the user clicks the 2nd 'next' button and the email input field is empty, an error message will display 
  const showMessageForm = (e) => {
    e.preventDefault()
    if (email != '' & email!= ' ') {
      setEmailDisplay(false)
      setMessageDisplay(true)
    } else {
      setEmailErrorMessage(true)
    }
  }

  // when the 2nd 'back' button is clicked, the message input field and 'submit' button are hidden, the email input field and 2nd 'next' button are displayed
  const showEmailFormBack = (e) => {
    e.preventDefault()
    setMessageDisplay(false)
    setMessageErrorMessage(false)
    setEmailDisplay(true)
  }
  
  // when clicking on the submit button, if the message field is not empty, the user inputs to name, email, and message fields will be submitted to the ContactAPI
  // if the user clicks 'submit' and the message field is empty, an error message will display
  // if the data is successfully transmitted via ContactAPI a success response will be returned and upon receiving this response the message input and 'submit' button will hide and a succuessful submission message will display
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sending')

    if (message != '' & message != ' ') {
      let data = {
        name,
        email,
        message
      }

      fetch ('/api/contactAPI', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        console.log('response received')
        if (res.status === 200) {
          console.log('response succeeeded!')
          setSubmitted(true)
          setMessageDisplay(false)
          setName('')
          setEmail('')
          setMessage('')
          document.querySelectorAll("input").forEach(
            input => ((input.value= ''))
          )
        }
      })
    } else {
      setMessageErrorMessage(true)
    }
  }
  
  return (
    <>
      <Head>
        <title>Compound - Contact</title>
      </Head>
      <div className='navWrapper'>
        <Nav />
      </div>
      <div className={styles.contactFormPage}>
        <h1 className={styles.contactTitle}>contact us</h1>
        <div className={styles.formHolder}>
          <form>
            { nameDisplay ? 
            <div className={styles.nameInput}>
              <label className='visually-hidden' htmlFor='name'>Name</label>
              <input value={name} type='text' placeholder='Type your full name here' onChange={(e)=>{setName(e.target.value), setNameErrorMessage(false)}} name='name' />  
            </div> : null
            }
            { emailDisplay ? 
            <div className='emailInput'>
              <label className='visually-hidden' htmlFor='email'>Email</label>
              <input value={email} id='emailField' type='email' placeholder='Type your email here' onChange={(e)=>{setEmail(e.target.value), setEmailErrorMessage(false)}} name='email' />
            </div> : null
            }
            { messageDisplay ? 
            <div className='messageInput'>
              <label className='visually-hidden' htmlFor='message'>Message</label>
              <textarea rows="4" value={message} id='messageField' placeholder='Type your message here' onChange={(e)=>{setMessage(e.target.value), setMessageErrorMessage(false)}} name='message'></textarea>
            </div> : null
            }
          </form>
          { submitted ? 
          <div className={styles.messageReceived}>
            <p>Thanks for contacting us!</p>
          </div> : null
          }
        </div>
        { nameErrorMessage ?
        <div className={styles.errorMessage}><p>You must provide your name.</p></div>
        : null
        }
        { nameDisplay ? 
        <div className={styles.singleButtonHolder}>
          <button className='showEmail' onClick={(e)=>{showEmailForm(e)}}>Next</button>
        </div>
        : null
        }
        { emailErrorMessage ?
        <div className={styles.errorMessage}><p>You must provide a valid email.</p></div>
        : null
        }
        { emailDisplay ?
        <div className={styles.buttonHolder}> 
          <button className={styles.backButton} onClick={(e)=>{showNameFormBack(e)}}>Back</button>
          <button className='showMessage' onClick={(e)=>{showMessageForm(e)}}>Next</button>
        </div>
        : null
        }
        { messageErrorMessage ?
        <div className={styles.errorMessage}><p>You must provide a message.</p></div>
        : null
        }
        { messageDisplay ? 
        <div className={styles.buttonHolder}>
          <button className={styles.backButton} onClick={(e)=>{showEmailFormBack(e)}}>Back</button>
          <button className='formSubmit' onClick={(e)=>{handleSubmit(e)}}>Submit</button>
        </div>
        : null
        }
        <style jsx>{`
        
        `}</style>
      </div>
    </>
  )
}