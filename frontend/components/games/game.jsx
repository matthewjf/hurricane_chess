var React = require('react'),
    Error = require("../shared/error"),
    GameSubscription = require('../../util/game_subscription');

module.exports = React.createClass({
  getInitialState: function() {
    return {id: this.props.params.gameId, error: null};
  },

  componentDidMount: function() {
    GameSubscription.subscribe(this.state.id);
  },

  componentWillUnmount: function() {
    GameSubscription.unsubscribe();
  },

  render: function() {
    return (
      <Error error={this.state.error} />
    );
  }
});
