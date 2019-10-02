import React from "react"
import { connect } from "react-redux"
import { API } from 'aws-amplify'
import CommentItem from './CommentItem'
import Button from '@material-ui/core/Button'

class SocialBar extends React.Component {

    // React Component for the social bar for a post on the main page

    constructor(props) {
        super(props)

        this.state = {
            likes: this.props.post.social.likes,
            comments: this.props.post.social.comments,
            newComment: '',
            showComments: false
        }
    }

    _handleLikes = () => {

        // Function called when a user clicks on Like

        if (this.props.user.isConnected) {

            let apiName = 'Camagru'
            let path = "/posts/" + this.props.post.id + "/social/like"
            let myInit = {
                body: {
                    user: this.props.user
                }
            }

            API.post(apiName, path, myInit)
            .then(data => {

                this.props.reload()
                
            })
            .catch(err => {
                console.log(err.message)
            })

        } else {
            alert("First you need to log in")
        }

    }

    _handleChange = (text) => {

        // Function called when the value of the comment input area changes

        this.setState({
            ...this.state,
            newComment: text
        })

    }

    _onSubmit = (e) => {

        // Function called when the user submits the new comment

        e.preventDefault()

        var apiName = 'Camagru'
        var path = "/posts/" + this.props.post.id + "/social/comment"
        var myInit = {
            body: {
                user: this.props.user,
                comment: this.state.newComment
            }
        }

        API.post(apiName, path, myInit)
        .then(response => {

            // If the API call is successful then I output a message for the user
            // then I update the state to put the comment area back to null
            // and finally I reload the posts

            alert("Successfully added a new comment !")

            if (this.props.user.info.preferences.email) {

                API.post(apiName, '/sendemail', { body: { username: this.props.user.info.username, email: this.props.user.info.email } })
                .then(data => console.log("SUCCESS SENDING EMAIL:", data))
                .catch(err => console.log("ERROR SENDING EMAIL:", err))
                
            }

            console.log("NEW COMMENT ADDED:", response)

            this.setState({
                ...this.state,
                newComment: ''
            })

            this.props.reload()

        })
        .catch(err => {
            console.log(err.message)
        })

    }

    _outputComments = () => {

        // Function called in the render
        // It outputs all the comments on a post

        return (

            this.props.post.social.comments.map((item, index) => {
                
                return (
                    <CommentItem 
                    comment={item}
                    key={index}
                    user={this.props.user}
                    reload={this.props.reload}
                    post={this.props.post}
                    />
                )

            })

        )

    }

    handleComments = () => {

        // Function called when the user clicks on Comment

        this.setState({
            ...this.state,
            showComments: this.state.showComments ? false : true
        })

    }

    _outputAddComment = () => {

        // Function called in the render
        // It outputs the Add a comment area if the user is logged in

        if (this.props.user.isConnected) {

            return (
                <form
                onSubmit={e => this._onSubmit(e)}
                >
                    <label><b style={{fontWeight: 'normal'}}>Add your comment:</b></label>
                    <br />
                    <input
                    type="text"
                    value={this.state.newComment}
                    style={{width: 200, minHeight: 30, margin: 10}}
                    onChange={e => this._handleChange(e.target.value)}
                    />
                </form>
            )

        } else {
            return null
        }

    }

    render() {

        return (
            <div style={{marginTop: 5, border: '1px solid black', borderRadius: 5, width: 1280, backgroundColor: 'white'}}>
                <div
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: '5vh'}}
                >
                    <div
                    >
                        <center>
                            <Button
                            // variant="contained"
                            color="primary"
                            onClick={this._handleLikes}
                            style={{height: '5vh', maxHeight: 35, fontSize: '1.7vh'}}
                            >
                                {
                                    this.props.post.social.likes.length > 1 
                                    ?
                                        this.props.post.social.likes.length + ' LIKES'
                                    :
                                        this.props.post.social.likes.length + ' LIKE'
                                }
                            </Button>
                        </center>
                    </div>
                    <div
                    style={{display: 'flex', alignItems: 'center'}}
                    >
                        <center>
                            <Button
                            // variant="contained"
                            color="primary"
                            onClick={this.handleComments}
                            style={{height: '5vh', maxHeight: 35, fontSize: '1.7vh'}}
                            >
                                {
                                    this.props.post.social.comments.length > 1 
                                    ?
                                        this.props.post.social.comments.length + ' COMMENTS'
                                    :
                                        this.props.post.social.comments.length + ' COMMENT'
                                }
                            </Button>
                        </center>
                    </div>
                </div>
                {
                    this.state.showComments
                    ?
                        <div>
                            <center>
                                {
                                    this._outputAddComment()
                                }
                                {
                                    this._outputComments()
                                }
                            </center>
                        </div>
                    :
                        null
                }
            </div>
        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SocialBar)