import React, {Component} from 'react';
import moment from 'moment';
import './Message.css';
import Util from "./Util";
import _ from 'lodash';

class Message extends Component {
    render() {
        let data = this.props.data.data;
        let date_created = moment.unix(data.created_utc);

        return (
            <div className="message">
                <div className="message-ts"
                     title={date_created.format("MMMM Do YYYY, h:mm A")}>
                    {date_created.format("hh:mm A")}
                </div>
                <div className="message-content">
                    <div className="message-header">
                        <span className="message-author-name" style={{color: Util.getRandomColorAccordingToId(data.author.toLowerCase())}}>
                            {data.author.toLowerCase()}
                        </span>
                        <span className="message-title">
                            {_.unescape(data.title)}
                        </span>
                    </div>
                    <div className="message-attachment">
                        <div className="message-attachment-border"></div>
                        <div className="message-attachment-content">
                            {Message.renderSelfText(data)}
                            {Message.renderMedia(data)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    static renderMedia(data) {
        let preview_src = data.preview && data.preview.images && data.preview.images.length && data.preview.images[0].source.url;
        let media_src = (data.media && data.media.reddit_video && data.media.reddit_video.fallback_url) || (data.preview && data.preview.reddit_video_preview && data.preview.reddit_video_preview.fallback_url);
        let media_oembed_html = data.media && data.media.oembed && data.media.oembed.html;

        if (media_oembed_html) {
            return (
                <div className="preview-pic" dangerouslySetInnerHTML={{__html: _.unescape(media_oembed_html)}}/>
            );
        }
        if (media_src) {
            return (
                <video className="preview-pic"
                       controls
                       muted={true}
                       poster={preview_src}
                       loop={true}
                       preload="metadata">
                    <source src={media_src}/>
                </video>
            );
        }
        if (preview_src) return (<img className="preview-pic" src={preview_src} alt="alt-img"/>);

        return null;
    }

    static renderSelfText(data) {
        return (
            <div className="message-attachment-selftext" dangerouslySetInnerHTML={{__html: _.unescape(data.selftext_html)}}/>
        )
    }
}

export default Message;