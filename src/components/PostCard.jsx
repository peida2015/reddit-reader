import React, { Component } from 'react';
import upIcon from '../../public/up.png';
import linkLogo from '../../public/link.png';
import commentLogo from '../../public/chat.png';
import matureLogo from '../../public/AdultsOnly.png';
import { Link } from 'react-router';

class PostCard extends Component {

  thumbnailLink (post) {
    let thumbnail;

    // Check post.thumbnail to see if it's a valid URL and assign URLaccordingly
    if (!post.thumbnail.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/) ) {
      if (post.preview) {
        thumbnail = post.preview.images[0].source.url;
      } else if (post.thumbnail === "default") {
        thumbnail = linkLogo;
      } else if (post.thumbnail === "image") {
        thumbnail = post.url;
      } else if (post.thumbnail === "nsfw"){
        thumbnail = matureLogo;
      } else {
        thumbnail = commentLogo;
      };

    } else {
      thumbnail = post.thumbnail;
    }
    return thumbnail;
  }

  submitNewSubreddit(subreddit) {
    // Submit a request only if it's not currently active.
    if (!this.props.currentSubreddits.has(subreddit)) {
      this.props.fetchPosts(subreddit);
    };
  }

  render () {
    let post = this.props.post.data;
    let thumbnail = this.thumbnailLink(post);
    if (thumbnail !== commentLogo && thumbnail !== linkLogo) {
      thumbnail = thumbnail.replace(/&amp/g, "&").replace(/;/g,"");
    };

    return (
      <div className="four columns thin-border post-card-height post-card-margin row-adjustment">
        <Link to={ post.url.replace(/&amp/g, "&").replace(/;/g,"") } target="_blank">
          <img className="responsive-img" alt={`by: ${post.author}`}
                src={ thumbnail }/>
          <div className="centered eighty-percent non-overflow">
            {post.title}
          </div>
        </Link>
          <div className="u-pull-left subreddit-label"
              onClick={ this.submitNewSubreddit.bind(this, post.subreddit) }>
            { post.subreddit }
          </div>
          <div className="u-pull-right">
            <span>
              <img className="vertical-align up-icon" src={upIcon} alt="up"/>
            </span>
            <span className="vertical-align">
              { parseInt(post.ups, 10)-parseInt(post.downs, 10) }
            </span>
          </div>
      </div>
    );
  }
}

export default PostCard;
