import {FC} from 'react';
import s from './SideBar.module.scss';

const SideBar:FC = () => {
    return(
        <div className={s.container}>
            <ul>
                <li><a href='#header'>Header</a></li>
                <li><a href='#skills'>Skills</a></li>
                <li><a href='#projects'>Projects</a></li>
                <li><a href='#contact'>Contact</a></li>
            </ul>
        </div>
    )
}

export default SideBar