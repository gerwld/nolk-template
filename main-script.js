

let bodyElem = document.getElementById("bodyElem");

function toggleClass(elem, className, isFixed) {
    document.querySelector("." + elem).classList.toggle(className);
    if(isFixed) {
        bodyElem.toggle("no-scroll");
    }
}

let zindMob = 1011;
function toggleMob(elem) {
    zindMob++;
    var block = document.querySelector("." + elem);
    block.classList.toggle("mc_open");
    // block.classList.toggle("index_down");
    block.style = `z-index: ${zindMob};`;
}