/* global Materialize */

module.exports = {
  loginRequired: function() {
    Materialize.toast('Login required!', 2000, 'error-text');
  },
  gameRejected: function() {
    Materialize.toast('Unable to join game', 2000, 'error-text');
  }
};
