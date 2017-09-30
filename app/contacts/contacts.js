'use strict';
angular.module('contactApp.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/contacts', {
      templateUrl: 'contacts/contacts.html',
      controller: 'ContactsCtrl'
    });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	// Init firebase
	var ref = firebase.database().ref().child("contacts");
	// Get contacts
	$scope.contacts = $firebaseArray(ref);
	
	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	};
	$scope.showEditForm = function(c) {
		$scope.editFormShow = true;

		$scope.name = c.name;
		$scope.email = c.email;
		$scope.company = c.company;
		$scope.mobile_phone = c.phones ? c.phones[0].mobile : '';
		$scope.home_phone = c.phones ? c.phones[0].home : '';
		$scope.work_phone = c.phones ? c.phones[0].work : '';
		$scope.street_address = c.address ? c.address[0].street_address : '';
		$scope.city = c.address ? c.address[0].city : '';
		$scope.state = c.address ? c.address[0].state : '';
		$scope.zipcode = c.address ? c.address[0].zipcode : '';

		$scope.id = c.$id;
	};
	
	$scope.hide = function(){
		$scope.addFormShow = false;
		$scope.editFormShow = false;
		$scope.contactShow = false;
	};

	// Submit contact
	$scope.addFormSubmit = function(){
		// Assign values
		if($scope.name) var name = $scope.name; else var name = null;
		if($scope.email) var email = $scope.email; else var email = null;
		if($scope.company) var company = $scope.company; else var company = null;
		if($scope.mobile_phone) var mobile_phone = $scope.mobile_phone; else var mobile_phone = null;
		if($scope.home_phone) var home_phone = $scope.home_phone; else var home_phone = null;
		if($scope.work_phone) var work_phone = $scope.work_phone; else var work_phone = null;
		if($scope.street_address) var street_address = $scope.street_address; else var street_address = null;
		if($scope.city) var city = $scope.city; else var city = null;
		if($scope.state) var state = $scope.state; else var state = null;
		if($scope.zipcode) var zipcode = $scope.zipcode; else var zipcode = null;

		// Build & Send Object
		$scope.contacts.$add({
			name:name,
			email:email,
			company:company,
			phones:[
				{
					mobile:mobile_phone,
					home:home_phone,
					work:work_phone
				}
			],
			address:[
				{
					street_address:street_address,
					city:city,
					state:state,
					zipcode:zipcode
				}
			]
		}).then(function(ref){
			var id = ref.key;
			console.log('added : ID=',id);

			//Clear Form
			clearFields();

			$scope.addFormShow = false;

			// Show user a message
			$scope.msg = "Contact Added!!!";
		});
	};

	$scope.editFormSubmit = function() {
		// Get id
		var id = $scope.id;

		// Get Record
		var record = $scope.contacts.$getRecord(id);

		// Assign Values
		record.name = $scope.name;
		record.email = $scope.email;
		record.company = $scope.company;
		record.phones[0].work = $scope.work_phone;
		record.phones[0].home = $scope.home_phone;
		record.phones[0].mobile = $scope.mobile_phone;
		record.address[0].street_address = $scope.street_address;
		record.address[0].city = $scope.city;
		record.address[0].state = $scope.state;
		record.address[0].zipcode = $scope.zipcode;

		// Save Contact
		$scope.contacts.$save(record).then(function(ref){
			console.log(ref.key);
		});

		clearFields();

		// Hide edit form
		$scope.editFormShow = false;

		$scope.msg = "Contact Updated!!!";
	};

	$scope.showContact = function(contact) {
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.mobile_phone = contact.phones ? contact.phones[0].mobile : '';
		$scope.home_phone = contact.phones ? contact.phones[0].home : '';
		$scope.work_phone = contact.phones ? contact.phones[0].work : '';
		$scope.street_address = contact.address ? contact.address[0].street_address : '';
		$scope.city = contact.address ? contact.address[0].city : '';
		$scope.state = contact.address ? contact.address[0].state : '';
		$scope.zipcode = contact.address ? contact.address[0].zipcode : '';

		$scope.contactShow = true;
	};

	$scope.removeContact = function(c) {
		$scope.contacts.$remove(c);

		$scope.msg = "Contact Removed!!!";
	};

	// clear $scope fields
	function clearFields() {
		$scope.id = '';
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zipcode = '';
	}

}]);
