(function () {
    angular.module('api')
    .controller('BuscarServiciosBLController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              $scope.CargarDatosIniciales();
          });
          $scope.CargarDatosIniciales = function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.DataFiltroBusquedaServicioBL == undefined)
                  $rootScope.DatosFormulario.DataFiltroBusquedaServicioBL = new Object();
              $rootScope.FlagMostrarBotonSeleccionar = true;
              $scope.Limpiar_Click();
          }
          $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
              var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
              var estado = ProcesarSeleccionado(data);
              if (estado) {
                  $rootScope.$apply();
                  $scope.$parent.SalirPopup_Click();
              }
          }
          function validateDuplicate(data, lista) {
              var listDuplicateKey = $.grep(lista, function (e) { return e.CodigoServicio == data.CodigoServicio; });
              if (listDuplicateKey.length > 0) {
                  $(".caja11.msgerror.Objeto").html("El servicio seleccionado ya existe, elija otro.");
                  return true;
              } else {
                  $(".caja11.msgerror.Objeto").html("");
                  return false;
              }
          }
          function ProcesarSeleccionado(data) {
              var nuevoId;
              if ($rootScope.FlagCallServiciosBL == "serviciosALaNave") {
                  if (validateDuplicate(data, $rootScope.DatosFormulario.RegistroAC.ListaServicioNave)) {
                      return false;
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaServicioNave, "IdServicioNave");
                  var newObjAcLocalALaNave = {
                      IdServicioNave: nuevoId,
                      CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                      CodigoServicio: data.CodigoServicio,
                      NombreServicio: data.NombreServicio,
                      Accion: "I"
                  }
                  $scope.gridapiListaServicioNave.insertRange([newObjAcLocalALaNave]);
                  if ($.inArray(newObjAcLocalALaNave, $rootScope.DatosFormulario.RegistroAC.grillaListaServicioNaveMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroAC.grillaListaServicioNaveMemoriaList.push(newObjAcLocalALaNave);
                  }
              } else if ($rootScope.FlagCallServiciosBL == "serviciosAlBL") {
                  if (validateDuplicate(data, $rootScope.DatosFormulario.RegistroAC.ListaServiciosBL)) {
                      return false;
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaServiciosBL, "IdServicioBL");
                  var newObjAcLocalAlBL = {
                      IdServicioBL: nuevoId,
                      CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                      CodigoServicio: data.CodigoServicio,
                      NombreServicio: data.NombreServicio,
                      Accion: "I"
                  }
                  $scope.gridapiListaServiciosBL.insertRange([newObjAcLocalAlBL]);
                  if ($.inArray(newObjAcLocalAlBL, $rootScope.DatosFormulario.RegistroAC.grillaListaServiciosBLMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroAC.grillaListaServiciosBLMemoriaList.push(newObjAcLocalAlBL);
                  }
              }
              else if ($rootScope.FlagCallServiciosBL == "serviciosEscalonadoALaNave") {
                  if (validateDuplicate(data, $rootScope.DatosFormulario.RegistroACEscalonado.ListaServicioNave)) {
                      return false;
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaServicioNave, "IdServicioNave");
                  var newObjEscalonadoALaNave = {
                      IdServicioNave: nuevoId,
                      CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                      CodigoServicio: data.CodigoServicio,
                      NombreServicio: data.NombreServicio,
                      Accion: "I"
                  }
                  $scope.gridapigrillaAceListaServicioNave.insertRange([newObjEscalonadoALaNave]);
                  if ($.inArray(newObjEscalonadoALaNave, $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServicioNaveMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServicioNaveMemoriaList.push(newObjEscalonadoALaNave);
                  }
              }
              else if ($rootScope.FlagCallServiciosBL == "serviciosEscalonadoAlBL") {
                  if (validateDuplicate(data, $rootScope.DatosFormulario.RegistroACEscalonado.ListaServiciosBL)) {
                      return false;
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaServiciosBL, "IdServicioBL");
                  var newObjEscalonadoAlBL = {
                      IdServicioBL: nuevoId,
                      CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                      CodigoServicio: data.CodigoServicio,
                      NombreServicio: data.NombreServicio,
                      Accion: "I"
                  }
                  $scope.gridapigrillaAceListaServiciosBL.insertRange([newObjEscalonadoAlBL]);
                  if ($.inArray(newObjEscalonadoAlBL, $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServiciosBLMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServiciosBLMemoriaList.push(newObjEscalonadoAlBL);
                  }
              }
              return true;
          }
          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaBusquedaListaServiciosBL").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaBusquedaListaServiciosBL').getRowData(rowKey);
                      var estado = ProcesarSeleccionado(rowObject);
                      if (estado) {
                          $(".caja11.msgerror.Objeto").html("");
                          $scope.$parent.SalirPopup_Click();
                      }

                  } else {
                      $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                  }
              } else {
                  $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
              }
          }
          $scope.Grid_DataBind = function (grid, data) {
              $scope.gridapiListaNaveDesde.refresh(data);

          }
          $scope.Buscar_Click = function () {
              $(".caja11.msgerror.Objeto").html("");
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarServiciosBL");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.DataFiltroBusquedaServicioBL)) };
              $scope.gridapigrillaBusquedaListaServiciosBL.find(objRequest);
              miBlock(false, "#divPopupBuscarServiciosBL");
          }
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
          $scope.Limpiar_Click = function () {
              $(".caja11.msgerror.Objeto").html("");
              $rootScope.DatosFormulario.DataFiltroBusquedaServicioBL.CodigoServicio = "";
              $rootScope.DatosFormulario.DataFiltroBusquedaServicioBL.NombreServicio = "";
          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
      }]);
})();