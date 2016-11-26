    var map;
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;
    
    function getParams() {
        var idx = document.URL.indexOf('?');
        var params = new Array();
        if (idx != -1) {
            var pairs = document.URL.substring(idx + 1, document.URL.length).split('&');
            for (var i = 0; i < pairs.length; i++) {
                nameVal = pairs[i].split('=');
                params[nameVal[0]] = nameVal[1];
            }
        }
        return params;
    }

    params = getParams();
    if(unescape(params["image"]) != 'undefined')
        plantPicture = "/images/"+unescape(params["image"])+".jpg";
    else
        plantPicture = "/images/tree.jpg";

    fromUpload = unescape(params["fromUpload"]);
                         
  //  document.getElementById("quizPicture").src="/images/"+plantPicture+".jpg";
    

    function initMap() {
           var bangalore = {lat: -32.865427, lng: 150.196123};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: bangalore,
          mapTypeId: 'terrain'
        });
 var SanDiego = new google.maps.LatLng(32.73, -117.1446);
        var ucsd = new google.maps.LatLng(32.00, -113.55);
        var park = new google.maps.LatLng(32.99, -115.07);
        var explore = new google.maps.LatLng(31.86, -116.59);
        var upload ="<p style=\"color:#00FF00; font-size:20px; margin-bottom: 0px\">Your Upload</p><br>";
        var returnAddressBalboa = "Balboa Park, San Diego, CA 92104";
        var returnAddressUCSD = "Reserva de la Biosfera";
        var missionBay = "Glamis-Ocotillo Fun Desert Dune Buggy Park<br>Glamis, CA 92283, Brawley, CA 92227";
        var exploreText = "<style>#hide{display: none;}</style>Ensenada <br> <strong><p style=\"color:red; margin:0px\">This area is unexplored.</p></strong> Explore the area, upload your pictures and identify the plant you found.<br><br><a href=\"upload\" class=\"btn btn-lg\" style=\"background-color: #86b94c; color: #fff;\">Start Identifying</a> <div id = \"hide\">"; 
        var uploadText;
          
        if(fromUpload == "true") {
            uploadText = upload+returnAddressBalboa;
        }
        else {
            uploadText = returnAddressBalboa;
        }
          
          var coordInfoWindow2 = new google.maps.InfoWindow();
        coordInfoWindow2.setContent(createInfoWindowContent(ucsd, map.getZoom(), "/images/mapPic1.jpg", returnAddressUCSD));
        coordInfoWindow2.setPosition(ucsd);
        coordInfoWindow2.open(map);

        map.addListener('zoom_changed', function() {
             coordInfoWindow2.setContent(createInfoWindowContent(ucsd, map.getZoom(), "/images/mapPic1.jpg", returnAddressUCSD));
          coordInfoWindow2.open(map);
        });
          
          var coordInfoWindow3 = new google.maps.InfoWindow();
        coordInfoWindow3.setContent(createInfoWindowContent(park, map.getZoom(), "/images/mapPic2.jpg", missionBay));
        coordInfoWindow3.setPosition(park);
        coordInfoWindow3.open(map);
          
           map.addListener('zoom_changed', function() {
             coordInfoWindow3.setContent(createInfoWindowContent(park, map.getZoom(), "/images/mapPic2.jpg", missionBay));
          coordInfoWindow3.open(map);
        });
           var coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent(createInfoWindowContent(SanDiego, map.getZoom(), plantPicture, uploadText));
        coordInfoWindow.setPosition(SanDiego);
        coordInfoWindow.open(map);

        map.addListener('zoom_changed', function() {
          coordInfoWindow.setContent(createInfoWindowContent(SanDiego, map.getZoom(), plantPicture, uploadText));
          coordInfoWindow.open(map);
        });
          
        var coordInfoWindow4 = new google.maps.InfoWindow();
        coordInfoWindow4.setContent(createInfoWindowContent(explore, map.getZoom(), "", exploreText));
        coordInfoWindow4.setPosition(explore);
        coordInfoWindow4.open(map);

        map.addListener('zoom_changed', function() {
             coordInfoWindow4.setContent(createInfoWindowContent(explore, map.getZoom(), "", exploreText));
          coordInfoWindow4.open(map);
        });
          
        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');

        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        map.data.setStyle(function(feature) {
          var magnitude = feature.getProperty('mag');
          return {
            icon: getCircle(magnitude)
          };
        });

      // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
          addMarker(event.latLng, map);
        });

        // Add a marker at the center of the map.
        addMarker(bangalore, map);
        
        
        var icons = {
          parking: {
            name: 'Unexplored Areas',
            icon: '/images/red.png'
          },
        };

        
        
        var legend = document.getElementById('legend');
          var type = icons.parking;
          var name = type.name;
          var icon = type.icon;
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + name;
          legend.appendChild(div);
        
         map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
      }




