/* global Materialize */

var React = require('react'),
    BrowserHistory = require('react-router').browserHistory;

var UserApi = require('../../util/user_api');

module.exports = React.createClass({
  getInitialState: function() {
    return {currentUser: this.props.currentUser};
  },

	componentDidMount: function() {
    $(document).ready(function(){
      $('.modal-trigger').leanModal();
    	$(".button-collapse").sideNav();
    });
	},

  componentWillReceiveProps: function(props) {
    this.setState({currentUser: props.currentUser});
  },

  logout: function(e){
    e.preventDefault();
    UserApi.logout(this.successLogout);
  },

	successLogout: function() {
    Materialize.toast('Logged out', 2000, 'green-text');
	},

	home: function() {
    BrowserHistory.push('');
	},

  desktopLinks: function(){
  if (this.state.currentUser) {
    return (
      <ul className="right hide-on-med-and-down">
        <li><a onClick={this.logout}>Log Out</a></li>
      </ul>
    );
  }
  return (
    <ul className="right hide-on-med-and-down">
      <li><a className="modal-trigger" href='#signup'>
        Sign Up
      </a></li>
      <li><a className="modal-trigger" href='#login'>
        Log In
      </a></li>
    </ul>
  );
},

mobileLinks: function(){
    if (this.state.currentUser) {
			return (
        <ul id="nav-mobile" className="side-nav">
          <li><a onClick={this.logout}>Log Out</a></li>
        </ul>
      );
		}
    return (
      <ul id="nav-mobile" className="side-nav">
				<li><a className="modal-trigger" href='#signup'>
					Sign Up
				</a></li>
        <li><a className="modal-trigger" href='#login'>
					Log In
				</a></li>
      </ul>
    );
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
