import React from 'react'
import { connect } from 'react-redux'
import Connection from './Pages/Connection'
import AddPhoto from './Pages/AddPhoto'
import MainPage from './Pages/MainPage'
import Profile from './Pages/Profile'

class MainPart extends React.Component {

    // React Component for the main part of the website

    _outputPage = () => {

        // Function called in the render
        // I output the necessary component based on the global state value page

        if (this.props.page === 'MAIN_PAGE') {

            return (
                <center>
                    <MainPage />
                </center>
            )

        } else if (this.props.page === 'ADD_PHOTO') {

            return (
                <AddPhoto />
            )

        } else if (this.props.page === 'CONNECTION') {

            return (
                <center>
                    <Connection />
                </center>
            )

        } else if (this.props.page === 'PROFILE') {

            return (
                <Profile />
            )

        }

    }

    render() {

        return (
                this._outputPage()
        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
        page: state.page
    }
}

export default connect(mapStateToProps)(MainPart)