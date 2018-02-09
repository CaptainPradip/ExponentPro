
    'use strict';

   var Routes= angular.module('MainRoutes', ['ngRoute','authService'])
    .config(function($routeProvider, $locationProvider){
        console.log('hi routes')
        $routeProvider
        .when('/', {
            templateUrl: '../views/pages/home.html',
            controller: 'homeController',
            authenticated:false
        })
        .when('/login', {
            templateUrl: '../views/pages/login.html',
            controller: 'loginController',
            authenticated:false
        })
        .when('/login/:token', {
            templateUrl: '../views/pages/login.html',
            controller: 'loginController',
            authenticated:false

        })
        .when('/logOut', {
            templateUrl: '../views/pages/home.html',
            controller: 'homeController',
            authenticated:true
        })
        .when('/signUp', {
            templateUrl: '../views/pages/signUp.html',
            controller: 'signUpController',
            authenticated:false
        })
        .when('/profile', {
            templateUrl: '../views/pages/profile.html',
            controller: 'profileController',
            authenticated:false,
            permission:['admin','user']
        })

        .when('/projectlist', {
            templateUrl: '../views/pages/projectList.html',
            controller: 'projectListController',
            authenticated:false,
            permission:['admin','user']
        })
        .when('/project', {
            templateUrl: '../views/pages/projectInfo.html',
            controller: 'projectInfoController',
            authenticated:false,
            permission:['admin','user']
        })
        .when('/sellproject', {
            templateUrl:'../views/pages/profile.html',
            controller: 'profileController',
            authenticated:false,
            permission:['admin','user']
        })

        .when('/admin', {
            templateUrl: '../views/pages/Administrator.html',
            controller: 'managementController',
            authenticated:true,
            permission:['admin']
        })
        .otherwise({redirectTo:('/')})
       

    });

    Routes.run(['$rootScope','authUserService','$location','$interval','$window',function ($rootScope,authUserService,$location,$interval,$window) {
       

       
        
        authUserService.checkSession();
        $rootScope.checkSession=true;
        $rootScope.isUserLogin=authUserService.isLoggedIn();
    $rootScope.$on('checkSession', function(e){  
        authUserService.checkSession();        
    });

    $rootScope.$on('$routeChangeStart',function (event,next,current) {
            
         console.log(next.$$route.authenticated);
         console.log(authUserService.isLoggedIn())


        if(!$rootScope.checkSession)
        authUserService.checkSession();
         if (next.$$route.authenticated==true) {

            if(!authUserService.isLoggedIn()){
                event.preventDefault();
                $location.path('/login')
            }else if (next.$$route.permission) {

                authUserService.getUser().then(function(data){
                    $rootScope.isUserLogin=authUserService.isLoggedIn();
                    $rootScope.user=data.data.user;
                    console.log(data.data.user.permission)
                   if (next.$$route.permission[0]==data.data.user.permission) {

                       
                   }


                    })
                
            } else {
                
            }
             
         } else if(next.$$route.authenticated==false) {
            if(authUserService.isLoggedIn()){
                authUserService.getUser().then(function(data){
                $rootScope.isUserLogin=authUserService.isLoggedIn();
                $rootScope.user=data.data.user;
                console.log($rootScope.user.picture)
                })
                //$location.path('/')
            }
             
         }
        });

        
    }]);