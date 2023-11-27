import { faAngleLeft, faAngleRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, useEffect, useState, useRef } from 'react'
import './Comic.css'
import Spinner from './spinner'

const Comic = forwardRef(({apiResponse, counter}, comicRef) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
  const mouseDownAt = useRef(0);
  const prevPercentage = useRef(0);
  const Percentage = useRef(0);
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    setIndex(prev => Math.min(prev+1, 9))
  }
  const handlePrev = () => {
    setIndex(prev => Math.max(0, prev-1))
  }
  useEffect(() => {
    if (counter === 10) {
      setIsLoading(false);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    }
    const handleMouseDown = e => {
      // isMobile ? e.clientY : e.clientX
      mouseDownAt.current = e.clientX;
    }
    const handleMouseMove = e => {
      if(mouseDownAt.current === "0") return;
      console.log("mouse moving, location: ", e.clientX)
      let mouseDelta = -parseFloat(mouseDownAt.current) + e.clientX;
      let maxDelta = window.innerWidth / 2;
      let percentage = (mouseDelta/ maxDelta)*100;
      let nextPercentage = parseFloat(prevPercentage.current) + percentage;
      if(nextPercentage > 70) nextPercentage = 70;
      if(nextPercentage < -70) nextPercentage = -70;
      Percentage.current = nextPercentage;
      if(!isMobile && !isLoading){
        comicRef.current.animate({
          transform : `translate(${nextPercentage}%)`
        }, {
          duration : 1200, fill: "forwards"
        });
      }
      let p = (nextPercentage + 70)*100/140;
      for(const image of comicRef.current.getElementsByClassName("image")){

        image.animate({
            objectPosition : `${p}%`
        },{
            duration: 1200, fill: "forwards"
        });
      }
    }
    const handleMouseUp = e => {
        mouseDownAt.current = '0';
        console.log("mouse release aT:", e.clientX)
        prevPercentage.current = Percentage.current;
    }

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [counter, comicRef]);

  if(!isMobile){
    return (
      <div ref={comicRef} className="comic" id="track">
        {isLoading && <Spinner count={counter}/>}
        {!isLoading &&
          apiResponse.map((image) => {
            return <img alt="img" draggable="false" src={image} className="image"/>
          }) 
        }
      </div>
    )
  } else {
    return (
      <div ref={comicRef} className="mobileComic">
        {isLoading && <Spinner count = {counter} />}
        {!isLoading && 
          <div className='comicMobileContainer'>
            <div className='comicMobileImage'>
              <img src={apiResponse[index]} alt="img" draggable="false"/>
            </div>
            <div className='comicMobileIndex'>
              <div className='comicMobilePrev'>
                <FontAwesomeIcon icon={faAngleLeft} onClick={handlePrev}/>
              </div>
              <div className='comicMobileNext'>
                <FontAwesomeIcon icon={faAngleRight} onClick={handleNext}/>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
})

export default Comic