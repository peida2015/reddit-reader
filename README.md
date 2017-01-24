#Reddit Reader

To get started with this app, navigate to a desired directory in terminal, and enter:

```
  git clone https://github.com/peida2015/reddit-reader.git
  cd ./reddit-reader
  npm install
  npm start
```

npm start command will compile and serve the app at default http://localhost:3000 and open up new browser window for you.

##Routes
Only two routes are valid: "/index" and "/index/:subreddits".

##Features

1. It loads reddit.com frontpage 'hot' posts by default.
2. User can add/remove subreddits to load posts for those subreddits.
3. Posts loaded from different subreddits are sorted by the most net up votes.
4. Infinite scroll.
5. Route param /index/:subreddits allows users to enter comma-separated or "+"-separated subreddits in URL.


##How does it work?
1. This app does not load any subscribed subreddits from any reddit account.  User can either add subreddits in the given form or as :subreddits route params.  If there is not any active subreddit, the "hot" listing from the reddit homepage will be loaded.

2. Once a subreddit is entered, an ajax request will be made to http://www.reddit.com/r/:subreddit.json with queryParams of limit=30.  Alternatively, if subreddits are entered as url params, they will be parsed and made one-by-one.

3. If the listing for a subreddit is successfully loaded, a "POSTS_RECEIVED" action is dispatched with "posts"(current batch of posts) and "after"(for pagination) to add posts data to PostStore.  At the same time, an "ADD_SUBREDDIT" action will also be dispatched to add the subreddit as an active subreddit to the SubredditStore.  Both stores are flux/util ReduceStore's.

4. Listing data will then be aggregated, sorted, and rendered in PIndex component.

5. If a new subreddit is added, it will be displayed at the bottom and path param will also be updated to reflect that.  Only valid subreddits will be added and reflected in the url even if invalid ones were entered along with them in path.  Comma-separated param will be converted to a "+"separated one.

6. A scroll listener is attached to window upon loading Home component.  When it's scrolled within 1000px of the page bottom, new listings will be loaded for each subreddit until exhausted for the "infinite scroll".  The "scroll" event is throttled to make request no more than once per second to reduce performance problems.  Load More" button will also load more listings for currently active subreddits.

Enjoy!
