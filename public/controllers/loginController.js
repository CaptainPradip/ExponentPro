(function() {
    'use strict';

    angular
        .module('login',['authService'])
        .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
        })
        .controller('loginController', loginController);

    loginController.$inject =  ['$scope',
                                '$rootScope',
                                '$http',
                                '$location',
                                '$timeout',
                                'authUserService',
                                '$window',
                                '$routeParams',
                                '$route'];
    
    


    function loginController($scope,$rootScope,$http,$location,$timeout,authUserService,$window,$routeParams,$route) {
//Veriable Declare 

       $rootScope.shownav=false;

     
        $scope.user={}
        
        
            
        console.log($routeParams.token);
   
       
       

        if($routeParams.token){
            authUserService.facebookuser($routeParams.token)
               
                console.log('User is already Logged In with Facebook!!!!!!!!!!!!!!!!!!!!!!!')
        }
        if(authUserService.isLoggedIn())
        {
            console.log('User is already Logged In ')
            $rootScope.isUserLogin=true
            
           authUserService.getUser().then(function(data){
            $rootScope.user=data.data.user;
            authUserService.facebookuser($routeParams.token)
            authUserService.SetCurrentUserEmail(data.data.user.email)
            console.log($rootScope.user);
           });
           $timeout(function () {
            $location.path('/')
            },1000)
            if($location.hash()=='_=_')
            {
                $location.hash(null);
            }
            
        }
        else{
            console.log('User is Not LogIn  please Login !!!!')
        }

    
   
        console.log('User is Not LogIn  please Login !!!!'+$scope.user)
        
//
        $scope.loginUser=function(){ 
           var user =$scope.user
           console.log('Response '+user.email)
            authUserService.loginUser(user).then(function(data){
                var status=data.data.success
                if(status)
                {
                  $scope.successMessage=false;
                  loginController.successMessage=data.data.message
                  console.log('Response '+data.data.user.userName)
                  $location.path('/home')
                  $timeout(function () {
                    console.log('ggg')
                    $rootScope.user=data.data.user;
                    $route.reload();
                    authUserService.checkSession();
                  },1000)

                  
                }
               else{
                loginController.errorMessage=data.data.message
               
                console.log('Response '+data.data.message)

                $timeout(function () {
                    $location.path('/login')
                  },1000)
               }
              
              });
    
        }

        $scope.loginWithFacebook=function() {

            $window.location=$window.location.protocol+'//'+$window.location.host+'/auth/facebook'
            
            console.log($routeParams.token);
        }

        $scope.loginWithGoogle=function() {
            
            $window.location=$window.location.protocol+'//'+$window.location.host+'/auth/google'
            
            console.log($routeParams.token);
        }
    }
  
    
})();