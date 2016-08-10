/* global Materialize */

var React = require('react');
var UserApi = require('../../util/user_api');

module.exports = React.createClass({
  getInitialState: function() {
    return {username: '', password: ''};
  },

  setUsername: function(e) {
    this.setState({username: e.currentTarget.value});
  },

  setPassword: function(e) {
    this.setState({password: e.currentTarget.value});
  },

  resetState: function() {
    this.setState({username: '', password: ''});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    UserApi.login(this.state, this.success);
  },

  success: function(data) {
    this.resetState();
    $('#login-modal').closeModal();
    Materialize.toast('Welcome back, ' + data.username + '!', 2000);
  },

  render: function() {
    if (this.state.currentUser) {
      return null;
    } else {
      return (
        <div id="login-modal" className="modal">
          <div className='row'>
            <form onSubmit={this.handleSubmit} >

              <div className="modal-content">

                <div className='row'>
                  <div className='input-field'>
                    <input id="login[username]"
                           type="text"
                           value={this.state.username}
                           onChange={this.setUsername} />
                    <label htmlFor="login[username]">Username</label>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field'>
                    <input id="login[password]"
                           type="password"
                           value={this.state.password}
                           onChange={this.setPassword} />
                    <label htmlFor="login[password]">Password</label>
                  </div>
                </div>
              </div>

              <div className='modal-footer'>
                <input type='submit'
                       value='login'
                       className="waves-effect waves-light btn" />
              </div>

            </form>
          </div>
        </div>
      );
    }
  }
});
