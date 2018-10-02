import {connect} from 'react-redux';
import App from "./App";
import {
    addNewSubreddit,
    getDefaultData,
    getMoreData,
    updateCurrentSubreddit
} from "./actions";

function mapStateToProps(state, passed_props) {
    return {
        hasAppLoaded: state.hasAppLoaded,
        currentSubreditData: state.subredditData[state.currentSubreddit],
        currentSubreddit: state.currentSubreddit,
        subreddits: state.subreddits,
        gettingMoreData: state.gettingMoreData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDefaultData: function(){
            dispatch(getDefaultData())
        },
        updateCurrentSubreddit: function (subreddit_name) {
            dispatch(updateCurrentSubreddit(subreddit_name))
        },
        getMoreData: function (subreddit, after) {
            dispatch(getMoreData(subreddit, after))
        },
        addNewSubreddit: function (subreddit) {
            dispatch(addNewSubreddit(subreddit))
        }
    };
}


let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;