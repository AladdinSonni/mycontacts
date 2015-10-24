'use strict';

var app = angular.module('myContacts.contacts', ['ngRoute','firebase']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts.html',
    controller: 'ContactsCtrl'
  });
}]);

// Contacts Controller
app.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  // Init Firebase
  var ref = new Firebase('https://my-contact-application.firebaseio.com/contacts');
  // get Contacts
  $scope.contacts = $firebaseArray(ref);
  // console.log($scope.contacts);

  // Show Add Form
  $scope.showAddForm = function() {
    clearFields();
    $scope.addFormShow = true;
    $scope.editFormShow = false;
    $scope.contactShow = false;
    $scope.msg = false;
  }

  // Hide Edit Form
  $scope.hideEditForm = function() {
    $scope.editFormShow = false;
    $scope.msg = false;
  }

  // Show Edit Form
  $scope.showEditForm = function(contact) {
    $scope.editFormShow = true;
    $scope.contactShow = false;
    $scope.addFormShow = false;
    $scope.msg = false;

    $scope.id              = contact.$id;
    $scope.name            = contact.name;
    $scope.email           = contact.email;
    $scope.company         = contact.company;
    $scope.mobile_phone    = contact.phones[0].mobile;
    $scope.home_phone      = contact.phones[0].home;
    $scope.work_phone      = contact.phones[0].work;
    $scope.street_address  = contact.address[0].street_address;
    $scope.city            = contact.address[0].city;
    $scope.state           = contact.address[0].state;
    $scope.zip_code        = contact.address[0].zip_code;
  }

  // Hide Add Form
  $scope.hideAddForm = function() {
    $scope.addFormShow = false;
    $scope.contactShow = false;
    $scope.msg = false;
  }

  // Submit Contact
  $scope.addFormSubmit = function(){
    console.log('Adding Contact...');
    // Assign Values
    if($scope.name){ var name = $scope.name; } else { var name = ''; }
    if($scope.email){ var email = $scope.email; } else { var email = ''; } 
    if($scope.company){ var company = $scope.company; } else { var company = ''; } 
    if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone; } else { var mobile_phone = ''; } 
    if($scope.home_phone){ var home_phone = $scope.home_phone; } else { var home_phone = ''; } 
    if($scope.work_phone){ var work_phone = $scope.work_phone; } else { var work_phone = ''; } 
    if($scope.street_address){ var street_address = $scope.street_address; } else { var street_address = ''; } 
    if($scope.city){ var city = $scope.city; } else { var city = ''; } 
    if($scope.state){ var state = $scope.state; } else { var state = ''; } 
    if($scope.zip_code){ var zip_code = $scope.zip_code; } else { var zip_code = ''; } 
  
    // Bulid Object
    $scope.contacts.$add({
      name: name,
      email: email,
      company: company,
      phones: [{
        mobile: mobile_phone,
        home: home_phone,
        work: work_phone
      }],
      address: [{
        street_address: street_address,
        city: city,
        state: state,
        zip_code: zip_code
      }]
    }).then(function(ref){
      var id = ref.key();
      console.log('Add Contact with ID: '+id);

      // Clear Form
      clearFields();

      // Hide Form
      $scope.addFormShow = false;

      // Send Message
      $scope.msg = "Contact Added";
    });
  }

  $scope.editFormSubmit = function(){
    console.log('Updating Contact...');

    // Get ID
    var id = $scope.id;

    // Get Record
    var record = $scope.contacts.$getRecord(id);

    // Assign Values
    record.name                       = $scope.name;
    record.email                      = $scope.email;
    record.company                    = $scope.company;
    record.phones[0].mobile           = $scope.mobile_phone;
    record.phones[0].home             = $scope.home_phone;
    record.phones[0].work             = $scope.work_phone;
    record.address[0].street_address  = $scope.street_address;
    record.address[0].city            = $scope.city;
    record.address[0].state           = $scope.state;
    record.address[0].zip_code        = $scope.zip_code;

    // Save Contact
    $scope.contacts.$save(record).then(function(ref){
      console.log(ref.key);
    });

    clearFields();

    // Hide Form
    $scope.editFormShow = false;

    $scope.msg = "Contact Update";

  }

  // Show Contact
  $scope.showContact = function(contact){
    console.log('Getting Contact...');
    $scope.name            = contact.name;
    $scope.email           = contact.email;
    $scope.company         = contact.company;
    $scope.mobile_phone    = contact.phones[0].mobile;
    $scope.home_phone      = contact.phones[0].home;
    $scope.work_phone      = contact.phones[0].work;
    $scope.street_address  = contact.address[0].street_address;
    $scope.city            = contact.address[0].city;
    $scope.state           = contact.address[0].state;
    $scope.zip_code        = contact.address[0].zip_code;

    $scope.contactShow = true;
    $scope.addFormShow = false;
    $scope.editFormShow = false;
    $scope.msg = false;
  }


  $scope.removeContact = function(contact){
    console.log('Removing Contact...');

    $scope.contacts.$remove(contact);

    $scope.msg = "Contact Ermoved";

    $scop.showAddForm = false;
    $scop.showEditForm = false;
    $scope.contactShow = false;
  }

  // Clear $scope Filds
  function clearFields(){
    console.log('Clearing All Fields...');

    $scope.name = '';
    $scope.email = '';
    $scope.company = '';
    $scope.mobile_phone = '';
    $scope.home_phone = '';
    $scope.work_phone = '';
    $scope.street_address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zip_code = '';
  }
}]);