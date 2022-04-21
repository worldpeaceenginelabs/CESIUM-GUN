<div id="cesiumContainer">
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import * as Cesium from 'cesium';
	import { Viewer } from 'cesium';
	import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css'

	if (typeof window !== "undefined"){
		// browser code
	}
	
	window.CESIUM_BASE_URL = './build';
	Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNTY0ZjMxYy1hZTdjLTRiMzQtYTc4Yi02NWQ5MzU4MWUxMjgiLCJpZCI6NDcwNzcsImlhdCI6MTYxNjg2MzYxOX0.V-4tUKhYM_XHdchqDu3MAAJPezusOzxMeimdYzCXd94';
   
	let viewer: Viewer;
	onMount(async () => {
		viewer = new Viewer('cesiumContainer');
	});
	
</script>