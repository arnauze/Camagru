import React from "react"
import { API } from "aws-amplify";

export default class CommentItem extends React.Component {

    timeDifference = (timeNow, oldTime) => {

        var difference = timeNow - oldTime;
        var hoursDifference = Math.floor(difference/1000/60/60);

        if (hoursDifference < 1) {

            if (Math.floor(difference/1000/60) === 1) {
                return {
                    number: Math.floor(difference/1000/60),
                    timeframe: 'minute'
                }
            } else {
                return {
                    number: Math.floor(difference/1000/60),
                    timeframe: 'minutes'
                }
            }

        } else if (hoursDifference >= 24 && hoursDifference < 24 * 30) {

            if (Math.floor(difference/1000/60/60/24) === 1) {
                return {
                    number: Math.floor(difference/1000/60/60/24),
                    timeframe: 'day'
                }
            } else {
                return {
                    number: Math.floor(difference/1000/60/60/24),
                    timeframe: 'days'
                }
            }

        } else if (hoursDifference >= 24 * 30) {

            if (Math.floor(difference/1000/60/60/24/30) > 1) {
                return {
                    number: Math.floor(difference/1000/60/60/24/30),
                    timeframe: 'months'
                }
            } else {
                return {
                    number: Math.floor(difference/1000/60/60/24/30),
                    timeframe: 'month'
                }
            }

        } else {

            if (hoursDifference === 1) {
                return {
                    number: hoursDifference,
                    timeframe: 'hour'
                }
            } else {
                return {
                    number: hoursDifference,
                    timeframe: 'hours'
                }
            }

        }
    }

    _onDeleteMessage = () => {

        let apiName = 'Camagru'
        let path = '/posts/' + this.props.post.id + '/social/comment'
        let myInit = {
            body: {
                user: this.props.user,
                message: this.props.comment.message,
                delete: true
            }
        }

        API.post(apiName, path, myInit)
        .then(response => {

            this.props.reload()

        })
        .catch(err => {
            console.log(err.message)
        })

    }

    render() {

        var comment = this.props.comment
        var timeDifference = this.timeDifference(Date.now(), parseFloat(comment.timestamp))

        return (
            <div
            style={{width: '30vw', backgroundColor: 'lightgray', margin: 10, position: 'relative'}}
            >
                <center>
                    <div
                    style={{margin: 5}}
                    >
                        <b>{comment.username}</b>
                    </div>
                    <div
                    style={{margin: 5}}
                    >
                        {comment.message}
                    </div>
                    <div
                    style={{margin: 5}}
                    >
                        <b
                        style={{fontWeight: 'normal', fontSize: 12}}
                        >
                            {timeDifference.number} {timeDifference.timeframe} ago
                        </b>
                    </div>
                    <img
                    src={require('../../../Images/deleteButton.png')}
                    style={{width: 20, height: 20, position : 'absolute', top: 0, right: 0}}
                    onClick={this._onDeleteMessage}
                    />
                </center>
            </div>
        )

    }

}