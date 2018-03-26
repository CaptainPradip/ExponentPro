(function(){
    'use strict';

    angular
        .module('managementService',[])
        .factory('managementCrudService', managementCrud)

        managementCrud.$inject = ['$http'];

    function managementCrud($http) {
        console.log('*************************  Managemanet Service *****************************')
        var service = {
            
            getAllProjectRequest: getAllProjectRequestHttp,
            getProjectRequest:getProjectRequestHttp,
            updateProjectRequest:updateProjectRequestHttp,
            deleteProjectRequest:deleteProjectRequestHttp,

            getAllUser:getAllUserHttp,
            getUser:getUserHttp,
            addUser:addUserHttp,
            updateUser:updateUserHttp,
            deleteUser:deleteUserHttp,

            addProjectCategory:addProjectCategoryHttp,
            updateProjectCategory:updateProjectCategoryHttp,
            deleteProjectCategory:deleteProjectCategoryHttp,

            addFrontendTechnology:addFrontendTechnologyHttp,
            updateFrontendTechnology:updateFrontendTechnologyHttp,
            deleteFrontendTechnology:deleteFrontendTechnologyHttp,
            
            addProgrammingLanguage:addProgrammingLanguageHttp,
            updateProgrammingLanguage:updateProgrammingLanguageHttp,
            deleteProgrammingLanguage:deleteProgrammingLanguageHttp,

            addPlatformType:addPlatformTypeHttp,
            updatePlatformType:updatePlatformTypeHttp,
            deletePlatformType:deletePlatformTypeHttp,

            addDatabaseType:addDatabaseTypeHttp,
            updateDatabaseType:updateDatabaseTypeHttp,
            deleteDatabaseType:deleteDatabaseTypeHttp,

            addProjectIDE:addProjectIDEHttp,
            updateProjectIDE:updateProjectIDEHttp,
            deleteProjectIDE:deleteProjectIDEHttp,

            


            


        };

        return service;

        // router.get("/projectrequests",getAllProjectRequests);
        // router.get("/projectrequests/:_id",getProjectRequest);
        // router.put("/projectrequests/:_id",updateProjectRequest);
        // router.delete("/projectrequest",deleteProjectRequest);
        
        function getAllProjectRequestHttp() { 
            
                        return $http.get('/api/management/projectrequests').then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
                    }
         function getProjectRequestHttp(_id) { 

                        return $http.get('/api/management/projectrequests/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                            
                            }
                            return data;
                        });

        }

        function updateProjectRequestHttp(_id,project) { 
            
                        return $http.put('/api/management/projectrequests/'+_id,project).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
                    }
         function deleteProjectRequestHttp(_id) { 

                        return $http.delete('/api/management/projectrequests/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                            
                            }
                            return data;
                        });

        }
        function getAllUserHttp() { 
            
                        return $http.get('/api/management/users').then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }
        function getUserHttp(_id) { 
            
                        return $http.get('/api/management/users/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function addUserHttp(user) { 
            
                        return $http.post('/api/management/users',user).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function updateUserHttp(_id,user) { 
            
                        return $http.put('/api/management/users/'+_id,user).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function deleteUserHttp(_id) { 
            
                        return $http.delete('/api/management/users/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function addProjectCategoryHttp(projectCategory) { 
                console.log(projectCategory);
                        return $http.post('/api/management/projectcategorys',projectCategory).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function updateProjectCategoryHttp(_id,projectCategory) { 
            
                        return $http.put('/api/management/projectcategorys/'+_id,projectCategory).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function deleteProjectCategoryHttp(_id) { 
            
                        return $http.delete('/api/management/projectcategorys/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function addFrontendTechnologyHttp(frontendTechnology) { 
            
                        return $http.post('/api/management/frontendtechnologys',frontendTechnology).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function updateFrontendTechnologyHttp(_id,frontendTechnology) { 
            
                        return $http.put('/api/management/frontendtechnologys/'+_id,frontendTechnology).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function deleteFrontendTechnologyHttp(_id) { 
            
                        return $http.delete('/api/management/frontendtechnologys/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function addProgrammingLanguageHttp(programmingLanguage) { 
            
                        return $http.post('/api/management/programminglanguages',programmingLanguage).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function updateProgrammingLanguageHttp(_id,programmingLanguage) { 
            
                        return $http.put('/api/management/programminglanguages/'+_id,programmingLanguage).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function deleteProgrammingLanguageHttp(_id) { 
            
                        return $http.delete('/api/management/programminglanguages/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function addPlatformTypeHttp(platformType) { 
            
                        return $http.post('/api/management/platformtypes',platformType).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function updatePlatformTypeHttp(_id,platformType) { 
            
                        return $http.put('/api/management/platformtypes/'+_id,platformType).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function deletePlatformTypeHttp(_id) { 
            
                        return $http.delete('/api/management/platformtypes/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function addDatabaseTypeHttp(databaseType) { 
            
                        return $http.post('/api/management/databasetypes',databaseType).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function updateDatabaseTypeHttp(_id,databaseType) { 
            
                        return $http.put('/api/management/databasetypes/'+_id,databaseType).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function deleteDatabaseTypeHttp(_id) { 
            
                        return $http.delete('/api/management/databasetypes/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function addProjectIDEHttp(projectIDE) { 
            
                        return $http.post('/api/management/projectides',projectIDE).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function updateProjectIDEHttp(_id,projectIDE) { 
            
                        return $http.put('/api/management/projectides/'+_id,projectIDE).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function deleteProjectIDEHttp(_id) { 
            
                        return $http.delete('/api/management/projectides/'+_id).then(function (data) {
                            var status=data.data.success
                            
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        

    }
})();




// router.get("/users",getAllUsers);
// router.post("/users",addUser);
// router.get("/users/:_id",getUser);
// router.put("/users/:_id",updateUser);
// router.delete("/projectrequest",deleteUser);

// //Programming Language Routes
// router.post('/programminglanguages',addProgrammingLanguage);

// router.put('/programminglanguages/:_id',updateProgrammingLanguage);
// router.delete('/programminglanguages/:_id',deleteProgrammingLanguage);

// //Project Category Routes
// router.post('/projectcategorys',addProjectCategory);

// router.put('/projectcategorys/:_id',updateProjectCategory);
// router.delete('/projectcategorys/:_id',deleteProjectCategory);

// //Frontend Technology Routes
// router.post('/frontendtechnologys',addFrontendTechnology);

// router.put('/frontendtechnologys/:_id',updateFrontendTechnology);
// router.delete('/frontendtechnologys/:_id',deleteFrontendTechnology);

// //Project IDE Routes
// router.post('/projectides',addProjectIDE);

// router.put('/projectides/:_id',updateProjectIDE);
// router.delete('/projectides/:_id',deleteProjectIDE);


// //Platform Type Routes
// router.post('/platformtypes',addPlatformType);

// router.put('/platformtypes/:_id',updatePlatformType);
// router.delete('/platformtypes/:_id',deletePlatformType);


// //DataBase Type Routes
// router.post('/databasetypes',addDatabaseType);

// router.put('/databasetypes/:_id',updateDatabaseType);
// router.delete('/databasetypes/:_id',deleteDatabaseType);
