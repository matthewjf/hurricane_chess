/* global Materialize */

var React = require('react'),
    BrowserHistory = require('react-router').browserHistory;

var UserApi = require('../../util/user_api');

var LoginForm = require('./login_form'),
    SignupForm = require('./signup_form');

module.exports = React.createClass({
  getInitialState: function() {
    return {currentUser: this.props.currentUser};
  },

  componentWillReceiveProps: function(props) {
    this.setState({currentUser: props.currentUser});
  },

  logout: function(e){
    e.preventDefault();
    UserApi.logout(function(){
      Materialize.toast('Logged out', 2000, 'error-text');
    });
  },

	home: function() {
    BrowserHistory.push('');
	},

  openLogin: function() {
		$('#login-modal').openModal();
	},

	openSignup: function() {
		$('#signup-modal').openModal();
	},

  desktopLinks: function(){
    return this.links("right hide-on-med-and-down");
  },

  mobileLinks: function(className, id){
    return this.links('side-nav', 'nav-mobile');
  },

  links: function(className, id){
    if (this.state.currentUser) {
			return (
        <ul id={id} className={className}>
          <li><a id='logout' onClick={this.logout}>Log Out</a></li>
        </ul>
      );
		} else {
      return (
        <ul id={id} className={className}>
  				<li><a onClick={this.openSignup} className="modal-trigger">
  					Sign Up
  				</a></li>
          <li><a onClick={this.openLogin} className="modal-trigger">
  					Log In
  				</a></li>
        </ul>
      );
    }
  },

  render: function() {
    return (
      <nav>
        <div className='nav-wrapper' id='header'>
          <a onClick={this.home} className='brand-logo center' id='logo'>
            Hurricane Chess
          </a>

          <a href="#" data-activates="nav-mobile" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>

          {this.desktopLinks()}
          {this.mobileLinks()}
        </div>

      </nav>
    );
  }

});
