(function(){
    'use strict';

    angular
        .module('projectSearchFilter',[])
        .filter('projectFilter', projectFilter);

       
        
            function projectFilter(){
        
                return getProjectsCustomInput;
            }
           
            function getProjectsCustomInput(projects,searchString,programmingLanguages,databaseTypes,frontendTechnologys,platformTypes,minPrice,maxPrice){

             
                var programmingLanguageResult=[];
                angular.forEach(programmingLanguages,function(programmingLanguage){
                        if(programmingLanguage.checked==true){
                            programmingLanguageResult.push(programmingLanguage._id);
                        }

                })

                var databaseTypesResult=[];
                angular.forEach(databaseTypes,function(databaseType){
                        if(databaseType.checked==true){
                            databaseTypesResult.push(databaseType._id);
                        }

                })

                var frontendTechnologysResult=[];
                angular.forEach(frontendTechnologys,function(frontendTechnology){
                        if(frontendTechnology.checked==true){
                            frontendTechnologysResult.push(frontendTechnology._id);
                        }

                })
                var platformTypesResult=[];
                angular.forEach(platformTypes,function(platformType){
                        if(platformType.checked==true){
                            platformTypesResult.push(platformType._id);
                        }

                })
              
                   //console.log(programmingLanguageResult);
                   //console.log(databaseTypesResult);
                   //console.log(frontendTechnologysResult);
                   //console.log(platformTypesResult);


                   if(!searchString&&programmingLanguageResult.length==0&&databaseTypesResult.length==0&&frontendTechnologysResult.length==0&&platformTypesResult.length==0){
                    return projects.filter(priceFilter);
                }
        
                var result = [];
                if(searchString){
                searchString = searchString.toLowerCase();
                }
               
                angular.forEach(projects, function(project){
                    //console.log(project.programmingLanguage);
        
                    if(project.projectTitle.toLowerCase().indexOf(searchString) > -1){
                        
                      
                    result.push(project);
                    }
                    //console.log(project.finalPrice>=minPrice)
                   
                    angular.forEach(project.programmingLanguage,function(programmingLanguage){
                        
                        
                                               
                                                if(programmingLanguageResult.indexOf(programmingLanguage._id) > -1){
                                                  
                                                    result.push(project);
                                                }
                    })

                    angular.forEach(project.frontendTechnology,function(frontendTechnology){


                       
                        if(frontendTechnologysResult.indexOf(frontendTechnology._id) > -1){
                          
                            result.push(project);
                        }
                    })

                        
                        if(databaseTypesResult.indexOf(project.databaseType) > -1){
                                                    
                            result.push(project);
                        }
                 

                   
                        if(platformTypesResult.indexOf(project.platformType) > -1){
                                                  
                            result.push(project);
                        }
                   
        
                });


                function onlyUnique(value, index, self) { 
                    return self.indexOf(value) === index;
                }
                function priceFilter(value, index, self) { 

                    return (value.finalPrice>=minPrice&&value.finalPrice<=maxPrice) ;
                }
              
               
                var unique = result.filter( onlyUnique ); 
                unique =unique.filter(priceFilter);
               
                return unique;
            };



}());
