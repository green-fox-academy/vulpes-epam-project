'use strict';

describe('RegisterCtrl', function () {
  var $controller;

  beforeEach(module('epamInterviewer'));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  it('should work, na!', function () {
    expect(1).toBe(1);
  });

  it('should able to construct', function () {
    var controller = $controller('RegisterCtrl', {
      $scope: {},
      $state: {},
      user: { isLoggedIn: function () {} },
    });

    expect(controller).toBeDefined();
  });

  it('should redirect to home, if logged in', function () {
    var $state = {
      go: function () {},
    };
    spyOn($state, 'go');
    var controller = $controller('RegisterCtrl', {
      $scope: {},
      $state: $state,
      user: { isLoggedIn: function () {
        return true;
      }, },
    });

    expect($state.go).toHaveBeenCalledWith('home');
  });

  it('should not redirect to home, if not logged in', function () {
    var $state = {
      go: function () {},
    };
    spyOn($state, 'go');
    var controller = $controller('RegisterCtrl', {
      $scope: {},
      $state: $state,
      user: { isLoggedIn: function () {
        return false;
      }, },
    });

    expect($state.go).not.toHaveBeenCalledWith();
  });

  it('should redirect on calling log in', function (done) {
    var $state = {
      go: function () {},
    };
    spyOn($state, 'go');
    var $scope = {};
    var controller = $controller('RegisterCtrl', {
      $scope: $scope,
      $state: $state,
      user: {
        isLoggedIn: function () {
          return false;
        },

        addNewUser: function () {
          return Promise.resolve();
        },
      },
    });
    $scope.addUser('user', 'pass');
    Promise.resolve().then(function () {
      expect($state.go).toHaveBeenCalledWith('home');
      done();
    });
  });
});
