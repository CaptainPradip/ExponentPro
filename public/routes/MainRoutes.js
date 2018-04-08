
    'use strict';

   var Routes= angular.module('MainRoutes', ['ngRoute','authService'])
    .config(function($routeProvider, $locationProvider){
        console.log('hi routes')
        $routeProvider
        .when('/', {
            templateUrl: '../views/pages/home.html',
            controller: 'homeController',
            controllerAs:'vm',
            authenticated:false
        })
    
      .when('/login', {
            templateUrl: '../views/pages/login.html',
            controller: 'loginController',
            controllerAs:'vm',
            authenticated:false
        })
        .when('/login/:token', {
            templateUrl: '../views/pages/login.html',
            controller: 'loginController',
            controllerAs:'vm',
            authenticated:false

        })
        .when('/userverification/:_token', {
            templateUrl: '../views/pages/login.html',
            controller: 'loginController',
            controllerAs:'vm',
            authenticated:false

        })
        .when('/logout', {
            templateUrl: '../views/pages/home.html',
            controller: 'homeController',
            controllerAs:'vm',
            authenticated:true
        })
        .when('/signup', {
            templateUrl: '../views/pages/signUp.html',
            controller: 'signUpController',
            controllerAs:'vm',
            authenticated:false
        })
        .when('/profile', {
            templateUrl: '../views/pages/profile.html',
            controller: 'profileController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin','user']
        })

        .when('/viewprojects/:_id', {
            templateUrl: '../views/pages/projectList.html',
            controller: 'projectListController',
            controllerAs:'vm',
            authenticated:false,
            permission:['admin','user']
        })
        .when('/projects', {
            templateUrl: '../views/pages/projectList.html',
            controller: 'projectListController',
            controllerAs:'vm',
            authenticated:false,
            permission:['admin','user']
        })
        .when('/projects/search/:key', {
            templateUrl: '../views/pages/projectList.html',
            controller: 'projectListController',
            controllerAs:'vm',
            authenticated:false,
            permission:['admin','user']
        })
        .when('/project/:_id', {
            templateUrl: '../views/pages/projectInfo.html',
            controller: 'projectInfoController',
            controllerAs:'vm',
            authenticated:false,
            permission:['admin','user']
        })
        .when('/sellproject', {
            templateUrl:'../views/pages/profile.html',
            controller: 'profileController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin','user']
        })

        .when('/admin', {
            templateUrl: '../views/pages/management/Administrator.html',
            controller: 'managementController',
            authenticated:true,
            controllerAs:'vm',
            permission:['admin']
        })
        .when('/admin/project-requests', {
            templateUrl: '../views/pages/management/projectRequestsList.html',
            controller: 'projectRequestController',
            authenticated:true,
            controllerAs:'vm',
            permission:['admin']
        })
        .when('/admin/project-request/:_id',{
            templateUrl: '../views/pages/management/projectRequest.html',
            controller: 'projectRequestController',
            authenticated:true,
            controllerAs:'vm',
            permission:['admin']
        })
        .when('/admin/projects', {
            templateUrl: '../views/pages/management/projectList.html',
            controller: 'projectsController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin']
        })
        .when('/admin/project-category', {
            templateUrl: '../views/pages/management/projectCategory.html',
            controller: 'managementController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin']
        })
        .when('/admin/project-frontend-technology', {
            templateUrl: '../views/pages/management/frontendTechnology.html',
            controller: 'managementController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin']
        })
        .when('/admin/project-programming-language', {
            templateUrl: '../views/pages/management/programmingLanguage.html',
            controller: 'managementController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin']
        })
        .when('/admin/project-platform-type', {
            templateUrl: '../views/pages/management/platformType.html',
            controller: 'managementController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin']
        })
        .when('/admin/project-database-type', {
            templateUrl: '../views/pages/management/databaseType.html',
            controller: 'managementController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin']
        })
        .when('/admin/project-ide-type', {
            templateUrl: '../views/pages/management/projectIDE.html',
            controller: 'managementController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin']
        })
        .when('/admin/user', {
            templateUrl: '../views/pages/management/userManagement.html',
            controller: 'userManagementController',
            controllerAs:'vm',
            authenticated:true,
            permission:['admin']
        })
        
        .otherwise({redirectTo:('/')})
       

    });

    Routes.run(['$rootScope','authUserService','$location','$interval','$window','$route',function ($rootScope,authUserService,$location,$interval,$window,$route) {
       
        authUserService.checkSession();
        $rootScope.checkSession=true;
        $rootScope.isAdmin=false;
        $rootScope.isUserLogin=authUserService.isLoggedIn();
        $rootScope.$on('checkSession', function(e){  
            authUserService.checkSession();        
        });

    $rootScope.$on('$routeChangeStart',function (event,next,current) {
        $rootScope.isUserLogin=authUserService.isLoggedIn();
        $rootScope.isLoaded=false;
        if(!$rootScope.checkSession)
        authUserService.checkSession();
         console.log(next.$$route.authenticated);

         if (next.$$route.authenticated===true) {

            if(!authUserService.isLoggedIn()){
                event.preventDefault();
                $location.path('/login')
            }else if (next.$$route.permission) {

                authUserService.getUser().then(function(data){
                    $rootScope.isUserLogin=authUserService.isLoggedIn();
                    $rootScope.user=data.data.user;
                    var isAdmin=next.$$route.permission[0]==data.data.user.permission;
                    $rootScope.permission=data.data.user.permission;
                    var isUser=next.$$route.permission[1]==data.data.user.permission;
                    if (!isAdmin){
                        event.preventDefault();
                        $location.path('/')
                    }
                    
                     })
                 
             } else {
                 
             }
             
         } else if(next.$$route.authenticated==false) {
            if(authUserService.isLoggedIn()){
                authUserService.getUser().then(function(data){
                $rootScope.isUserLogin=authUserService.isLoggedIn();
                $rootScope.user=data.data.user;
                $rootScope.permission=data.data.user.permission;
                
                })
                
            }
             
         }
        });

        
    }]);