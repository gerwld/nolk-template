// logo scroll, js realisation. Works same as css keyframes, sometimes more buggy
// var brands = document.getElementById("brands_block1");
// var brands2 = document.getElementById("brands_block2");

// let pos = 0;
// let brandsLoop = setInterval(function () {
//     pos += 0.3;
//     if (pos >= 100) pos = 0;
//     brands.style.transform = `translate3d(${-pos}%, 0px, 0px)`;
//     brands2.style.transform = `translate3d(${-pos}%, 0px, 0px)`;
// }, 33);


function validateEmail(email) {
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
}

// Header button animation
function animateButton(btn, bg, textBlock, isBlue){
    let text = document.querySelector('.' + textBlock);
    function changeButton(bg, isMouseOver) {
        let background = document.getElementById(bg);
        if(isMouseOver) {
            background.style.opacity = "1";
            background.style.bottom = "-100%";
            } else {
            background.style.bottom = "100%";
            setTimeout(function(){
                background.style.bottom = "-300%";
                background.style.opacity = "0";
            }, 250)
        }
    }

    document.getElementById(btn).addEventListener("mouseover", function(e){
        changeButton(bg, true);
        text.style.color = `${isBlue ? "#002b99" : "#ffffff"}`;

    });

    document.getElementById(btn).addEventListener("mouseleave", function(e){
        changeButton(bg);
        text.style.color = `${isBlue ? "#ffffff" : "#002b99"}`;
    });

}

animateButton('more_btn_01', 'bg_mainbtn_1', 'more_btn_01_text', true);
animateButton('more_btn_02', 'bg_mainbtn_2', 'more_btn_02_text', false);


// Contact form
let textarea = document.getElementById('quiz1');
let button1 = document.getElementById('quiz_btn1');
let button2 = document.getElementById('quiz_btn2');

let formState = {
    userData: ['', null, ''],
    step: 0,
    title: [["Hi!", "What is your name?"],
    ["Nice to meet you", "How can we help you?"],
    ["What is your email?", "So we can reach you."]],
    placeholder: ["My name is", "Leave us a message", "My email is"],
    isSending: false
}


textarea.onkeyup = function () {
    //Enable button if length > 1
    if (this.value.length > 0) {
        button2.disabled = false;
    } else button2.disabled = true;

    //Email check
    if (formState.step === 2) {
        if (validateEmail(this.value)) {
            button2.disabled = false;
        } else button2.disabled = true;
    }
};

function stepClick(isNext) {
    let textBlock = document.getElementById('mainname_text-title');
    let step0Blocks = document.querySelector('.step0_block');
    let fullSection = document.querySelector('.main_name_content');

    //save data after click (back/forw)
    formState.userData[formState.step] = textarea.value;

    //Send process
    if (isNext && formState.step === 2) {
        formState.isSending = true;
    }

    //inc/decrement step with basic check & enable button
    if (isNext && formState.step < 2) {
        formState.step++;
    } else if (!isNext && formState.step > 0) {
        formState.step--;
    }

    //set data from state & disable button if 0
    if (formState.step >= 0 && formState.step <= 2) {
        textarea.value = formState.userData[formState.step];
        if (formState.userData[formState.step] && formState.userData[formState.step].length > 0) {
            button2.disabled = false;
        } else {
            button2.disabled = true;
        }
    }

    //disable if step 0
    if (formState.step === 0) {
        button1.disabled = true;
        step0Blocks.style.display = 'block';
    } else if (button1) {
        button1.disabled = false;
        if (step0Blocks) {
            step0Blocks.style.display = 'none';
        }
    }

    let isReversed = (formState.step === 1) ? "reversed" : 0;
    let isSmileShow = formState.step < 2;
    let nameSubtext = formState.step === 1 ? `<div class="sub_name">, ${formState.userData[0]}</div>` : '';

    if (!formState.isSending) {
        // Title change
        textBlock.innerHTML = `
        <div class="${`step_${formState.step}_added`}">
            <div class="jtext_line ${isReversed}">
                ${isSmileShow ? '<div class="lottie-anim lottie-anim__yell"><lottie-player src="img/svg_json/7.json" background="transparent" speed="1" loop autoplay></lottie-player></div>' : ''}
                <div class="quiz_text">${formState.title[formState.step][0]}${nameSubtext}</div>
            </div>
            <div class="jtext_line quiz_text">${formState.title[formState.step][1]}</div>
        </div>
        `;

        //Placeholder change
        textarea.placeholder = formState.placeholder[formState.step] + "...";

        //Change height if 1
        if (formState.step == 1) {
            textarea.style.cssText += 'white-space:unset;height:2.2em;';
            textarea.rows = 3;
        } else {
            textarea.style.cssText = '';
            textarea.rows = 1;
        }

        //Button change 
        if (formState.step === 2) {
            button2.innerHTML = "Submit";
        } else {
            button2.innerHTML = "Next";
        }
    }

    //Send & show info
    if (isNext && formState.isSending) {
        fullSection.innerHTML = `
        <div class="mainname_text error__quiz">
            <div>Sending...</div>
        </div>
    `;

        console.log('try to send');

        //imitation of request, change to async
        setTimeout(function () {
            if (!"Api responce 200-299") {
                fullSection.innerHTML = `
            <div class="mainname_text">
                <div class="jtext_line">
                    <div class="lottie-anim lottie-anim__yell"><lottie-player src="img/svg_json/7.json" background="transparent" speed="1" loop autoplay></lottie-player></div>
                    <div class="quiz_text">Thank you !</div>
                </div>
                <div class="jtext_line">
                    <div class="quiz_text">We’ll get back to you as soon as possible.</div>
                </div>
            </div>
            `;
            } else {
                fullSection.innerHTML = `
                <div class="mainname_text error__quiz">
                    <div class="jtext_line">Some error occurred.</div>
                    <button class="quiz_btn quiz_btn__1 btn" id="quiz_btn2" onclick="stepClick(true);">Try again</button>
                </div>
            `;
            }
        }, 500);

    }

}

//Desktop hero typing
var typedHero = new Typed('.header_anim01_bl', {
    strings: [`Hi,^40 we're <span class="ht__1">nolk,</span>`],
    typeSpeed: 70,
    startDelay: 10,
    onComplete: (self) => {
        document.querySelector('.head_sect1').classList.add('typed-header-hero');
        // alert('complete');
    }
});

//Desktop quiz form typing
var typedQuiz = new Typed('#quiz_typo', {
    strings: ['Hi !^40', 'What is your name?'],
    typeSpeed: 80,
    backDelay: 1700,
    backSpeed: 30,
    loop: true,

});


//smooth scroll iOS Safari
(function () {
    scrollTo();
})();

function scrollTo() {
    const links = document.querySelectorAll('.scroll');
    links.forEach(each => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    const checkIfDone = setInterval(function () {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = '-1';
            targetAnchor.focus();
            window.history.pushState('', '', targetID);
            clearInterval(checkIfDone);
        }
    }, 2000);
}
