import React from 'react'

export default class SignIn extends React.Component {

    // React Component for the Sign In part of the Connection page
    // All of the logic from the text input and the form submit are in the parent Component (Connection)

    render() {

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
                    <h6
                    style={{color: 'blue', fontWeight: 'normal', marginTop: 5, marginBottom: 0}}
                    onClick={() => alert("Forgot password")}
                    >   
                        Forgot password ?
                    </h6>
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