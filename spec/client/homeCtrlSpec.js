'use strict';

describe('HomeCtrl', function () {
  var $controller;

  beforeEach(module('epamInterviewer'));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  it('should work, na!', function () {
    expect(1).toBe(1);
  });

  it('should able to construct', function () {
    var $state = {
      go: function () {},
    };
    var controller = $controller('HomeCtrl', {
      $scope: {},
      $state: $state,
      user: { isLoggedIn: function () {} },
    });

    expect(controller).toBeDefined();
  });

  it('should redirect to login, if not logged in', function () {
    var $state = {
      go: function () {},
    };
    spyOn($state, 'go');
    var controller = $controller('HomeCtrl', {
      $scope: {},
      $state: $state,
      user: { isLoggedIn: function () {
        return false;
      }, },
    });

    expect($state.go).toHaveBeenCalledWith('login');
  });

  it('should not redirect to login, if logged in', function () {
    var $state = {
      go: function () {},
    };
    spyOn($state, 'go');
    var controller = $controller('HomeCtrl', {
      $scope: {},
      $state: $state,
      user: { isLoggedIn: function () {
        return true;
      }, },
    });

    expect($state.go).not.toHaveBeenCalledWith();
  });
});
