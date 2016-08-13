module.exports = {
  reset: function() {
    /* global App */
    window.App.cable.disconnect();
    window.App.cable.connect();
  },
};
