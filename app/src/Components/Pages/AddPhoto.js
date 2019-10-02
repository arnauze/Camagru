import React from 'react'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'
import Webcam from "react-webcam"
import Footer from '../Helpers/Footer'
import SideMenu from '../Helpers/SideMenu'
import Switch from "react-switch"
import Draggable from 'react-draggable'
import Button from '@material-ui/core/Button'
import ImageUploader from 'react-images-upload'

const MIN_WIDTH = 1913;

const constraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

class AddPhoto extends React.Component {

    // React Component for the page "Add a picture"
    // If the user is not logged in he can't see this page

    state = {
        width: 1280,
        height: 720,
        record: true,
        screenshot: '',
        sticker: {},
        previousPosts: [],
        loading: true,
        stickerPosition: {
            x: 0,
            y: 0
        },
        stickerPicked: false,
        uploadedImage: {
            url: '',
            width: 0,
            height: 0
        },
        disabled: false
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

    updateWindowDimensions = () => {

        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            disabled: window.innerWidth < MIN_WIDTH ? true : false
        });

        

    }

    _getPreviousPosts = () => {

        // Function called whenever I need to load or reload the previous posts
        // That function is called whenever I change value of loading in the state to true
        // I call my API to get all of a user's posts

        if (this.props.user.isConnected) {

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

        if (this.state.windowWidth > MIN_WIDTH) {

            this.setState({
                ...this.state,
                record: this.state.record ? false : true,
                uploadedImage: {
                    ...this.state.uploadedImage,
                    url: ''
                }
            })

        } else {

            alert("You need to make your window wider before you can turn on the camera")

        }

    }

    _addPostToDatabase = () => {

        // Function called when a user takes a photo
        // I call my API to add a new post with the screenshot in my database

        alert("You just took a screenshot !")

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
                    width: this.state.uploadedImage.width !== 0 ? this.state.uploadedImage.width : this.state.width,
                    height: this.state.uploadedImage.height !== 0 ? this.state.uploadedImage.height : this.state.height
                }
            }
        }

        API.post(apiName, path, myInit)
        .then(() => {

            alert("You successfully created a new post !")
            
            // Here I put the loading button back to true so I can download the previous posts again

            this.setState({
                ...this.state,
                loading: true,
                stickerPicked: false,
                sticker: {},
                uploadedImage: {
                    ...this.state.uploadedImage,
                    url: ''
                }
            })

        })
        .catch(err => {

            console.log(err.message)

        })

    }

    _capture = () => {

        // Function called when I the user takes a screenshot with the webcam

        if (this.state.stickerPicked) {

            this.setState({
                ...this.state,
                screenshot: this.state.uploadedImage.url ? this.state.uploadedImage.url : this._webcam.getScreenshot()
            }, () => this._addPostToDatabase())

        } else {

            alert("You need to pick a sticker first")

        }

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

    onStop = (e, ui) => {

        if (ui.x > 1280 - this.state.sticker.width || ui.y > 720 - this.state.sticker.height
            || ui.x < 0 || ui.y < 0) {

            this.setState({
                ...this.state,
                sticker: {},
                stickerPosition: {
                    x: 0,
                    y: 0
                },
                stickerPicked: false
            })

        } else {

            this.setState({
                ...this.state,
                stickerPosition: {
                    x: ui.x,
                    y: ui.y
                }
            })

        }

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

    _onPickImage = (file, url) => {

        console.log("File:", file)
        console.log("Url:", url)

        this.setState({
            ...this.state,
            uploadedImage: {
                ...this.state.uploadedImage,
                url: url
            }
        })

    }

    _outputCamera = () => {

        return this.state.record

    }

    _onLoad = ({target: img}) => {

        console.log("IMAGE HERE:", img)
        console.log("Offset height:", img.offsetHeight)
        console.log("Offset width:", img.offsetWidth)

        this.setState({
            ...this.state,
            uploadedImage: {
                ...this.state.uploadedImage,
                width: img.offsetWidth,
                height: img.offsetHeight
            }
        })

    }

    render() {

        if (this.state.loading) {

            this._getPreviousPosts()
            
        }

        console.log("ADD PHOTO STATE:", this.state)

        if (this.props.user.isConnected) {

            // If the user is logged in then we output the page

            return (
                <div
                style={{width: '99vw'}}
                >
                    <div style={{display: 'flex'}}>
                        <div
                        style={{width: '77vw', display: 'flex', backgroundColor: 'black', margin: 10, borderRadius: 10}}
                        >
                            <div
                            style={{width: '67vw'}}
                            >
                                {
                                    this._outputCamera()
                                    ?
                                        this.state.disabled
                                        ?
                                            null
                                        :
                                            <center>
                                                <div
                                                style={{position: 'relative', bakgroundColor: 'blue', height: 720, width: 1280}}
                                                >
                                                    <Webcam
                                                    audio={false}
                                                    height={this.state.height}
                                                    ref={this._setRef}
                                                    screenshotFormat="image/jpeg"
                                                    width={this.state.width}
                                                    videoConstraints={constraints}
                                                    />
                                                    <Draggable
                                                    axis="both"
                                                    onDrag={this.handleDrag}
                                                    onStop={this.onStop}
                                                    position={{x: this.state.stickerPosition.x, y: this.state.stickerPosition.y}}
                                                    >
                                                        <img
                                                        alt=""
                                                        style={{left: 0, top: 0, height: this.state.sticker.height, width: this.state.sticker.width, position: 'absolute'}}
                                                        src={this.state.sticker.url}
                                                        />
                                                    </Draggable>
                                                </div>
                                            </center>
                                    :
                                        <center>
                                        {
                                            this.state.disabled
                                            ?
                                                null
                                            :
                                                <div
                                                style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 720, maxWidth: 1280, width: 1280, position: 'relative', backgroundColor: this.state.uploadedImage.url ? 'white' : 'black'}}
                                                >
                                                    {
                                                    this.state.uploadedImage.url ?
                                                        <React.Fragment>
                                                            <img
                                                            alt=""
                                                            onLoad={this._onLoad}
                                                            src={this.state.uploadedImage.url}
                                                            style={{maxWidth: 1280, maxHeight: 720}}
                                                            />
                                                            <Draggable
                                                            axis="both"
                                                            onDrag={this.handleDrag}
                                                            onStop={this.onStop}
                                                            position={{x: this.state.stickerPosition.x, y: this.state.stickerPosition.y}}
                                                            >
                                                                <img
                                                                alt=""
                                                                style={{left: 0, top: 0, height: this.state.sticker.height, width: this.state.sticker.width, position: 'absolute'}}
                                                                src={this.state.sticker.url}
                                                                />
                                                            </Draggable>
                                                        </React.Fragment>
                                                    :
                                                        <div
                                                        style={{width: 250}}
                                                        >
                                                            <ImageUploader
                                                            withIcon={false}
                                                            buttonText='Choose images'
                                                            onChange={this._onPickImage}
                                                            imgExtension={['.jpeg', '.png']}
                                                            maxFileSize={5242880}
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </center>
                                }
                            </div>
                            <div
                            style={{marginRight: 7, width: '10vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white'}}
                            >
                                <center>
                                    Camera: <br />

                                    <Switch
                                    checked={(this.state.record && !this.state.disabled)}
                                    onChange={this._updateCamera}
                                    />
                                    <br />
                                    <div>
                                        {
                                            this.state.record
                                            ?
                                                'Take a selfie:'
                                            :
                                                'Add image'
                                        }
                                        <br />
                                        <div
                                        style={{width: 50, height: 50, borderRadius: 25, backgroundColor: this.state.stickerPicked ? 'red' : 'lightgray'}}
                                        onClick={this._capture}
                                        >

                                        </div>
                                    </div>
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
                        <Button
                        onClick={this._onClick}
                        style={{fontWeight: 'normal', color: 'blue'}}
                        >
                            Sign in/Sign up
                        </Button>
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