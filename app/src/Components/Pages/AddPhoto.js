import React from 'react'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'
import Webcam from "react-webcam"
import Footer from './Helpers/Footer'
import SideMenu from './Helpers/SideMenu'
import Switch from "react-switch"

const constraints = {
    width: 870,
    height: 480,
    facingMode: "user"
};

class AddPhoto extends React.Component {

    // React Component for the page "Add a picture"
    // If the user is not logged in he can't see this page

    state = {
        width: 0,
        height: 0,
        record: true,
        screenshot: '',
        sticker: {}
    }

    constructor(props) {
        super(props);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

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

    _updateCamera = () => {

        this.setState({
            ...this.state,
            record: this.state.record ? false : true
        })

    }

    _addPostToDatabase = () => {

        console.log(this.props)

        let apiName = 'Camagru'
        let path = '/posts'
        let myInit = {
            body: {
                creator: this.props.user.info.username,
                sticker: this.state.sticker,
                photo: {
                    path: this.state.screenshot,
                    width: this.state.width / 1.8,
                    height: this.state.height / 1.8
                }
            }
        }

        API.post(apiName, path, myInit)
        .then(data => {

            alert("You successfully created a new post !")
            console.log("Success", data)

        })
        .catch(err => {

            console.log(err.message)

        })

    }

    _capture = () => {

        this.setState({
            ...this.state,
            screenshot: this._webcam.getScreenshot()
        }, () => this._addPostToDatabase())

    }

    _setRef = webcam => {

        this._webcam = webcam

    }

    _onStickerClicked = sticker => {

        this.setState({
            ...this.state,
            sticker: sticker
        })

    }

    render() {

        console.log("State in Add Photo:", this.state)

        if (this.props.user.isConnected) {

            // If the user is logged in then we output the page

            return (
                <div
                style={{width: '100%'}}
                >
                    <div style={{display: 'flex', height: '60vh'}}>
                        <div
                        style={{width: '77vw', display: 'flex'}}
                        >
                            <div
                            style={{width: '67vw'}}
                            >
                                {
                                    this.state.record
                                    ?
                                        <center>
                                            <div
                                            style={{position: 'relative', bakgroundColor: 'blue'}}
                                            >
                                                <Webcam
                                                audio={false}
                                                height={this.state.height / 1.8}
                                                ref={this._setRef}
                                                screenshotFormat="image/jpeg"
                                                width={this.state.width / 1.8}
                                                videoConstraints={constraints}
                                                />
                                            </div>
                                        </center>
                                    :
                                        null
                                }
                            </div>
                            <div
                            style={{marginRight: 7, width: '10vw', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
                            >
                                <center>
                                    Camera: <br />

                                    <Switch
                                    checked={this.state.record}
                                    onChange={this._updateCamera}
                                    />
                                    <br />
                                    {
                                        this.state.record
                                        ?
                                            <div>
                                                Take a selfie:
                                                <br />
                                                <div
                                                style={{width: 50, height: 50, backgroundColor: 'red'}}
                                                onClick={this._capture}
                                                >

                                                </div>
                                            </div>
                                            :
                                                null
                                    }
                                </center>
                            </div>
                        </div>
                        <SideMenu />
                    </div>
                    <Footer
                    screenDimensions={{width: this.state.width, height: this.state.height}}
                    onClick={this._onStickerClicked}
                    />
                </div>
            )

        } else {
            
            // If the user is not logged in I output a text allowing him to redirect to the sign in/sign up page

            return (
                <React.Fragment>
                    <center>
                        <p>
                            You need to log in before you can add a media
                        </p>
                        <h6
                        onClick={this._onClick}
                        style={{fontWeight: 'normal', color: 'blue', textDecoration: 'underline'}}
                        >
                            Sign in/Sign up
                        </h6>
                    </center>
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