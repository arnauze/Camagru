import React from 'react'
import { API, Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import Switch from "react-switch"

class Profile extends React.Component {

    // React Component for the profile page

    state = {

        loading: true,
        updating: false,
        first_name: '',
        last_name: '',
        newUsername: '',
        updatingPassword: false,
        oldPassword: '',
        newPassword: ''
    }

    _onChangePassword = () => {

        Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, this.state.oldPassword, this.state.newPassword);
        })
        .then(data => console.log(data))
        .catch(err => console.log(err.message));

        this.setState({
            ...this.state,
            oldPassword: '',
            newPassword: ''
        })

    }

    _onUpdatePassword = () => {

        if (this.state.updatingPassword) {
            this._onChangePassword()
        }

        this.setState({
            ...this.state,
            updatingPassword: this.state.updatingPassword ? false : true
        })

    }

    _getUser = () => {

        // Function that calls the API and stores the user informations in the global state

        let apiName = 'Camagru'
        let path = '/users/' + this.props.user.info.username
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {

            console.log("Successfully called the API:", data)

            let action = {
                type: "CONNECT_USER",
                value: {
                    user: data
                }
            }
            this.props.dispatch(action)

            this.setState({

                loading: false

            })

        })
        .catch(err => {

            console.log("Error:", err)

        })

    }

    componentDidMount() {

        // Function called when the component has been mounted
        // I call my API to access the informations about my user

        this._getUser()

    }

    _onClick = () => {

        // Function called when the user clicks on the button

        if (this.state.updating) {

            // If the user was updating the informations then I call my API to update the database

            let apiName = 'Camagru'
            let path = '/users/' + this.props.user.info.username
            let myInit = {
                body: {
                    user: {
                        ...this.props.user.info,
                        first_name: this.state.first_name.length > 0 ? this.state.first_name : this.props.user.info.first_name,
                        last_name: this.state.last_name.length > 0 ? this.state.last_name : this.props.user.info.last_name,
                        newUsername: this.state.newUsername.length > 0 ? this.state.newUsername : this.props.user.info.newUsername
                    }
                }
            }

            API.put(apiName, path, myInit)
            .then(data => {

                console.log("Data:", data)

                this._getUser()

            })
            .catch(err => {
                console.log(err.message)
            })

        }

        this.setState({
            ...this.state,
            updating: this.state.updating ? false : true
        })

    }

    _onLastNameChange = (text) => {

        // Function called when I change the input for last name

        this.setState({
            ...this.state,
            last_name: text
        })

    }

    _onFirstNameChange = (text) => {

        // Function called when I change the input for first name

        this.setState({
            ...this.state,
            first_name: text
        })

    }

    _onUsernameChange = (text) => {

        // Function called when I change the input for username

        this.setState({
            ...this.state,
            newUsername: text
        })

    }

    _onOldPasswordChange = (text) => {

        this.setState({
            ...this.state,
            oldPassword: text
        })

    }

    _onNewPasswordChange = (text) => {

        this.setState({
            ...this.state,
            newPassword: text
        })

    }

    _onSwitchPressed = () => {

        // CHANGE USER PREFERENCES IN DATABASE

        let apiName = 'Camagru'
        let path = '/users/' + this.props.user.info.username
        let myInit = {
            body: {
                preferences: {
                    email: this.props.user.info.preferences.email ? false : true
                }
            }
        }

        API.put(apiName, path, myInit)
        .then(data => {

            console.log("Data:", data)

            this._getUser()

        })
        .catch(err => {
            console.log(err.message)
        })


    }

    _outputText = (type) => {

        // Function called in the render
        // I output the informations about the user or a text input depending on if the user is updating the info or not

        switch(type) {

            case 'username':
                if (this.state.updating) {

                    return (
                        <form
                        style={{marginLeft: 5}}
                        >
                            <input onChange={(event) => this._onUsernameChange(event.target.value)} type="text" name="username"></input>
                        </form>
                    )

                } else {

                    if (this.props.user.info.newUsername !== 'ex') {
                        return this.props.user.info.newUsername
                    } else {
                        return this.props.user.info.username
                    }

                }

            case 'email':
                return this.props.user.info.email

            case 'first_name':
                if (this.state.updating) {
                    return (
                        <form
                        style={{marginLeft: 5}}
                        >
                            <input onChange={(event) => this._onFirstNameChange(event.target.value)} type="text" name="first_name"></input>
                        </form>
                    )
                } else {
                    return this.props.user.info.first_name
                }

            case 'last_name':
                if (this.state.updating) {
                    return (
                        <form
                        style={{marginLeft: 5}}
                        >
                            <input onChange={(event) => this._onLastNameChange(event.target.value)} type="text" name="last_name"></input>
                        </form>
                    )
                } else {
                    return this.props.user.info.last_name
                }
            case 'old_password':
                return (
                    <form
                    style={{marginLeft: 5}}
                    >
                        <input onChange={(event) => this._onOldPasswordChange(event.target.value)} type="password" name="old_password"></input>
                    </form>
                )
            case 'new_password':
                return (
                    <form
                    style={{marginLeft: 5}}
                    >
                        <input onChange={(event) => this._onNewPasswordChange(event.target.value)} type="password" name="new_password"></input>
                    </form>
                )
            case 'preferences':
                return (
                    <Switch
                    checked={this.props.user.info.preferences.email}
                    onChange={this._onSwitchPressed}
                    />
                )
            default:
                return 'error'

        }

    }

    render() {

        console.log(this.state)

        if (this.state.loading) {

            return (
                <p>
                    Loading...
                </p>
            )

        } else {

            if (this.props.user.isConnected) {

                return (
                    <div
                    style={{textAlign: 'center'}}
                    >
                        <div
                        style={{width: '75vw', backgroundColor: 'lightgray', display: 'inline-block'}}
                        >
                            <div
                            style={{display: 'flex', flexDirection: 'column', textAlign: 'left', margin: 7}}
                            >
                                <b style={{fontWeight: 'normal', display: 'flex'}}>Username: {this._outputText("username")}</b>
                                <br />
                                <b style={{fontWeight: 'normal', display: 'flex'}}>Email: {this._outputText("email")}</b>
                                <br />
                                <b style={{fontWeight: 'normal', display: 'flex'}}>First Name: {this._outputText("first_name")}</b>
                                <br />
                                <b style={{fontWeight: 'normal', display: 'flex'}}>Last name: {this._outputText("last_name")}</b>
                                <br />
                                <b style={{fontWeight: 'normal', display: 'flex', alignItems: 'center'}}>Notifications when a user comments your post:   {this._outputText("preferences")}</b>
                                <button
                                onClick={this._onClick}
                                style={{width: 150, height: 30, marginTop: 10}}
                                >
                                    {
                                        this.state.updating
                                        ?
                                            'Confirm'
                                        :
                                            'Update informations'
                                    }
                                </button>
                                {
                                    this.state.updatingPassword ?
                                        <React.Fragment>
                                            <br />
                                            <b style={{fontWeight: 'normal', display: 'flex'}}>Old password: {this._outputText("old_password")}</b>
                                            <br />
                                            <b style={{fontWeight: 'normal', display: 'flex'}}>New password: {this._outputText("new_password")}</b>
                                            <br />
                                        </React.Fragment>
                                    :
                                        null
                                }
                                <button
                                onClick={this._onUpdatePassword}
                                style={{width: 150, height: 30, marginTop: 10}}
                                >
                                    Update password
                                </button>
                            </div>
                        </div>
                    </div>
                )

            } else {
                return null
            }

        }

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile)