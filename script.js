var brands = document.getElementById("brands_block1");

let pos = 0;
let brandsLoop = setInterval(function(){
    pos += 0.011;
    if(pos >= 100) pos = 0;
    brands.style.transform = `translate3d(${-pos}%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
}, 4); 