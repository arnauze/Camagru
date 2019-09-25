import React from 'react'
import Button from '@material-ui/core/Button'

export default class SignIn extends React.Component {

    // React Component for the Sign In part of the Connection page
    // All of the logic from the text input and the form submit are in the parent Component (Connection)

    render() {

        if (this.props.updatePassword) {

            return (
                <div
                style={{minHeight: '35vh'}}
                >
                    <h4
                    style={{color: 'black', fontWeight: '600'}}
                    >
                        We sent you an email to update your password
                    </h4>
                    <form
                    onSubmit={(e) => this.props.onSubmitUpdatePassword(e)}
                    style={{marginTop: 10}}
                    >
                        <label>
                            Username:
                            <br />
                            <input
                            style={{margin: 5}}
                            type="text"
                            value={this.props.signIn.username}
                            onChange={e => this.props.onChangeUsername(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Code:
                            <br />
                            <input
                            style={{margin: 5, marginBottom: 10}}
                            type="text"
                            value={this.props.newPassword.code}
                            onChange={e => this.props.onUpdateCode(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            New password:
                            <br />
                            <input
                            style={{margin: 5, marginBottom: 10}}
                            type="password"
                            value={this.props.newPassword.password}
                            onChange={e => this.props.onUpdatePassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <input type="submit" value="Sign in"/>
                    </form>
                    {
                        this.props.errorMessage.length > 0
                        ?
                            <h5
                            style={{color: 'red'}}
                            >
                                {this.props.errorMessage}
                            </h5>
                        :
                            null
                    }
                </div>
            )

        } else {

            return (

                <div
                style={{minHeight: '35vh'}}
                >
                    <h4
                    style={{color: 'black', fontWeight: '600'}}
                    >
                        If you already have an account you can log in here:
                    </h4>
                    <form
                    onSubmit={(e) => this.props.onSubmitSignIn(e)}
                    style={{marginTop: 10}}
                    >
                        <label>
                            Username:
                            <br />
                            <input
                            style={{margin: 5}}
                            type="text"
                            value={this.props.signIn.username}
                            onChange={e => this.props.onChangeUsername(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <br />
                            <input
                            style={{margin: 5, marginBottom: 10}}
                            type="password"
                            value={this.props.signIn.password}
                            onChange={e => this.props.onChangePassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <Button
                        style={{color: 'blue'}}
                        onClick={() => this.props.onForgotPassword()}
                        >   
                            Forgot password ?
                        </Button>
                        <br />
                        <input type="submit" value="Sign in"/>
                    </form>
                    {
                        this.props.errorMessage.length > 0
                        ?
                            <h5
                            style={{color: 'red'}}
                            >
                                {this.props.errorMessage}
                            </h5>
                        :
                            null
                    }
                </div>

            )

        }

    }

}