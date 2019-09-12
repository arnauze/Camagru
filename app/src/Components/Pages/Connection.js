import React from 'react'
import SignUp from './Helpers/SignUp'
import SignIn from './Helpers/SignIn'
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
        errorMessage: ''

    }

    _onSubmitSignIn = e => {

        // Function called when I sumbit the form

        e.preventDefault()  // Function to prevent the page from updating  

       Auth.signIn(this.state.signIn.username, this.state.signIn.password)
       .then(data => {

            console.log("Successfully called the Auth API:", data)

            let action = {
                type: 'CONNECT_USER',
                value: {
                    user: {
                        username: this.state.signIn.username
                    }
                }
            }
            this.props.dispatch(action)

            action = {
                type: 'CHANGE_PAGE',
                value: {
                    page: "PROFILE"
                }
            }
            this.props.dispatch(action)

       })
       .catch(error => {

            console.log("Error calling the Auth API:", error)

       })

    }

    _onSubmitSignUp = e => {

        // Function called when I sumbit the form

        e.preventDefault()  // Function to prevent the page from updating  

        Auth.signUp({
            username: this.state.signUp.username,
            password: this.state.signUp.password,
            attributes: {
                email: this.state.signUp.email
            }
        })
        .then(data => {

            console.log("Successfully created a new user:", data)

            this.setState({
                ...this.state,
                confirmationMessage: "We've sent an email with a confirmation code!"
            })

        })
        .catch(err => {
            
            console.log(err)

            this.setState({
                ...this.state,
                errorMessage: err.message
            })

        })

    }

    _onChangeSignUpEmail = text => {

        this.setState({
            ...this.state,
            signUp: {
                ...this.state.signUp,
                email: text
            }
        })

    }

    _onChangeSignUpPassword = text => {

        this.setState({
            ...this.state,
            signUp: {
                ...this.state.signUp,
                password: text
            }
        })

    }

    _onChangeSignUpUsername = text => {

        this.setState({
            ...this.state,
            signUp: {
                ...this.state.signUp,
                username: text
            }
        })

    }

    _onChangeSignInPassword = text => {

        this.setState({
            ...this.state,
            signIn: {
                ...this.state.signIn,
                password: text
            }
        })

    }

    _onChangeSignInUsername = text => {

        this.setState({
            ...this.state,
            signIn: {
                ...this.state.signIn,
                username: text
            }
        })

    }

    _onSubmitConfirmationCode = (e) => {

        e.preventDefault()

        Auth.confirmSignUp(this.state.signUp.username, this.state.confirmationCode)
        .then(data => {
            
            console.log("Successfully confirmed the user in Cognito:", data)

            this.setState({
                ...this.state,
                signUp: {
                    username: '',
                    password: '',
                    email: ''
                }
            })

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

        })
        .catch(error => {

            console.log("Error confirming the user in Cognito:", error)

        })

    }

    _onChangeConfirmationCode = (text) => {

        this.setState({
            ...this.state,
            confirmationCode: text
        })

    }

    render() {

        console.log("Connection state:", this.state)

        return (
            <div
            style={{flex: 1, backgroundColor: '#A9A9A9'}}
            >
                <SignIn
                onSubmitSignIn={this._onSubmitSignIn}
                signIn={this.state.signIn}
                onChangeUsername={this._onChangeSignInUsername}
                onChangeEmail={this._onChangeSignInEmail}
                onChangePassword={this._onChangeSignInPassword}
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