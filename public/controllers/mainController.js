'use strict';

angular.module('Main',[
  
   'MainRoutes',
   'ngAnimate',
   'signUp',
   'login',
   'home',
   'management',
   'projectList',
   'projectInfo',
   'profile',
  ])
  
.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true);
  }])
  .run(function($rootScope) {
    $rootScope.user ={};
    $rootScope.shownav=true;
    
  })
  .controller('mainController', mainController);

  function mainController($scope,$rootScope,$http,$location,$timeout,authUserService,$window,$routeParams,projectCrudService) {
    //Veriable Declare 

    $rootScope.isUserLogin=authUserService.isLoggedIn();
    var main=this 
    main.isUserLogin=false
    $rootScope.isLoaded=false;

    $rootScope.$on('$viewContentLoaded', function(event) {
      
      $rootScope.isLoaded=true;
      $('.collapsible').collapsible();
      $('.translation-button, .notification-button, .profile-dropdown').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrainWidth: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: true, // Displays dropdown below the button
          alignment: 'left', // Displays dropdown with edge aligned to the left of button
          stopPropagation: true // Stops event propagation
        }
      );
  })

    

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
                  main.isUserLogin=true;
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

        main.searchProject=function()
        {
          $location.path('/projects/search/'+main.search);
         
          console.log(main.search);
        }
  }
    

    