var initialState = {
    user: {
        isConnected: false,
        info: {}
    },
    page: 'MAIN_PAGE'
}

export default function changeState(state = initialState, action) {

    var nextState;

    switch(action.type) {

        case 'CONNECT_USER':
            if (action.value.user) {
                nextState = {
                    ...state,
                    user: {
                        isConnected: true,
                        info: action.value.user
                    }
                }
            }
            return nextState || state

        case 'DISCONNECT_USER':
            nextState = {
                ...state,
                user: {
                    isConnected: false,
                    info: {}
                }
            }
            return nextState || state

        case 'CHANGE_PAGE':
            nextState = {
                ...state,
                page: action.value.page
            }
            return nextState || state

        default:
            return state
    }

}