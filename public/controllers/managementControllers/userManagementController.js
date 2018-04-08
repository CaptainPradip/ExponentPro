(function(){
    'use strict';

    angular
        .module('management')
        .controller('userManagementController', userManagementController)

        userManagementController.$inject = ['$rootScope',
                                            '$scope',
                                            '$routeParams',
                                            'projectCrudService',
                                            'managementCrudService',
                                            '$location',
                                            '$route',
                                            '$interval'];

    function userManagementController($rootScope,$scope,$routeParams,projectCrudService,managementCrudService,$location,$route,$interval) {
        /* jshint validthis:true */
        var vm = this;
        console.log("User Management Controller !!!!!!!!!")
        getAllUser();

        vm.showEditBox=function(_id,user){
            vm._id=_id;
            vm.user=user;
            vm.user.password="";
            vm.edit=true;
        }
        function getAllUser() {
            $rootScope.isLoaded=false
            vm.edit=false;
            managementCrudService.getAllUser().then(function(data){
 
                vm.users=[];
                data.data.users.forEach(user =>{
                    var intvalue=user.rating.toString().split(".")[0]
                   
                   
                    var rating=[0,0,0,0,0];
                    for (let index = 0; index < Number(intvalue); index++){
                        rating[index]=1;
                   }
                   if(user.rating.toString().split(".").length==2)
                   {
                    user.halfRating=true;
                    rating.pop();
                   }else{
                    user.halfRating=false
                   }
                   user.rating=rating;
                   vm.users.push(user);
                });
                
                $rootScope.isLoaded=true;
                console.log(vm.users);
             });

         }
        vm.addUser= function(){

                        console.log(vm.name);
                        var user={}
                        user.userName=vm.userName;
                        user.email=vm.email;
                        user.password=vm.password;
                        user.permission=vm.role
                        managementCrudService.addUser(user).then(function(data){
        
                        swal({title: data.data.message,   
                        text: "I will close in 1 seconds.",   
                        timer: 1000,   
                        showConfirmButton: false 
            });
                   
                   $route.reload();
                 
            });

        }

        vm.updateUser = function(){
            var user={}
            user.userName=vm.user.userName;
            user.email=vm.user.email;
            user.password=vm.user.password;
            user.permission=vm.user.role
          
                managementCrudService.updateUser(vm._id,user).then(function(data){
                    console.log(data);
                               $route.reload();     
                        });
              
        }
        vm.deleteUser = function (_Id){
         
            managementCrudService.deleteUser(_Id).then(function(data){
                 
                           $route.reload();
                         
                    });
            
        }

    }
})();