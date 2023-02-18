import React, { Component, createRef} from 'react'
import './Register.css'
const addrs= require("email-addresses");

class Register extends Component {
    constructor(props){
        super(props)
        this.Ref= createRef()
        this.state={
            name: "",
            email: "",
            password: "",
            registered: false,
            invalidCase: 0,
        }
    }

    validate = (name, email, password) =>{
        if (name.length===0 || password.length===0 ||
            email.length===0)
            return 1;

        if (addrs.parseOneAddress(email)===null)
            return 2;

        if (password.length<6)
            return 3;

        return 0;
    }

    normal = () => {
        this.setState({registered: false})
        this.setState({invalidCase: 0})
    }

    onChange = (event) =>{
        if (event.target.id === "name")
            this.setState({name: event.target.value});

        else if (event.target.id === "email-address")
            this.setState({email: event.target.value});

        else
            this.setState({password: event.target.value})

        if (event.key=== 'Enter'){
            this.Ref.current.focus();
            this.Ref.current.click();
        }
      }

    onSubmit= () => {
        this.normal();
        const {name, email, password} = this.state;
        const isValid = this.validate(name, email, password);

        if (isValid===0){
                fetch('https://rough-snow-8880.fly.dev/register', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json'},
                    body : JSON.stringify({
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password
                    })
                })
                    .then(response => response.json())
                    .then(user => {
                        console.log(user)
                        if (user !== "REGISTER ERROR"){
                            this.props.loadUser(user);
                            this.props.sign("home");
                        }

                        else
                            this.setState({registered: true})
                    })}
            else
                this.setState({invalidCase: isValid})
    }

    render(){
        const {registered, invalidCase} = this.state;
        const errorMsg= ['Registration fields can\'t be empty',
                         'Please enter a valid email',
                         'Password must be longer\n than 6 characters']

        return (
            <div>
                <article className="br4 ba shadow-5 b--black-40">
                <main className="pw2 pv4 black-80">
                    <div className="measure tc"  id="wrapper">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
                            <input onKeyUp={this.onChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onKeyUp={this.onChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onKeyUp={this.onChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmit} ref={this.Ref} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Register"/>
                        </div>
                    </div>
                </main>
                </article>
                <div className='tc'>
                    {registered=== false
                    ? <></> : <h2 className="tc">Email registered already</h2>}
                    {this.state.invalidCase > 0
                    ? <h2 className="tc "><p>{errorMsg[invalidCase-1]}</p></h2> : null}
                </div>
            </div>

        )
    }

}

export default Register;
