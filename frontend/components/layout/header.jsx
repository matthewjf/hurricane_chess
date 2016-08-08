var React = require('react'),
    BrowserHistory = require('react-router').browserHistory;

/* global Materialize */

module.exports = React.createClass({
	componentDidMount: function() {
    $(document).ready(function(){
      $('.modal-trigger').leanModal();
    	$(".button-collapse").sideNav();
    });
	},

  logout: function(e){
  },

	successLogout: function() {
	},

	home: function() {
    BrowserHistory.push('/');
	},

  render: function() {
    return (
      <nav>
        <div className='nav-wrapper' id='header'>
          <a onClick={this.home} className='brand-logo center' id='logo'>
            Hurricane Chess
          </a>

          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#">?</a></li>
          </ul>

          <ul className="side-nav" id="mobile-demo">
            <li><a href="#">?</a></li>
          </ul>
        </div>

      </nav>
    );
  }

});
