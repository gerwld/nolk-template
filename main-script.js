window.addEventListener('scroll', scrollOffset, false);

function toggleClass(elem, className, isFixed, isMenu) {
    document.querySelector("." + elem).classList.toggle(className);
    if (isFixed) {
        document.getElementById("body").classList.toggle("no-scroll");
    }
    // menu button position fix
    if (isMenu) {
        let btnMenu = document.querySelector(".mainbtn_wrapper");
        btnMenu.style.top = `${window.scrollY}px`;
        btnMenu.classList.toggle("closed");
    }
}

function removeClass(elem, className, isFixed) {
    document.querySelector('.' + elem).classList.remove(className);
    if (isFixed) {
        document.getElementById("body").classList.toggle("no-scroll");
        document.querySelector(".mainbtn_wrapper").classList.add("closed");
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

function scrollOffset() {
    // Desktop mob-block animation
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

    } else if (mobOffset.bottom <= 100 || mobOffset.top >= 280) {
        allMobBlocks.forEach(function (mob) {
            mob.classList.add('action');
        });
    }

    //Desktop sect-2 link animation
    let sect2TextBounc = document.querySelector('.sect2_text__desktop');
    if (sect2TextBounc.getBoundingClientRect().top < 300) {
        sect2TextBounc.classList.add('sect2_link_active');
    }


    //Float footer change (hide artefacts when scroll on low-end device)
    let bodyHeight = document.getElementById('body').clientHeight;
    let footerDp = document.querySelector('.main_footer_dp');
    let displayHeight = Math.max(document.documentElement.clientHeight, window.screen.height);
    let displayWidth = Math.max(document.documentElement.clientWidth, window.screen.width);
    let showBgPos = bodyHeight - (displayHeight * 1.4);
    if (footerDp) {
        if (window.scrollY < showBgPos && displayWidth > 990) {
            footerDp.style = "opacity: 0; display: none";
        } else {
            footerDp.style = "opacity: 1;  display: flex";
        }
    }
}