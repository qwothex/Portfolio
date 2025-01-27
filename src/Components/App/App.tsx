import {FC} from 'react'
import Header from '../Header/Header'
import Skills from '../Skills/Skills'
import SideBar from '../SideBar/SideBar'
import Projects from '../Projects/Projects'
import Contact from '../Contact/Contact'

const App:FC = () => {

    return(
        <>
            <Header />
            <SideBar />
            <Skills />
            <Projects />
            <Contact />
        </>
    )
}

export default App