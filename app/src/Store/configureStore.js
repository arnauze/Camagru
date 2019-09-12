import { createStore } from 'redux'
import changeState from './Reducers/handle_general_state'

export default createStore(changeState)