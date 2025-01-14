import {FC, useRef} from 'react'
import s from './Header.module.scss'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Header:FC = () => {
    const container = useRef(null)

    useGSAP(() => { 
        gsap.to(`.${s.name}`, { xPercent: 0, opacity: 1, duration: 2, ease: 'power1.out'})
        gsap.to(`.${s.name}`, { opacity: 1, duration: 2, ease: 'none'})

        gsap.to(`.${s.pos}`, { xPercent: -100, opacity: 1, duration: 2, ease: 'power1.out'})
        gsap.to(`.${s.pos}`, { opacity: 1, duration: 2, ease: 'none'})

    }, {scope: container})

    return(
        <header ref={container} className={s.main_header}>
            <h1 className={s.name}>Vladimir Nariadov</h1>
            <h3 className={s.pos}>Web developer</h3>
        </header>
    )
}

export default Header