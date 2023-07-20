import React, {useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { BattleContext } from "../context/BattleContext";
import axios from "axios";

export default function BattleResult () {
    const {theme}=useContext(BattleContext)
    const[playerOneData,setPlayerOneData] = useState([]);
    const[playerTwoData,setPlayerTwoData] = useState([]);

    const {search } = useLocation()
    let parsedObject = queryString.parse(search)
    let playerOne = parsedObject.playerOne;
    let playerTwo = parsedObject.playerTwo;

    const githubData = () => {
        let endpoints = [
            `https://api.github.com/users/${playerOne}`,
            `https://api.github.com/users/${playerTwo}`
        ]
        axios.all(endpoints.map((endpoint)=>axios.get(endpoint))).then(([{data:playerOneD},{data:playerTwoD}])=>{
            setPlayerTwoData(playerTwoD)
            setPlayerOneData(playerOneD)
            
        });
    }

    useEffect(() => {
        githubData()
    },[]);


    return(
        <>
            <div className="grid space-around container-sm">
                <div className={`card bg-${theme}`}>
                {playerOneData ? (
                    <article
                    className={theme === 'light' ? ' dark' : '  light '}
                    >
                    {playerOneData.public_repos > playerTwoData.public_repos ? (
                        <h5 className='header-lg center-text'>Winner</h5>
                    ) : (
                        <h5 className='header-lg center-text'>Looser</h5>
                    )}
                    <div className=" article-img">
                        <img className='avatar' src={playerOneData.avatar_url} alt="" />
                    </div>

                    <div className="article_data">
                    <h2 className='header-lg center-text'>
                        <i className="fas fa-user-alt person"></i> {playerOneData.name}
                        </h2>
                        <p className="center-text">
                        <i class="fas fa-user-friends star"></i>
                        {playerOneData.following} following
                        </p>
                        <p className="center-text">
                        <i class="fas fa-users forks"></i> {playerOneData.followers}{' '}
                        followers
                        </p>
                        <p className="center-text">
                        <i class="fas fa-code warning code"></i>{' '}
                        {playerOneData.public_repos} repositories
                        </p>
                    </div>
                    </article>
                ) : (
                    ''
                )}
                </div>

                <div className={`card bg-${theme}`}>
                {playerTwoData ? (
                    <article
                    className={theme === 'light' ? ' dark' : ' light '}
                    >
                    {playerOneData.public_repos > playerTwoData.public_repos ? (
                        <h5 className='header-lg center-text'>Looser</h5>
                    ) : (
                        <h5 className='header-lg center-text'>winner</h5>
                    )}
                    <div className="article-img">
                        <img className='avatar' src={playerTwoData.avatar_url} alt="" />
                    </div>

                    <div className="article_data">
                        <h2 className='header-lg center-text'>
                        <i className="fas fa-user-alt person"></i> {playerTwoData.name}
                        </h2>
                        <p className="center-text">
                        <i class="fas fa-user-friends star"></i>
                        {playerTwoData.following} following
                        </p>
                        <p className="center-text">
                        <i class="fas fa-users forks"></i> {playerTwoData.followers}{' '}
                        followers
                        </p>
                        <p className="center-text">
                        <i class="fas fa-code warning code"></i>{' '}
                        {playerTwoData.public_repos} repositories
                        </p>
                    </div>
                    </article>
                ) : (
                    ''
                )}
                </div>
            </div>
            <Link
                to='/battle'
                className='btn dark-btn btn-space'
                >
                Reset
            </Link>
        </>
    )

   
}

// export default function BattleResult(){
//     const{search} = useLocation()
//     const {playerOne,playerTwo}=queryString.parse(search)
//     return(
//         <h1>{playerOne},{playerTwo}</h1>
//     )
// }