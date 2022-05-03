<script>

	export let modalContent;
	
</script>

<div on:click|self class='modal'>
	<div class='content'>
		<svelte:component on:click this={modalContent}/>
	</div>
</div>

<style>
	.modal {
		position: fixed;
        height: 100%;
        width: 100%;
        display: block;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        margin-top: 5%;
         
	}
	
	.content {
		background: black;                
		width: fit-content;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin: 5%;
        
	}
</style>