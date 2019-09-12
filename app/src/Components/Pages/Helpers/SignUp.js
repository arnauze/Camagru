import React from 'react'

export default class SignUp extends React.Component {

    // React Component for the Connection page
    // This is the signUp form

    _outputBottomPart = () => {

        // Function called in the render, to render informations under
        // the sign up form depending on the situation

        if (this.props.message.length > 0) {

            // If the user created an account successfully and now need to confirm with the code received by email

            return (
                <div>
                    <p>
                    {this.props.message}
                    </p>
                    <form
                    onSubmit={e => this.props.onSubmitConfirmationCode(e)}
                    >
                        <label>
                            Confirmation code:
                            <br />
                            <input
                            type="text"
                            value={this.props.confirmationCode}
                            style={{margin: 5}}
                            onChange={e => this.props.onChangeConfirmationCode(e.target.value)}
                            />
                            <br />
                            <input type="submit" value="submit" />
                        </label>
                    </form>
                </div>
            )

        } else if (this.props.errorMessage.length > 0) {

            // If the creation of the account didn't work
            // I output the error message under the form

            return (
                <h5
                style={{color: 'red'}}
                >
                    {this.props.errorMessage}
                </h5>
            )

        } else {

            return null

        }

    }

    render() {

        return (
            <div
            style={{minHeight: '65vh'}}
            >
                <h4
                style={{color: 'black', fontWeight: '600'}}
                >
                    If you don't have an account you can create a new user here:
                </h4>
                <form
                onSubmit={e => this.props.onSubmitSignUp(e)}
                >
                    <label>
                        Username:
                        <br />
                        <input
                        style={{margin: 5}}
                        type="text"
                        value={this.props.signUp.username}
                        onChange={e => this.props.onChangeUsername(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <br />
                        <input
                        style={{margin: 5}}
                        type="text"
                        value={this.props.signUp.email}
                        onChange={e => this.props.onChangeEmail(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <br />
                        <input
                        style={{margin: 5}}
                        type="password"
                        value={this.props.signUp.password}
                        onChange={e => this.props.onChangePassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Sign up"/>
                </form>
                {
                    this._outputBottomPart()
                }
            </div>
        )

    }

}