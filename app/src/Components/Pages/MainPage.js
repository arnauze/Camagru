import React from 'react'
import { API } from 'aws-amplify'
import Post from '../Helpers/Post'

export default class MainPage extends React.Component {

    // React Component for the page "Main Page"

    state = {
        loading: true,
        posts: [],
        errorMessage: '',
        page: 1,
        totalPages: 0
    }

    _getPosts = () => {

        // I call my API to get all the posts

        let apiName = 'Camagru'
        let path = '/posts'
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {

            console.log("Return from get posts API:", data)

            this.setState({
                ...this.state,
                posts: data,
                loading: false,
                totalPages: Math.ceil(data.length / 5)
            })

        })
        .catch(err => {
            console.log(err.message)

            this.setState({
                ...this.state,
                loading: false,
                errorMessage: 'Error fetching the posts'
            })

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

    _outputPosts = () => {

        var start = 0 + (5 * (this.state.page - 1))
        var end = 0 + (5 * this.state.page)

        return (

            this.state.posts.map((item, index) => {

                if (index >= start && index < end) {
                    return (
                        <Post
                        key={index}
                        post={item}
                        deletePost={this._onDeletePost}
                        reload={this._reload}
                        />
                    )
                }

            })

        )

    }

    render() {

        if (this.state.loading) {
            this._getPosts()
        }

        console.log(this.state)

        return (
            <div style={styles.main_container}>
                    {
                        this.state.posts.length > 0 // I check if loaded at least one post
                        ?
                            // If I did I output the posts for the page
                            <div>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <b
                                    style={{fontWeight: 'normal', margin: 5, marginRight: 15, color: 'blue'}}
                                    onClick={() => this.setState({
                                        ...this.state,
                                        page: this.state.page === 1 ? 1 : this.state.page - 1
                                    })}
                                    >
                                        Previous page
                                    </b>
                                    <b style={{fontWeight: 'normal', margin: 5}}>Page {this.state.page}/{this.state.totalPages}</b>
                                    <b
                                    style={{fontWeight: 'normal', margin: 5, marginLeft: 15, color: 'blue'}}
                                    onClick={() => this.setState({
                                        ...this.state,
                                        page: this.state.page === this.state.totalPages ? this.state.totalPages : this.state.page + 1
                                    })}
                                    >
                                        Next page
                                    </b>
                                </div>
                                {this._outputPosts()}
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <b
                                    style={{fontWeight: 'normal', margin: 5, marginRight: 15, color: 'blue'}}
                                    onClick={() => this.setState({
                                        ...this.state,
                                        page: this.state.page === 1 ? 1 : this.state.page - 1
                                    })}
                                    >
                                        Previous page
                                    </b>
                                    <b style={{fontWeight: 'normal', margin: 5}}>Page {this.state.page}/{this.state.totalPages}</b>
                                    <b
                                    style={{fontWeight: 'normal', margin: 5, marginLeft: 15, color: 'blue'}}
                                    onClick={() => this.setState({
                                        ...this.state,
                                        page: this.state.page === this.state.totalPages ? this.state.totalPages : this.state.page + 1
                                    })}
                                    >
                                        Next page
                                    </b>
                                </div>
                            </div>
                        :
                            this.state.loading // If there is no post I check if that's because I'm still waiting on my API call response
                            ?
                                <p>Loading...</p> // If I'm still loading I output a loading message
                            :
                                this.state.errorMessage.length > 0 // If I am not loading I check if there was an error fetching the datas
                                ?
                                    <b style={{color: 'red'}}>{this.state.errorMessage}</b> // If there was an error I output the error message
                                :
                                    <p>There is no post to show for now. Add one by clicking on Add a picture</p> // If there was no error it means that there is no posts in the database
                    }
            </div>
        )

    }

}

const styles = {
    main_container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F2F2F2'
    }
}