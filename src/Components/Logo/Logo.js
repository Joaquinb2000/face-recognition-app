import React from "react";
import Tilt from 'react-parallax-tilt'
import Brain from './Logo.png'
import './Logo.css'

const Logo= (props)=>{
    const nodeRef= React.useRef(null);
    return (
        <div className="Logo">
        <Tilt className="Tilt ma2 br2 shadow-2" tiltMaxngleX={10} tiltMaxngleY={10}  >
            <img src= {Brain} alt="Logo" ref={nodeRef}/>
        </Tilt>
        </div>
    )
}

export default Logo;