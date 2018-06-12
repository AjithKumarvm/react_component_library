import {changeDevice} from './../actions/adaptive';

const listenToCrossMessage = ()=>{
    // Create IE + others compatible event handler
    let eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    let eventer = window[eventMethod];
    let messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    eventer(messageEvent,(e)=> {
      // Check if origin is proper
      //if( e.origin != 'http://localhost' ){ return }
      let status = e.data.paymentStatus;
      let feature = e.data.feature;
      try{
            //e.data
  			if(window.globals.payWindow)
  				window.globals.payWindow.close();
  			if(status == 'True' && feature == 'GBWebApp'){
          if(window.globals.paymentCallback)
            window.globals.paymentCallback(true);

  	    }else if(status == 'False' && feature == 'GBWebApp'){
          if(window.globals.paymentCallback)
    	    	window.globals.paymentCallback(false);
  	    }else{
          //console.error('Unknown status',e);
        }
      }catch(e){
          console.error(e);
      }
    }, false);
};

const updateAdaptive = () =>{
  // 0 - Desktop (default)
  // 1 - Mobile
  const {dispatch} = store;
  if(window.innerWidth < 981 || window.outerWidth < 981){
    dispatch(changeDevice(1));
    window.globals.device = 1;
  }else{
    dispatch(changeDevice(0));
    window.globals.device = 0;
  }
}

let resizeTimer = null;
const listenToResize = () => {
  window.globals.device = 0;
  if(window.innerWidth < 981 || window.outerWidth < 981){
      updateAdaptive();
  }
  window.onresize = ()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(()=>{
      updateAdaptive();
    },1000);
  }
};

export {listenToCrossMessage,listenToResize};
