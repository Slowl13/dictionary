import { useState } from "react";
import fetchingData from "./test";
import "./output.css"

function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const getMeaning = () => {
    setIsloading(true)
    fetchingData(word, setMeaning)
    setIsloading(false)
  }
  
  return (
    <div className="bg-purple h-screen flex flex-col">
    <div className="basis-10/12 flex flex-col items-center justify-center">
      <div className="basis-2/4 bg-lapis">
        <input className="rounded-full border-2 border-yellow-600 w-80" value={word} onChange={e => setWord(e.target.value)}></input>
        <button className="rounded-none border-2 border-yellow" onClick={() => getMeaning()}>Получить значение</button>
        {isLoading ? <p>Загрузка...</p> : meaning}
      </div>
    </div>
    <footer className="bg-black basis-2/12"></footer>
    </div>
  );
}

export default App;
