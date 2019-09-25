import React from 'react'

export default class SideMenu extends React.Component {

    // React Component for the Side Menu in the page Add photo
    // In this component I output all of the user's previous photos

    render() {

        return (
            <div
            style={{width: '23vw', height: '60vh', overflowY: 'scroll', display: 'flex', justifyContent: 'center', backgroundColor: '#F2F2F2', borderRadius: 5}}
            >
                {
                    this.props.loading
                    ?
                        <p>Loading...</p>
                    :
                        <div
                        >
                            <center>
                                <h4>Previous posts:</h4>
                                {
                                    this.props.posts.map((item, index) => {

                                        console.log("Item in Side menu:", item)

                                        return (
                                            <div style={{width: item.photo.width / 3, height: item.photo.height / 3, position: 'relative', margin: 5}}>
                                                <img
                                                alt = ""
                                                src={item.photo.path}
                                                style={{width: item.photo.width / 3, height: item.photo.height / 3}}
                                                key={index}
                                                />
                                                <img
                                                alt=""
                                                src={item.sticker.info.url}
                                                style={{width: item.sticker.info.width / 3, height: item.sticker.info.height / 3, position: 'absolute', top: item.sticker.position.y / 3, left: item.sticker.position.x / 3}}
                                                />
                                            </div>
                                        )

                                    })
                                }
                            </center>
                        </div>
                }
            </div>
        )

    }

}