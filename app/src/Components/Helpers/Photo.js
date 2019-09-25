import React from "react"

export default class Photo extends React.Component {

    state = {
        width: 0,
        height: 0
    }

    componentDidMount() {

        // Function called when the component finished mounting
        // In here I update the window dimensions in the state and then I add an event listener for whenever the window's size change

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

    }

    componentWillUnmount() {

        // Function called when the component unmounts
        // I remove the event listener

        window.removeEventListener('resize', this.updateWindowDimensions);

    }

    updateWindowDimensions = () => {

        this.setState({
            width: document.getElementById("division").offsetWidth,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });

    }

    render() {
        
        var photo = this.props.photo
        var sticker = this.props.sticker

        console.log("PHOTO IN PHOTO", photo)
        console.log("STICKER IN PHOTO", sticker)

        return (
            <div
            style={{position: 'relative', height: photo.height, width: photo.width}}
            id="division"
            >
                    <img
                    alt=''
                    src={photo.path}
                    style={{width: photo.width, height: photo.height}}
                    />
                    <center>
                        <div
                        style={{position: 'absolute', top: sticker.position.y, left: sticker.position.x}}
                        >
                            <img
                            alt=''
                            src={sticker.info.url}
                            style={{width: sticker.info.width, height: sticker.info.height}}
                            >
                            </img>
                        </div>
                    </center>
                {
                    this.props.user.info.username === this.props.post.creator
                    ?
                        <div style={{position: 'absolute', width: '75vw', top: 0, right: 0}}>
                            <img
                            onClick={this.props.onDeleteButtonClicked}
                            src={require('../../Images/deleteButton.png')}
                            style={{width: '3vw', height: '3vh', maxWidth: 40, maxHeight: 40, minHeight: 10, minWidth: 10, position: 'absolute', top: 0, right: 0}}
                            alt=''
                            />
                        </div>
                    :
                        null
                }
            </div>

        )

    }

}