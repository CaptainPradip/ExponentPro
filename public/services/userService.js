(function() {
    'use strict';

    angular
        .module('userService',[])
        .factory('registerUserService', registerUser);

        registerUser.$inject = ['$http'];

    function registerUser($http) {
        console.log("Hi Service")
        var service = {
           createUser:registerUserHttp
        };
        
        return service;

        ////////////////
        function registerUserHttp(registerUser) { 
            return $http.post('api/signUp',registerUser);
        }
    }
})();