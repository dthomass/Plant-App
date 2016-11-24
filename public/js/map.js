     
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
                         
                    document.getElementById("quizPicture").src="/images/"+plantPicture+".jpg";

   
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
          zoom: 11
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
 /*       'Latitude and Longitude: ' + latLng,*/
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
        
