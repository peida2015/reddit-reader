import React, { Component } from 'react';
import linkLogo from '../../public/link.png';
import commentLogo from '../../public/chat.png';
import matureLogo from '../../public/AdultsOnly.png';
import { Link } from 'react-router';

class PostCard extends Component {
  componentWillMount() {
  }

  thumbnailLink (post) {
    let thumbnail;

    // Check post.thumbnail to see if it's a valid URL and assign URL accordingly
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

  render () {
    let post = this.props.post.data;
    let thumbnail = this.thumbnailLink(post);
    if (thumbnail !== commentLogo && thumbnail !== linkLogo) {
      thumbnail = thumbnail.replace(/&amp/g, "&").replace(/;/g,"");
    };

    return (
      <div className="four columns thin-border post-card-height post-card-margin row-adjustment">
        <Link to={ post.url.replace(/&amp/g, "&").replace(/;/g,"") } target="_blank">
          <img className="responsive-img" alt={`by: ${post.author}`} src={ thumbnail }/>
          <div className="centered eighty-percent non-overflow">{post.title}</div>
        </Link>
      </div>
    );
  }
}

export default PostCard;
