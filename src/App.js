import logo from './logo.svg';
import * as Scroll from 'react-scroll'
import Nav from './Nav';
import './App.css';
import Intro from './Intro';
import Input from './Input';
import { useEffect, useRef, useState } from 'react';
import Comic from './Comic';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const inputRef = useRef(null);
  const comicRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [APIResponse, setAPIResponse] = useState([]);
  useEffect(() => {
    document.body.classList.add('no-scroll');
    Scroll.animateScroll.scrollToTop();
    return () => {
      document.body.classList.remove('no-scroll');
    }
  }, [])
  const handleGetStarted = () => {
    setHasStarted(true);
    document.body.classList.remove('no-scroll');
    inputRef.current.scrollIntoView({behavior : 'smooth'});
    document.body.classList.add('no-scroll');
  }
  async function query(data) {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: { 
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  // const API_request = async(prompts) => {
  //   prompts.map(async(prompt) => {
  //     const res = await query({"inputs": prompts}).then((response) => {
  //       const objectURL = URL.createObjectURL(response);
  //       setAPIResponse(prev => [...prev, objectURL]);
  //     });
  //   })
  // }
  const API_request = async(prompts) => {

    const responses = await Promise.all(prompts.map(async (prompt) => {
      // await query({"inputs": prompt}).then((response) => {
      //   setCounter(prev => prev+1);
      //   if(response === null) return null;
      //   return URL.createObjectURL(response);
      // }).catch((error) => {
      //   console.log(error);
      //   document.body.classList.remove('no-scroll');
      //   document.getElementById("introPage").scrollIntoView({behavior : 'smooth'});
      // })
      const response = await query({"inputs": prompt});
      await setCounter(prev => prev+1);
      if(response === null) return null;
      return URL.createObjectURL(response);
    }));

    setAPIResponse(responses);
  }  
  const handleStartGenerating = async(prompts) => {
    setAPIResponse([]);
    setCounter(0);
    setHasSent(true);
    document.body.classList.remove('no-scroll');
    comicRef.current.scrollIntoView({behavior : 'smooth'});
    document.body.classList.add('no-scroll');
    await API_request(prompts);
  }
  const handleNewStory = () => {
    document.body.classList.remove('no-scroll');
    inputRef.current.scrollIntoView({behavior : 'smooth'});
    document.body.classList.add('no-scroll');

  }
  return (
    <div className="App">
      <Nav />
      <Intro started={hasStarted} setStarted={handleGetStarted}/>
      <Input ref={inputRef} handleStartGenerating={handleStartGenerating} started={hasStarted} setStarted={setHasStarted}/>
      <Comic ref={comicRef} newStory={handleNewStory} counter={counter} apiResponse={APIResponse}/>
    </div>
  );
}

export default App;
