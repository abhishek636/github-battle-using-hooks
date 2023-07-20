import React, {useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from '../utils'
import {FaUser,FaStar,FaCodeBranch,FaExclamationTriangle} from 'react-icons/fa'
import {GoRepo} from 'react-icons/go'
import Card from './Card'


function LanguagesNav ({selected,onUpdateLanguage}){
  const languages = ['All','JavaScript','Ruby','Java','CSS','Python']
  return (
    <ul className="flex-center">
        {
            languages.map((language) => (<li key={language}>
                <button className="btn-clear nav-link"
                style={selected === language ? { color : 'rgb(187,46,31)'} : null}
                onClick={()=> onUpdateLanguage(language)}>
                    {language}
                </button>
            </li>)) 
        }
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected : PropTypes.string.isRequired,
  onUpdateLanguage : PropTypes.func.isRequired
}

function ReposGrid({repos}){
    return (
        <ul className='grid space-around'>
        {repos?.map((repo, index) => { 
          const { name, owner, html_url, stargazers_count, forks, open_issues} = repo
          const { login, avatar_url } = owner
  
          return (
            <li key={html_url}>
              <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
              >
              <ul className='card-list'>
                <li>
                
                    <FaUser color='rgb(255, 191, 116)' size={22} />
                    <a href={`https://github.com/${login}`}>
                      {login}
                    </a>
               
                </li>
                <li>
                  <GoRepo color='red' size={22}/>
                  <a href={html_url}>{name}</a>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
              </Card>
            </li>
          )
        })}
      </ul>
    )  
  }


export default function Popular(){
  let [selectedLanguage,setSelectedLanguage] = useState("All");
  let [repos, setRepos] = useState({});
  let [error,setError]= useState(null);

  useEffect(() => {
    updateLanguage(selectedLanguage)
  },[selectedLanguage])

  function updateLanguage(selectedLanguage){
      setSelectedLanguage(selectedLanguage);
      setError(null)
      if(!repos[selectedLanguage]){
          fetchPopularRepos(selectedLanguage)
          .then((data) => {
            setRepos({...repos,[selectedLanguage]:data})

          })
          .catch(() => {
            console.warn('Error fetching repos:' ,error)
            setError(`There was an error fetching the repositories.`)
          })
      }
      
  }
 
  return(
      <React.Fragment>
          <LanguagesNav
            selected={selectedLanguage}
            onUpdateLanguage={updateLanguage}
          />
          <ReposGrid repos={repos[selectedLanguage]}/>
      </React.Fragment>
  )
}