(function() {
    'use strict';

    angular
        .module('authService',[])
        .factory('authUserService', authUser)
        .factory('authTokenService',authToken)
        .factory('authInterceptorService',authInterceptor);

        authUser.$inject = ['$http','$q','authTokenService', '$rootScope','$interval','$window'];
        authToken.$inject=['$window'];
        authInterceptor.$inject=['authTokenService'];


     //login Service
    function authUser($http,$q,authTokenService,$rootScope,$interval,$window) {
        console.log("Hi authUser service")

        var service = {
           loginUser:loginUserHttp,
           getUser:getUserHttp,
           isLoggedIn:isLoggedInToken,
           facebookuser:setFacebookUserToken,
           SetCurrentUserEmail:SetCurrentUserEmail,
           startNewSession:startNewSessionHttp,
           checkSession:checkUserSession,
           logOut:logOutUser
        };
        
        return service;

        ////////////////
        function loginUserHttp(loginUser) { 
           
            return $http.post('api/authenticate',loginUser).then(function (data) {
                var status=data.data.success
                console.log(data.data.token)
                if(status)
                {
                authTokenService.setToken(data.data.token);
                authTokenService.setUserEmail(data.data.user.email);
                }
                return data;
            });
        }

      
        function startNewSessionHttp() {
           
            var user={email:authTokenService.getUserEmail()}
            if(authTokenService.getToken())
            {
                return $http.post('api/startNewSession',user).then(function (data) {
                    console.log(data.data.message)
                    authTokenService.setToken(data.data.token);
                    console.log("New token "+data.data.token+"")
                    console.log("New Email "+data.data.user.email+"")
                    authTokenService.setUserEmail(data.data.user.email);
                    return data;
                });
            }else{
                $q.reject({message:"User has No Token !!!"})
            }   
        }

        function checkUserSession() {


            
            var interval =$interval(function () {
                $rootScope.checkSession=true;
                var token=$window.localStorage.getItem('token');
        
                if(token==null)
                {
                    $interval.cancel(interval);
                }
                else{
                    self.parseJWT=function (token) {
                        var base64Url=token.split('.')[1]
                        var base64=base64Url.replace('-','+').replace('_','/');
                        return JSON.parse($window.atob(base64));
                    }
                    var expireTime=self.parseJWT(token);
                    var timeStamp=Math.floor(Date.now() /1000)
                    var timeCheck= expireTime.exp-timeStamp
        
                  //  console.log(timeCheck);
                    if(timeCheck<=25)
                    {
                        $interval.cancel(interval);
                        $rootScope.showSessionAlart()
                        $rootScope.checkSession=false;
                        token=null;
                    }
                }
                
            },2000);
            
            
        }
        function getUserHttp() { 
           
            if(authTokenService.getToken())
            {
                return $http.post('api/profile').then(function (data) {
                    console.log(data.data.message)
                    return data;
                });
            }else{
                $q.reject({message:"User has No Token !!!"})
            }
            
        }

        function isLoggedInToken() {
            if(authTokenService.getToken()){
                return true;
            }else{
                return false;
            }

        }
        function setFacebookUserToken(token) {
            authTokenService.setToken(token);
            
        }
        function SetCurrentUserEmail(email) {
            authTokenService.setUserEmail(email);
        }
        function logOutUser() {
            authTokenService.setToken();
            authTokenService.setUserEmail();
        }
    }

    // Auth Token Service 
    function authToken($window) {
        console.log("Auth Token Service ")

        var service = {
           setToken:setTokenLocalStorage,
           setUserEmail:setUserEmailLocalStorage,
           getUserEmail:getUserEmailLocalStorage,
           getToken:getTokenLocalStorage
        };
        
        return service;

        ////////////////
        function setTokenLocalStorage(token){ 
          if(token){
            $window.localStorage.setItem('token',token);
          }
          else{
            $window.localStorage.removeItem('token',token);
          }
          
        }
        function getTokenLocalStorage() { 
          return   $window.localStorage.getItem('token');
        }

        function setUserEmailLocalStorage(email) { 
            if(email){
              $window.localStorage.setItem('email',email);
            }
            else{
              $window.localStorage.removeItem('email',email);
            }
            
          }
          function getUserEmailLocalStorage() { 
            return $window.localStorage.getItem('email');
          }
    }


    //Auth Interceptor Servie 


     // Auth Token Service 
     function authInterceptor(authTokenService) {
        console.log("Auth Token authInterceptor Service ")

        var service = {
           request:setRequestToken,
        };
        
        return service;

        ////////////////
        function setRequestToken(config) {
        var token=authTokenService.getToken(); 
          if(token){
            config.headers['x-access-token']=token;

          }
          return config;
        }
       
    }
})();