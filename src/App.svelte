<script lang="ts">
  
import Cesium from "./Cesium.svelte"
import ComingSoon from "./Comingsoontext.svelte"
import Modal from "./Modalmain.svelte"
import Videoquotetextlink from "./Videoquotetextlink.svelte";
import {fade} from 'svelte/transition'
import Sdgtopbarcss from "./Sdgtopbarcss.svelte";

  
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
<!-- on:click={() => (toggleModal(Videoquotetextlink))} -->
<div >

  <Cesium/>
  <Sdgtopbarcss/>
  <!-- <ComingSoon/> -->
  
</div>
<!-- 
{#if showModal}
  <div transition:fade>
  <Modal on:click={toggleModal} {modalContent}/>
  </div>
  {/if}
-->



<style>
  
 </style>