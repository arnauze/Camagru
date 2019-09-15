import React from "react"
import { connect } from "react-redux"
import { API } from 'aws-amplify'
import CommentItem from './CommentItem'

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

        let apiName = 'Camagru'
        let path = "/posts/" + this.props.post.id + "/social/comment"
        let myInit = {
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
            <div>
                <div
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}
                >
                    <div
                    >
                        <center>
                            <h4
                            onClick={this._handleLikes}
                            >
                                {
                                    this.props.post.social.likes.length > 1 
                                    ?
                                        this.props.post.social.likes.length + ' LIKES'
                                    :
                                        this.props.post.social.likes.length + ' LIKE'
                                }
                            </h4>
                        </center>
                    </div>
                    <div>
                        <center>
                            <h4
                            onClick={this.handleComments}
                            >
                                {
                                    this.props.post.social.comments.length > 1 
                                    ?
                                        this.props.post.social.comments.length + ' COMMENTS'
                                    :
                                        this.props.post.social.comments.length + ' COMMENT'
                                }
                            </h4>
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