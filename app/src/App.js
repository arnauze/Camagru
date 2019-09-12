import React from 'react';
import MainPage from './Components/MainPage';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends React.Component {

  // Here I use react-redux to add a global state to my app

  render() {

    return (
      <Provider store={Store}>
        <MainPage />
      </Provider>
    )

  }

}
