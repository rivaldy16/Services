<!DOCTYPE html>
<html>
<?php 
//ApiKey
// 5b3ce3597851110001cf624824ef29da30c7439e84e8eac9ac821dd3

//Set Access-Control-Allow-Origin with PHP
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, PATCH, DELETE');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Authorization, Content-Type, x-xsrf-token, x_csrftoken, Cache-Control, X-Requested-With');

?>
<head>
    <title>Maps</title>
    <base href="/">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" name="viewport" />
    <meta content="text/html; charset=UTF-8" http-equiv="content-type"></meta>
    <meta name="description" content="Openrouteservice is a open source route planner with plenty of features for car, heavy vehicles, hiking and cycling."/>
    <link href="<?php echo base_url(); ?>assets/maps/favicon.ico" rel="shortcut icon" type="image/x-icon"></link>
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/maps/vendor.d1e2826089913ea0.css"></link>
    <!-- these scripts remain unbuilt as they contain relative paths -->
    <link href="<?php echo base_url(); ?>assets/maps/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet"></link>
    <link href="<?php echo base_url(); ?>assets/maps/bower_components/leaflet.heightgraph/src/L.Control.Heightgraph.css" rel="stylesheet"></link>
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/maps/main.dc567cf8eff26e90.css"></link>
</head>
<body>
     <!-- BEGIN: App-Loading Screen. -->
    <div class="ors-app-loading" ng-if="::false">
        <!-- BEGIN: Actual animated container. -->
        <div class="animated-container">
            <div class="messaging">
                <p>
                    <img height="auto" src="<?php echo base_url(); ?>assets/maps/img/logo@2x.png" width="200px"/>
                </p>
                <p>
                    <div class="ui active centered inline loader"></div>
                </p>
            </div>
        </div>
        <!-- END: Actual animated container. -->
    </div>
    <!-- END: App-Loading Screen. -->
    <div class="ors-main" ng-controller="RootController as root">
        <div class="ors-left">
            <ors-header class="ors-header"></ors-header>
            <ors-sidebar class="ors-sidebar" ors-map="root.myOrsMap"></ors-sidebar>
        </div>
        <ors-map id="map" class="ors-right" ors-map="root.myOrsMap"></ors-map>
    </div>
</body>
<!-- start auto template tags -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/maps/traceur_runtime.js"></script>
<!-- end auto template tags -->
<script src="<?php echo base_url(); ?>assets/maps/vendor.41a60230cdcc734c.js"></script>
<script src="<?php echo base_url(); ?>assets/maps/scripts.8528560d0e1d0e35.js"></script>
</html>

