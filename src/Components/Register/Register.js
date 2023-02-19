import React, { Component, createRef} from 'react'
import './Register.css'
import { serverCall } from '../../utils/serverCall'
import { changeState, enterKeySubmit } from '../../utils/formSubmition'

const emailRegex = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")

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
        if (name.length  === 0 || password.length=== 0 ||
            email.length === 0)
            return 1;

        if (!email.match(emailRegex))
            return 2;

        if (password.length<6)
            return 3;

        return 0;
    }

    onChange = (event) =>{ changeState(event, this) }

    keySubmit = (event) => { enterKeySubmit(event, this) }

    onSubmit= () => {
        this.setState({registered: false})
        const {name, email, password} = this.state;
        const isValid = this.validate(name, email, password);

        if (isValid===0){
            serverCall('register', 'post', { name, email, password })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    this.props.loadUser(user);
                    this.props.sign("home");
                }
                else this.setState({registered: true})
            })}
        else this.setState({invalidCase: isValid})
    }

    render(){
        const {registered, invalidCase} = this.state;
        const errorMsg= ['Registration fields can\'t be empty',
                         'Please enter a valid email',
                         'Password must have 8 characters at least']

        return (
            <div >
                <article className="br4 ba shadow-5 b--black-40">
                <main className="pw2 pv4 black-80" >
                    <div className="measure tc"  id="wrapper" onKeyUp={this.keySubmit}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
                            <input onChange={this.onChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div >
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
