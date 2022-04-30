<script lang="ts">
  
  import Cesium from "./Cesium.svelte"
  import Text from "./Text.svelte"
  import Modal from "./Modal.svelte"
  import {fade} from 'svelte/transition'
  
  // 
  let modalVisibility = false;

    function changeModalVisibility() {
        modalVisibility = true;
    }

</script>





<div on:click={changeModalVisibility}>

  <Cesium/>
  <Text/>
    
    {#if modalVisibility}
      <div transition:fade>
      <Modal/>
      </div>  
    {/if}

    </div>



<style>
 
</style>
