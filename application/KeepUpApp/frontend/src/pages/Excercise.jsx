import React from 'react';
import styled from "styled-components";
import Orb from '../components/Orb/Orb';
import {useMemo} from 'react';



function ExcerciseSlides() {
    const orbMemo = useMemo(() => {
        return <Orb />
      },[])
    return (
      <AppStyled>
        {orbMemo}
        <div className="App">
          <h2>space</h2>
          <img src="https://cdn.dribbble.com/users/919329/screenshots/2796076/media/05715cb3ea596b61dea95dbdea228d40.gif"></img>
          <h2>Arms & Legs Exercise</h2>
          <img src="https://i.giphy.com/media/3oKIPavRPgJYaNI97W/giphy.gif"></img>
          <h2>Legs Exercise</h2>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/34c52563799919.5abc9eb3f3f75.gif"></img>
          <h2>Back & Body Exercise</h2>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5bc49a55989429.599c07a9224c3.gif"></img>
          <h2>Arm Exercise</h2>
        </div>
      </AppStyled>
    );
}

const AppStyled = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #f7f0fa;
    }
    App {
      font-family: 'Poppins', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      }
      img {
        width: 100%;
        max-width: 900px;
        height: auto;
        justify-content: center;
        align-items: center;
        margin-left: 30%;
        margin-top: 5%;
        }
        h2 {
          font-size: 2rem;
          font-weight: 500;
          color: #333;
          text-align: center;
          margin-left: 8%;
          }`;

export default ExcerciseSlides;