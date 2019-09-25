import React from 'react'
import { API } from 'aws-amplify'
import { connect } from 'react-redux'

class Profile extends React.Component {

    // React Component for the profile page

    state = {

        loading: true,
        updating: false,
        first_name: '',
        last_name: '',
        newUsername: ''
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
            default:
                return 'error'

        }

    }

    render() {

        if (this.state.loading) {

            return (
                <p>
                    Loading...
                </p>
            )

        } else {

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
                        </div>
                    </div>
                </div>
            )

        }

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile)