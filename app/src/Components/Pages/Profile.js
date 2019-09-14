import React from 'react'
import { Auth, API } from 'aws-amplify'
import { connect } from 'react-redux'

class Profile extends React.Component {

    // React Component for the profile page

    state = {

        loading: true

    }

    componentDidMount() {

        let apiName = 'Camagru'
        let path = '/users/' + this.props.user.info.username
        let myInit = {}

        console.log(path)

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

    _signOut = () => {

        // Function called when we click on Logout

        Auth.signOut({global: true})
        .then(data => {

            console.log("Successfully called the Auth API:", data)

            let action = {
                type: "DISCONNECT_USER"
            }
            this.props.dispatch(action)

            action = {
                type: 'CHANGE_PAGE',
                value: {
                    page: "CONNECTION"
                }
            }
            this.props.dispatch(action)

        })
        .catch(error => {

            console.log("Error calling the Auth API:", error)

        })

    }

    render() {

        console.log(this.props)

        if (this.state.loading) {

            return (
                <p>
                    Loading...
                </p>
            )

        } else {

            return (
                <React.Fragment>
                    <center>
                        <div>
                            Username: {this.props.user.info.username}
                            <br />
                            Email: {this.props.user.info.email}
                            <br />
                            First Name: {this.props.user.info.first_name}
                            <br />
                            Last name: {this.props.user.info.last_name}
                        </div>
                        <h5
                        style={{fontWeight: 'normal', color: 'blue'}}
                        onClick={this._signOut}
                        >
                            Log out
                        </h5>
                    </center>
                </React.Fragment>
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