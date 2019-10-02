import React from 'react'
import SignUp from '../Helpers/SignUp'
import SignIn from '../Helpers/SignIn'
import { API, Auth } from 'aws-amplify'
import { connect } from 'react-redux'

class Connection extends React.Component {

    // React Component for the page "Connection"

    state = {
        signIn: {
            username: '',
            password: ''
        },
        signUp: {
            username: '',
            password: '',
            email: ''
        },
        confirmationMessage: '',
        confirmationCode: '',
        errorMessage: '',
        errorLogin: '',
        updatePassword: false,
        newPassword: {}
    }

    _onSubmitSignIn = async (e) => {

        // Function called when I sumbit the signIn form

        e.preventDefault()  // Function to prevent the page from updating  

        var apiName = 'Camagru'
        var path = '/users/find'
        var myInit = {
            queryStringParameters: {
                username: this.state.signIn.username
            }
        }

        this.setState({
            ...this.state,
            errorLogin: ''
        })

        API.get(apiName, path, myInit)
        .then(response => {

            console.log("Call to /users/find", response)

            if (response) {

                // Here I use AWS Cognito to handle the user authentication

                Auth.signIn(response.username, this.state.signIn.password)
                .then(data => {

                        console.log("Successfully called the Auth API:", data)

                        // If the user successfully signed in then I change the user variable in the global state
                        // Then I change the page variable in the global state

                        let apiName = 'Camagru'
                        let path = '/users/' + data.username
                        let myInit = {}

                        API.get(apiName, path, myInit)
                        .then(data => {

                            let action = {
                                type: 'CONNECT_USER',
                                value: {
                                    user: data
                                }
                            }
                            this.props.dispatch(action)

                            action = {
                                type: 'CHANGE_PAGE',
                                value: {
                                    page: "ADD_PHOTO"
                                }
                            }
                            this.props.dispatch(action)

                        })
                        .catch(err => {
                            console.log(err)
                        })

                })
                .catch(error => {

                        console.log("Error calling the Auth API:", error)

                        this.setState({
                            ...this.state,
                            errorLogin: error.message
                        })

                })

            } else {

                this.setState({
                    ...this.state,
                    errorLogin: "No user found"
                })

            }

        })
        .catch(err => {

            console.log(err)

        })

    }

    _onSubmitSignUp = e => {

        // Function called when I sumbit the form

        e.preventDefault()  // Function to prevent the page from updating  

        // Using AWS Cognito

        Auth.signUp({
            username: this.state.signUp.username,
            password: this.state.signUp.password,
            attributes: {
                email: this.state.signUp.email
            }
        })
        .then(data => {

            // If the user signed up I output the message and form to confirm his email address

            console.log("Successfully created a new user:", data)

            this.setState({
                ...this.state,
                confirmationMessage: "We've sent an email with a confirmation code!",
                errorMessage: ''
            })

        })
        .catch(err => {
            
            // If the user couldn't sign up I output an error message explaining why it didn't work

            console.log(err)

            this.setState({
                ...this.state,
                errorMessage: err.message
            })

        })

    }

    _onChangeSignUpEmail = text => {

        // Function called when I change the input text for email in the Sign Up component

        this.setState({
            ...this.state,
            signUp: {
                ...this.state.signUp,
                email: text
            }
        })

    }

    _onChangeSignUpPassword = text => {

        // Function called when I change the input text for password in the Sign Up component

        this.setState({
            ...this.state,
            signUp: {
                ...this.state.signUp,
                password: text
            }
        })

    }

    _onChangeSignUpUsername = text => {

        // Function called when I change the input text for username in the Sign Up component

        this.setState({
            ...this.state,
            signUp: {
                ...this.state.signUp,
                username: text
            }
        })

    }

    _onChangeSignInPassword = text => {

        // Function called when I change the input text for password in the Sign In component

        this.setState({
            ...this.state,
            signIn: {
                ...this.state.signIn,
                password: text
            }
        })

    }

