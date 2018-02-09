

  'use strict';

  angular
    .module('signUp',['userService'])
    .controller('signUpController',signUpController)
    .directive('matchpassword',function() {
      // Usage:
      //
      // Creates:
      //
      return {
          restrict: 'A',
          controller:function($scope) {
            $scope.passwordMatch=false;
            console.log("value changes !!! directive controller");
            $scope.doConfirm=function(values){
              values.forEach(element => {
                if (element==$scope.confirmPassword) {
                  $scope.passwordMatch=true;
                }
                else{
                  $scope.passwordMatch=false;
                }
                console.log("value changes !!!"+element);
              console.log("value changes !!!"+$scope.confirmPassword);
              });
              
            }
          },
          link:function(scope, element, attrs) {
            attrs.$observe('matchpassword',function () {
              console.log("value changes !!!");
              
              scope.doConfirm(JSON.parse(attrs.matchpassword))
              
            })
    
            scope.$watch("confirmPassword",function(){
              scope.doConfirm(JSON.parse(attrs.matchpassword))
            })
          }
     
      }});
      
      
      
    /* @ngInject */
   
    
    
    
    
    function  signUpController ($scope,$rootScope,$http,$location,$timeout,registerUserService){

      $rootScope.shownav=false;
      $scope.successMessage=true;
      
      var response=this;
      console.log('signUpController'+$scope.username);



      $scope.signUpUser=function () {
        var registerUser={
          userName:$scope.username,
          email:$scope.email,
          password:$scope.password
        }
        console.log('signUpControllerczzxczxc'+registerUser.userName);


        //Call User Service
        registerUserService.createUser(registerUser).then(function(data){
          var status=data.data.success
          if(status)
          {
            $scope.successMessage=false;
            response.successMessage=data.data.message
            console.log('Response '+data.data.message)

            $timeout(function () {
              $location.path('/')
            },2000)
            
          }
         else{
          response.errorMessage=data.data.message
         
          console.log('Response '+data.data.message)
          $timeout(function () {
            $location.path('/signUp')
          },2000)
         }
        
        });



      
      }
    };
    

    