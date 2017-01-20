angular
	.module('DoctorsAndPatients', ['ngRoute'])
	.config(($routeProvider) => {
		$routeProvider
			.when('/doctors', {
				controller: 'doctorsCtrl',
				templateUrl: '../partials/doctors.html'
			})
			.when('/patients/:doctorId', {
				controller: 'patientsCtrl',
				templateUrl: '../partials/patients.html'
			})
			.otherwise('/doctors')
	})
	////////////////////////////
	// Controllers
	////////////////////////////
	.controller('doctorsCtrl', function($scope, fetchFactory) {
		console.log('hello from doctorsCtrl')
		fetchFactory
			.getData()
			.then((data) => {
				console.log(data)
				$scope.doctors = data.doctors
			})
	})
	.controller('patientsCtrl', function($scope, $routeParams, fetchFactory) {
		console.log('hello from patientsCtrl')
		$scope.doctorId = $routeParams.doctorId
		fetchFactory
			.getData()
			.then((data) => {
				console.log(data)
				$scope.patients = data.patients
			})
	})
	////////////////////////////
	// Factories
	////////////////////////////
	.factory('fetchFactory', function($http) {
		return {
			getData: function() {
				return $http({
					method: "GET",
					url: "https://doctors-and-patients.firebaseio.com/.json"
				})
				.then((responseObj) => { return responseObj.data })
			}
		}
	})
