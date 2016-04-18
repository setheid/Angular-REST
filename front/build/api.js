'use strict';

(function() {

let app = angular.module('api', []);
app.controller('apiCtrl', ['$http', apiCtrl]);

function apiCtrl($http) {
  let _this = this;
  let mainRoute = 'http://localhost:3000';

  _this.getTeams = function() {
    $http.get(`${mainRoute}/teams`)
      .then(res => {
        _this.teams = res.data.teams;
        _this.getPlayers();
      }, err => console.log(err));
  }

  _this.getPlayers = function() {
    $http.get(`${mainRoute}/players`)
      .then((res) => {
        _this.players = res.data.players;
        _this.players.sort((a, b) => a.position - b.position).forEach(player => {
          player.makeEdit = false;
        });
      }, (err) => console.log(err));
  }

  _this.addPlayer = function(player) {
    if (player.current_team) player.current_team = player.current_team.replace(/\s+/g,'_');
    $http.post(`${mainRoute}/players`, player)
    .then((res) => {
      let newPlayer = res.data.player;
      newPlayer.makeEdit = false;
      _this.players.push(newPlayer);
      resetAddPlayer();
      console.log(res.data.message);
    }, (err) => console.log(err));
  }

  function resetAddPlayer() {
    _this.newPlayer = {};
  }

  _this.addTeam = function(team) {
    if (!team.name) return;
    team.name = team.name.replace(/\s+/g,'_');
    $http.post(`${mainRoute}/teams`, team)
    .then((res) => {
      _this.teams.push(res.data.data);
      resetAddTeam();
      console.log(res.data.message);
    }, (err) => console.log(err));
  }

  function resetAddTeam() {
    _this.newTeam = {};
  }

  _this.update = function(player){
    player.name = player.edited.name ? player.edited.name : player.name;
    player.alias = player.edited.alias ? player.edited.alias : player.alias;
    player.position = player.edited.position ? player.edited.position : player.position;
    player.country = player.edited.country ? player.edited.country : player.country;
    player.current_team = player.edited.current_team ? player.edited.current_team.replace(/\s+/g,'_') : player.current_team;

    $http.put(`${mainRoute}/players/${player._id}`, player)
    .then((res) => {
      console.log(res.data.message);
      player.makeEdit = false;
      player.edited = {};
    }, (err) => {
      console.log(err);
    });
  }

  _this.deleteTeam = (team) => {
    $http.delete(`${mainRoute}/teams/${team._id}`)
    .then((res) => {
      console.log(res.data.message);
      _this.teams = _this.teams.filter(ele => ele._id !== team._id);
    }, (err) => console.log(err));
  }

  _this.deletePlayer = (player) => {
    $http.delete(`${mainRoute}/players/${player._id}`)
    .then((res) => {
      _this.players = _this.players.filter(ele => ele._id != player._id);
      console.log(res.data.message);
    }, (err) => console.log(err));
  }
}

})();
