import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div className="flex justify-center text-center">
            <p className="font-mono text-2xl p-4 font-semibold text-center">{`${name}, your current rank is ${entries}`}</p>
        </div>
    );
}

export default Rank;
