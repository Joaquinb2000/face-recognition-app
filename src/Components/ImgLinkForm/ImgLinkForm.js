import React, { Component } from 'react'
import './ImgLinkForm.css'

class ImgLinkForm extends Component {
    render(){
        const {change, click, valid}= this.props;
        const badLink= !valid 
            ? <div className='margin tc'>
                <h2 >Link is not valid. </h2>
                <h2 >Try opening your image in a new tab and copy the link of the page</h2>
            </div>
            : <></>;


        return (
            <div className='wrap'>
                <div>
                    <p className='f3 tc'>
                        {`Input an URL with an image to see if there are faces in it!`}
                    </p>
                    <div className='center tc'>
                        <div className='shadow-5 pattern br3 w-100 pv3 ma3'>
                            <input 
                                className='w-75 f4 br2 shadow-2 pa3'
                                type="text" 
                                placeholder='Your URL goes here'
                                onKeyUp={change}
                                onChange = {change}
                            />
                            <button onClick={click}
                                className=' shadow grow w-15 ba pa3 dib round white'>
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