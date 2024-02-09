import './App.css';
import Player from './Player/Player';
import meditation from './audio/meditation.mp3';
import { useRef, useState, useEffect } from 'react';

//import { songsdata } from './Player/audios';
// babbling brook : https://soundbible.com/mp3/Babbling Brook-SoundBible.com-17660315.mp3
// ocean waves: https://soundbible.com/mp3/Ocean_Waves-Mike_Koenig-980635527.mp3
// Crickets: https://soundbible.com/mp3/Night_Sounds_-_Crickets-Lisa_Redfern-591005346.mp3
// Meadowlark Song: https://soundbible.com/mp3/meadowlark_daniel-simion.mp3

const songsdata = [
  {title:"Meditation Instructions",url: meditation},
  {title: "RainStorm",url: "https://soundbible.com/mp3/45min_april_rainstorm-mike-koenig.mp3"},
  {title: "Babbling Brook",url: "https://soundbible.com/mp3/Babbling Brook-SoundBible.com-17660315.mp3"},
  {title: "Ocean Waves",url: "https://soundbible.com/mp3/Ocean_Waves-Mike_Koenig-980635527.mp3"},
  {title: "Crickets",url: "https://soundbible.com/mp3/Night_Sounds_-_Crickets-Lisa_Redfern-591005346.mp3"},
  {title: "Meadowlark Song",url: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3"}
]

const App = () => {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [isplaying])

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })

  }


  return (
    <div className="App">
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />
      <Player songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default App;
