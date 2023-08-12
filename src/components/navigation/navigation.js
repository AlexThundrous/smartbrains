import React from 'react';

const Navigation = ({onRouteChange}) => {
    return (
        <div className = "flex justify-end">
            <p className= "font-mono text-2xl p-4 font-semibold hover:cursor-pointer hover:opacity-75 underline" onClick = {() => onRouteChange('signin')}> Sign Out </p>
        </div>
    );
}

export default Navigation;