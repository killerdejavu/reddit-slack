import Service from "./Service";
import _ from 'lodash';
import $ from 'jquery'

const default_subreddits = [
    'getMotivated',
    'aww',
    'bangalore',
    'Iama'
];

const PAGE_SIZE_LIMITS = {
    NEW_PAGE: 20,
    ADDITIONAL_DATA: 30
};

export const getDefaultData = () => dispatch => {
    let default_subreddits_from_storage = Service.getFromLocalStorage('my_subs');
    let subreddits = default_subreddits_from_storage || default_subreddits;
    let default_subreddit = subreddits[0];

    dispatch({
        type: 'SET_SUBREDDITS',
        payload: {
            value: subreddits,
        }
    });

    Service.getSubredditData(default_subreddit, PAGE_SIZE_LIMITS.NEW_PAGE)
    .then((response) => {

        dispatch({
            type: 'SET_SUBREDDIT_DATA',
            payload: {
                subreddit: default_subreddit,
                data: response.data.data.children
            }
        });

        dispatch({
            type: 'SET_CURRENT_SUBREDDIT',
            payload: {
                value: default_subreddit
            }
        });

        dispatch({
            type: 'SET_APP_LOADED',
            payload: {
                value: true
            }
        })
    });

    let remaining_subreddits = subreddits.slice(1, subreddits.length);

    _.each(remaining_subreddits, (subreddit) => {
        Service.getSubredditData(subreddit, PAGE_SIZE_LIMITS.NEW_PAGE)
        .then((response) => {
            dispatch({
                type: 'SET_SUBREDDIT_DATA',
                payload: {
                    subreddit: subreddit,
                    data: response.data.data.children
                }
            });
        })
    })
};

export const getMoreData = (subreddit, after) => dispatch => {
    dispatch({
        type: 'SET_GETTINGMOREDATA_VALUE',
        payload: {
            value: true
        }
    });

    Service.getSubredditData(subreddit, PAGE_SIZE_LIMITS.ADDITIONAL_DATA, after)
    .then((response) => {
        dispatch({
            type: 'UPDATE_SUBREDDIT_DATA',
            payload: {
                subreddit: subreddit,
                data: response.data.data.children
            }
        });
        dispatch({
            type: 'SET_GETTINGMOREDATA_VALUE',
            payload: {
                value: false
            }
        });

    })
};

export const updateCurrentSubreddit = (subreddit_name) => dispatch => {
    dispatch({
        type: 'SET_CURRENT_SUBREDDIT',
        payload: {
            value: subreddit_name
        }
    });

    $('.message-container').scrollTop(0);
};

export const addNewSubreddit = (subreddit) => dispatch => {

    Service.getSubredditData(subreddit, PAGE_SIZE_LIMITS.NEW_PAGE)
    .then((response) => {
        dispatch({
            type: 'SET_SUBREDDIT_DATA',
            payload: {
                subreddit: subreddit,
                data: response.data.data.children
            }
        });

        dispatch({
            type: 'ADD_SUBREDDIT',
            payload: {
                value: subreddit,
            }
        });

        dispatch(updateCurrentSubreddit(subreddit));
        let subs = Service.getFromLocalStorage("my_subs") || default_subreddits;
        subs.push(subreddit);
        Service.setToLocalStorage("my_subs", subs)

    });


};