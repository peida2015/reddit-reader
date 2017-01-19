import React, { Component } from 'react';
import linkLogo from '../../public/link.png';
import commentLogo from '../../public/chat.png';

class PostCard extends Component {
  componentWillMount() {
  }

  thumbnailLink (post) {
    let thumbnail;

    if (post.thumbnail === "default" || "self") {
      if (post.preview) {
        thumbnail = post.preview.images[0].source.url;
      } else if (post.thumbnail === "default") {
        thumbnail = linkLogo;
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

    return (
      <div className="four columns thin-border post-card-height post-card-margin row-adjustment">
        <img className="responsive-img" alt={`by: ${post.author}`} src={ thumbnail }/>
        <div className="centered eighty-percent non-overflow">{post.title}</div>
      </div>
    );
  }
}

export default PostCard;
