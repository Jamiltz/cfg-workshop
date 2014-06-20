angular.module('PsstApp', ['LocalStorageModule'])

  .constant('constants', {
    HOST: 'http://cfg-backend.herokuapp.com'
  })

  .controller('HomeController', function($scope, localStorageService, $http, $timeout, constants) {

    //Get the username from local storage
    $scope.user = {
      username: localStorageService.get('username')
    };

    //Get the list of friends from local storage
    if(localStorageService.get('friends')) {
      $scope.friends = localStorageService.get('friends');
    } else {
      $scope.friends = [];
    }


    /**
     * Create a new user.
     * 1. Get the registration_id from local storage
     * 2. Send the username and registration_key to our server
     *    2.2 If server replies OK, save username in local storage
     *    2.3 If user reports and ERROR, display it
     */
    $scope.sendUser = function() {

//      $scope.user.registration_id = 'APA91bE4sWZCJxRbYP9jhWgQNrMbFxGHonnjmTQZBna5tbOjplSKKpMfGe9kYZHSwlXz9qZLtSQhxo-_61fZw5SEBQGVE1AbTxJEen5kB73CYYqET2UQC6j4zp5A-_mi2hjNAkq9gDTTgasjgukd3UhwfiwVybb_3hWzInQos6WVJLeA5I_GTDM';
      $scope.user.registration_id = localStorageService.get('registration_id');

      $http
        .post(constants.HOST + '/signup', $scope.user)
        .success(function(res) {

          localStorageService.set('username', $scope.user.username);
          $scope.user.username = "Username saved!";

          $timeout(function() {
            $scope.user.username = localStorageService.get('username');
          }, 2000);

        })
        .error(function(err, status) {

          if(status == 409) {
            $scope.user.username = 'Username taken'
          } else if (status == 500) {
            $scope.user.username = 'Server unreachable'
          }

          $timeout(function() {
            $scope.user.username = '';
          }, 2000);

        });

    };

    $scope.deleteFriends = function() {
      localStorageService.set('friends', []);
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

          var name_copy = $scope.friends[index];
          if(status == 404) {
            $scope.friends[index] = 'User not found'
          } else if (status == 500) {
            $scope.friends[index] = 'Server unreachable'
          }

          $timeout(function() {
            $scope.friends[index] = name_copy;
          }, 2000);

        })
    };

    $scope.addFriend = function(username) {
      $scope.friends.push(username);
      localStorageService.set('friends', $scope.friends);
    };

  });