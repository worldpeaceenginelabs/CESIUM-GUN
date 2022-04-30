<script lang="ts">
  
  import Cesium from "./Cesium.svelte"
  import Text from "./Text.svelte"
  import Modal from "./Modal.svelte"
  import {fade} from 'svelte/transition'
  
  // initialise modal state and content
	let showModal = false;
	let modalContent;
	
	// pass in component as parameter and toggle modal state
	function toggleModal(component) {
		modalContent = component;
		showModal = !showModal;
	}

</script>





<div on:click={() => (toggleModal(Modal))}>

  <Cesium/>
  <Text/>
    
  {#if showModal}
  <div transition:fade>
  <Modal on:click={toggleModal}/>
  </div>
  {/if}

    </div>

    

<style>
 
</style>
