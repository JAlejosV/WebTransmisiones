(function () {
    angular.module('api')       
		.controller('HistorialTarifaLocalController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector','$compile',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector,$compile) {
                $timeout(function () {
                    $scope.ConsultarHistorialTarifaLocal(); 
                });               
                $scope.Salir_Click = function () {
                    $scope.$parent.SalirPopup_Click();
                }
                $scope.ConsultarHistorialTarifaLocal = function(continuar){
                    if($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal>0){
                        var ojb = {
                            CodigoTarifaLocal: $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal
                        }
                        miBlock(true, "html");
                         var objRequest = { "filtro": JSON.parse(JSON.stringify(ojb)) };
                         $scope.gridapigrillaHistorialTarifaLocal.find(objRequest);
                         miBlock(false, "html");
                    }                 
                }
			}]);
})();