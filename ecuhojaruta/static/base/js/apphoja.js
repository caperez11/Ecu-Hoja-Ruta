var app = angular.module('sampleApp', ['ngRoute']);
var hoja = {};
var hoja2 = {};
var recurso = {};


//ngRoute Rutas de angularjs singleapp
app.config(function($routeProvider) {
    $routeProvider.
    when("/form-hoja", {
        templateUrl: "registrohoja/",
        controller: "formcontroller"

    }).
    when("/reporte-hoja-usuario", {
        templateUrl: "listhoja_usuario/",
        controller: "formcontroller5"
    }).
    when("/reporte-hoja", {
        templateUrl: "listhoja/",
        controller: "formcontroller1"
    }).
    when("/view-hoja", {
        templateUrl: "hojarutaview/",
        controller: "formcontroller2"
    }).
    when("/delete-hoja", {
        templateUrl: "hojaruta_delete/",
        controller: "formcontroller7"
    }).
    when("/edit-hoja", {
        templateUrl: "hojarutaedit/",
        controller: "formcontroller6"
    }).
    when("/list-alfas", {
        templateUrl: "configview/",
        controller: "formcontroller3"
    }).
    when("/edit-estado", {
        templateUrl: "estadoview/",
        controller: "formcontroller3"
    }).
    otherwise({
        redirectTo: '/'
    });
});
//Configuraciones por problemas con los tags de django
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});
app.controller("iniciocontroller", function($scope) {

    $scope.message = "This is display an Event";

});
//Controlador
app.controller('formcontroller1', function($scope, $http, $location, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.q = '';

    $scope.get_hojaruta = function() {
        var url;
        url = 'get_hojaruta';
        $http.get(url).then(
            function(response) {
                $scope.hojarutaList = response.data.data;

                $scope.numberOfPages = function() {
                    return Math.ceil($scope.hojarutaList.length / $scope.pageSize);
                }
                return $filter('filter')($scope.hojarutaList, $scope.q);
            },
            function(response) {
                console.log('Error GetHojaRuta');
            },
        )


    }
    $scope.viewHojaRuta = function(hojadat) {
        hoja = hojadat;
        $location.path('/view-hoja');
    }
    $scope.deleteHojaRuta = function(hojadat) {
        hoja2 = hojadat;
        $location.path('/delete-hoja');
    }
});

app.controller('formcontroller5', function($scope, $http, $location, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.q = '';

    $scope.get_hojaruta_usuario = function() {
        var url;
        url = 'get_hoja_usuario/';
        $http.get(url).then(
            function(response) {
                $scope.hojarutaList = response.data.data;

                $scope.numberOfPages = function() {
                    return Math.ceil($scope.hojarutaList.length / $scope.pageSize);
                }
                return $filter('filter')($scope.hojarutaList, $scope.q);
            },
            function(response) {
                console.log('Error GetHojaRuta');
            },
        )
    }

    $scope.viewHojaRuta = function(hojadat) {
        hoja = hojadat;
        $location.path('/view-hoja');
    }
    $scope.editHojaRuta = function(hojadat) {
        hoja2 = hojadat;
        $location.path('/edit-hoja');
    }
});




