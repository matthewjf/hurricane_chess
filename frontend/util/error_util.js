/* global Materialize */

module.exports = {
  loginRequired: function() {
    Materialize.toast('Login required!', 2000, 'error-text');
  }
};
