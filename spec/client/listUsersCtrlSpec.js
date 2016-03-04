'use strict';

describe('ListUsersCtrl', function () {
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
    var controller = $controller('ListUsersCtrl', {
      $scope: {},
      $state: $state,
      user: {
        isLoggedIn: function () {},

        isAdmin: function () {},

        getEmail: function () {},
      },
      userList: {},
    });

    expect(controller).toBeDefined();
  });

  it('should redirect to login, if not logged in', function () {
    var $state = {
      go: function () {},
    };
    spyOn($state, 'go');
    var controller = $controller('ListUsersCtrl', {
      $scope: {},
      $state: $state,
      user: {
        isLoggedIn: function () {
          return false;
        },

        isAdmin: function () {
          return false;
        },

        getEmail: function () {},
      },
      userList: {},
    });
    expect($state.go).toHaveBeenCalledWith('login');
  });

  it('should redirect to home, if not admin logged in', function () {
    var $state = {
      go: function () {},
    };
    spyOn($state, 'go');
    var controller = $controller('ListUsersCtrl', {
      $scope: {},
      $state: $state,
      user: {
        isLoggedIn: function () {
          return true;
        },

        isAdmin: function () {
          return false;
        },

        getEmail: function () {},
      },
      userList: {},
    });
    expect($state.go).toHaveBeenCalledWith('home');
  });

  it('should not redirect to elsewhere, if admin is logged in', function () {
    var $state = {
      go: function () {},
    };
    spyOn($state, 'go');
    var controller = $controller('ListUsersCtrl', {
      $scope: {},
      $state: $state,
      user: {
        isLoggedIn: function () {
          return true;
        },

        isAdmin: function () {
          return true;
        },

        getEmail: function () {},
      },
      userList: {},
    });

    expect($state.go).not.toHaveBeenCalled();
  });

  it('should make a list of users', function () {
    var $state = {
      go: function () {},
    };
    var $scope = {
      getUsers: function () {
        return usersList.getAllUser();
      },
    };
    var usersList = {
      getAllUser: function () {
        return [];
      },
    };
    spyOn($state, 'go');
    var controller = $controller('ListUsersCtrl', {
      $scope: $scope,
      $state: $state,
      user: {
        isLoggedIn: function () {
          return true;
        },

        isAdmin: function () {
          return true;
        },

        getEmail: function () {},
      },
      userList: usersList,
    });
    expect($scope.getUsers()).toEqual([]);
  });
});
