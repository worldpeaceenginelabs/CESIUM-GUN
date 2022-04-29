<script lang="ts">

</script>

<div id="background"></div>
<div id="modal">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/FKqOLmuIEFw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>
    <strong><a href="https://cloud-atlas.org" target="_blank">
        Want to know more? Enter https://cloud-atlas.org</a>
    </strong>
</p>

</div>

<style>
    #background {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
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

    a {text-decoration: none;
    color: white;}
</style>
