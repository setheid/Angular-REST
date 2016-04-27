'use strict';

(function() {

let app = angular.module('app', ['api']);

app.controller('appCtrl', appCtrl);

function appCtrl() {
  let _this = this;

  _this.edit = player => player.makeEdit = !player.makeEdit;

  _this.confirmDel = team => team.confirm = !team.confirm;

  _this.cancel = player => {
    player.edited = {};
    player.makeEdit = false;
  }
};

app.directive('teamsList', () => {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/teams-list.html'
  }
});

app.directive('playerView', () => {
  return {
    restrict: 'A',
    templateUrl: 'templates/player-view.html'
  }
});

app.directive('addPlayer', () => {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/add-player.html'
  }
});

app.directive('addTeam', () => {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/add-team.html'
  }
});

})();
