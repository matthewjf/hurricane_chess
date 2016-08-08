var React = require('react'),
    ReactDOM = require('react-dom');

var Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    BrowserHistory = require('react-router').browserHistory;

var Header = require('./components/layout/header'),
    GameIndex = require('./components/games/index');

var App = React.createClass({
  render: function(){
    return (
        <div id='app'>
          <Header />
          <main>
            {this.props.children}
          </main>
        </div>
    );
  }
});

var Rtr = (
  <Router history={BrowserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={GameIndex} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('app');
  ReactDOM.render(Rtr, root);
});
