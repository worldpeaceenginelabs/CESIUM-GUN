<script lang="ts">

</script>


<div id="wrapper">
        
    <div id="modal">
        
        <iframe src="https://www.youtube.com/embed/FKqOLmuIEFw?controls=0&showinfo=0&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
        <h4>
        “You never change things by fighting against the existing reality.<br><br>
        To change something, build a new model that makes the old model obsolete.”<br><br>
        <i>Buckminster Fuller</i><br><a href="https://www.bfi.org/about-fuller/big-ideas/world-game/" target="_blank" class="class1">(Founder of the World Peace Game)</a>
        </h4>
   
        <button>
                
                <a href="https://worldpeaceenginelabs.org/cloud-dot-atlas/" target="_blank" class="class2">
                    LEARN MORE</a>

        </button>

        <br>

    </div>

</div>

<style>    

    #wrapper {
        position: fixed;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;  
    }

    #modal {                        
        background: black;                
		    width: fit-content;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin: 5%;  
    }

    iframe {
        height: 330px;
        width: 100%;       
    }

    h4 {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: white;
        padding: 1%;        
    }

    a.class1 { color: grey;
        text-decoration: none;
    
    }

    a.class2 { color: black;
        text-decoration: none;
    }



    button, button::after {
  width: 90%;
  font-size: 25px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(45deg, transparent 5%, lightgrey 5%);
  border: 0;
  letter-spacing: 3px;
  line-height: 88px;
  box-shadow: 6px 0px 0px darkslategrey;
  outline: transparent;
  position: relative;
}

button::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  
  content: 'LEARN MORE';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
  clip-path: var(--slice-0);
}

button:hover::after {
  animation: 2s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}

</style>
