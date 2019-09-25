import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { Auth, API } from 'aws-amplify'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class TopBar extends React.Component {

    // React component for the website's header
    // Here I use the buttons to handle the pages on the website
    // When I click on a button I change the page value in the global state based on the button pressed

    _onButtonPressed = (text) => {

        // Function called when a button is pressed
        // I use the function this.props.dispatch() to change the global state

        if (text !== 'CONNECTION') {

            let action = {
                type: 'CHANGE_PAGE',
                value: {
                    page: text
                }
            }
            this.props.dispatch(action)

        } else {

            if (this.props.user.isConnected) {

                let action = {
                    type: 'CHANGE_PAGE',
                    value: {
                        page: 'PROFILE'
                    }
                }
                this.props.dispatch(action)

            } else {

                let action = {
                    type: 'CHANGE_PAGE',
                    value: {
                        page: text
                    }
                }
                this.props.dispatch(action)

            }

        }

    }

    _onLogout = () => {

        // Function called when I click on Log out

        Auth.signOut({global: true})
        .then(data => {

            // I sign the user out of Cognito, then I disconnect it of the app by changing the global state
            // And finally I send the user back to the main page

            console.log("Successfully called the Auth API:", data)

            // Disconnecting the user

            let action = {
                type: "DISCONNECT_USER"
            }
            this.props.dispatch(action)

            // Changing the page

            action = {
                type: 'CHANGE_PAGE',
                value: {
                    page: 'MAIN_PAGE'
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
            <header>
                <center>
                    <AppBar position="static" style={styles.main_division}>
                        <Toolbar>
                            <Button
                            onClick={() => this._onButtonPressed('MAIN_PAGE')}
                            >
                                <img
                                alt=""
                                src={require('../Images/homeButton.png')}
                                style={{height: 30, width: 30}}
                                />
                            </Button>
                            <Button
                            onClick={() => this._onButtonPressed('ADD_PHOTO')}
                            >
                                <img
                                alt=""
                                src={require('../Images/addPicture.png')}
                                style={{height: 30, width: 30}}
                                />
                            </Button>
                            <Button
                            onClick={() => this._onButtonPressed('CONNECTION')}
                            >
                                {
                                    this.props.user.isConnected
                                    ?
                                        <img
                                        alt=""
                                        src={require('../Images/profileButton.png')}
                                        style={{height: 30, width: 30}}
                                        />
                                    :
                                        <img
                                        alt=""
                                        src={require('../Images/signIn.png')}
                                        style={{height: 30, width: 30}}
                                        />
                                }
                            </Button>
                            {
                                this.props.user.isConnected
                                ?
                                    <Button
                                    onClick={this._onLogout}
                                    >
                                        <img
                                        alt=""
                                        src={require('../Images/logout.png')}
                                        style={{width: 30, height: 30}}
                                        />
                                    </Button>
                                :
                                    null
                            }
                        </Toolbar>
                    </AppBar> 
                </center>
            </header>

        )

    }

}

const styles = {
    main_division: {
        width: '100vw',
        height: '5vh',
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        width: '15vw',
        height: '5vh',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5vw',
        marginTop: '2vh'
    },
}

const mapStateToProps = state => {
    return {
        user: state.user,
        page: state.page
    }
}

export default connect(mapStateToProps)(TopBar)