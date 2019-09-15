import React from 'react'
import { API } from 'aws-amplify'
import Post from './Helpers/Post'

export default class MainPage extends React.Component {

    // React Component for the page "Main Page"

    state = {
        loading: true,
        posts: []
    }

    _getPosts = () => {

        // I call my API to get all the posts

        let apiName = 'Camagru'
        let path = '/posts'
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {

            this.setState({
                ...this.state,
                posts: data.Items,
                loading: false
            })

        })
        .catch(err => {
            console.log(err.message)
        })

    }

    _onDeletePost = post => {

        // Function called when I delete a post

        this.setState({
            ...this.state,
            posts: this.state.posts.filter(item => item !== post)
        })

    }

    _reload = () => {

        this.setState({
            ...this.state,
            loading: true
        })

    }

    render() {

        if (this.state.loading) {
            this._getPosts()
        }

        return (
            <div style={styles.main_container}>
                {
                    this.state.posts.length > 0
                    ?
                        this.state.posts.map((item, index) => {

                            return (
                                <Post
                                key={index}
                                post={item}
                                deletePost={this._onDeletePost}
                                reload={this._reload}
                                />
                            )

                        })
                    :
                        this.state.loading ? null : <p>There is no post to show for now. Add one by clicking on Add a picture</p>
                }
            </div>
        )

    }

}

const styles = {
    main_container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue'
    }
}