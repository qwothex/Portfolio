import {FC} from 'react'
import s from './Projects.module.scss'
import { projects } from '../../assets/projectsVariable/projects'
import ProjectItem from '../ProjectItem/ProjectItem'

const Projects:FC = () => {

    return(
        <div id='projects' className={s.projects}>
            <h1>Projects</h1>
            <h3>Evidence of my knowledge</h3>
            {projects.map((el) => {
                return <ProjectItem key={el.name} project={el} />
            })}
        </div>
    )
}

export default Projects