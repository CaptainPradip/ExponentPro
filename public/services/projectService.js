(function(){
    'use strict';

    angular
        .module('projectService',[])
        .factory('projectCrudService', projectCrud)

        projectCrud.$inject = ['$http'];

    function projectCrud($http) {
        console.log("project Service");
        var service = {
            getProjectCategory: getProjectCategoryHttp,
            getProjectByCategoryId:getProjectByCategoryIdHttp,
            getProjectAllProject:getProjectAllProjectHttp,
            getProjectById:getProjectByIdHttp,
            getProgrammingLanguage:getProgrammingLanguageHttp,
            getDatabaseType:getDatabaseTypeHttp,
            getFrontendTechnology:getFrontendTechnologyHttp,
            getPlatformType:getPlatformTypeHttp,
            getProjectIDE:getProjectIDEHttp,
            addNewProject:addNewProjectHttp


        };

        return service;

        function getProjectCategoryHttp() { 

            return $http.get('/api/project/projectcategorys').then(function (data) {
                var status=data.data.success
                console.log(data.data)
                if(status)
                {
                   
                }
                return data;
            });

        }

       

        function getProjectByCategoryIdHttp(id) { 
            
                    return $http.get('/api/project/projectsbycategory/'+id).then(function (data) {
                            var status=data.data.success
                            console.log(data.data)
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }
        function getProjectAllProjectHttp() { 
            
            return $http.get('/api/project/projects/').then(function (data) {
                    var status=data.data.success
                    console.log(data.data)
                    if(status)
                    {
                       
                    }
                    return data;
                });
    
}

        function getProjectByIdHttp(id) { 

            return $http.get('/api/project/projects/'+id).then(function (data) {
                var status=data.data.success
                console.log(data.data)
                if(status)
                {
                   
                }
                return data;
            });

        }
        function getProgrammingLanguageHttp() { 
            
                    return $http.get('/api/project/programminglanguages/').then(function (data) {
                            var status=data.data.success
                            console.log(data.data)
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function getDatabaseTypeHttp() { 
            
                    return $http.get('/api/project/databasetypes').then(function (data) {
                            var status=data.data.success
                            console.log(data.data)
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }

        function getFrontendTechnologyHttp() { 
            
                    return $http.get('/api/project/frontendtechnologys').then(function (data) {
                            var status=data.data.success
                            console.log(data.data)
                            if(status)
                            {
                               
                            }
                            return data;
                        });
            
        }
        function getPlatformTypeHttp() { 
            
                    return $http.get('/api/project/platformtypes').then(function (data) {
                            var status=data.data.success
                            console.log(data.data)
                            if(status)
                            {
                               
                            }
                            return data;
                        });   
        }

        function getProjectIDEHttp() { 
            
            return $http.get('/api/project/projectides').then(function (data) {
                    var status=data.data.success
                    console.log(data.data)
                    if(status)
                    {
                       
                    }
                    return data;
                });   
        }

        function addNewProjectHttp(project,screenShots) { 
            

            var fd= new FormData();

            for (const key in project) {
               fd.append(key,project[key]);
            }
            for (const key in screenShots) {
                fd.append("screenShots",screenShots[key]);
            }
            var config = { transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined}
          };

            return $http.post('/api/project/projects',fd,config).then(function (data) {
                    var status=data.data.success
                    console.log(data.data)
                    if(status)
                    {
                       
                    }
                    return data;
                });   
        }
    }
})();


// //Programming Language Routes
// router.post('/programminglanguages',addProgrammingLanguage);
// router.get('/programminglanguages',getAllProgrammingLanguages);
// router.get('/programminglanguages/:_id',getProgrammingLanguage);
// router.put('/programminglanguages/:_id',updateProgrammingLanguage);
// router.delete('/programminglanguages/:_id',deleteProgrammingLanguage);

// //Project Category Routes
// router.post('/projectcategorys',addProjectCategory);
// router.get('/projectcategorys',getAllProjectCategorys);
// router.get('/projectsbycategory/:_id',getAllProjectByCategory);
// router.get('/projectcategorys/:_id',getProjectCategory);
// router.put('/projectcategorys/:_id',updateProjectCategory);
// router.delete('/projectcategorys/:_id',deleteProjectCategory);

// //Frontend Technology Routes
// router.post('/frontendtechnologys',addFrontendTechnology);
// router.get('/frontendtechnologys',getAllFrontendTechnologys);
// router.get('/frontendtechnologys/:_id',getFrontendTechnology);
// router.put('/frontendtechnologys/:_id',updateFrontendTechnology);
// router.delete('/frontendtechnologys/:_id',deleteFrontendTechnology);

// //Project IDE Routes
// router.post('/projectides',addProjectIDE);
// router.get('/projectides',getAllProjectIDEs);
// router.get('/projectides/:_id',getProjectIDE);
// router.put('/projectides/:_id',updateProjectIDE);
// router.delete('/projectides/:_id',deleteProjectIDE);


// //Platform Type Routes
// router.post('/platformtypes',addPlatformType);
// router.get('/platformtypes',getAllPlatformTypes);
// router.get('/platformtypes/:_id',getPlatformType);
// router.put('/platformtypes/:_id',updatePlatformType);
// router.delete('/platformtypes/:_id',deletePlatformType);


// //DataBase Type Routes
// router.post('/databasetypes',addDatabaseType);
// router.get('/databasetypes',getAllDatabaseTypes);
// router.get('/databasetypes/:_id',getDatabaseType);
// router.put('/databasetypes/:_id',updateDatabaseType);
// router.delete('/databasetypes/:_id',deleteDatabaseType);

// //DataBase Type Routes
// router.post('/projects',uploadFolder.fields(fileData),addProject);
// router.get('/projects',getAllProject);
// router.get('/projects/:_id',getProject);