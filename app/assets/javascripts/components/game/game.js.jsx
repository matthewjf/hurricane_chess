var Game = React.createClass({
  getInitialState: function() {
    return {game: this.props.game};
  },

  componentDidMount: function() {
    this._setSubscription();
  },

  processBroadcast: function(data) {
  },

  render: function() {
    return(
      <div id='game-root'>
      </div>
    );
  },

  _setSubscription: function() {
    var self = this;
    /* global App */
    App.game = App.cable.subscriptions.create(
      {
        channel: "GameChannel",
        game_id: this.state.game.id
      },
      {
        connected: function() {
          console.log('connected to game channel');
        },

        disconnected: function() {
          console.log('disconnected from game channel');
        },

        received: function(data) {
          // Called when there's incoming data on the websocket for this channel
        }
      }
    );
  }
});
