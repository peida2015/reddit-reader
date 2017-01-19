import React, { Component } from 'react';
import PostStore from '../stores/PostStore.js';
import { Container } from 'flux/utils';
import ApiUtil from '../ApiUtil.js';
import logo from '../../public/Reddit-icon.png';
import '../../public/normalize.css';
import '../../public/skeleton.css';

class Home extends Component {
  static getStores() {
    return [PostStore];
  }
  static calculateState() {
    return {
      posts: PostStore.getState(),

      fetchPosts: ApiUtil.fetchPosts
    }
  }

  render () {
    const childrenWithProps = React.Children.map(this.props.children, (child)=> {
      return React.cloneElement(child, this.state);
    });

    return (
      <div>
        <h2>Reddit Reader</h2>
        { childrenWithProps }
      </div>
    );
  }
}

export default Container.create(Home);
