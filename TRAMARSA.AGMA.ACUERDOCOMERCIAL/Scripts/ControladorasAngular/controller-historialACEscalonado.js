(function () {
    angular.module('api')
		.controller('HistorialACEscalonadoController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
			    $timeout(function () {
			        $scope.ConsultarHistorialACEscalonado();
			    });
			    $scope.Salir_Click = function () {
			        $scope.$parent.SalirPopup_Click();
			    }
			    $scope.ConsultarHistorialACEscalonado = function (continuar) {
			        if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado > 0) {
			            var ojb = {
			                CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado
			            }
			            miBlock(true, "#divPopupHistorialACEscalonado");
			            var objRequest = { "filtro": JSON.parse(JSON.stringify(ojb)) };
			            $scope.gridapigrillaHistorialACEscalonado.find(objRequest);
			            miBlock(false, "#divPopupHistorialACEscalonado");
			        }
			    }
			}]);
})();