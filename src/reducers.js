import update from 'immutability-helper';

const reducer = (state = {}, action) => {
    let default_state = {
        subreddits: [],
        hasAppLoaded: false,
        subredditData: {},
        currentSubreddit: null,
        gettingMoreData: false
    };

    state = {
        ...default_state,
        ...state
    };

    switch (action.type) {
        case 'SET_SUBREDDITS':
            return update(state, {
                subreddits: {$set: action.payload.value}
            });

        case 'ADD_SUBREDDIT':
            return update(state, {
                subreddits: {$push: [action.payload.value]}
            });

        case 'SET_SUBREDDIT_DATA':
            return update(state, {
                subredditData: {
                    [action.payload.subreddit]: {$set: action.payload.data}
                }
            });

        case 'UPDATE_SUBREDDIT_DATA':
            return update(state, {
                subredditData: {
                    [action.payload.subreddit]: {$push: action.payload.data}
                }
            });

        case 'SET_APP_LOADED':
            return update(state, {
                hasAppLoaded: {$set: action.payload.value}
            });

        case 'SET_CURRENT_SUBREDDIT':
            return update(state, {
                currentSubreddit: {$set: action.payload.value}
            });

        case 'SET_GETTINGMOREDATA_VALUE':
            return update(state, {
                gettingMoreData: {$set: action.payload.value}
            });

        default:
            return state
    }
};

export default reducer;