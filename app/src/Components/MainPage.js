import React from 'react'
import TopBar from './TopBar'
import { connect } from 'react-redux'
import MainPart from './MainPart'
import Amplify, { Auth, API } from 'aws-amplify'

Amplify.configure({
    Auth: {
        region: 'us-east-2',
        userPoolId: 'us-east-2_VgkxVtNIq',
        userPoolWebClientId: '6oe8l0f5sarangjassslpj61bl'
    },
    API: {
        endpoints: [
            {
                name: "Camagru",
                endpoint: "https://qffrfbpwie.execute-api.us-east-2.amazonaws.com/dev"
            }
        ]
    },
    Storage: {
        AWSS3: {
            bucket: 'camagru-dev', //REQUIRED -  Amazon S3 bucket
        }
    }
})

class MainPage extends React.Component {

    // React component for the website

    componentWillMount() {

        // Function called when the component is created
        // I check if a user is already connected using AWS Cognito
        // If a user is connected then I update the global state

        Auth.currentAuthenticatedUser()
        .then(user => {

            let apiName = 'Camagru'
            let path = '/users/' + user.username
            let myInit = {}

            API.get(apiName, path, myInit)
            .then(data => {

                console.log("Successfully called the API:", data)

                let action = {
                    type: 'CONNECT_USER',
                    value: {
                        user: data
                    }
                }
                this.props.dispatch(action)

            })
            .catch(err => {
                console.log(err.message)
            })

        })
        .catch(err => {

            console.log(err)

        })

    }

    render() {

        return (

            <React.Fragment>
                <TopBar />
                <MainPart />
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