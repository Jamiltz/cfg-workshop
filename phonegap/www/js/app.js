angular.module('PsstApp', ['LocalStorageModule'])

  .constant('constants', {
    HOST: 'http://localhost:3000'
  })

  .controller('HomeController', function($scope, localStorageService, $http, $timeout, constants) {

    //Get the username from local storage
//    $scope.user = {
//      username: localStorageService.get('username')
//    };
    $timeout(function() {
      alert('jey')
      $scope.user = {
        username: localStorageService.get('registration_id')
      };
    }, 5000)


    //Get the list of friends from local storage
    $scope.friends = localStorageService.get('friends');

    /**
     * Create a new user.
     * 1. Get the registration_id from local storage
     * 2. Send the username and registration_key to our server
     *    2.2 If server replies OK, save username in local storage
     *    2.3 If user reports and ERROR, display it
     */
    $scope.sendUser = function() {

      $scope.user.registration_key = localStorageService.get('registration_id');

      $http
        .post(constants.HOST + '/signup', $scope.user)
        .success(function(res) {

          localStorageService.set('username', $scope.user.username);
          $scope.user.username = "Username saved!";

          $timeout(function() {
            $scope.user.username = localStorageService.get('username');
          }, 3000);

        })
        .error(function(err, status) {

          if(status == 409) {
            $scope.user.username = 'Username already taken'
          } else if (status == 500) {
            $scope.user.username = 'Server unreachable'
          }

          $timeout(function() {
            $scope.user.username = '';
          });

        });

    };


    $scope.sendMessage = function(username, index) {
      $http.post(constants.HOST + '/send', {username: username})
        .success(function() {

          var name_copy = $scope.friends[index];
          $scope.friends[index] = 'Psst sent!';

          $timeout(function() {
            $scope.friends[index] = name_copy;
          }, 2000);

        })
        .error(function(err, status) {

          if(status == 404) {
            $scope.friends[index] = 'User not found'
          } else if (status == 500) {
            $scope.friends[index] = 'Server unreachable'
          }

        })
    };


    var registration_id = localStorageService.get('registration_id');

    $scope.addFriend = function(username) {
      $scope.friends.push(username);
      localStorageService.set('friends', $scope.friends);
    };


  });