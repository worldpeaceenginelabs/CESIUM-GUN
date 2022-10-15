<script lang="ts">
  
import Cesium from "./Cesium.svelte"
  
	// initialise modal state and content
	let showModal = false;
	let modalContent;
	
	// pass in component as parameter and toggle modal state
	function toggleModal(component) {
		modalContent = component;
		showModal = !showModal;
	}

</script>

<!-- Here starts the app-->
<div>
<Cesium/>
</div>


<style></style>

