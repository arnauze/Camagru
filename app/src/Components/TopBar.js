import React from 'react'
import { connect } from 'react-redux'

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

    render() {

        console.log(this.props)

        return (
            <header>
                <center>
                    <div style={styles.main_division}>
                        <button
                        style={styles.button}
                        onClick={() => this._onButtonPressed('MAIN_PAGE')}
                        >
                            Main page
                        </button>
                        <button
                        style={styles.button}
                        onClick={() => this._onButtonPressed('ADD_PHOTO')}
                        >
                            Add a picture
                        </button>
                        <button
                        style={styles.button}
                        onClick={() => this._onButtonPressed('CONNECTION')}
                        >
                            {
                                this.props.user.isConnected
                                ?
                                    'My account'
                                :
                                    'Sign in / Sign up'
                            }
                        </button>
                    </div> 
                </center>
            </header>

        )

    }

}

const styles = {
    main_division: {
        width: '90vw',
        height: '10vh',
        marginBottom: 10,
        flexDirection: 'row',
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