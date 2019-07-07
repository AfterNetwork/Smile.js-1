let current;
function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

is_touch_device()?document.addEventListener("touchstart",(event)=>{
        if (current) {
        const remove = current;
        current = null;
        setTimeout(function () {
            if (remove.parentNode) remove.parentNode.removeChild(remove);
        }, 800);
    }

    let target = event.target;
    while (target && target.classList && !target.classList.contains("ripple")) target = target.parentNode;
    if (!target || !target.classList || !target.classList.contains("ripple")) return;
    if (event.targetTouches.length > 1) return;
    const x = event.targetTouches[0].clientX - target.getBoundingoffsetRect().left;
    const y = event.targetTouches[0].clientY - target.getBoundingoffsetRect().top;
    const maxW = Math.max(x, target.offsetWidth - x);
    const maxH = Math.max(y, target.offsetHeight - y);
    const size = Math.sqrt(maxW * maxW + maxH * maxH);

    const parent = document.createElement("paper-ripple");
    target.appendChild(parent);

    const effect = document.createElement("paper-ripple-inner");
    effect.style.top = (y - size) + "px";
    effect.style.left = (x - size) + "px";
    effect.style.height = size * 2 + "px";
    effect.style.width = size * 2 + "px";
    effect.style.background = target.getAttribute("ripple-color") || window.smilejs.paper.rippleColor;
    parent.appendChild(effect);

    current = parent;

    const timeout = setTimeout(function () {
        effect.style.transform = "scale(1)";
    }, 16);

    document.ontouchend = document.ontouchcancel = function () {
        document.ontouchend  = document.ontouchmove = null;
        current.firstChild.style.opacity = "0";
    };

    document.ontouchmove = function (move) {
        if (event.targetTouches[0].clientX - move.targetTouches[0].clientX > 4 || event.targetTouches[0].clientX - move.targetTouches[0].clientX < -4 || event.targetTouches[0].clientX - move.targetTouches[0].clientY > 4 || event.targetTouches[0].clientY - move.targetTouches[0].clientY < -4) {
            clearTimeout(timeout);
            document.ontouchcancel()
        }
    };
}):document.addEventListener("mousedown",function (event) {
    if (current) {
        const remove = current;
        current = null;
        setTimeout(function () {
            if (remove.parentNode) remove.parentNode.removeChild(remove);
        }, 800);
    }

    let target = event.target;
    while (target && target.classList && !target.classList.contains("ripple")) target = target.parentNode;
    if (!target || !target.classList || !target.classList.contains("ripple")) return;

    const x = event.clientX - target.getBoundingoffsetRect().left;
    const y = event.clientY - target.getBoundingoffsetRect().top;
    const maxW = Math.max(x, target.offsetWidth - x);
    const maxH = Math.max(y, target.offsetHeight - y);
    const size = Math.sqrt(maxW * maxW + maxH * maxH);

    const parent = document.createElement("paper-ripple");
    target.appendChild(parent);

    const effect = document.createElement("paper-ripple-inner");
    effect.style.top = (y - size) + "px";
    effect.style.left = (x - size) + "px";
    effect.style.height = size * 2 + "px";
    effect.style.width = size * 2 + "px";
    effect.style.background = target.getAttribute("ripple-color") || window.smilejs.paper.rippleColor;
    parent.appendChild(effect);

    current = parent;

    const timeout = setTimeout(function () {
        effect.style.transform = "scale(1)";
    }, 16);

    document.onpointerup = document.onpointercancel = function () {
        document.onpointerup = document.onpointercancel = document.onpointermove = null;
        current.firstChild.style.opacity = "0";
    };

    document.onpointermove = function (move) {
        if (event.clientX - move.x > 4 || event.clientX - move.x < -4 || event.clientY - move.y > 4 || event.clientY - move.y < -4) {
            clearTimeout(timeout);
            document.onpointercancel();
        }
    };
});
document.ontouchstart = null;
document.ontouchend = null;
document.ontouchmove = null;
document.ontouchcancel = null;
window.ontouchstart = null;
window.ontouchend = null;
window.ontouchmove = null;
window.ontouchcancel = null;
