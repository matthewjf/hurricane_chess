var React = require('react'),
    GameSubscription = require('../../util/game_subscription');

module.exports = React.createClass({
  getInitialState: function() {
    return {id: this.props.params.gameId};
  },

  componentDidMount: function() {
    GameSubscription.subscribe(this.state.id);
  },

  componentWillUnmount: function() {
    GameSubscription.unsubscribe();
  },

  render: function() {
    return null;
  }
});
