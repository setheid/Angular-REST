'use strict';

(function() {

let app = angular.module('api', []);
app.controller('apiCtlr', ['$http', apiCtlr]);

function apiCtlr($http) {
  let _this = this;
  let mainRoute = 'http://localhost:3000';

  _this.getTeams = function() {
    $http.get(`${mainRoute}/teams`)
      .then((res) => {
        _this.teams = res.data.teams;
        _this.getPlayers();
      }, (err) => console.log(err));
  }

  _this.getPlayers = function() {
    $http.get(`${mainRoute}/players`)
      .then((res) => {
        _this.players = res.data.players;
        _this.players.sort((a, b) => a.position - b.position).forEach((player) => {
          player.makeEdit = false;
        });
      }, (err) => console.log(err));
  }

  _this.addPlayer = function() {
    var playerToPost = {};
    for (var key in _this.newPlayer) {
      if (_this.newPlayer[key]) {
        playerToPost[key] = _this.newPlayer[key];
      }
    }
    if (playerToPost.current_team) playerToPost.current_team = playerToPost.current_team.replace(/\s+/g,'_');
    $http.post(`${mainRoute}/players`, playerToPost)
    .then((res) => {
      res.data.player.makeEdit = false;
      _this.players.push(res.data.player);
      resetAddPlayer();
      console.log(res.data.message);
    }, (err) => console.log(err));
  }

  function resetAddPlayer() {
    _this.newPlayer.name = undefined;
    _this.newPlayer.alias = undefined;
    _this.newPlayer.position = undefined;
    _this.newPlayer.country = undefined;
    _this.newPlayer.current_team = undefined;
  }

  _this.addTeam = function() {
    $http.post(`${mainRoute}/teams`, {
      'name':_this.newTeam.name.replace(/\s+/g,'_'),
      'region':_this.newTeam.region
    })
    .then((res) => {
      resetAddTeam();
      _this.getTeams();
      console.log(res.data.message);
    }, (err) => console.log(err));
  }

  function resetAddTeam() {
    _this.newTeam.name = undefined;
    _this.newTeam.region = undefined;
  }

  _this.update = function(player){
    player.name = player.newName ? player.newName : player.name,
    player.alias = player.newAlias ? player.newAlias : player.alias,
    player.position = player.newPosition ? player.newPosition : player.position,
    player.country = player.newCountry ? player.newCountry : player.country,
    player.current_team = player.newTeam ? player.newTeam.replace(/\s+/g,'_') : player.current_team

    $http.put(`${mainRoute}/players/${player._id}`, player)
    .then((res) => {
      console.log(res.data.message);
    }, (err) => {
      console.log(err);
    });
  }

  _this.deleteTeam = (team) => {
    $http.delete(`${mainRoute}/teams/${team._id}`)
    .then((res) => {
      console.log(res.data.message);
      _this.getTeams();
    }, (err) => console.log(err));
  }

  _this.deletePlayer = (player) => {
    $http.delete(`${mainRoute}/players/${player._id}`)
    .then((res) => {
      _this.players = _this.players.filter(ele => ele._id != player._id);
      console.log(res.data.message);
    }, (err) => console.log(err));
  }

  _this.getTeams();
}

})();
