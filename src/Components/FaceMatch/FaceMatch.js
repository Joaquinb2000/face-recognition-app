import React from 'react'
import './FaceMatch.css'


const FaceMatch= ({resp, boxes})=>{
    let faces= <></>;
    if (boxes.length !== undefined && boxes.lenghth!==0){
        faces= boxes.map((bound, i) => {
            return (
                <div id= "box" key={i} style={{  
                    top   : bound.topR,
                    bottom: bound.bottomR,
                    left  : bound.leftC,
                    right : bound.rightC
                }}> 
                </div>
            )
        })
    }
    
    return (
        <div className='center'>
            <div  style={{position:"absolute"}} className="mt3">
                <img id="DetectSpace" src={resp} alt="" ></img>
                {faces}
            </div>
        </div>
    )
}

export default FaceMatch;