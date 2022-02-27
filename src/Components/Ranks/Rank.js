import React from 'react'

const Rank= ({name, entries})=>{
    return (
        <div className='tc white'>
            <p className='f3'>
                {`${name} your current rank is:`}
            </p>
            <h1>
                {`Your entry count is ${entries}`}
            </h1>
        </div>   
    );  
}

export default Rank;