import {FC} from 'react'
import s from './Skills.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tile from '../Models/SkillTile/Tile'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Skills:FC = () => {

    return(
        <div className={s.skills_container}>
            <h1>Skills</h1>
            <h3>What am i proficiend in</h3>
            <div>
                <Tile />
            </div>
        </div>
    )
}

export default Skills