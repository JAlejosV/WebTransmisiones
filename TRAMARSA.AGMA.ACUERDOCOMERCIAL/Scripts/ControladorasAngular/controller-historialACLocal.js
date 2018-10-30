(function () {
    angular.module('api')
		.controller('HistorialACLocalController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
			    $timeout(function () {
			        $scope.ConsultarHistorialTarifaLocal();
			    });
			    $scope.Salir_Click = function () {
			        $scope.$parent.SalirPopup_Click();
			    }
			    $scope.ConsultarHistorialTarifaLocal = function (continuar) {
			        if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal > 0) {
			            var ojb = {
			                CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal
			            }
			            miBlock(true, "html");
			            var objRequest = { "filtro": JSON.parse(JSON.stringify(ojb)) };
			            $scope.gridapigrillaHistorialACLocal.find(objRequest);
			            miBlock(false, "html");
			        }
			    }
			}]);
})();