
    'use strict';

    angular.module('Main',['MainRoutes','ngAnimate','signUp',,'login','home','management'])
    .config(["$locationProvider", function($locationProvider) {
        $locationProvider.html5Mode(true);
      }])
      .run(function($rootScope) {
        $rootScope.user ={};
        $rootScope.shownav=true;
        
      })
      .controller('mainController', mainController);

      function mainController($scope,$rootScope,$http,$location,$timeout,authUserService,$window,$routeParams,) {
        //Veriable Declare 
        $rootScope.isUserLogin=authUserService.isLoggedIn();
        var app=this 
        app.isUserLogin=false
        $('.slider').slider(
         
        );
        $('.materialboxed').materialbox();
        $('.slider').height(500)
        $rootScope.showSessionAlart=function () {
             
              
                swal({title: "Your Session is Expired !!!",
                text: "Do you Want to Start New Session ?",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55", 
                cancelButtonText: "No",
                confirmButtonText: "Yes, Start it ",   
                closeOnConfirm: false,
                closeOnCancel: false
               }, 
                function(isConfirm,email){  
                    if (isConfirm) {
                  swal("New Session Start !", "Your Session is Started !!", "success");
                     authUserService.startNewSession().then(function(data){
                      $rootScope.user=data.data.user;
                      app.isUserLogin=true;
                      $rootScope.$broadcast('checkSession');
                     
                      console.log($rootScope.user);
                     
                    });
                 }
                 else {
                  swal("Session End !!", "Please Login Again  :)", "error");
                  authUserService.logOut();
                }
                });
            }
      }
        

        
