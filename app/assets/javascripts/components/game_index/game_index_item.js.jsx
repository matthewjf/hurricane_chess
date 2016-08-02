var GameIndexItem = React.createClass({
  getInitialState: function() {
    return {game: this.props.game};
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({game: newProps.game});
  },

  render: function() {
    return(
      <li className="row" onClick={this.handleClick} >
        <a href={'/games/' + this.state.game.id}>
          <div className="game card-panel hoverable waves-effect">
            <span data={this.state.game.id}>id {this.state.game.id}</span>
          </div>
        </a>
      </li>
    );
  }
});
