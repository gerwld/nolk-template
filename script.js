// logo scroll, js realisation. Works same as css keyframes, sometimes more buggy
// var brands = document.getElementById("brands_block1");
// var brands2 = document.getElementById("brands_block2");

// let pos = 0;
// let brandsLoop = setInterval(function(){
//     pos += 0.011;
//     if(pos >= 100) pos = 0;
//     brands.style.transform = `translate3d(${-pos}%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
//     brands2.style.transform = `translate3d(${-pos}%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
// }, 10); 


// Contact form
let textarea = document.getElementById('quiz1');
let button2 = document.getElementById('quiz_btn2');

let formState = {
    userData: ['', null, ''],
    step: 0,
    title: [["Hi!", "What is your name?"],
    ["Nice to meet you", "How can we help you?"],
    ["What is your email?", "So we can reach you."]],
    placeholder: ["My name is", "Leave us a message", "My email is"]
}


//Enable button if length > 1
textarea.onkeyup = function () {
    if(this.value.length > 0) {
        button2.disabled = false;
    } else button2.disabled = true;
  };

function stepClick(isNext) {
    let textBlock = document.getElementById('mainname_text');

    //save data after click (back/forw)
    formState.userData[formState.step] = textarea.value;

    //inc/decrement step with basic check & enable button
    if (isNext && formState.step < 2) {
        formState.step++;
    } else if (!isNext && formState.step > 0) {
        formState.step--;
    }

    //set data from state & disable button if 0
    if(formState.step >= 0 && formState.step <= 2) {
        textarea.value = formState.userData[formState.step];
        if (formState.userData[formState.step] && formState.userData[formState.step].length > 0){
            button2.disabled = false;
        } else {
            button2.disabled = true;
        }
    }

    //disable if step 0
    if (formState.step === 0) {
        document.getElementById('quiz_btn1').disabled = true;
    } else {
        document.getElementById('quiz_btn1').disabled = false;
    }

    let isReversed = (formState.step === 1) && "reversed";
    let isSmileShow = formState.step < 2;

    // Title change
    textBlock.innerHTML = `
        <div class="jtext_line ${isReversed}">
            ${isSmileShow ? '<div class="lottie-anim lottie-anim__yell"><lottie-player src="img/svg_json/7.json" background="transparent" speed="1" loop autoplay></lottie-player></div>' : ''}
            <div>${formState.title[formState.step][0]}</div>
        </div>
        <div class="jtext_line">${formState.title[formState.step][1]}</div>
        `;

    //Placeholder change
    textarea.placeholder = formState.placeholder[formState.step] + "...";

    //Change height if 1
    if (formState.step == 1) {
        textarea.rows = 2;
    } else {
        textarea.rows = 1;
    }

    //Button change 
    if (formState.step === 2) {
        button2.innerHTML = "Submit";
    } else {
        button2.innerHTML = "Next";
    }
  
}