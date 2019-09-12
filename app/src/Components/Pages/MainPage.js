import React from 'react'

export default class MainPage extends React.Component {

    // React Component for the page "Main Page"

    render() {

        return (
            <div style={styles.main_container}>
                <div style={styles.publication}/>
                <div style={styles.publication}/>
                <div style={styles.publication}/>
            </div>
        )

    }

}

const styles = {
    main_container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue'
    },
    publication: {
        width: '50vw',
        height: '70vh',
        backgroundColor: 'white',
        margin: 10
    }
}