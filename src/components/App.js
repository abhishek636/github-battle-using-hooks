import React,{useState} from 'react';
import Popular from './Popular';
import Battle from './Battle';
import BattleResult from './BattleResult';
import { BattleContext } from '../context/BattleContext';
import Nav from './Nav';
import { Route,Routes } from 'react-router-dom';



function App(){
    let [theme,setTheme]= useState('light')
    const toggleTheme= () =>{
        setTheme(theme === 'light'? "dark": "light")
    }

    const fetchPopularRepos =(language)=>{
        const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
        
        return fetch(endpoint)
        .then((res)=>res.json())
        .then((data)=>{
            if(!data.items){
                throw new Error(data.message)
            }
            return data.items
        })
    }
    return(
        <BattleContext.Provider value={{
            toggleTheme, theme , fetchPopularRepos
        }}>
            <div className={theme}>
                <div className='container'>
                    <Nav/>  
                    <Routes>
                        <Route exact path='/' Component={Popular}/>
                        <Route path='/battle' Component={Battle}/>
                        <Route path='/battle/results' Component={BattleResult}/>
                    </Routes>
                </div>
            </div>
        </BattleContext.Provider>
    )
}

export default App;