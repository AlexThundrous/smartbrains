import React from 'react';

const ImageLinkForm = ({onButtonSubmit, onSearchChange}) => {
    return (
        <div className = "pt-[5vh] mb-0 pb-0 text-center">
            <p className= "font-bold text-3xl font-rem mx-auto"> {"This magic brain will detect faces in your pictures. Give it a try"} </p>
            <div className= "flex justify-center p-7 mx-2">
                <div className = "flex justify-center shadow-lg w">
                    <input type="text" className="p-1 w-[60vh] flex justify-center font-bold text-xl" onChange={onSearchChange}></input>
                    <button className="w-[30%] block text-center text-white font-semibold text-lg px-3 py-2 bg-indigo-700 rounded-sm transition-transform transform-gpu hover:scale-110" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;