import React from 'react'
import { stickers } from '../../../Constants' // I saved the stickers informations in a file at the root of the app directory

export default class Footer extends React.Component {

    // React component for the footer on the page Add photo
    // In this component I output all the stickers that a user can add on a picture
    // If I click on one of the sticker I call a function transfered by the parent component

    render() {

        return (
            <div style={{width: '100%', height: '23vh', border: '1px solid black', margin: 5, display: 'flex', alignItems: 'center'}}>
                {
                    stickers.map((item, index) => {

                        return (
                            <div
                            key={index}
                            style={{flex: 1}}
                            >
                                <center>
                                    <img
                                    onClick={() => this.props.onClick(
                                        {
                                            ...item,
                                            width: (this.props.screenDimensions.width / 10) * item.width,
                                            height: (this.props.screenDimensions.height / 10) * item.height
                                        }
                                    )}
                                    src={item.url}
                                    style={{width: (this.props.screenDimensions.width / 10) * item.width, height: (this.props.screenDimensions.height / 10) * item.height}}
                                    alt=''/>
                                </center>
                            </div>

                        )
                    })
                }
            </div>
        )

    }

}