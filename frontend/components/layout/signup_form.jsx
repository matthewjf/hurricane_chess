var React = require('react');
var UserApi = require('../../util/user_api');

module.exports = React.createClass({
  getInitialState: function(){
    return {username: '', password: '', currentUser: this.props.currentUser};
  },

  setUsername: function(e){
    this.setState({username: e.currentTarget.value});
  },

  setPassword: function(e){
    this.setState({password: e.currentTarget.value});
  },

  resetState: function() {
    this.setState({username: '', password: ''});
  },

  handleSubmit: function(e){
    e.preventDefault();
    UserApi.signup(this.state);
  },

  render: function(){
    if (this.state.currentUser) {
      return null;
    } else {
      return (
        <div id="signup" className="modal">
          <div className='row'>
            <form onSubmit={this.handleSubmit} >

              <div className="modal-content">

                <div className='row'>
                  <div className='input-field'>
                    <input id="signup[username]"
                           type="text"
                           value={this.state.username}
                           onChange={this.setUsername} />
                    <label htmlFor="signup[username]">Username</label>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field'>
                    <input id="signup[password]"
                           type="password"
                           value={this.state.password}
                           onChange={this.setPassword} />
                    <label htmlFor="signup[password]">Password</label>
                  </div>
                </div>
              </div>

              <div className='modal-footer'>
                <input type='submit'
                       value='sign up'
                       className="waves-effect waves-light btn" />
              </div>

            </form>
          </div>
        </div>
      );
    }
  }
});
