import { useContext, useEffect, useState } from 'react'
import './ProjectsList.css'

/* ASSETS */
import LikedFilled from '../../assets/like-filled.svg'
import LikOutline from '../../assets/like.svg'

// COMPONENTS
import Button from '../Button/Button'

//CONTEXT
import { AppContext } from '../../contexts/AppContext'

//UTILS
import { getApiData } from '../../services/apiServices'

function ProjectsList(props) {
   const [projects, setProjects] = useState()
   const [favProjects, setFavProject] = useState([])
   const appContext = useContext(AppContext)
   const hadleSavedProjects = (id) => {
        setFavProject((prevFavProjects) => {
          if (prevFavProjects.includes(id)) {
            const filterArray = prevFavProjects.filter((projectId) => projectId !== id)
            sessionStorage.setItem('favProjects', JSON.stringify(filterArray))
            return prevFavProjects.filter((projectId) => projectId !== id)
          } else {
            sessionStorage.setItem('favProjects', JSON.stringify([...prevFavProjects, id]))
            return [...prevFavProjects, id]
          }
        })
   }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsResponse = await getApiData('projects')
                setProjects(projectsResponse)
                } catch (e) {
                  setProjects([])
                }
          }

          fetchData()
    }, [])

    useEffect(() => {
      const savedFavProject = JSON.parse(sessionStorage.getItem('favProjects'))
      if (savedFavProject) {
        setFavProject(savedFavProject)
      }
    }, [])

  return (
    <div className="projects-section">
        <div className="projects-hero">
           <h2>{appContext.languages[appContext.language].projects.title}</h2>
           <p>{appContext.languages[appContext.language].projects.subtitle}</p>
        </div>
        <div className="projects-grid">
          {
            projects ?
              projects?.map((project) => (
                <div className="project-card d-flex jc-center al-center fd-column" key={project.id}>
                  <div 
                    className="thumb tertiary-background "
                    style={ {backgroundImage: `url(${project.thumb})`} }
                  ></div>
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                  <Button buttonStyle="unstyled" onClick={() => hadleSavedProjects(project.id)}>
                    <img src={favProjects.includes(project.id) ? LikedFilled : LikOutline} height="20px" />
                      
                  </Button>
                </div>
              )) 
              :null
          }
        </div>
    </div>
  )
}
export default ProjectsList