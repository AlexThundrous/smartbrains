import React from 'react';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return(
        <div className = "m-3 mt-0">
            <Tilt className= 'bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg shadow-lg h-44 w-44' options = {{tiltMaxAngleX: 35, tiltMaxAngleY: 35}}>
                <div className="bg-transparent p-1 rounded-lg h-full flex items-center justify-center">
                <img src="https://img.icons8.com/water-color/128/brain.png" className="pt-1 h-36 w-36" alt="brain"/> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;