<div id="cesiumContainer">
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import * as Cesium from 'cesium';
	import { Viewer } from 'cesium';
	import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css'

	let viewer: Viewer;
	onMount(async () => {
		viewer = new Viewer('cesiumContainer');
	});
	
	

</script>   
 