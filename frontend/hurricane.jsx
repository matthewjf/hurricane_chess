var React = require('react'),
    ReactDOM = require('react-dom');

var Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    BrowserHistory = require('react-router').browserHistory;

var Header = require('./components/layout/header'),
    LoginForm = require('./components/layout/login_form'),
    SignupForm = require('./components/layout/signup_form'),
    GameIndex = require('./components/games/index'),
    Game = require('./components/games/game');

var CurrentUserState = require("./mixins/current_user_state");

var App = React.createClass({
  mixins: [CurrentUserState],

  render: function(){
    return (
        <div id='app'>
          <Header currentUser={this.state.currentUser} />
            <SignupForm />
            <LoginForm />

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
      <Route path='games/:gameId' component={Game} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('app');
  ReactDOM.render(Rtr, root);
});


$(document).ready(function(){
  $('.modal-trigger').leanModal();
  $(".button-collapse").sideNav();
});
