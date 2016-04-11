'use strict';

require('angular');
require('./css/main.css');

let app = angular.module('apiApp', []);

app.controller('apiCtrl', ['$scope','$http', function($scope, $http) {
  let mainRoute = 'http://localhost:3000';

  this.getTeams = function() {
    $http.get(`${mainRoute}/teams`)
      .then((res) => {
        $scope.teams = res.data.teams;
        this.getPlayers();
      }, (err) => console.log(err));
  }

  this.getPlayers = function() {
    $http.get(`${mainRoute}/players`)
      .then((res) => {
        $scope.players = res.data.players;
        $scope.players.sort((a, b) => a.position - b.position).forEach((player) => {
          player.makeEdit = false;
        });
      }, (err) => console.log(err));
  }

  this.addPlayer = function() {
    var postNewPlayer = {};
    for (var key in $scope.newPlayer) {
      if ($scope.newPlayer[key]) {
        postNewPlayer[key] = $scope.newPlayer[key];
      }
    }
    if (postNewPlayer.current_team) postNewPlayer.current_team = postNewPlayer.current_team.replace(/\s+/g,'_');
    $http.post(`${mainRoute}/players`, postNewPlayer)
    .then((res) => {
      $scope.players.push(res.data.player);
      resetAddPlayer();
      console.log(res.data.message);
    }, (err) => console.log(err));
  }

  this.addTeam = function() {
    $http.post(`${mainRoute}/teams`, {
      'name':$scope.newTeam.name.replace(/\s+/g,'_'),
      'region':$scope.newTeam.region
    })
    .then((res) => {
      resetAddTeam();
      this.getTeams();
      console.log(res.data.message);
    }, (err) => console.log(err));
  }

  $scope.edit = (player) => player.makeEdit === false ? player.makeEdit = true : player.makeEdit = false;

  this.update = function(player){
    player.name = player.newName ? player.newName : player.name,
    player.alias = player.newAlias ? player.newAlias : player.alias,
    player.position = player.newPosition ? player.newPosition : player.position,
    player.country = player.newCountry ? player.newCountry : player.country,
    player.current_team = player.newTeam ? player.newTeam.replace(/\s+/g,'_') : player.current_team

    $http.put(`${mainRoute}/players/${player._id}`, player)
    .then((res) => {
      this.cancel(player);
      console.log(res.data.message);
    }, (err) => {
      console.log(err);
    });
  }

  this.deleteTeam = (team) => {
    $http.delete(`${mainRoute}/teams/${team._id}`)
    .then((res) => {
      console.log(res.data.message);
      this.getTeams();
    }, (err) => console.log(err));
  }

  this.deletePlayer = (player) => {
    $http.delete(`${mainRoute}/players/${player._id}`)
    .then((res) => {
      $scope.players = $scope.players.filter(ele => ele._id != player._id);
      console.log(res.data.message);
    }, (err) => console.log(err));
  }

  this.cancel = (player) => {
    // do a for in and delete all properties that contain 'new'
    player.newName = undefined;
    player.newAlias = undefined;
    player.newPosition = undefined;
    player.newCountry = undefined;
    player.newTeam = undefined;
    player.makeEdit = false;
  }
  function resetAddPlayer() {
    $scope.newPlayer.name = undefined;
    $scope.newPlayer.alias = undefined;
    $scope.newPlayer.position = undefined;
    $scope.newPlayer.country = undefined;
    $scope.newPlayer.current_team = undefined;
  }
  function resetAddTeam() {
    $scope.newTeam.name = undefined;
    $scope.newTeam.region = undefined;
  }
  this.getTeams();
}]);