    _onChangeSignInUsername = text => {

        // Function called when I change the input text for username in the Sign In component

        this.setState({
            ...this.state,
            signIn: {
                ...this.state.signIn,
                username: text
            }
        })

    }

    _onSubmitConfirmationCode = (e) => {

        // Function called when the user submits the confirmation code

        e.preventDefault()

        Auth.confirmSignUp(this.state.signUp.username, this.state.confirmationCode)
        .then(data => {
            
            console.log("Successfully confirmed the user in Cognito:", data)

            // If the confirmation worked, I clean the fields for the sign up form
            // Then I call my API to add the newly created user in my database

            let apiName = 'Camagru'
            let path = '/users'
            let myInit = {
                queryStringParameters: {
                    username: this.state.signUp.username,
                    email: this.state.signUp.email
                }
            }

            API.post(apiName, path, myInit)
            .then(data => {

                console.log("Called the API:", data)

            })
            .catch(error => {

                console.log("Error calling the API:", error)

            })

            this.setState({
                ...this.state,
                signUp: {
                    username: '',
                    password: '',
                    email: ''
                },
                signIn: {
                    username: this.state.signUp.username,
                    password: this.state.signUp.password
                },
                confirmationCode: '',
                confirmationMessage: ''
            })

        })
        .catch(error => {

            console.log("Error confirming the user in Cognito:", error)

        })

    }

    _onChangeConfirmationCode = (text) => {

        // Function called when I change the input text for confirmation_code in the Sign Up component

        this.setState({
            ...this.state,
            confirmationCode: text
        })

    }

    _onForgotPassword = () => {

        Auth.forgotPassword(this.state.signIn.username)
        .then(data => {

            console.log("DATA:", data)
            this.setState({
                ...this.state,
                updatePassword: true,
                errorLogin: ''
            })

        })
        .catch(err => {
            console.log(err.message)
            this.setState({
                ...this.state,
                errorLogin: err.message
            })
        })

    }

    _onUpdatePassword = (text) => {

        this.setState({
            ...this.state,
            newPassword: {
                ...this.state.newPassword,
                password: text
            }
        })

    }

    _onSubmitUpdatePassword = (e) => {

        e.preventDefault()

        Auth.forgotPasswordSubmit(this.state.signIn.username, this.state.newPassword.code, this.state.newPassword.password)
        .then(data => {

            alert("Successfully updated your password")
            this.setState({
                ...this.state,
                updatePassword: false,
                newPassword: {},
                errorLogin: ''
            })


        })
        .catch(err => console.log(err));

    }

    _onUpdateCode = (text) => {

        this.setState({
            ...this.state,
            newPassword: {
                ...this.state.newPassword,
                code: text
            }
        })

    }

    render() {

        return (
            <div
            style={{flex: 1}}
            >
                <SignIn
                onSubmitSignIn={this._onSubmitSignIn}
                signIn={this.state.signIn}
                onChangeUsername={this._onChangeSignInUsername}
                onChangeEmail={this._onChangeSignInEmail}
                onChangePassword={this._onChangeSignInPassword}
                errorMessage={this.state.errorLogin}
                onForgotPassword={this._onForgotPassword}
                updatePassword={this.state.updatePassword}
                newPassword={this.state.newPassword}
                onUpdatePassword={this._onUpdatePassword}
                onSubmitUpdatePassword={this._onSubmitUpdatePassword}
                onUpdateCode={this._onUpdateCode}
                />
                <SignUp
                onSubmitSignUp={this._onSubmitSignUp}
                signUp={this.state.signUp}
                onChangeUsername={this._onChangeSignUpUsername}
                onChangeEmail={this._onChangeSignUpEmail}
                onChangePassword={this._onChangeSignUpPassword}
                message={this.state.confirmationMessage}
                errorMessage={this.state.errorMessage}
                onSubmitConfirmationCode={this._onSubmitConfirmationCode}
                onChangeConfirmationCode={this._onChangeConfirmationCode}
                confirmationCode={this.state.confirmationCode}
                />
            </div>
        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
        page: state.page
    }
}

export default connect(mapStateToProps)(Connection)