// Adds a marker to the map.
      function addMarker(location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        var labelLength = labels.length;
        var marker = new google.maps.Marker({
          position: location,
          label: labels[labelIndex++ % labelLength],
          map: map
        });
      }

     
      function getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .5,
          scale: 100,
          strokeColor: 'white',
          strokeWeight: .5
        };
      }

      function eqfeed_callback(results) {
        map.data.addGeoJson(results);
      }
    google.maps.event.addDomListener(window, 'load', initialize);


  /* var map;
      function initMap() {
        var SanDiego = new google.maps.LatLng(32.73, -117.1446);
        var ucsd = new google.maps.LatLng(32.88, -117.23);
        var park = new google.maps.LatLng(32.77, -117.22);
        var upload ="<p style=\"color:#00FF00; font-size:20px; margin-bottom: 0px\">Your Upload</p><br>";
        var returnAddressBalboa = "Balboa Park, San Diego, CA 92104";
        var returnAddressUCSD = "UC San Diego 9500 Gilman Dr, La Jolla, CA 92093";
        var missionBay = "Mission Bay Park<br>2688 East Mission Bay Drive, San Diego, CA 92109";
        var uploadText;
          
        if(fromUpload == "true") {
            uploadText = upload+returnAddressBalboa;
        }
        else {
            uploadText = returnAddressBalboa;
        }
        var map = new google.maps.Map(document.getElementById('map'), {
          center: SanDiego,
          zoom: 11,
          mapTypeId: 'terrain'
        });
          
        
        var coordInfoWindow2 = new google.maps.InfoWindow();
        coordInfoWindow2.setContent(createInfoWindowContent(ucsd, map.getZoom(), "/images/mapPic1.jpg", returnAddressUCSD));
        coordInfoWindow2.setPosition(ucsd);
        coordInfoWindow2.open(map);

        map.addListener('zoom_changed', function() {
             coordInfoWindow2.setContent(createInfoWindowContent(ucsd, map.getZoom(), "/images/mapPic1.jpg", returnAddressUCSD));
          coordInfoWindow2.open(map);
        });
          
          var coordInfoWindow3 = new google.maps.InfoWindow();
        coordInfoWindow3.setContent(createInfoWindowContent(park, map.getZoom(), "/images/mapPic2.jpg", missionBay));
        coordInfoWindow3.setPosition(park);
        coordInfoWindow3.open(map);

        map.addListener('zoom_changed', function() {
             coordInfoWindow3.setContent(createInfoWindowContent(park, map.getZoom(), "/images/mapPic2.jpg", missionBay));
          coordInfoWindow3.open(map);
        });
           var coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent(createInfoWindowContent(SanDiego, map.getZoom(), plantPicture, uploadText));
        coordInfoWindow.setPosition(SanDiego);
        coordInfoWindow.open(map);

        map.addListener('zoom_changed', function() {
          coordInfoWindow.setContent(createInfoWindowContent(SanDiego, map.getZoom(), plantPicture, uploadText));
          coordInfoWindow.open(map);
        });
          
          setMarkers(map);
      }
      
      var TILE_SIZE = 256;

      function createInfoWindowContent(latLng, zoom, plantPicture, returnAddress) {
        var scale = 1 << zoom;

        var worldCoordinate = project(latLng);

        var pixelCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale),
            Math.floor(worldCoordinate.y * scale));
        return [
          returnAddress,

          '<br><img src="'+plantPicture+'" height="100">'
        ].join('<br>');
      }

      // The mapping between latitude, longitude and pixels is defined by the web
      // mercator projection.
      function project(latLng) {
        var siny = Math.sin(latLng.lat() * Math.PI / 180);

        // Truncating to 0.9999 effectively limits latitude to 89.189. This is
        // about a third of a tile past the edge of the world tile.
        siny = Math.min(Math.max(siny, -0.9999), 0.9999);

        return new google.maps.Point(
            TILE_SIZE * (0.5 + latLng.lng() / 360),
            TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
      }
        
      }

      */
