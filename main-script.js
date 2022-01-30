window.addEventListener('scroll', mobOffsetAnimation, false);


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

// Desktop mob-block animation
function mobOffsetAnimation() {
    let mobBlocks = document.querySelector('.mob_blocks_desc');
    let allMobBlocks = document.querySelectorAll('.mob_click');
    let mobOffset = mobBlocks.getBoundingClientRect();

    if (mobOffset.top < 370 && mobOffset.top > -270) {
        document.querySelector('.mob_click__1').classList.remove('action');
        setTimeout(function () {
            document.querySelector('.mob_click__3').classList.remove('action');
        }, 750);
        setTimeout(function () {
            document.querySelector('.mob_click__2').classList.remove('action');
        }, 2500);

    } else if (mobOffset.top >= 370 || mobOffset.top <= -270) {
        allMobBlocks.forEach(function (mob) {
            mob.classList.add('action');
        });
    }

}

// allMobBlocks.forEach(function (mob) {
    //     mob.classList.remove('action');
    //     console.log('true');
    // });