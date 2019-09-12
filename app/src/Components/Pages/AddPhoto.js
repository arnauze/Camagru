import React from 'react'
import { connect } from 'react-redux'

class AddPhoto extends React.Component {

    // React Component for the page "Add a picture"
    // If the user is not logged in he can't see this page

    _onClick = () => {

        // Function called when a user clicks on the redirect text
        // I change the page value in the global state

        let action = {
            type: 'CHANGE_PAGE',
            value: {
                page: 'CONNECTION'
            }
        }
        
        this.props.dispatch(action)

    }

    render() {

        if (this.props.user.isConnected) {

            // If the user is logged in then we output the page

            return (
                <div
                style={{width: '100%', height: '100vh', backgroundColor: 'red'}}
                >
                    <p>
                        {this.props.page}
                    </p>
                </div>
            )

        } else {
            
            // If the user is not logged in I output a text allowing him to redirect to the sign in/sign up page

            return (
                <React.Fragment>
                    <p>
                        You need to log in before you can add a media
                    </p>
                    <h6
                    onClick={this._onClick}
                    style={{fontWeight: 'normal', color: 'blue', textDecoration: 'underline'}}
                    >
                        Sign in/Sign up
                    </h6>
                </React.Fragment>
            )

        }

    }

}

const mapstateToProps = state => {
    return {
        user: state.user,
        page: state.page
    }
}

export default connect(mapstateToProps)(AddPhoto)