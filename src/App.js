import React, { Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImgLinkForm from './Components/ImgLinkForm/ImgLinkForm';
import Rank from './Components/Ranks/Rank';
import Register from "./Components/Register/Register"
import Signin from './Components/Signin/Signin';
import FaceMatch from './Components/FaceMatch/FaceMatch';
import Particles from 'react-tsparticles';
import { serverCall } from './utils/serverCall';

const basic= {
  box: {},
  ImageURL: '',
  input: '',
  validURL: true, //true
  route: "signin", //signin
  isSignedIn: false, //false
  user: {
    email  : "",
    id     : "",
    name   : "",
    entries: 0,
    joined : ""
  }
}

class App extends Component {
  constructor(){
    super();
    this.state= basic
  }

loadUser= (data) =>{ //Gets user information
  this.setState({user: {
    email  : data.login_email,
    id     : data.id,
    name   : data.name,
    entries: data.entries,
    joined : data.joined
  }})
}

useAPI= async () =>{ //Sends the state.input variable to the Clarifai API,
                     //and returns the response.
                     //If you send an invalid URL, return undefined
  try{
    const change= await serverCall('API', 'post', { input: this.state.input } )
    const borders= await change.json();
    return await borders
  }
  catch(err){
    return undefined;
  }
}

calculateFaceLocation = (response)=>{ //Receives the Clarifai API response object.
                                      //Used to calculate the location of the
                                      //the face boxes
  const image= document.getElementById("DetectSpace");
  const width= Number(image.width);
  const height= Number(image.height);

  if(response.outputs[0].data.regions){
    const boxMargins= response.outputs[0].data.regions.map(({region_info}) => {
      const {top_row, left_col, bottom_row, right_col} = region_info.bounding_box
      const imgBounds={
        topR   : (top_row * height),
        leftC  : (left_col * width),
        bottomR: (height - (bottom_row * height)),
        rightC : (width - (right_col * width))
      }
      return imgBounds
    })
    return boxMargins;
  }

  return [];
}

displayBox= (margins)=>{
  this.setState({box: margins})
}

onInputChange = (event) =>{
  this.setState({input: event.target.value});

  if (event.key=== 'Enter'){
    this.onSubmit();
  }
}

onSubmit= async () =>{
  this.setState({box:{}});
  this.setState({validURL: true});
  this.setState({ImageURL: this.state.input});
  const response = await this.useAPI();

  if (response)
    try{
      this.displayBox(this.calculateFaceLocation(response));

      const change= await serverCall('image', 'put', { email: this.state.user.email })
      const count= await change.json();
      this.setState(Object.assign(this.state.user, {entries : count}))
    }
      catch(err){
        this.setState({validURL:false})
    }
}

onRouteChange= (place) => {
  if(place=== 'signout'){
    this.setState(basic)
  }

  else if(place=== 'home')
    this.setState({isSignedIn: true})

  this.setState({route: place});
}


  render(){
    const {box, ImageURL, isSignedIn, validURL}= this.state;
    const signOrRegister=(((this.state.route==='signin') || (this.state.route==='signout'))
                          ? <Signin sign={this.onRouteChange} loadUser={this.loadUser}/>
                          : <Register sign={this.onRouteChange} loadUser={this.loadUser}/>)
    const {name, entries}= this.state.user;

    return (
      <div className='App'>
        <Particles className="Particles"
                  options= {PartConfig} />
        <Navigation leave={this.onRouteChange} isSignedIn={isSignedIn}/>
        {this.state.route === 'home'
         ?  <div>
              <Logo/>
              <Rank name={name} entries={entries}/>
              <ImgLinkForm change={this.onInputChange} click={this.onSubmit}
                           valid= {validURL}    paste={this.onPaste}/>
              <FaceMatch resp={ImageURL} boxes={box} />
            </div>
          : (signOrRegister)
         }
      </div>
    );
  }
}

const PartConfig= {
  fpsLimit: 80,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 2,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "triangle",
    },
    size: {
      random: true,
      value: 2,
    },
  },
}


export default App;
