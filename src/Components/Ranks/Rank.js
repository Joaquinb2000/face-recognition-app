import React from 'react'

const Rank= ({name, entries})=>{
    return (
        <div className='tc white'>
            <h1>
                {`${name} your entry count is ${entries}`}
            </h1>
        </div>   
    );  
}

export default Rank;