import React from 'react'
import './Intro.css'
import comicimage from './comic.png'
import Input from './Input'
import {Link} from 'react-scroll'
import Nav from './Nav'
function Intro({started, setStarted}) {
  return (
    <>
    <div className='container1' id="introPage">
        <div className='intro'>
            <div className='text'>
                <h1 className='t1'>   
                Ready To <br /><span class = 'b'>UNLEASH </span><br /> 
                Your Story? 
                </h1>
                <h3>Visualize your story with AI</h3>
            </div>
            <Link to="input" smooth={true} duration = {1000} onClick={() => {setStarted(true)}}>
            <div className='bottom'>
                <div className='getStarted'>
                    Get Started
                </div>
            </div>
            </Link>
        </div>
        <div className='images'>
            <img src = {comicimage} className='img' />
        </div>
    </div>
    </>
  )
}

export default Intro