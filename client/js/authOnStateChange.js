'use strict';

angular.module('myapp')
  .run(function ($rootScope, $http, $state, user) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState) {

        if (!user.isAuthenticated()) {
          stopStateChange();
          user.authenticateUser()
              .then(onSuccess)
              .catch(onError);
        }

        function onSuccess(res) {
          res.status === 200 ? user.setUserValues(res.data, true)
                             : user.resetUser();
          user.setAuthenticated();
          continueStateChange();
        }

        function onError() {
          user.resetUser();
          user.setAuthenticated();
          continueStateChange();
        }

        function stopStateChange() {
          event.preventDefault();
        }

        function continueStateChange() {
          $state.go(toState);
        }

      });
  });
