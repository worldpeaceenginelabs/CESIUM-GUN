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

<div on:click={() => (toggleModal(Videoquotetextlink))}>

  <Cesium/>
  <ComingSoon/>
  
</div>

<div class="topbar">
  <Sdgtopbarcss/>
</div>

{#if showModal}
  <div transition:fade>
  <Modal on:click={toggleModal} {modalContent}/>
  </div>
  {/if}



<style>

.topbar {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    }
    
 </style>