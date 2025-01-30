import {FC, useRef} from 'react'
import s from './Header.module.scss'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Header:FC = () => {
    const containerRef = useRef(null)
    const nameRef = useRef(null)
    const posRef = useRef(null)

    useGSAP(() => {

        gsap.to(nameRef.current, {
            xPercent: -100,

            scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1,
                start: 'top top', //300
                end: 'bottom top'
            }
        })
        //`.${s.pos}`
        gsap.to(posRef.current, {
            xPercent: 250,
            
            scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1,
                start: 'top top', //425
                end: 'bottom 100'
            }
        })

    }, {scope: containerRef})

    return(
        <header ref={containerRef} id='header' className={s.main_header}>
            <h1 ref={nameRef} className={s.name}>Vladimir Nariadov</h1>
            <h3 ref={posRef} className={s.pos}>Web developer</h3>
        </header>
    )
}

export default Header