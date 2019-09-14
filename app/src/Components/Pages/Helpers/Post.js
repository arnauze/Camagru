import React from 'react'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'

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

        return (
            <div
            style={{margin: 10, backgroundColor: 'white', width: '75vw'}}
            >
                <div
                style={{display: 'flex', alignItems: 'top', justifyContent: 'center', position: 'relative'}}
                >
                    <img
                    alt=''
                    src={photo.path}
                    style={{maxWidth: photo.width, maxHeight: photo.height, width: '75vw'}}
                    />
                    {
                        this.props.user.info.username === this.props.post.creator
                        ?
                            <img
                            onClick={this._onDeleteButtonClicked}
                            src={require('../../../Images/deleteButton.png')}
                            style={{width: '3vw', height: '3vh', maxWidth: 40, maxHeight: 40, minHeight: 10, minWidth: 10, position: 'absolute', bottom: 0}}
                            alt=''
                            />
                        :
                            null
                    }
                </div>
                <div
                style={{height: 100, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}
                >
                    <div
                    >
                        <center>
                            <h4>
                                LIKE
                            </h4>
                        </center>
                    </div>
                    <div>
                        <center>
                            <h4>
                                COMMENT
                            </h4>
                        </center>
                    </div>
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