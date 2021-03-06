import React, {Component} from 'react';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import "./Auth.scss"
import is from 'is_js'
import axios from "axios";





class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter Correct Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter Correct Password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }


    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBluVBnOOjzPu9XAAAkWLhaoo3N1mYzBF4', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBluVBnOOjzPu9XAAAkWLhaoo3N1mYzBF4', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    submitHandler = e => {
        e.preventDefault()
    }




    validateControl(value, validation) {
        if (!validation) return true

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid

    }



    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}: `, event.target.value)

        const formControls = { ...this.state.formControls}
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls,
            isFormValid
        })

    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName]


            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })


    }



    render() {
        return (
            <div className='Auth'>
                <div>
                    <h1>Auth</h1>

                    <form onSubmit={this.submitHandler} className='Auth__form'>

                        {this.renderInputs()}



                        {/*<Input*/}
                        {/*    label='Email'*/}
                        {/*    errorMessage='Test'*/}
                        {/*/>*/}

                        {/*<Input*/}
                        {/*    label='Password'*/}
                        {/*    errorMessage='Test'*/}
                        {/*/>*/}
                        <Button
                            type='Button__success'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >Enter</Button>
                        <Button
                            type='Button__primary'
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >Register</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;