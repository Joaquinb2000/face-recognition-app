import React, { Component } from 'react'
import './ImgLinkForm.css'

class ImgLinkForm extends Component {
    render(){
        const {change, click, valid}= this.props;
        const badLink= !valid 
            ? <div className='tc '>
                <h2 >Link is not valid.</h2>
                <h2 >If you're on mobile, try pasting your link in your browser's search bar and copying it again.
                                   Then try pasting it on the site's image search box</h2>
            </div>
            : <></>;


        return (
            <div>
                <div className='tc'>
                    <p className='f3'>
                        {`Input an URL with an image to see if there are faces in it!`}
                    </p>
                    <div className='center'>
                        <div className='w-90 mw7 shadow-5 pattern br3 pv3'>
                            <input 
                                className='w-75 f4 br2 shadow-2 pa3'
                                type="text" 
                                placeholder='Your URL goes here'
                                onChange = {change}
                                onKeyUp= {change}
                            />
                            <button onClick={click}
                                className=' shadow grow w-15 ba pa3  dib round2 white'>
                                    Detect
                            </button>                     
                        </div>
                    </div>
                </div>  
                {badLink}
            </div>
      
        );  }
}

export default ImgLinkForm;