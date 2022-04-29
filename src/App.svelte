<script lang="ts">
import { onMount } from "svelte";

  import Cesium from "./Cesium.svelte";
  import Modal from "./Modal.svelte";
  import {fade} from 'svelte/transition'
 
  let isOpenModal = false;

    function openModal() {
        isOpenModal = true;
    }

  

</script>



<main>
<Cesium/>
<Modal/>
</main>



<style>

</style>
