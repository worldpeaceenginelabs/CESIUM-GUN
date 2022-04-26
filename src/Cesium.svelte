<script lang="ts">
	import { onMount } from 'svelte';
	import * as Cesium from 'cesium';
	import { Viewer } from 'cesium';
	import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css'
	
	// avoid "window not declared"

	if (typeof window !== "undefined"){
		// browser code
	}
	
	// cesium access token

	Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNTY0ZjMxYy1hZTdjLTRiMzQtYTc4Yi02NWQ5MzU4MWUxMjgiLCJpZCI6NDcwNzcsImlhdCI6MTYxNjg2MzYxOX0.V-4tUKhYM_XHdchqDu3MAAJPezusOzxMeimdYzCXd94';

	
	// cesium viewer
	let viewer: Viewer;
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