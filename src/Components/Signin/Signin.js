import React, {Component, createRef} from "react";
import './Signin.css'

class Signin extends Component {
    constructor(props){
        super(props)
        this.Ref= createRef()
        this.state={
            email: "",
            password: "",
            incorrect: false
        }
    }

    onSignInChange = (event) =>{
        if (event.target.id === "email-address")
            this.setState({email: event.target.value});

        else
            this.setState({password: event.target.value})
      
        if (event.key=== 'Enter'){
            this.Ref.current.focus();
            this.Ref.current.click();
        }
      }
    
    onSubmitSignIn= () => {
        fetch('https://enigmatic-eyrie-77195.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body : JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id){
                    this.props.loadUser(data)
                    this.props.sign("home"
                )}

                else
                    this.setState({incorrect: true}) 
            })
    }


    render(){
        const { sign }= this.props;

    return (
        <div>
            <article className="br4 ba shadow-5 b--black-40 " >
                <main className="pv5 black-80" id="wrapper">
                    <div className="measure tc" >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onKeyUp={this.onSignInChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onKeyUp={this.onSignInChange} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            id="submit"
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                            type="submit" 
                            value="Sign in"
                            onClick={this.onSubmitSignIn}
                            ref= {this.Ref}/>
                        </div>
                        <div className="lh-copy mt3 pointer">
                            <p onClick={() => sign("register")} className="f5 dim black mt4 db">Register</p>
                        </div>
                    </div>
                </main>
            </article>
            {this.state.incorrect=== false 
            ? <></> : <h2 className="tc">Incorrect Email or Password</h2>}
        </div>
        
    )}
}

export default Signin;