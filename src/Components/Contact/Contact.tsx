import {FC} from 'react'
import s from './Contact.module.scss'
import ContactForm from '../ContactForm/ContactForm'

const Contact:FC = () => {
    return (
        <div id='contact' className={s.container}>
            <h1>Contact me via the form below</h1>
            <div className={s.logo}></div>
            <ContactForm />
            <h2>or social media</h2>
            <div className={s.icons_container}>
                <a target='blank' href='https://www.linkedin.com/in/vladimir-nariadov-732571322/'><img src='src/assets/images/linkedin.png' height={'100%'}/></a>
                <a target='blank' href='https://github.com/qwothex'><img src='src/assets/images/github.png' height={'100%'}/></a>
                <a target='blank' href='https://telegram.com'><img src='src/assets/images/telegram.png' height={'100%'}/></a>
            </div>
            <p>2025 NV. All Rights reserved</p>
        </div>
    )
}

export default Contact