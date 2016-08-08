var React = require('react'),
    BrowserHistory = require('react-router').browserHistory;

module.exports = React.createClass({
  getInitialState: function() {
    return {game: this.props.game};
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({game: newProps.game});
  },

  handleClick: function(e) {
    e.preventDefault();
    console.log('clicked on game');
  },

  render: function() {
    return(
      <li className="row">
        <a onClick={this.handleClick}>
          <div className="game card-panel hoverable waves-effect">
            <span data={this.state.game.id}>id {this.state.game.id}</span>
          </div>
        </a>
      </li>
    );
  }
});
