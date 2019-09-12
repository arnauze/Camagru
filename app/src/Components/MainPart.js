import React from 'react'
import { connect } from 'react-redux'
import Connection from './Pages/Connection'
import AddPhoto from './Pages/AddPhoto'
import MainPage from './Pages/MainPage'
import Profile from './Pages/Profile'

class MainPart extends React.Component {

    // React Component for the main part of the website
    // Here I output the pages based on the global state value page

    _outputPage = () => {

        if (this.props.page === 'MAIN_PAGE') {

            return (
                <MainPage />
            )

        } else if (this.props.page === 'ADD_PHOTO') {

            return (
                <AddPhoto />
            )

        } else if (this.props.page === 'CONNECTION') {

            return (
                <Connection />
            )

        } else if (this.props.page === 'PROFILE') {

            return (
                <Profile />
            )

        }

    }

    render() {

        console.log(this.state)

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