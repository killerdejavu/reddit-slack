import axios from 'axios';

const Service = {

    getSubredditData: function (subreddit, limit=100, after, before) {
        return axios.get(`https://www.reddit.com/r/${subreddit}.json`, {
            params: {
                limit: limit,
                after: after,
                before: before
            }
        })
    },

    getFromLocalStorage: function (key) {
        let val = localStorage.getItem(key);
        return val ? JSON.parse(val): null
    },

    setToLocalStorage: function (key, data) {
        return localStorage.setItem(key, JSON.stringify(data))
    }

};

export default Service;