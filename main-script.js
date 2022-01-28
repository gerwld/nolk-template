window.addEventListener('scroll', null, false);


function toggleClass(elem, className, isFixed, isMenu) {
    document.querySelector("." + elem).classList.toggle(className);
    if (isFixed) {
        document.getElementById("body").classList.toggle("no-scroll");
    }
    // menu button position fix
    if (isMenu) {
        let btnMenu = document.querySelector(".mainbtn_wrapper")
        btnMenu.style.top = `${window.scrollY}px`;
        btnMenu.classList.toggle("closed");
    }
}

// Toggle mob block + z-index inc
let zindMob = 1011;
function toggleMob(elem) {
    zindMob++;
    var block = document.querySelector("." + elem);
    block.classList.toggle("mc_open");
    block.style = `z-index: ${zindMob};`;
}