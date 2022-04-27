<script lang="ts">

	import { onMount } from 'svelte';
	import * as Cesium from 'cesium';
	import { Viewer, Cartesian2, Cartesian3 } from 'cesium';
	import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css'

  import { addUserLocationInteraction } from './cesium_lib/addUserLocationInteraction'
	
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
			
		});
	});

	// cesium access token

	Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNTY0ZjMxYy1hZTdjLTRiMzQtYTc4Yi02NWQ5MzU4MWUxMjgiLCJpZCI6NDcwNzcsImlhdCI6MTYxNjg2MzYxOX0.V-4tUKhYM_XHdchqDu3MAAJPezusOzxMeimdYzCXd94';
  
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

// user location

if (userLocation !== null) {
                userLocationCartesian = Cartesian3.fromDegrees(
                    userLocation.coords.longitude,
                    userLocation.coords.latitude,
                )
                
                addUserLocationInteraction(
                    viewer,
                    userLocation,
                    userLocationCartesian,
                    userLocationPointId
                )
            }
});


// Globe Auto Rotate

const addGlobeAutoRotation = (viewer: Viewer, rotationSpeed: number): void => {
  viewer.canvas.addEventListener('mousemove', (event: MouseEvent) => {
    const mousePosition = new Cartesian2(event.x, event.y);

    // Get the position of the globe below the mouse position
    // Will be undefined if the globe isn't below the cursor
    const cartesian = viewer.camera.pickEllipsoid(
      mousePosition,
      viewer.scene.globe.ellipsoid
    );

    if (!cartesian) {
      startRotation(viewer, rotationSpeed);
      return;
    }

    stopRotation();
  });

  startRotation(viewer, rotationSpeed);
};


// Globe Auto Rotate

let rotationPaused = false;
let lastRotationTime: number | null = null;
let eventHandler: (() => void) | null = null;

const doRotate = (viewer: Viewer, rotationSpeed: number) => {
  if (rotationPaused) {
    return;
  }

  const now = Date.now();
  // Positiv: rotates from left to right
  const spinRate = rotationSpeed;
  const delta = (now - (lastRotationTime ?? now)) / 1000;

  lastRotationTime = now;

  viewer.scene.camera.rotate(Cartesian3.UNIT_Z, spinRate * delta);
};

const startRotation = (viewer: Viewer, rotationSpeed = 0.5) => {
  // Already added, just continue the loop
  if (eventHandler !== null) {
    if (rotationPaused) {
      // Updating this prevents a large rotation after a longer pause
      lastRotationTime = Date.now();
      rotationPaused = false;
    }

    return;
  }

  lastRotationTime = Date.now();
  eventHandler = () => doRotate(viewer, rotationSpeed);

  viewer.scene.postRender.addEventListener(eventHandler);
};

const stopRotation = () => {
  rotationPaused = true;
};













</script>



<main id="cesiumContainer">
</main>



<style>

main {
	position: absolute;
    width: 100%;
    height: 100%;
  }

</style>