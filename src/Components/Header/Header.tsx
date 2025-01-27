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
        const tl = gsap.timeline()
        const tl1 = gsap.timeline()
        // tl.set(`.${s.name}`, { xPercent: -50, opacity: 0})
        // tl.to(`.${s.name}`, { xPercent: 0, duration: 2, ease: 'power1.out'}, 0.4)
        // tl.to(`.${s.name}`, { opacity: 1, duration: 2, ease: 'none'}, '<')

        // tl1.set(`.${s.pos}`, { xPercent: 100, opacity: 0})
        // tl1.to(`.${s.pos}`, { xPercent: 0, duration: 2, ease: 'power1.out'}, 0.4)
        // tl1.to(`.${s.pos}`, { opacity: 1, duration: 2, ease: 'none'}, '<')
        tl.set(`.${s.name}`, { xPercent: -50, opacity: 0})
        tl.to(`.${s.name}`, { xPercent: 0, duration: 2, ease: 'power1.out'}, 0.4)
        tl.to(`.${s.name}`, { opacity: 1, duration: 2, ease: 'none'}, '<')

        tl1.set(`.${s.pos}`, { xPercent: 100, opacity: 0})
        tl1.to(`.${s.pos}`, { xPercent: 0, duration: 2, ease: 'power1.out'}, 0.4)
        tl1.to(`.${s.pos}`, { opacity: 1, duration: 2, ease: 'none'}, '<')

        const tlScroll = gsap.timeline()

        tlScroll.to(`.${s.name}`, {
            scrollTrigger: {
                trigger: `.${s.name}`,
                scrub: 1,
                start: 'top 300px',
            },
            xPercent: -100,
            duration: 1.5,
        })

        tlScroll.to(`.${s.pos}`, {
            scrollTrigger: {
                trigger: `.${s.pos}`,
                scrub: 1,
                start: 'top 425px',
            },
            xPercent: 250,
            duration: 1.5,
        })

    }, {scope: container})

    return(
        <header ref={container} id='header' className={s.main_header}>
            <h1 className={s.name}>Vladimir Nariadov</h1>
            <h3 className={s.pos}>Web developer</h3>
        </header>
    )
}

export default Header