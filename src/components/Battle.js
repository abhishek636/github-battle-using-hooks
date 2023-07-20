import React,{useContext, useState} from "react";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from "react-icons/fa";
import {BattleContext} from '../context/BattleContext'
import {Link} from 'react-router-dom'

function Instruction() {
  return (
    <BattleContext.Consumer>
      {({theme}) => (
            <div className="instructions-container">
            <h1 className="center-text header-lg">Instructions</h1>
            <ol className="container-sm grid center-text battle-instructions">
              <li>
                <h3 className="header-sm">Enter two Github users</h3>
                <FaUserFriends
                  className={`bg-${theme}`}
                  color="rgb(255, 191, 116)"
                  size={140}
                />
              </li>
              <li>
                <h3 className="header-sm">Battle</h3>
                <FaFighterJet className={`bg-${theme}`} color="#727272" size={140} />
              </li>
              <li>
                <h3 className="header-sm">See the winners</h3>
                <FaTrophy className={`bg-${theme}`} color="rgb(255, 215, 0)" size={140} />
              </li>
            </ol>
          </div>
      )}
    </BattleContext.Consumer>
  );
}


export default function Battle () {
  
  let [users, setgithubUsername] = useState({ firstUser: "", secondUser: "" });
  let [usersData, setUserData] = useState({
    firstUserData: null,
    secondUserData: null,
  });
  let [errors, setErrors] = useState({ firstUserErr: "", secondUserErr: "" });

  const {theme} = useContext(BattleContext)

  // function to find  github users
  function findGithubUser(event) {
    event.preventDefault();
    let name = event.target.name;
    let user = users[name];
    fetch(`https://api.github.com/users/${user}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        if (data.message === "Not Found") {
        return setErrors({
            ...errors,
            [name + "Err"]: "User is not found invalid username",
        });
        }
        setUserData({ ...usersData, [name + "Data"]: data });
        setErrors({ ...errors, [name + "Err"]: "" });
    });
  }

  // show battle button once we have both users data
  function showbattleButton() {
      if (usersData.firstUserData && usersData.secondUserData) {
          return (
            <Link
            className='btn dark-btn btn-space'
            to={{
              'pathname': "/battle/results",
              'search': `playerOne=${users.firstUser}&playerTwo=${users.secondUser}`,
            }}
            >
            Battle
            </Link>
          );
      }
  }

  // function  deleteUserData
  function deleteUserData(userName) {
    setUserData({ ...usersData, [userName]: null });
  }


  return (
    <React.Fragment>
      <Instruction />
      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {usersData.firstUserData === null? (
            <form  className="column player" onSubmit={findGithubUser}>
              <label htmlFor="username" className="player-label">
                Player One
              </label>
              <div  className="row player-inputs">
                <input
                  type="text"
                  className={`input-${theme}`}
                  name="firstUser"
                  placeholder="Github username"
                  autoComplete="off"
                  onChange={(e) => {
                    setgithubUsername({
                      ...users,
                      firstUser:e.target.value
                    })
                  }}
                  value={users.firstUser}
                />
                <button
                  type="submit"
                  className={`btn ${theme==='dark' ? 'light-btn' : 'dark-btn'}`} 
                  name="firstUser"
                  onClick={(e)=>{
                    findGithubUser(e);
                  }}
                >Submit</button>
              </div>
            </form>
          ):(
            
            <div className="column player">
              <h3 className="player-label">Player One</h3>
              <div className={`row bg-${theme}`}>
                <div  className="player-info">
                  <img
                    className="avatar-small"
                    src={`${usersData.firstUserData.avatar_url}`}
                    alt={usersData.firstUserData.login}
                  />
                  <a href={`https://github.com/${usersData.firstUserData.login}`} className="link">
                    {usersData.firstUserData.login}
                  </a>
                </div>
                <button className="btn-clear flex-center" onClick={()=>{deleteUserData("firstUserData")}}>
                  <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
                </button>
              </div>
            </div>
            
          )}

          {usersData.secondUserData === null? (
            <form  className="column player" onSubmit={findGithubUser}>
              <label htmlFor="username" className="player-label">
                Player Two
              </label>
              <div  className="row player-inputs">
                <input
                  type="text"
                  name="firstUser"
                  placeholder="Github username"
                  autoComplete="off"
                  onChange={(e) => {
                    setgithubUsername({
                      ...users,
                      secondUser:e.target.value
                    })
                  }}
                  value={users.secondUser}
                />
                <button
                  type="submit"
                  name="secondUser"
                  className={`btn ${theme==='dark' ? 'light-btn' : 'dark-btn'}`}
                  onClick={(e)=>{
                    findGithubUser(e);
                  }}
                >Submit</button>
              </div>
            </form>
          ):(
            <>
              <div className="column player">
                <h3 className="player-label">Player Two</h3>
                <div className={`row bg-${theme}`}>
                  <div  className="player-info">
                    <img
                      className="avatar-small"
                      src={`${usersData.secondUserData.avatar_url}`}
                      alt={usersData.secondUserData.login}
                    />
                    <a href={`https://github.com/${usersData.secondUserData.login}`} className="link">
                      {usersData.secondUserData.login}
                    </a>
                  </div>
                  <button className="btn-clear flex-center" onClick={()=>{deleteUserData("secondUserData")}}>
                    <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {showbattleButton()}
      </div>
    </React.Fragment>
  );
  
}

