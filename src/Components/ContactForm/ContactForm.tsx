import {FC, useState} from 'react'
import s from './ContactForm.module.scss'

export default function Contact() {
    const [result, setResult] = useState("");
  
    const onSubmit = async (event: any) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "506fc2d0-ad5d-4155-8f8f-b2731d634270");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };
  
    return (
      <div className={s.form_container} >
        <form onSubmit={onSubmit}>
          <input type="text" name="name" placeholder='Name or company' required/>
          
          <input type="email" name="email" placeholder='E-mail' required/>
          <textarea name="message" required placeholder='Message'></textarea>
  
          <button type="submit">Submit Form</button>
  
        </form>
        <span>{result}</span>
  
      </div>
    );
  }
  