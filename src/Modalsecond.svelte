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
        overflow: hidden;
        overflow-y: auto;         
	}
	
	.content {        
		margin-left: 5%;
        margin-right: 5%;
        margin-top: 2.5%;
        margin-bottom: 5%;
        
	}
</style>