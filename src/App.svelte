<script lang="ts">
  
  import Cesium from "./Cesium.svelte"
  import ComingSoon from "./Comingsoon.svelte"
  import Modal from "./Modal.svelte"
  import VideoQuoteLink from "./Videoquotelink.svelte";
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

<div on:click={() => (toggleModal(VideoQuoteLink))}>
  <Cesium/>
  <ComingSoon/>
</div>


<button on:click={() => (toggleModal(VideoQuoteLink))}></button>

  {#if showModal}
  <div transition:fade>
  <Modal on:click={toggleModal} {modalContent}/>
  </div>
  {/if}

<style>

</style>
