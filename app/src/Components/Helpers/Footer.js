import React from 'react'
import { stickers } from '../../Constants/Constants' // I saved the stickers informations in a file at the root of the app directory

export default class Footer extends React.Component {

    // React component for the footer on the page Add photo
    // In this component I output all the stickers that a user can add on a picture
    // If I click on one of the sticker I call a function transfered by the parent component

    render() {

        return (
            <div style={{width: '99vw', height: '23vh', backgroundColor: '#F2F2F2', margin: 5, marginRight: 10, display: 'flex', alignItems: 'center', overflowX: 'scroll', borderRadius: 5}}>
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
                                            width: item.width,
                                            height: item.height
                                        }
                                    )}
                                    src={item.url}
                                    style={{width: item.width, height: item.height}}
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