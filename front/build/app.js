'use strict';

(function() {

let app = angular.module('app', ['api']);

app.controller('appCtrl', appCtrl);

function appCtrl() {

  this.edit = player => player.makeEdit = !player.makeEdit;

  this.cancel = player => {
    player.edited = {};
    player.makeEdit = false;
  }
};

app.directive('playerView', function() {
  return {
    restrict: 'A',
    templateUrl: 'player-view.html'
  }
});

})();
