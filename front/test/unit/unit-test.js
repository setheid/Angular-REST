var angular = require('angular');
require('./../../build/app.js');
require('./../../build/api.js')
require('angular-mocks');

describe('api routes', () => {
  var apiCtrl;
  it('should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.inject(function($controller) {
    apiCtrl = $controller('apiCtrl');
  }));
  it('should construct a controller', function() {
    expect(typeof apiCtrl).toBe('object');
  });
  describe('REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all players', () => {
      $httpBackend.expectGET('http://localhost:3000/players')
        .respond(200, ({players: [{name: 'test player1'}]}));
      apiCtrl.getPlayers();
      $httpBackend.flush();
      expect(apiCtrl.players.length).toBe(1);
      expect(apiCtrl.players[0].name).toBe('test player1');
    });

    it('should create new player', () => {
      $httpBackend.expectPOST('http://localhost:3000/players')
      .respond(200, {name: 'test player2', alias: 'test_player2'});
      apiCtrl.addPlayer({name: 'test player2', alias: 'test_player2'});
      $httpBackend.flush();
      expect(apiCtrl.players.length).toBe(2);
      expect(apiCtrl.players[1].name).toBe('test player2');
      // expect(apiCtrl.newPerson).toBeNull();
    });
  });

});
