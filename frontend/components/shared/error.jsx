var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return { error: this.props.error };
  },

  componentWillReceiveProps: function(props) {
    this.setState({error: props.error});
  },

  render: function() {
    if (this.state.error) {
      return (
        <div id='index-error' className="card-panel white-text error-color">
          <span>Uh oh. Bad things happened.</span>
        </div>
      );
    } else {
      return null;
    }
  }
});
