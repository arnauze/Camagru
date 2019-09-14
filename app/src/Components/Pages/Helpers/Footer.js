import React from 'react'
import { stickers } from '../../../Constants'

export default class Footer extends React.Component {

    render() {

        console.log(stickers)

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