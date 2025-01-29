import {FC, useRef} from 'react';
import s from './SideBar.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP)

const SideBar:FC = () => {

    const containerRef = useRef(null)

    useGSAP(() => {
        gsap.to(`.${s.navBar_container}`, {
            scrollTrigger: {
                trigger: `.${s.sideBar_container}`,
                scrub: true,
                start: 'top 40%',
                // markers: true
            },
        xPercent: -150,
        })
    }, {scope: containerRef})

    return(
        <div ref={containerRef}>
            <nav className={s.navBar_container}>
                <ul>
                    <li><a href='#header'>Header</a></li>
                    <li><a href='#skills'>Skills</a></li>
                    <li><a href='#projects'>Projects</a></li>
                    <li><a href='#contact'>Contact</a></li>
                </ul>
            </nav>
            <ul className={s.sideBar_container}>
                <li><a href='#header'>Header</a></li>
                <li><a href='#skills'>Skills</a></li>
                <li><a href='#projects'>Projects</a></li>
                <li><a href='#contact'>Contact</a></li>
            </ul>
        </div>
    )
}

export default SideBar