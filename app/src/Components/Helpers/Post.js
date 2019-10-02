import React from 'react'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'
import Photo from './Photo'
import SocialBar from './SocialBar'

class Post extends React.Component {

    // React Component for a post item

    _onDeleteButtonClicked = () => {

        // If the user connected clicks on the delete button for his post
        // I call my API and delete the post from the database

        let apiName = 'Camagru'
        let path = '/posts/' + this.props.post.id
        let myInit = {}

        API.del(apiName, path, myInit)
        .then(response => {

            console.log(response)
            this.props.deletePost(this.props.post)

        })
        .catch(err => {
            console.log(err)
        })

    }

    render() {

        var photo = this.props.post.photo
        var sticker = this.props.post.sticker

        return (
            <div
            style={{marginBottom: 20, marginTop: 20, backgroundColor: '#F2F2F2'}}
            >
                <div style={{margin: 10}}>
                    <div
                    style={{width: 1280, height: 20, backgroundColor: 'white', margin: 3, border: '0.5px solid black', borderRadius: 5}}
                    >
                        <b>{this.props.post.creator}</b> shared a new post
                    </div>
                    <Photo
                    photo={photo}
                    sticker={sticker}
                    user={this.props.user}
                    post={this.props.post}
                    onDeleteButtonClicked={this._onDeleteButtonClicked}
                    />
                    <SocialBar
                    photo={photo}
                    reload={this.props.reload}
                    post={this.props.post}
                    />
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Post)