(function () {
    angular.module('api')       
		.controller('BienvenidosController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector) {
			   
			    $timeout(function () {
			        //aqui también puede activar plugins, se ejecuta al final de carga de página.
                    
			    });
              
              	$scope.CargarMenu();
              	$http({		method: 'GET',
						   	url: 'data/ChannelProperties',
                            params: {					       
					        path: 'bienvenido'
                            }
                       
					}).success(function(data){
						$scope.bienvenidos = data.Data[0];
                        
                        
                      	
                    }); 
              
              	
			}]);


})();