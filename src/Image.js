import React, { useState } from 'react';
import './Image.css';

function ImageWithBubbles({ src, imageIndex, bubblesData, updateBubblesData }) {
    const addBubble = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = Math.min(5, rect.right - x);
        const updatedBubbles = [...(bubblesData[imageIndex] || []), { x, y, text: "", width : width }];
        updateBubblesData(imageIndex, updatedBubbles);
    };

    const updateBubble = (bubbleIndex, text) => {
        const updatedBubbles = [...bubblesData[imageIndex]];
        updatedBubbles[bubbleIndex] = { ...updatedBubbles[bubbleIndex], text };
        updateBubblesData(imageIndex, updatedBubbles);
    };
    const deleteBubble = (index) => {
        const updatedBubbles = [...bubblesData[imageIndex]];
        updatedBubbles.splice(index, 1);
        updateBubblesData(imageIndex, updatedBubbles);
    };
    const handleTextAreaClick = (text, index, e) => {
        e.stopPropagation();
        if(text !== ""){
            deleteBubble(index)
        }
    }
    return (
        <div className='imageContainer' onClick={addBubble} >
            <img src={src} alt="Failed to load due to API Errors" onClick={addBubble} draggable='false'/>
            {(bubblesData[imageIndex] || []).map((bubble, index) => (
                <div 
                    className='bubbleText' 
                    key={index} 
                    style={{ top: bubble.y, left: bubble.x }}
                >
                    <textarea 
                        className='textInTheBubble'
                        value={bubble.text} 
                        style={{width: `${bubble.width}vw`}}
                        onClick={e => handleTextAreaClick(bubble.text, index, e)}
                        onChange={(e) => updateBubble(index, e.target.value)} 
                    />
                </div>
            ))}
        </div>
    );
}

export default ImageWithBubbles;
