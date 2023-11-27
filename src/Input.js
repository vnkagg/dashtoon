import React, { forwardRef, useEffect, useRef, useState } from 'react'
import * as Scroll from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import './Input.css'
import Nav from './Nav';
const Input = forwardRef(({started, setStarted, setHasSent, handleStartGenerating}, ref) => {
    const titles = [
        "Begin with a Bang!", 
        "Introduce Your Star",
        "Stir Up Some Trouble",
        "Dive Deeper",
        "Mid-Story Climax",
        "Twists and Turns",
        "Build Up to the Brink",
        "The Final Showdown",
        "The Twist of Fate",
        "Epic Conclusion"
    ];
    const ideas = [
        "Kick off your story with an electrifying start! Set the scene - is it a bustling cityscape or the calm before a storm? For example, \"In the heart of Neon City, Max discovers a mysterious token...\"",
        "Time to shine a spotlight on your characters! Maybe introduce a quirky sidekick or a wise mentor. Think, \"Max, a plucky inventor with a heart of gold, meets a peculiar stranger...\"",
        "Every tale needs a twist! What’s the challenge or conflict? Picture this, \"The token glows, and suddenly, robots start invading the town square...\"",
        "Delve into the details. Why is this happening? Is there a legend or an ancient prophecy? For instance, \"Legend says the token can awaken the dormant bots of yore...\"",
        "Raise the stakes! It’s time for a dramatic reveal or a daring escape. Imagine, \"Amidst chaos, Max uses the token, unveiling a hidden robotic ally.\"",
        "Throw in a curveball! Maybe a betrayal or an unexpected alliance forms. Consider, \"The peculiar stranger reveals their true identity - a rogue robot scientist!\"",
        "Escalate to an almost insurmountable challenge. What's at stake? \"Max and allies must now deactivate the robot overlord before it\'s too late.\"",
        "Gear up for your story’s epic showdown. What's the plan? \"With cunning and gadgets, the team infiltrates the overlord’s lair.\"",
        "Introduce an element of surprise that changes everything. \"In a twist, Max finds the overlord is powered by a familiar source.\"",
        "Craft a satisfying resolution or a cliffhanger for a sequel. \"As the overlord powers down, a new dawn rises for Neon City, but somewhere... something stirs.\""
    ];
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600)
        }
        handleResize();
        window.addEventListener("resize", handleResize)
        return () => {
            // window.removeEventListener('resize', handleResize)
        }
    }, [])
    const promptRef = useRef(null);
    useEffect(() => {
        promptRef.current.focus();
    }, [index])
    const [progress, setProgress] = useState(0);
    const [prompts, setPrompts] = useState(Array(10).fill(""));
    const [currentPrompt, setCurrentPrompt] = useState("");
    const [isError, setIsError] = useState(false);
    const handleNext = () => {
        if(index == 9) return;
        setCurrentPrompt(prompts[index+1]);
        setIndex(prevIndex => prevIndex + 1);
        // handleProgress();
    }
    const handleProgress = (prompt) => {
        // handleUpdate(prompt);
        let i = 0;
        prompts.forEach((value, ind) => {
            if(ind === index){
                if(prompt !== ""){
                    i++;
                }
            } else if(value !== ""){
                i++;
            }
        })
        setProgress(i);
    }
    const handlePrev = () => {
        if(index == 0) return;
        setCurrentPrompt(prompts[index-1]);
        setIndex(prevIndex => prevIndex-1);
        // handleProgress();
    };
    const handleUpdate = (prompt) => {
        let temp = [...prompts];
        temp[index] = prompt;
        setPrompts(temp);
        handleProgress(prompt);
    }
    const handleGenerate = () => {
        const i = prompts.findIndex(prompt => prompt === '');
        if (i !== -1) {
            setIndex(i);
            setCurrentPrompt('');
            return;
        }
        handleProgress();
        setStarted(false);
        handleStartGenerating([...prompts]);
        // const comic = document.getElementById('comic').offsetTop;
        // Scroll.animateScroll.scrollTo(comic);
    };
    
  return (
    <>
        {!isMobile && <div ref={ref} className='container2' id="input">
            {started && <div className='progress-bar' style ={{width : `${(progress)*10}%`}}></div>}
            <div className='back'>
                <FontAwesomeIcon icon={faAngleLeft} onClick={handlePrev}/>
            </div>
            <div className='content'>
                <div className='panelnumber'>COMIC PANEL {index + 1}/10</div>
                <div className='title'>"{titles[index]}"</div>
                <textarea   
                    value={currentPrompt} 
                    ref={promptRef}
                    onChange={async(e) => {
                        setCurrentPrompt(e.target.value)
                        handleUpdate(e.target.value);
                        handleProgress(e.target.value);
                    }} 
                    className='prompt' 
                    placeholder={ideas[index]} 
                    />
                <div className='generate' onClick={handleGenerate} style = {{cursor : `${index === 9 ? "pointer" : "arrow"}`, opacity : index != 9 ? 0 : 1}}>
                {/* <div className='generate' onClick={index == 9 ? handleGenerate : null} style = {{cursor : `${index === 9 ? "pointer" : "arrow"}`, opacity : index != 9 ? 0 : 1}}> */}
                    Generate Comic
                </div>
            </div>
            <div className='next'>
                <FontAwesomeIcon icon={faAngleRight} onClick={handleNext} />
            </div>
        </div>}
        {isMobile && <div ref={ref} className='container2-mobile' id="input">
            {started && <div className='progress-bar' style ={{width : `${(progress)*10}%`}}></div>}
            <div className='content-mobile'>
                <div className='panelnumber-mobile'>COMIC PANEL {index + 1}/10</div>
                <div className='title-mobile'>"{titles[index]}"</div>
                <textarea   
                    value={currentPrompt} 
                    ref={promptRef}
                    onChange={async(e) => {
                        setCurrentPrompt(e.target.value)
                        handleUpdate(e.target.value);
                        handleProgress(e.target.value);
                    }} 
                    className='prompt-mobile' 
                    placeholder={ideas[index]} 
                />
                <div className='row'>
                    <div className='back-mobile'>
                        <FontAwesomeIcon icon={faAngleLeft} onClick={handlePrev}/>
                    </div>
                    <div className='next-mobile'>
                        <FontAwesomeIcon icon={faAngleRight} onClick={handleNext} />
                    </div>
                </div>
            </div>
            <div className='bottom-mobile'>
                <div className='generate-mobile' onClick={index === 9 ? handleGenerate : null} style = {{cursor : `${index === 9 ? "pointer" : "arrow"}`, opacity : index !== 9 ? 0 : 1}}>
                    Generate Comic
                </div>
            </div>
        </div>

        }
    </>
  )
})

export default Input