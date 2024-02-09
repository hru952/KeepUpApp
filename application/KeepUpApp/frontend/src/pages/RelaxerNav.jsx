import BreathingApp from "./BreathingPage";
import MusicPlayer from "./Music";
import Orb from "../components/Orb/Orb"
import React , {useMemo} from 'react';
import { Button} from "@chakra-ui/react";
import {FiWind} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';



export default function RelaxerNav() {
    const orbMemo = useMemo(() => {
        return <Orb />
      },[])
  return (
    <div style={{background: "../img/bg.png"}}>
        {orbMemo}
        
      <BreathingApp />
      <MusicPlayer />
    </div>
  );
}