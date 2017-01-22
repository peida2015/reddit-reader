import React, { Component } from 'react';
import PostStore from '../stores/PostStore.js';
import SubredditStore from '../stores/SubredditStore.js';
import ApiStatus from '../stores/ApiStatus.js';
import { Container } from 'flux/utils';
import ApiUtil from '../ApiUtil.js';
import Label from './Label.jsx';
import logo from '../../public/Reddit-icon.png';
import '../../public/normalize.css';
import '../../public/skeleton.css';
import SubredditActions from '../actions/SubredditActions.js';

class Home extends Component {
  static getStores() {
    return [PostStore, SubredditStore, ApiStatus];
  }

  static calculateState() {
    return {
      posts: PostStore.getState(),
      subreddits: SubredditStore.getState(),
      apistatus: ApiStatus.getState(),

      fetchPosts: ApiUtil.fetchPosts
    }
  }

  constructor(props) {
    super(props);
    this.state = { newSubreddit: "", lastEntered: "" };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  componentWillUpdate() {
  }

  handleInput(e) {
    this.setState({ newSubreddit : e.target.value } );
  }


  handleSubmission(e) {
    e.preventDefault();
    ApiUtil.fetchPosts(this.state.newSubreddit);
    let lastEntered = this.state.newSubreddit.toLowerCase();
    this.setState({
      newSubreddit : "" ,
      lastEntered: lastEntered
    });
  }

  flashMessage () {
    let flashMessage;
    if (this.state.lastEntered === "") {
      flashMessage = "";
    } else if (this.state.apistatus) {
      flashMessage = (<span className="bottom-flash bottom-flash-loading">
        { `Loading ${this.state.lastEntered}` }
      </span>);
    } else if (!this.state.subreddits.has(this.state.lastEntered)) {
      flashMessage = (<span className="bottom-flash bottom-flash-warning">
        { `There is nothing for ${this.state.lastEntered}` }
      </span>);
    };
    return flashMessage;
  }

  render () {
    const childrenWithProps = React.Children.map(this.props.children, (child)=> {
      return React.cloneElement(child, this.state);
    });

    let subreddits = this.state.subreddits.toJS();

    subreddits = subreddits.map((subreddit, idx)=> {
      return (
        <Label  key={subreddit} subreddit={subreddit}
          removeAction={
            SubredditActions.removeSubreddit.bind(this, subreddit)
          }/>
      )
    });

    let flashMessage = this.flashMessage.call(this);

    return (
      <div>
        {/* header end  */}
        <div className="header fixed-space">
          <div className="centered">
            <img className="logo-img" alt="logo" src={logo}/>
            <h2 className="header-title">Reddit Reader</h2>
          </div>
        </div>
        {/* header end  */}
        <div className="header-padding"></div>
        { childrenWithProps }
        {/* footer */}
        <div className="footer fixed-space">
          <form onSubmit={ this.handleSubmission }>
            <div className="three columns">
              <input className="u-full-width" type="text"
                onChange={ this.handleInput }
                placeholder="Enter a subreddit"
                value={ this.state.newSubreddit }/>
            </div>
            { flashMessage }
            <div className="one columns">
              <input className="button-primary"  type="submit"  value="Add"/>
            </div>
            <div className="six columns thin-border">
              { subreddits }
            </div>
          </form>
        </div>
        {/* footer end  */}
      </div>
    );
  }
}

export default Container.create(Home);
