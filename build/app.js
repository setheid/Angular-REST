'use strict';

(function() {

let app = angular.module('app', ['api']);

app.controller('appCtlr', appCtrl);

function appCtrl() {

  this.edit = player => player.makeEdit = !player.makeEdit;

  this.cancel = player => {
    // do a for in and delete all properties that contain 'new'
    player.newName = undefined;
    player.newAlias = undefined;
    player.newPosition = undefined;
    player.newCountry = undefined;
    player.newTeam = undefined;
    player.makeEdit = false;
  }
};

})();
