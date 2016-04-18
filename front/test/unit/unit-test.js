var angular = require('angular');
require('./../../build/app.js');
require('./../../build/api.js')
require('angular-mocks');

describe('it should test', () => {
  var apiCtlr;
  it('should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('api'));
  beforeEach(angular.mock.inject(function($controller) {
    apiCtlr = $controller('apiCtlr');
  }));
  it('should construct a controller', function() {
    expect(typeof apiCtlr).toBe('object');
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
      apiCtlr.getPlayers();
      $httpBackend.flush();
      expect(apiCtlr.players.length).toBe(1);
      expect(apiCtlr.players[0].name).toBe('test player1');
    });

    // it('should create new player', () => {
    //   $httpBackend.expectPOST('http://localhost:3000/players')
    //   .respond(200, {name: 'test player2', alias: 'test_player2'});
    //   apiCtlr.addPlayer({name: 'test player2', alias: 'test_player2', makeEdit: false});
    //   $httpBackend.flush();
    //   expect(apiCtlr.players.length).toBe(2);
    //   expect(apiCtlr.players[1].name).toBe('test player2');
    //   // expect(apiCtlr.newPerson).toBeNull();
    // });
  });

});
