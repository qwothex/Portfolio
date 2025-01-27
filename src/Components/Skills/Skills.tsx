import {FC} from 'react'
import s from './Skills.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SkillTiles from '../Models/SkillTiles/SkillTiles'

gsap.registerPlugin(useGSAP)

const Skills:FC = () => {

    return(
        <div className={s.skills_container} >
            <div className={s.skills_content}>
                <h1 id='skills'>Skills</h1>
                <h3>What am i proficient in</h3>
                <SkillTiles />
            </div>
        </div>
    )
}

export default Skills