import {FC} from 'react'
import s from './ProjecttItem.module.scss'

interface ProjectItemI {
    project: {name: string, description: string, imgPath: string, link: string}
}

const ProjectItem:FC<ProjectItemI> = ({project}) => {

    return (
        <div className={s.container}>
            <img src={project.imgPath} />
            <div className={s.rightSide}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <button onClick={() => window.location.href = project.link}>See more</button>
            </div>
        </div>
    )
}

export default ProjectItem