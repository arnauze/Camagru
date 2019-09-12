import React from 'react'
import TopBar from './TopBar'
import { connect } from 'react-redux'
import MainPart from './MainPart'
import Amplify from 'aws-amplify'

Amplify.configure({
    Auth: {
        region: 'us-east-2',
        userPoolId: 'us-east-2_La0GCAXYb',
        userPoolWebClientId: '38kr0s2m1umpqc670mul0sbfat'
    },
    API: {
        endpoints: [
            {
                name: "Camagru",
                endpoint: "https://qffrfbpwie.execute-api.us-east-2.amazonaws.com/dev"
            }
        ]
    }
})

class MainPage extends React.Component {

    // React component for the website

    render() {

        return (

            <React.Fragment>
                <center>
                    <TopBar />
                    <MainPart />
                </center>
            </React.Fragment>
            
        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
        page: state.page
    }
}

export default connect(mapStateToProps)(MainPage)