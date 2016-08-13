var React = require('react'),
    Error = require("../shared/error"),
    ErrorUtil = require('../../util/error_util'),
    CurrentUserState = require('../../mixins/current_user_state'),
    GameSubscription = require('../../util/game_subscription');

module.exports = React.createClass({
  mixins: [CurrentUserState],

  getInitialState: function() {
    return {
      id: this.props.params.gameId,
      error: null
    };
  },

  componentDidMount: function() {
    GameSubscription.subscribe(this.state.id, this.rejected);
  },

  componentWillUnmount: function() {
    GameSubscription.unsubscribe();
  },

  rejected: function() {
    if (this.state.currentUser)
      ErrorUtil.gameRejected();
    else
      ErrorUtil.loginRequired();
  },

  render: function() {
    return (
      <Error error={this.state.error} />
    );
  }
});
