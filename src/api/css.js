const elem = (id) => {
    let elem = document.getElementById(id);
    if(elem)
        return elem;
    else
        return null;
}

const hideElem = (id) => {
    elem(id)?elem(id).style.display = 'none':null;
}

const showElem = (id) => {
    elem(id)?elem(id).style.display = 'block':null;
}

const innerHTML = (id,content) => {
    if(elem(id)){
        elem(id).innerHTML=content;
    }
}

const listen = (id,event,callback) => {
    if(elem(id)){
        elem(id).addEventListener(event,callback);
    }
}

const addClass = (id,className) => {
  let element = elem(id);
  if(element && className && element.className.indexOf(className) == -1){
    element.className = element.className.trim()+" "+className.trim();
  }
}

const removeClass = (id,className) => {
  let element = elem(id);
  if(element && className){
    element.className = element.className.trim().replace(className.trim(),'');
  }
}


Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

const scrollTo = (id,to,duration=3000) => {
    let element = elem(id);
    if(element){
        //element.scrollTo(x,y);
        let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;
        
        const animateScroll = function(){        
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
}

export{
  elem,
  hideElem,
  showElem,
  innerHTML,
  listen,
  addClass,
  removeClass,
  scrollTo
};
