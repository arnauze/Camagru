import React from 'react'
import { API } from 'aws-amplify'

export default class SideMenu extends React.Component {

    // React Component for the Side Menu in the page Add photo
    // In this component I output all of the user's previous photos

    render() {

        return (
            <div
            style={{width: '23vw', height: '60vh', border: '1px solid black', display: 'flex', justifyContent: 'center'}}
            >
                {
                    this.props.loading
                    ?
                        <p>Loading...</p>
                    :
                        <div
                        style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}
                        >
                            {
                                this.props.posts.map((item, index) => {

                                    return (

                                        <img
                                        src={item.photo.path}
                                        style={{width: '18vw', height: '15vh', margin: 5}}
                                        key={index}
                                        >

                                        </img>
                                    )

                                })
                            }
                        </div>
                }
            </div>
        )

    }

}