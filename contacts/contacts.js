'use strict';

angular
  .module('myApp.contacts', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contacts', {
      templateUrl: 'contacts/contacts.html',
      controller: 'ContactsCtrl'
    });
  }])
  .controller('ContactsCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
    //creating a reference for firebase firebase takes url from the created project within firebase website
    // var database = firebase.database();
    var rootRef = firebase.database().ref();
    console.log(rootRef);

    $scope.contacts = $firebaseArray(rootRef);
    $scope.addFormShow = true;
    $scope.editFormShow = false;

    //creating a function to add the contact
    $scope.addContact = function () {
      console.log('Adding Contacts....');

      $scope.contacts.$add({
        name: $scope.name,
        email: $scope.email,
        phone: $scope.phone
      }).then(function (ref) {
        var id = ref.key;
        console.log('Added Contact ' + id);
        $scope.name = '';
        $scope.email = '';
        $scope.phone = '';
      });
    }
    $scope.showEditForm = function (contact) {
      $scope.addFormShow = false;
      $scope.editFormShow = true;


      $scope.id = contact.$id;
      $scope.name = contact.name;
      $scope.email = contact.email;
      $scope.phone = contact.phone;

    }
    //the functions are writing with not ()
    $scope.editContact = function () {
      var id = $scope.id;
      // angularFire method
      var record = $scope.contacts.$getRecord(id);
      console.log(record);

      record.name = $scope.name;
      record.email = $scope.email;
      record.phone = $scope.phone;

      //save
      $scope.contacts.$save(record).then(function (ref) {
        console.log(`${ref.key}  Conctact Edited`);
      });

      $scope.name = '';
      $scope.email = '';
      $scope.phone = '';

      $scope.editFormShow = false;
      $scope.addFormShow = true;
    }

    $scope.removeContact = function (contact) {
      console.log(contact);
      $scope.contacts.$remove(contact).then(function (ref) {
        ref.key === contact.$id; // true
      });
    }

  }]);