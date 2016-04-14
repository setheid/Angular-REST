'use strict';

(function() {

let app = angular.module('app', ['api']);

app.controller('appCtlr', appCtrl);

function appCtrl() {

  this.edit = player => player.makeEdit = !player.makeEdit;

  this.cancel = player => {
    for (var key in player) {
      if (key.slice(0, 3) === 'new') {
        delete player[key];
      }
    }
    player.makeEdit = false;
  }
};

})();
