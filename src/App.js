import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Message from "./Message";
import _ from 'lodash';

class App extends Component {
    componentDidMount() {
        this.props.getDefaultData();
    }

    render() {
        if (!this.props.hasAppLoaded) {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </header>
                </div>
            );
        }
        else {
            return (
                <div className="main-app">
                    <div className="app-sidebar">
                        {this.renderSubReddits()}
                    </div>
                    <div className="app-center">
                        <div className="message-container">
                            {this.renderMessages()}
                            {this.renderMoreMessagesText()}
                        </div>
                    </div>
                </div>
            );
        }
    }

    renderMessages() {
        return _.map(this.props.currentSubreditData, (data) => {
            return (<Message key={data.data.id} data={data}/>)
        })
    }

    renderSubReddits() {
        let subreddits = _.map(this.props.subreddits, (subreddit_name) => {
            return (
                <div className="subreddit"
                     key={`name_${subreddit_name}`}
                     onClick={() => this.props.updateCurrentSubreddit(subreddit_name)}>
                    # &nbsp;{subreddit_name}
                </div>
            )
        });

        return (
            <div className="subreddit-container">
                {subreddits}
                <div className="subreddit-container-new">
                    Add new subreddit
                    <input type="text" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            console.log('Adding new sub');
                            this.props.addNewSubreddit(e.target.value)
                        }
                    }}/>
                </div>
            </div>
        )
    }

    renderMoreMessagesText() {
        if (this.props.gettingMoreData) {
            return (
                <div className="message-more message-more-getting">
                    <i> Getting more data...</i>
                </div>
            )
        }
        else {
            return (
                <div className="message-more"
                     onClick={() => this.props.getMoreData(this.props.currentSubreddit, this.props.currentSubreditData[this.props.currentSubreditData.length - 1].data.name)}>
                    Get more data
                </div>

            )
        }
    }
}

export default App;
