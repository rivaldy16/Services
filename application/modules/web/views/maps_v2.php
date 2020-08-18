<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>MAPS DESA KRANGGAN</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Main Css -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/main/main.css') ?>">
  <!-- Bootstrap 4 -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/bootstrap/css/bootstrap.min.css') ?>">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/fontawesome/css/all.min.css') ?>">
  <!-- Date Picker -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css') ?>">
  <!-- DataTables -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css') ?>">
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/DataTables/Responsive-2.2.2/css/responsive.bootstrap4.min.css') ?>">
  <!-- Leaflet -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/leaflet/leaflet.css') ?>">
  <!-- Sweetalert2 -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/sweetalert2/dist/sweetalert2.min.css') ?>">
  <!-- Select2 -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/select2/select2.min.css') ?>">
  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  <!-- Leatleaf -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/leafletrouting/dist/leaflet-routing-machine.css') ?>" />
  <!-- Chose -->
  <link rel="stylesheet" href="<?php echo base_url('assets/maps_v2/chosen/chosen.css') ?>" />

  <style type="text/css">
      .modal {
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
    }

    /* Add Animation */
    .modal-content, #caption {    
        -webkit-animation-name: zoom;
        -webkit-animation-duration: 0.6s;
        animation-name: zoom;
        animation-duration: 0.6s;
    }

    /* Caption of Modal Image */
    #caption {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
        text-align: center;
        color: #ccc;
        padding: 10px 0;
        height: 150px;
    }

    @-webkit-keyframes zoom {
        from {-webkit-transform:scale(0)} 
        to {-webkit-transform:scale(1)}
    }

    @keyframes zoom {
        from {transform:scale(0)} 
        to {transform:scale(1)}
    }

    /* The Close Button */
    .close {
        position: absolute;
        top: 15px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
    }

    .close:hover,
    .close:focus {
        color: #bbb;
        text-decoration: none;
        cursor: pointer;
    }

    /* 100% Image Width on Smaller Screens */
    @media only screen and (max-width: 700px){
        .modal-content {
            width: 100%;
        }
    }
  </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" style="background-color: #1ab394 !important;">
        <a class="navbar-brand" href="<?php echo site_url(); ?>">MAPS DESA KRANGGAN</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </nav>


    <div class="content">
        <div class="row" style="height: 100% !important;">
            <!-- <div class="col-12">
                <div id="mapid"></div>
            </div> -->
            <div class="col-md-12" style="padding-left: 0px !important;padding-right: 0px !important">
                <div class="col-md-12 card card-content card-maps" style="margin-left: 10px;">
                    <div class="card-content-header">
                      
                        <!-- <select class="form-control" name="ddCategory" id="dd_category" style="width: 100%;" required> -->
                        <select class="form-control" name="search" id="search" style="width: 20%;">
                        </select>
                        <button id="cari" value='1' class="btn btn-primary" style="background-color: #1ab394 !important; border-color: #1ab394 !important; " ><i class="fas fa-search"></i> Search</button>

                    </div>
                </div>    
                <div id="mapid" style="height: 1000px;"></div>
            </div>
            <div class="col-md-2" style="padding-left: 0px !important;padding-right: 0px !important" id="maps_table" hidden="">
                <div class="card card-content card-maps" >
                    <div class="card-content-header">
                        <h3>Wilayah</h3>
                    </div>
                    <div class="card-content-body">
                        <table class="table table-striped table-bordered" style="width: 100%;" id="dt_Location">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>ID</th>
                                    <th>Category</th>
                                    <th>Location Name</th>
                                    <th>Longitude</th>
                                    <th>Latitude</th>
                                    <th>Description</th>
                                    <th>Created By</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- jQuery 3 -->
    <script src="<?php echo base_url('assets/maps_v2/jquery/dist/jquery.min.js') ?>"></script>
    <!-- Bootstrap 4 -->
    <script src="<?php echo base_url('assets/maps_v2/bootstrap/js/bootstrap.min.js') ?>"></script>
    <!-- datepicker -->
    <script src="<?php echo base_url('assets/maps_v2/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js') ?>"></script>
    <!-- DataTables -->
    <script src="<?php echo base_url('assets/maps_v2/DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js') ?>"></script>
    <script src="<?php echo base_url('assets/maps_v2/DataTables/DataTables-1.10.18/js/dataTables.bootstrap4.min.js') ?>"></script>
    <script src="<?php echo base_url('assets/maps_v2/DataTables/Responsive-2.2.2/js/dataTables.responsive.min.js') ?>"></script>
    <script src="<?php echo base_url('assets/maps_v2/DataTables/Responsive-2.2.2/js/responsive.bootstrap4.min.js') ?>"></script>
    <!-- Leaflet -->
    <script src="<?php echo base_url('assets/maps_v2/leaflet/leaflet.js') ?>"></script>
    <!-- Axios -->
    <script src="<?php echo base_url('assets/maps_v2/axios/axios.min.js') ?>"></script>
    <!-- Sweetalert2 -->
    <script src="<?php echo base_url('assets/maps_v2/sweetalert2/dist/sweetalert2.min.js') ?>"></script>
    <!-- Select2 -->
    <script src="<?php echo base_url('assets/maps_v2/select2/select2.min.js') ?>"></script>
    <!-- Main -->
    <script src="<?php echo base_url('assets/maps_v2/main/main.js') ?>"></script>
    <!-- Leat Leaf -->
    <script src="<?php echo base_url('assets/maps_v2/leafletrouting/dist/leaflet-routing-machine.min.js') ?>"></script>
    <!-- Select 2 -->

    <div id="myModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="img01" style="width: 50%;margin-left: auto;margin-right: auto;">
        <div id="caption"></div>
    </div>

  </body>
