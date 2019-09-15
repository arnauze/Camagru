import React from 'react'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'
import Webcam from "react-webcam"
import Footer from './Helpers/Footer'
import SideMenu from './Helpers/SideMenu'
import Switch from "react-switch"
import Draggable from 'react-draggable';

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
        sticker: {},
        previousPosts: [],
        loading: true,
        stickerPosition: {
            x: 0,
            y: 0
        },
        stickerPicked: false
    }

    constructor(props) {
        super(props);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {

        // Function called when the component finished mounting
        // In here I update the window dimensions in the state and then I add an event listener for whenever the window's size change

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

    }

    componentWillUnmount() {

        // Function called when the component unmounts
        // I remove the event listener

        window.removeEventListener('resize', this.updateWindowDimensions);

    }

    updateWindowDimensions() {

        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });

    }

    _getPreviousPosts = () => {

        // Function called whenever I need to load or reload the previous posts
        // That function is called whenever I change value of loading in the state to true
        // I call my API to get all of a user's posts

        let apiName = 'Camagru'
        let path = '/posts/user/' + this.props.user.info.username
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(response => {

            this.setState({
                ...this.state,
                previousPosts: response,
                loading: false
            })

        })
        .catch(err => {
            console.log(err.message)
        })

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

        // Function called whenever I click on the ON/OFF camera button
        // If the user's webcam is activated I unactivate it and opposite

        this.setState({
            ...this.state,
            record: this.state.record ? false : true
        })

    }

    _addPostToDatabase = () => {

        // Function called when a user takes a photo
        // I call my API to add a new post with the screenshot in my database

        let apiName = 'Camagru'
        let path = '/posts'
        let myInit = {
            body: {
                creator: this.props.user.info.username,
                sticker: {
                    info: this.state.sticker,
                    position: {
                        x: this.state.stickerPosition.x,
                        y: this.state.stickerPosition.y
                    }
                },
                photo: {
                    path: this.state.screenshot,
                    width: this.state.width / 1.8,
                    height: this.state.height / 1.8
                }
            }
        }

        API.post(apiName, path, myInit)
        .then(() => {

            alert("You successfully created a new post !")
            
            // Here I put the loading button back to true so I can download the previous posts again
            this.setState({
                ...this.state,
                loading: true
            })

        })
        .catch(err => {

            console.log(err.message)

        })

    }

    _capture = () => {

        // Function called when I the user takes a screenshot with the webcam

        this.setState({
            ...this.state,
            screenshot: this._webcam.getScreenshot()
        }, () => this._addPostToDatabase())

    }

    _setRef = webcam => {

        // Function called to set a reference for the webcam

        this._webcam = webcam

    }

    _onStickerClicked = sticker => {

        // Function called whenever the user clicks on a sticker

        this.setState({
            ...this.state,
            sticker: sticker,
            stickerPicked: true
        })

    }

    handleDrag = (e, ui) => {

        console.log("Event:", e)
        console.log("UI:",ui)

        this.setState({
            ...this.state,
            stickerPosition: {
                x: ui.x,
                y: ui.y
            }
        })


    }

    render() {

        if (this.state.loading) {

            this._getPreviousPosts()
            
        }

        console.log(this.state)

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
                                            style={{position: 'relative', bakgroundColor: 'blue', height: this.state.height / 1.8, width: this.state.width / 1.8}}
                                            >
                                                <Webcam
                                                audio={false}
                                                height={this.state.height / 1.8}
                                                ref={this._setRef}
                                                screenshotFormat="image/jpeg"
                                                width={this.state.width / 1.8}
                                                videoConstraints={constraints}
                                                />
                                                <Draggable
                                                axis="both"
                                                onDrag={this.handleDrag}
                                                bounds={{top: 0, left: -560, right: 560, bottom: 570}}
                                                >
                                                    <img
                                                    alt=""
                                                    style={{left: 79 + 560, top: 0, height: this.state.sticker.height, width: this.state.sticker.width, position: 'absolute'}}
                                                    src={this.state.sticker.url}
                                                    />
                                                </Draggable>
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
                                                style={{width: 50, height: 50, backgroundColor: this.state.stickerPicked ? 'red' : 'lightgray'}}
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
                        <SideMenu
                        posts={this.state.previousPosts}
                        user={this.props.user.info}
                        loading={this.state.loading}
                        />
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