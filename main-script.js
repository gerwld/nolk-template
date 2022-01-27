

let bodyElem = document.getElementById("bodyElem");

function toggleClass(elem, className, isFixed) {
    document.querySelector("." + elem).classList.toggle(className);
    if(isFixed) {
        bodyElem.toggle("no-scroll");
    }
}