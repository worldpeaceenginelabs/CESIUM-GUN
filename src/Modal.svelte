<script lang="ts">
import {fade} from 'svelte/transition'
</script>

<div id="background"></div>
<div id="modal">

    <iframe width="475" height="345" src="https://www.youtube.com/embed/FKqOLmuIEFw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    
    <p><strong>
    “You never change things by fighting against the existing reality.<br><br> To change something, build a new model that makes the old model obsolete.”<br><br> <i>Buckminster Fuller</i><br><br><br>
    COMING SOON<br><br>
    <a href="https://cloud-atlas.org" target="_blank">
    Enter Projects Page</a>
    </strong></p>    

</div>

<style>
    #background {
        position: fixed;
        z-index: 1;
    }

    #modal {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        position: fixed;
        text-align: center;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #000;
        color: white;
        filter: drop-shadow(0 0 20px #333);
              
    }

    p {padding: 0.5%;}

    a {text-decoration: none;
    color: grey;}
</style>