</html>

<script type="text/javascript">
    var mymap;
    var layerGroup;
    $(document).ready(function(){
        // $('#mapid').height(($(window).height())-($('.navbar').height())-15);
        setTable();
        // $('#mapid').height("100%");
        initMapss();
        // $("#search").select2({
        //         placeholder: "Category",
        //         allowClear: true
        // });

        setDataloc();

        // //add
        // mymap.on('click', function(ev){
        //   var latlng = L.map('mapid').mouseEventToLatLng(ev.originalEvent);
        //   console.log(latlng.lat + ', ' + latlng.lng);
        // });

    });
    $(document).on('click', '#cari', function(){

        var data = $("#search").val();
        var increm = $("#cari").val();
        $.ajax({
                url  : "<?php echo base_url('web/getDatakoor')?>",
                method : "POST",
                data : {data: data},
               
                dataType : 'json',
                success: function(data){
                    debugger;
                    // var lat = data.latitude;
                    // var long = data.longitude;

                    $("#cari").val(increm + 1);
                    
                    // console.log(lat);
                    // console.log(long);
                    // initMap(long,lat, increm);

                    //initMaps(lat,long);

                    //remove maps
                    mymap.remove();

                    mymap = L.map('mapid').setView([-6.3404698,106.6455052], 16);
                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(mymap);
                    layerGroup = L.layerGroup().addTo(mymap);

                    setTimeout(function () {
                        if (data.length > 0) {
                            // console.log(data);
                            data.forEach(function(item) {
                                //debugger;

                                var id = item["id"];
                                var category = item["category"];
                                var location_name = item["location_name"];
                                var lng = item["longitude"];
                                var lat = item["latitude"];
                                var description = item["description"];
                                var foto = item["image"];
                                var file = item["file"];
                                if (foto != null && foto != '')
                                    var img_sarana = '<img onclick="popup_img(`<?php echo base_url('assets/files/'); ?>'+foto+'`);" src="<?php echo base_url('assets/files/'); ?>'+foto+'" alt="zoom onclick" height="100" style="cursor:pointer;">';
                                else 
                                    var img_sarana = '';

                                if (file != null & file != '')
                                    file = '<a target="_blank" href="<?php echo base_url('assets/files/')?>'+file+'">'+file+'</a>';
                                else
                                    file = '';

                                var LeafIcon = L.Icon.extend({
                                    options: {
                                       
                                        iconSize:     [35,40],
                                        shadowSize:   [50, 64],
                                        iconAnchor:   [22, 94],
                                        shadowAnchor: [4, 62],
                                        popupAnchor:  [-3, -76]
                                    }
                                });
                                var greenIcon = new LeafIcon({iconUrl: 'loc.png'})
                                var marker = L.marker([lng, lat]).addTo(layerGroup);
                                
                                var myPopup = L.DomUtil.create('div', 'infoWindow');
                                myPopup.innerHTML = "<div align='center' id='info'><span>Kategori : </span> <b>" + category + "</b><br /> <span>Lokasi : </span>" + location_name + "<br /><br /><span>"+ img_sarana +"</span>" + description + "<br /><span>File : </span>" + file + "</div>";

                                // myPopup.innerHTML = '<table class="table table-bordered table-striped"><tr><td>1.</td><td>Kategori</td><td>'+ category +'</td></tr><tr><td>2.</td><td>Lokasi</td><td>'+ location_name +'</td></tr><tr><td>3.</td><td>Deskripsi</td><td> '+ description +'</td></tr><tr><td>4.</td><td>Foto</td><td>'+ img_sarana +'</td></tr><tr><td>5.</td><td>File</td><td style="    word-break: break-word;">'+ file +'</td></tr></tbody></table>';

                                marker.bindPopup(myPopup);

                                $('#info', myPopup).on('click', function() {
                                    axios.get(baseURL + 'web/goToDetailLocation?id=' + id).then(function (response) {
                                        // console.log(response.data);
                                        alert(response.data);
                                    });
                                });
                            });
                        }
                    }, 1500)

                }
            });
        //initMaps();
        
    });

    function initMapss() {
        // -6.343748, 106.676073
        // 14
        mymap = L.map('mapid').setView([-6.3404698,106.6455052], 16);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        // L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png').addTo(mymap);
        
        layerGroup = L.layerGroup().addTo(mymap);
        dataMarkers();

        // mymap.locate({setView: true, maxZoom: 14});
        // .on('locationfound', onLocationFound);
    }
     
    function initMap(long, lat, increm ) {
        // mymap = L.map('mapid').setView([-6.343748, 106.676073], 14);
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(mymap);

        navigator.geolocation.getCurrentPosition(function(location) {
          var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
          console.log(increm);
       
        //   var mymap = L.map('mapid').setView(latlng, 14)
        //   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(mymap);



        //   var marker = L.marker(latlng).addTo(mymap);

        //   layerGroup = L.layerGroup().addTo(mymap);
        //   dataMarkers();

                   
       if(increm > 1 ){
            mymap.removeLayer(routes)
           // mymap.removeControl(routes);
            routes.getPlan().setWaypoints([]);

        }  

       
          mymap.locate({setView: true, maxZoom: 14});
          var a = mymap.on('locationfound', onLocationFound);


          routes = L.Routing.control({
            
            waypoints: [
            L.latLng(latlng),
            L.latLng(long,lat)
            ],
            routeWhileDragging: true
        }).addTo(a);
               
        }); 

    }
    
    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(mymap);
    }

    function initMaps(koor1, koor2) {
        // mymap = L.map('mapid').setView([-6.343748, 106.676073], 14);
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(mymap);

        navigator.geolocation.getCurrentPosition(function(location) {
          var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

          var mymap = L.map('mapid').setView(latlng, 14)
          L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
            maxZoom: 13,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYmJyb29rMTU0IiwiYSI6ImNpcXN3dnJrdDAwMGNmd250bjhvZXpnbWsifQ.Nf9Zkfchos577IanoKMoYQ'
        }).addTo(mymap);



          var marker = L.marker(latlng).addTo(mymap);

          layerGroup = L.layerGroup().addTo(mymap);
          dataMarkers();


          L.Routing.control({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
            waypoints: [
            L.latLng(latlng),
            L.latLng(koor1,koor2)
            ],
            routeWhileDragging: true
        }).addTo(mymap);

      });

    }

    function setTable() {
        tbl_location = $('#dt_Location').DataTable({
            "processing": true,
            "serverSide": true,
            "responsive": true,
            "order": [],
            "ajax": {
                "url": baseURL + "web/getDataLocationMaps",
                "type": "POST"
            },
            "columnDefs": [
                { 
                    "targets": [0],
                    "orderable": false,
                    "width": "5%"
                },
                { 
                    "targets": [1],
                    "visible": false,
                    "orderable": false,
                },
                { 
                    "targets": [4],
                    "visible": false
                },
                { 
                    "targets": [5],
                    "visible": false
                },
                { 
                    "targets": [6],
                    "visible": false
                },
                { 
                    "targets": [7],
                    "visible": false
                },
                { 
                    "targets": [8],
                    "orderable": false,
                    "visible": false
                }
            ]
        });

        $('#dt_Location').on('page.dt', function () {
            layerGroup.clearLayers();
            dataMarkers();
        } );
    }

    function dataMarkers() {
        setTimeout(function() { 
            $.ajax({
                url: baseURL + "web/getDataLocationMaps_",
                type: "post",
                success: function (response) {
                    //debugger;
                    var data = JSON.parse(response);
                    if (data.length > 0) {
                        console.log(data);
                        data.forEach(function(item) {
                            //debugger;

                            var id = item["id"];
                            var category = item["category"];
                            var location_name = item["location_name"];
                            var lng = item["longitude"];
                            var lat = item["latitude"];
                            var description = item["description"];
                            var foto = item["image"];
                            var file = item["file"];
                            if (foto != null && foto != '')
                                var img_sarana = '<img onclick="popup_img(`<?php echo base_url('assets/files/'); ?>'+foto+'`);" src="<?php echo base_url('assets/files/'); ?>'+foto+'" alt="zoom onclick" height="100" style="cursor:pointer;">';
                            else 
                                var img_sarana = '';

                            if (file != null & file != '')
                                file = '<a target="_blank" href="<?php echo base_url('assets/files/')?>'+file+'">'+file+'</a>';
                            else
                                file = '';

                            var LeafIcon = L.Icon.extend({
                                options: {
                                   
                                    iconSize:     [35,40],
                                    shadowSize:   [50, 64],
                                    iconAnchor:   [22, 94],
                                    shadowAnchor: [4, 62],
                                    popupAnchor:  [-3, -76]
                                }
                            });
                            var greenIcon = new LeafIcon({iconUrl: 'loc.png'})
                            var marker = L.marker([lng, lat]).addTo(layerGroup);
                            
                            var myPopup = L.DomUtil.create('div', 'infoWindow');
                            myPopup.innerHTML = "<div align='center' id='info'><span>Kategori : </span> <b>" + category + "</b><br /> <span>Lokasi : </span>" + location_name + "<br /><br /><span>"+ img_sarana +"</span>" + description + "<br /><span>File : </span>" + file + "</div>";

                            // myPopup.innerHTML = '<table class="table table-bordered table-striped"><tr><td>1.</td><td>Kategori</td><td>'+ category +'</td></tr><tr><td>2.</td><td>Lokasi</td><td>'+ location_name +'</td></tr><tr><td>3.</td><td>Deskripsi</td><td> '+ description +'</td></tr><tr><td>4.</td><td>Foto</td><td>'+ img_sarana +'</td></tr><tr><td>5.</td><td>File</td><td style="    word-break: break-word;">'+ file +'</td></tr></tbody></table>';

                            marker.bindPopup(myPopup);

                            $('#info', myPopup).on('click', function() {
                                axios.get(baseURL + 'web/goToDetailLocation?id=' + id).then(function (response) {
                                    // console.log(response.data);
                                    alert(response.data);
                                });
                            });
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }, 1500); //1500
    }

    function popup_img(src) {
        
        var modal = document.getElementById('myModal');
        var modalImg = document.getElementById("img01");
        // var captionText = document.getElementById("caption");
        modal.style.display = "block";
        modalImg.src = src;     
        // captionText.innerHTML = caption;
        var span = document.getElementsByClassName("close")[0];

        span.onclick = function() {
            modal.style.display = "none";
        } 
    }

    function dataMarkers1() {
        setTimeout(function() { 
            var data = tbl_location.rows().data().toArray();
            debugger;
            console.log(data);

            if (data.length > 0) {
                data.forEach(function(item) {
                    debugger;
                    var id = item[1];
                    var category = item[2];
                    var location_name = item[3];
                    var lng = item[4];
                    var lat = item[5];
                    var LeafIcon = L.Icon.extend({
                        options: {
                           
                            iconSize:     [35,40],
                            shadowSize:   [50, 64],
                            iconAnchor:   [22, 94],
                            shadowAnchor: [4, 62],
                            popupAnchor:  [-3, -76]
                        }
                    });
                    var greenIcon = new LeafIcon({iconUrl: 'loc.png'})
                    var marker = L.marker([lng, lat]).addTo(layerGroup);
                    // marker.bindPopup("<b>" + location_name + "</b>").openPopup();
                    // marker.bindPopup("<div align='center'><b>" + category + "</b><br />" + location_name + "</div>");
                    // marker.on('click', markerOnClick);

                    
                    var myPopup = L.DomUtil.create('div', 'infoWindow');
                    myPopup.innerHTML = "<div align='center' id='info'><b>" + category + "</b><br />" + location_name + "</div>";

                    marker.bindPopup(myPopup);

                    $('#info', myPopup).on('click', function() {
                        axios.get(baseURL + 'web/goToDetailLocation?id=' + id).then(function (response) {
                            // console.log(response.data);
                            alert(response.data);
                        });
                    });
                });
            }
        }, 1500); //1500
    }

    function setDataloc() {
        axios.get(baseURL + 'web/getDataKategori').then(function (response) {
            $("#search").select2({
                placeholder: "Location Category",
                data: response.data,
                allowClear: true

            });
             $("#search").val(null).trigger("change");
            
        });
    }
</script>
