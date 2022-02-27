import React, { Component } from 'react'
import './ImgLinkForm.css'

class ImgLinkForm extends Component {
    render(){
        const {change, click, valid}= this.props;
        console.log(valid)
        const badLink= !valid 
            ? <h2 className='tc'>Link was not valid. If on mobile try
                                 pasting the link on your searchbar
                                 copy it and paste it into the searchbox</h2>
            : <></>;


        return (
            <div className='tc w-100'>
                <p className='f3 center'>
                    {`Input an URL with an image to see if there are faces in it!`}
                </p>
                <div className='center w-100'>
                    <div className='w-100 ma2 shadow-5 pattern br3 pa3'>
                    <input 
                        className='w-75 f4 br2 shadow-2 pa3'
                        type="text" 
                        placeholder='Your URL goes here'
                        onKeyUp  = {change}
                        onChange = {change}
                        onPaste=   {change}
                    />
                    <button onClick={click}
                        className=' shadow grow w-15 ba pa3  dib round2 white'>
                            Detect
                    </button>                     
                    </div>
                </div>
                {badLink}
            </div>   
        );  }
}

export default ImgLinkForm;