<script lang="ts">

	import { onMount } from 'svelte';
	
  import {
  Viewer, Cartesian3,
  ClockRange,
  Color,
  Entity,
  HermitePolynomialApproximation,
  JulianDate,
  SampledProperty,
  } from 'cesium'

  import * as Cesium from 'cesium';
	import {  } from 'cesium';
	import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css'
  


  // Get user location from browser api
  const getLocationFromNavigator = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };
  
  // avoid "window not declared"

	if (typeof window !== "undefined"){
		// browser code
	}
	


  // cesium viewer
  let viewer: Viewer;



  // cesium basic settings

  onMount(async () => { 
		viewer = new Viewer('cesiumContainer', {
    "animation": false,
    "baseLayerPicker": true,
    "fullscreenButton": false,
    "vrButton": false,
    "geocoder": true,
    "homeButton": true,
    "infoBox": false,
    "sceneModePicker": true,
    "selectionIndicator": false,
    "timeline": false,
    "navigationHelpButton": false

    //Use OpenStreetMaps
    // imageryProvider : new Cesium.OpenStreetMapImageryProvider({
    //    url : 'https://a.tile.openstreetmap.org/'
    // })
    
		});
	});

	// cesium access token

	Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNTY0ZjMxYy1hZTdjLTRiMzQtYTc4Yi02NWQ5MzU4MWUxMjgiLCJpZCI6NDcwNzcsImlhdCI6MTYxNjg2MzYxOX0.V-4tUKhYM_XHdchqDu3MAAJPezusOzxMeimdYzCXd94';
  
  // user location
let userLocationCartesian: Cartesian3 | null;
const userLocationPointId = 'user-location';

// user location
  onMount(async (): Promise<void> => {
let userLocation: GeolocationPosition | null = null;
try {
userLocation = await getLocationFromNavigator();
}
catch (error) {  
  // Ignore user decline
}

// fly to user location on startup

viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(userLocation.coords.longitude,
                    userLocation.coords.latitude, 10000000.0),
});


// user location
if (userLocation !== null) {
                userLocationCartesian = Cartesian3.fromDegrees(
                    userLocation.coords.longitude,
                    userLocation.coords.latitude,
                )
                
                addUserLocation(
                    viewer,
                    userLocation,
                    userLocationCartesian,
                    userLocationPointId
                )
            }
});

const addUserLocation = (
  viewer: Viewer,
  userLocation: GeolocationPosition,
  userLocationCartesian: Cartesian3,
  userLocationPointId: string
) => {
  viewer.entities.add(
    createPulsatingPoint(
      viewer,
      userLocationPointId,
      Cartesian3.fromDegrees(
        userLocation.coords.longitude,
        userLocation.coords.latitude,
        0
      ),
      Color.GREEN
    )
  );
};

// make user location dot pulsate

let createPulsatingPoint = (
    viewer: Viewer,
    pointId: string,
    userDestination: Cartesian3,
    color: Color
  ): Entity => {
    const start = JulianDate.now();
    const mid = JulianDate.addSeconds(start, 0.5, new JulianDate());
    const stop = JulianDate.addSeconds(start, 2, new JulianDate());
  
    viewer.clock.startTime = start;
    viewer.clock.currentTime = start;
    viewer.clock.stopTime = stop;
    viewer.clock.clockRange = ClockRange.LOOP_STOP;
  
    const pulseProperty = new SampledProperty(Number);
    pulseProperty.setInterpolationOptions({
      interpolationDegree: 3,
      interpolationAlgorithm: HermitePolynomialApproximation,
    });
  
    pulseProperty.addSample(start, 7.0);
    pulseProperty.addSample(mid, 15.0);
    pulseProperty.addSample(stop, 7.0);
  
    return new Entity({
      id: pointId,
      position: userDestination,
      point: {
        pixelSize: pulseProperty,
        color,
      },
    });
  };

</script>



<main id="cesiumContainer">
</main>

<div class="ring-container">
  <div class="ringring"></div>
  <div class="circle"></div>
</div> 


<style>

main {
	position: absolute;
    width: 100%;
    height: 100%;
  }

.ring-container {
    position: relative;
}
  
.circle {
    width: 15px;
    height: 15px;
    background-color: #62bd19;
    border-radius: 50%;
    position: absolute;
    top: 23px;
    left: 23px;
}

.ringring {
    border: 3px solid #62bd19;
    border-radius: 30px;
    height: 25px;
    width: 25px;
    position: absolute;
    left: 15px;
    top: 15px;
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite; 
    opacity: 0.0
}
@keyframes pulsate {
    0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
    50% {opacity: 1.0;}
    100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
}

</style>