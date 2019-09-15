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
            height: window.innerHeight
        });

    }

    render() {
        
        var photo = this.props.photo
        var sticker = this.props.sticker

        console.log("PHOTO IN PHOTO", photo)
        console.log("STICKER IN PHOTO", sticker)

        return (

            <div
            style={{display: 'flex', alignItems: 'top', justifyContent: 'center', position: 'relative'}}
            id="division"
            >
                <img
                alt=''
                src={photo.path}
                style={{maxWidth: photo.width, maxHeight: photo.height, width: '75vw'}}
                />
                <div
                style={{position: 'absolute', top: sticker.position.y, right: (( this.state.width / 2) - sticker.position.x - 79)}}
                >
                    <img
                    alt=''
                    src={sticker.info.url}
                    style={{width: sticker.info.width, height: sticker.info.height}}
                    >
                    </img>
                </div>
                {
                    this.props.user.info.username === this.props.post.creator
                    ?
                        <img
                        onClick={this.props.onDeleteButtonClicked}
                        src={require('../../../Images/deleteButton.png')}
                        style={{width: '3vw', height: '3vh', maxWidth: 40, maxHeight: 40, minHeight: 10, minWidth: 10, position: 'absolute', bottom: 0}}
                        alt=''
                        />
                    :
                        null
                }
            </div>

        )

    }

}