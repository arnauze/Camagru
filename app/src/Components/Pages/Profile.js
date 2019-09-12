import React from 'react'
import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'

class Profile extends React.Component {

    _signOut= () => {

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

        return (
            <p
            onClick={this._signOut}
            >
                HELLO THERE
            </p>
        )

    }

}

export default connect()(Profile)