//Contralador
app.controller("formcontroller", function($scope, $http, $location) {
    var d = new Date();
    $scope.fecha = d;
    $scope.complete = function(string) {
        var output = [];
        var datos = $scope.diagnosticoList;
        angular.forEach(datos, function(DatDiagnostico) {
            if (DatDiagnostico.fields.nombre.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                output.push(DatDiagnostico);
            }

        });
        $scope.filterNombre = output.slice(0, 10);
        $scope.filterCodigo = output.slice(0, 10);
    }
    $scope.fillTextbox = function(string) {
        $scope.DatCodigo = string.fields.codigo;
        $scope.DatNombre = string.fields.nombre;
        $scope.filterNombre = null;
        $scope.filterCodigo = null;
    }
    $scope.get_diagnostico = function() {
        var url;
        url = 'get_diagnostico';
        $http.get(url).then(
            function(response) {
                $scope.diagnosticoList = response.data.data;
            },
            function(response) {
                console.log('Error GetDiagnostico');
            }
        );
        $scope.get_ciudad();
        $scope.get_recurso();
    }

    $scope.get_ciudad = function() {
        var url;
        url = 'get_ciudad';
        $http.get(url).then(
            function(response) {
                $scope.ciudadList = response.data.data;
            },
            function(response) {
                console.log('Error GetCiudad');
            }
        );
    }
    $scope.get_recurso = function() {
        var url;
        url = 'get_recurso_estado';
        $http.get(url).then(
            function(response) {
                $scope.recursoList = response.data.data;
            },
            function(response) {
                console.log('Error GetRecurso');
            }
        );

    }

    $scope.crear_hojaruta = function() {
        $scope.fecha = new Date();

        function convertir(cadena, tipo) {
            if (tipo === 'fecha') {
                var fecha = new Date(cadena);
                result = fecha.getFullYear();
                if ((fecha.getMonth() + 1) <= 9) {
                    mes = '0' + (fecha.getMonth() + 1);
                    result = result + '-' + mes;
                } else {
                    result = result + '-' + (fecha.getMonth() + 1);
                }
                if (fecha.getDate() <= 9) {
                    dia = '0' + (fecha.getDate());
                    result = result + '-' + dia;
                } else {
                    result = result + '-' + fecha.getDate();
                }
                return result;
            }
            if (tipo === 'hora') {
                var hora = new Date(cadena);
                result = hora.getHours() + ':' + hora.getMinutes() + ':' + hora.getSeconds();
                return result;
            }
        }
        var fecha = convertir($scope.fecha, 'fecha');
        //Obtener hora
        var hsalidabase = new Date($scope.hsalidabase).getHours() + ':' + new Date($scope.hsalidabase).getMinutes();
        var hatencion = new Date($scope.hatencion).getHours() + ':' + new Date($scope.hsalidabase).getMinutes();
        var hcasasalud = new Date($scope.hcasasalud).getHours() + ':' + new Date($scope.hsalidabase).getMinutes();
        var hllegadabase = new Date($scope.hllegadabase).getHours() + ':' + new Date($scope.hsalidabase).getMinutes();

        let rec = $scope.recurso.fields.nombre;
        let ciu = $scope.ciudad.fields.nombre;

        var dataObj = {
            nombres: $scope.nombre,
            cedula: $scope.cedula,
            diagnostico: $scope.DatNombre,
            cie: $scope.DatCodigo,
            featencion: fecha,
            destino: $scope.destino,
            hsalidab: hsalidabase,
            hratencion: hatencion,
            hcasalud: hcasasalud,
            hllbase: hllegadabase,
            kilbase: $scope.ksalida,
            kicsalud: $scope.kcsalud,
            kretorno: $scope.kbase,
            mtraslado: $scope.motivo,
            obs: $scope.observaciones,
            cid: ciu,
            re: rec
        };
        var res = $http.post('crear_hojaruta', dataObj);
        res.success(function(data, status, headers, config) {
            alert('Registro exitoso');
            $location.path('/');

        });
        res.error(function(data, status, headers, config) {
            console.log('Error PostCrearHojaRuta');
        });
    }
});
//Imprimir hoja
app.controller("formcontroller2", function($scope, $http) {
    $scope.dathoja = [];
    $scope.viewHojaRuta = function() {
        $scope.id = hoja.pk;
        $scope.nombre = hoja.fields.datos_paciente;
        $scope.cedula = hoja.fields.cedula_paciente;
        $scope.DatNombre = hoja.fields.diagnostico_paciente;
        $scope.DatCodigo = hoja.fields.cie;
        $scope.fecha = hoja.fields.fecha_atencion;
        $scope.destino = hoja.fields.destino_atencion;
        $scope.hsalidabase = hoja.fields.h_salida_base;
        $scope.hatencion = hoja.fields.h_atencion;
        $scope.hcasasalud = hoja.fields.h_casa_salud;
        $scope.hllegadabase = hoja.fields.h_llegada_base;
        $scope.ksalida = hoja.fields.kilometraje_base;
        $scope.kcsalud = hoja.fields.kilometraje_casa_salud;
        $scope.kbase = hoja.fields.kilometraje_retorno_base;
        $scope.motivo = hoja.fields.motivo_traslado;
        $scope.observaciones = hoja.fields.observaciones;
        $scope.ciudad = hoja.fields.ciudad;
        $scope.recurso = hoja.fields.recurso;
    }
    $scope.complete = function(string) {
        var output = [];
        var datos = $scope.diagnosticoList;
        angular.forEach(datos, function(DatDiagnostico) {
            if (DatDiagnostico.fields.nombre.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                output.push(DatDiagnostico);
            }

        });
        $scope.filterNombre = output.slice(0, 10);
        $scope.filterCodigo = output.slice(0, 10);
    }
    $scope.fillTextbox = function(string) {
            $scope.DatCodigo = string.fields.codigo;
            $scope.DatNombre = string.fields.nombre;
            $scope.filterNombre = null;
            $scope.filterCodigo = null;
        }
        // imprimir hoja
    function toDataURL(src, callback) {
        var image = new Image();
        image.crossOrigin = 'Anonymous';

        image.onload = function() {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            context.drawImage(this, 0, 0);
            var dataURL = canvas.toDataURL('image/');
            callback(dataURL);
        };

        image.src = src;
    }
    $scope.convertImage = toDataURL('static/base/img/logo.png', function(dataURL) {
        // do something with dataURL

        $scope.imagenPush = dataURL;

    });
    $scope.imprimirElemento = function() {

        let nombre = hoja.fields.datos_paciente;
        let cedula = hoja.fields.cedula_paciente;
        let DatNombre = hoja.fields.diagnostico_paciente;
        let DatCodigo = hoja.fields.cie;
        let fecha = hoja.fields.fecha_atencion;
        let destino = hoja.fields.destino_atencion;
        let hsalidabase = hoja.fields.h_salida_base;
        let hatencion = hoja.fields.h_atencion;
        let hcasasalud = hoja.fields.h_casa_salud;
        let hllegadabase = hoja.fields.h_llegada_base;
        let ksalida = hoja.fields.kilometraje_base;
        let kcsalud = hoja.fields.kilometraje_casa_salud;
        let kbase = hoja.fields.kilometraje_retorno_base;
        let motivo = hoja.fields.motivo_traslado;
        let observaciones = hoja.fields.observaciones;

        $scope.dathoja = [{
            nombre
        }, {
            cedula
        }, {
            DatNombre
        }, {
            DatCodigo
        }, {
            fecha
        }, {
            destino
        }, {
            hsalidabase
        }, {
            hatencion
        }, {
            hcasasalud
        }, {
            hllegadabase
        }, {
            ksalida
        }, {
            kcsalud
        }, {
            kbase
        }, {
            motivo
        }, {
            observaciones
        }];

        var content = [{
                text: '\n\n'
            },
            {
                image: $scope.imagenPush,
                width: 180,
                margin: [30, -20, 10, -40],
                alignment: 'right'
            },
            {
                text: [
                    { text: 'MINISTERIO DE  ', fontSize: 18, margin: [10, -10, 10, -15], },
                    { text: 'SALUD PÚBLICA ', fontSize: 18, margin: [10, -10, 10, -15], bold: true },
                    '\n\n',
                    { text: 'HOJA DE RUTA', italics: true, fontSize: 20, alignment: 'center', bold: true },
                    '\n\n'
                ]
            }

        ]
        content.push({
            style: 'tableExample',
            table: {
                widths: ['*', '*'],
                body: [
                    [{ text: 'Nombres y apellidos del paciente:', style: 'tableHeader', bold: true },
                        { text: 'Nro. Cédula:', style: 'tableHeader', bold: true }
                    ],
                    [{ text: JSON.stringify($scope.dathoja[0]['nombre']).replace(/['"]+/g, '') + '\n\n', style: 'tableHeader', alignment: 'center' },
                        { text: JSON.stringify($scope.dathoja[1]['cedula']).replace(/['"]+/g, '') + '\n\n', style: 'tableHeader', alignment: 'center' }
                    ],
                ]
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                },
                vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                },
                hLineColor: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                },
                vLineColor: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },

            }
        })

        content.push({
            style: 'tableExample',
            table: {
                widths: ['*', '*'],
                body: [
                    [{ text: 'Diagnóstico: ', style: 'tableHeader', bold: true },
                        { text: 'CIE 10:', style: 'tableHeader', bold: true }
                    ],
                    [{ text: JSON.stringify($scope.dathoja[2]['DatNombre']).replace(/['"]+/g, '') + '\n\n', style: 'tableHeader', alignment: 'center' },
                        { text: JSON.stringify($scope.dathoja[3]['DatCodigo']).replace(/['"]+/g, '') + '\n\n', style: 'tableHeader', alignment: 'center' }
                    ],
                ]
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 0 : 1;
                },
                vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                },
                hLineColor: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                },
                vLineColor: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },

            }
        })
        content.push({
            style: 'tableExample',
            table: {
                widths: ['*', '*'],
                body: [
                    [{ text: 'Fecha:  ', style: 'tableHeader', bold: true },
                        { text: 'Destino:', style: 'tableHeader', bold: true }
                    ],
                    [{ text: JSON.stringify($scope.dathoja[4]['fecha']).replace(/['"]+/g, '') + '\n\n', style: 'tableHeader', alignment: 'center' },
                        { text: JSON.stringify($scope.dathoja[5]['destino']).replace(/['"]+/g, '') + '\n\n', style: 'tableHeader', alignment: 'center' }
                    ],
                ]
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 1 : 0;
                },
                vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                },
                hLineColor: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                },
                vLineColor: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },

            }
        })

        content.push({
            style: 'tableExample',
            table: {
                widths: ['*', '*', '*', '*'],
                body: [
                    [{ text: 'Hora de salida de base:', style: 'tableHeader', alignment: 'center' },
                        { text: 'Hora de atención:', style: 'tableHeader', alignment: 'center' },
                        { text: 'Hora en casa de salud:', style: 'tableHeader', alignment: 'center' },
                        { text: 'Hora de llegada a base: ', style: 'tableHeader', alignment: 'center' }
                    ],
                    [
                        { text: JSON.stringify($scope.dathoja[6]['hsalidabase']).replace(/['"]+/g, '') + '\n', style: 'tableHeader', margin: [0, 10, 0, 8], alignment: 'center' },
                        { text: JSON.stringify($scope.dathoja[7]['hatencion']).replace(/['"]+/g, ''), style: 'tableHeader', margin: [0, 10, 0, 8], alignment: 'center' },
                        { text: JSON.stringify($scope.dathoja[8]['hcasasalud']).replace(/['"]+/g, ''), style: 'tableHeader', margin: [0, 10, 0, 8], alignment: 'center' },
                        { text: JSON.stringify($scope.dathoja[9]['hllegadabase']).replace(/['"]+/g, ''), style: 'tableHeader', margin: [0, 10, 0, 8], alignment: 'center' }
                    ],


                ]
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 0 : 1;
                },
                vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                },
                hLineColor: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                },
                vLineColor: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },

            }
        })

        content.push({
            style: 'tableExample',
            table: {
                widths: ['*', '*', '*'],
                body: [
                    [{ text: 'Kilometraje de salida:' + '\n', style: 'tableHeader', alignment: 'center' },
                        { text: 'Kilometraje en casa de salud:', style: 'tableHeader', alignment: 'center' },
                        { text: 'Kilometraje en base:', style: 'tableHeader', alignment: 'center' }
                    ],
                    [{ text: JSON.stringify($scope.dathoja[10]['ksalida']).replace(/['"]+/g, '') + '\n', style: 'tableHeader', margin: [0, 10, 0, 8], alignment: 'center' },
                        { text: JSON.stringify($scope.dathoja[11]['kcsalud']).replace(/['"]+/g, ''), style: 'tableHeader', margin: [0, 10, 0, 8], alignment: 'center' },
                        { text: JSON.stringify($scope.dathoja[12]['kbase']).replace(/['"]+/g, ''), style: 'tableHeader', margin: [0, 10, 0, 8], alignment: 'center' }
                    ],

                ]
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                },
                vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                },
                hLineColor: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                },
                vLineColor: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },

            }
        })
        content.push({
            style: 'tableExample',
            table: {
                widths: ['*'],
                body: [
                    [{ text: 'Motivo: ' }],
                    [{ text: JSON.stringify($scope.dathoja[13]['motivo']).replace(/['"]+/g, '') + '\n\n', style: 'tableHeader', margin: [0, 10, 0, 8], alignment: 'justify' }],
                ]
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 0 : 1;
                },
                vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                },
                hLineColor: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                },
                vLineColor: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },

            }
        })
        content.push({
            style: 'tableExample',
            table: {
                widths: ['*'],
                body: [
                    [{ text: 'Observaciones: ' }],
                    [{ text: JSON.stringify($scope.dathoja[14]['observaciones']).replace(/['"]+/g, '') + '\n\n', style: 'tableHeader', margin: [0, 10, 0, 8], alignment: 'justify' }],
                ]
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 0.1 : 1;
                },
                vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                },
                hLineColor: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                },
                vLineColor: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },

            }
        })
        content.push({
            style: 'tableExample',
            table: {
                widths: ['*', '*'],
                body: [
                    [{
                            text: '..............................................................',
                            style: 'tableHeader',
                            margin: [0, 20, 0, 8],
                            alignment: 'center'
                        },
                        {
                            text: '..............................................................',
                            style: 'tableHeader',
                            margin: [0, 20, 0, 8],
                            alignment: 'center'
                        }
                    ],
                    [{ text: 'F. Conductor de ambulancia', style: 'tableHeader', margin: [0, 0, 0, 0], alignment: 'center' },
                        { text: 'F. Para-médico', style: 'tableHeader', margin: [0, 0, 0, 0], alignment: 'center' }
                    ],
                ]
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                },
                vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                },
                hLineColor: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                },
                vLineColor: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },

            }
        })

        var docDefinition = {
            content: content,
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                    margin: [10, 10, 10, 10]
                }
            },
        };
        var p = pdfMake.createPdf(docDefinition);
        pdfMake.createPdf(docDefinition).print();
        //pdfMake.createPdf(docDefinition).download('Hoja ruta');

    }

});


app.controller("formcontroller4", function($scope, $http, $filter, $location) {

    $scope.get_recurso = function() {
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.q = '';
        var url;
        url = 'get_recurso';
        $http.get(url).then(
            function(response) {
                $scope.recursoList = response.data.data;
                $scope.numberOfPages = function() {
                    return Math.ceil($scope.recursoList.length / $scope.pageSize);
                }
                return $filter('filter')($scope.recursoList, $scope.q);
            },
            function(response) {
                console.log('Error GetRecurso');
            }
        );
    }
    $scope.viewRecurso = function(hojarecurso) {
        recurso = hojarecurso;
        $location.path('/edit-estado');
    }

});
app.controller("formcontroller3", function($scope, $http, $location) {
    $scope.viewEstados = function() {
        $scope.nombre = recurso.fields.nombre;
        $scope.estado = recurso.fields.estado;
        $scope.id = recurso.pk;
    }
    $scope.editar_estado = function() {
        var dataObj = {
            id: $scope.id,
            estado: $scope.estado,
        };
        var res = $http.post('edit_estado', dataObj);
        res.success(function(data, status, headers, config) {
            alert('Registro exitoso');
            $location.path('/list-alfas');

        });
        res.error(function(data, status, headers, config) {
            console.log('Error PostCrearHojaRuta');
        });
    }


});

app.controller("formcontroller6", function($scope, $http) {
    $scope.dathoja = [];
    var d = new Date();
    $scope.fecha2 = d;
    $scope.editHojaRuta = function() {
        $scope.id = hoja2.pk;
        $scope.nombre = hoja2.fields.datos_paciente;
        $scope.cedula = hoja2.fields.cedula_paciente;
        $scope.DatNombre = hoja2.fields.diagnostico_paciente;
        $scope.DatCodigo = hoja2.fields.cie;
        $scope.fecha = hoja2.fields.fecha_atencion;
        $scope.destino = hoja2.fields.destino_atencion;
        $scope.hsalidabase = hoja2.fields.h_salida_base;
        $scope.hatencion = hoja2.fields.h_atencion;
        $scope.hcasasalud = hoja2.fields.h_casa_salud;
        $scope.hllegadabase = hoja2.fields.h_llegada_base;
        $scope.ksalida = hoja2.fields.kilometraje_base;
        $scope.kcsalud = hoja2.fields.kilometraje_casa_salud;
        $scope.kbase = hoja2.fields.kilometraje_retorno_base;
        $scope.motivo = hoja2.fields.motivo_traslado;
        $scope.observaciones = hoja2.fields.observaciones;
        $scope.ciudad = hoja2.fields.ciudad;
        $scope.recurso = hoja2.fields.recurso;

        $scope.get_diagnostico();

    }
    $scope.complete = function(string) {
        var output = [];
        var datos = $scope.diagnosticoList;
        angular.forEach(datos, function(DatDiagnostico) {
            if (DatDiagnostico.fields.nombre.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                output.push(DatDiagnostico);
            }

        });
        $scope.filterNombre = output.slice(0, 10);
        $scope.filterCodigo = output.slice(0, 10);
    }
    $scope.fillTextbox = function(string) {
        $scope.DatCodigo = string.fields.codigo;
        $scope.DatNombre = string.fields.nombre;
        $scope.filterNombre = null;
        $scope.filterCodigo = null;
    }
    $scope.get_diagnostico = function() {
        var url;
        url = 'get_diagnostico';
        $http.get(url).then(
            function(response) {
                $scope.diagnosticoList = response.data.data;
            },
            function(response) {
                console.log('Error GetDiagnostico');
            }
        );
        $scope.get_ciudad();
        $scope.get_recurso();
    }

    $scope.get_ciudad = function() {
        var url;
        url = 'get_ciudad';
        $http.get(url).then(
            function(response) {
                $scope.ciudadList = response.data.data;
            },
            function(response) {
                console.log('Error GetCiudad');
            }
        );
    }
    $scope.get_recurso = function() {
        var url;
        url = 'get_recurso_estado';
        $http.get(url).then(
            function(response) {
                $scope.recursoList = response.data.data;
            },
            function(response) {
                console.log('Error GetRecurso');
            }
        );

    }


    $scope.edit_hoja = function() {

        $scope.fecha = new Date();

        function convertir(cadena, tipo) {
            if (tipo === 'fecha') {
                var fecha = new Date(cadena);
                result = fecha.getFullYear();
                if ((fecha.getMonth() + 1) <= 9) {
                    mes = '0' + (fecha.getMonth() + 1);
                    result = result + '-' + mes;
                } else {
                    result = result + '-' + (fecha.getMonth() + 1);
                }
                if (fecha.getDate() <= 9) {
                    dia = '0' + (fecha.getDate());
                    result = result + '-' + dia;
                } else {
                    result = result + '-' + fecha.getDate();
                }
                return result;
            }
            if (tipo === 'hora') {
                var hora = new Date(cadena);
                result = hora.getHours() + ':' + hora.getMinutes() + ':' + hora.getSeconds();
                return result;
            }
        }
        var fecha = convertir($scope.fecha2, 'fecha');
        //Obtener hora
        var hsalidabase = new Date($scope.hsalidabase2).getHours() + ':' + new Date($scope.hsalidabase2).getMinutes();
        var hatencion = new Date($scope.hatencion2).getHours() + ':' + new Date($scope.hsalidabase2).getMinutes();
        var hcasasalud = new Date($scope.hcasasalud2).getHours() + ':' + new Date($scope.hsalidabase2).getMinutes();
        var hllegadabase = new Date($scope.hllegadabase2).getHours() + ':' + new Date($scope.hsalidabase2).getMinutes();

        let rec = $scope.recurso2.fields.nombre;
        let ciu = $scope.ciudad2.fields.nombre;

        var dataObj = {
            id: $scope.id,
            nombres: $scope.nombre,
            cedula: $scope.cedula,
            diagnostico: $scope.DatNombre,
            cie: $scope.DatCodigo,
            featencion: fecha,
            destino: $scope.destino,
            hsalidab: hsalidabase,
            hratencion: hatencion,
            hcasalud: hcasasalud,
            hllbase: hllegadabase,
            kilbase: $scope.ksalida,
            kicsalud: $scope.kcsalud,
            kretorno: $scope.kbase,
            mtraslado: $scope.motivo,
            obs: $scope.observaciones,
            cid: ciu,
            re: rec
        };
        var res = $http.post('edit_hojaruta', dataObj);
        res.success(function(data, status, headers, config) {
            alert('Actualización Exitosa');
            $location.path('/');

        });
        res.error(function(data, status, headers, config) {
            console.log('Error PostEditarHojaRuta');
        });



    }
});

app.controller("formcontroller7", function($scope, $http, $location) {

    $scope.viewdeleteHojaRuta = function() {
        $scope.id = hoja2.pk;
        $scope.nombre = hoja2.fields.datos_paciente;
        $scope.cedula = hoja2.fields.cedula_paciente;
        $scope.DatNombre = hoja2.fields.diagnostico_paciente;
        $scope.DatCodigo = hoja2.fields.cie;
        $scope.fecha = hoja2.fields.fecha_atencion;
        $scope.destino = hoja2.fields.destino_atencion;
        $scope.hsalidabase = hoja2.fields.h_salida_base;
        $scope.hatencion = hoja2.fields.h_atencion;
        $scope.hcasasalud = hoja2.fields.h_casa_salud;
        $scope.hllegadabase = hoja2.fields.h_llegada_base;
        $scope.ksalida = hoja2.fields.kilometraje_base;
        $scope.kcsalud = hoja2.fields.kilometraje_casa_salud;
        $scope.kbase = hoja2.fields.kilometraje_retorno_base;
        $scope.motivo = hoja2.fields.motivo_traslado;
        $scope.observaciones = hoja2.fields.observaciones;
        $scope.ciudad = hoja2.fields.ciudad;
        $scope.recurso = hoja2.fields.recurso;
        $scope.usuario = hoja2.fields.usuario;
    }

    $scope.deleteHojaRuta = function() {
        var dataObj = {
            id: $scope.id,
            nombres: $scope.nombre,
            cedula: $scope.cedula,
            diagnostico: $scope.DatNombre,
            cie: $scope.DatCodigo,
            featencion: $scope.fecha,
            destino: $scope.destino,
            hsalidab: $scope.hsalidabase,
            hratencion: $scope.hatencion,
            hcasalud: $scope.hcasasalud,
            hllbase: $scope.hllegadabase,
            kilbase: $scope.ksalida,
            kicsalud: $scope.kcsalud,
            kretorno: $scope.kbase,
            mtraslado: $scope.motivo,
            obs: $scope.observaciones,
            cid: $scope.ciudad,
            re: $scope.recurso,
            usuario: $scope.usuario,
        };
        var res = $http.post('delete_hoja_ruta', dataObj);
        res.success(function(data, status, headers, config) {
            alert('Borrado Exitoso');
            $location.path('/');

        });
        res.error(function(data, status, headers, config) {
            console.log('Error Borrar Hoja');
        });
    }


});

app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});