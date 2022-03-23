function validateEmail(email) {
  var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
}

// Header button animation
const allButtons = document.querySelectorAll(".sect1_btn");
const baseColor = "#002b99";
const primColor = "#ffffff";

//map buttons
allButtons.forEach(function (btn) {
  btn.addEventListener("mouseover", function () {
    changeBg(btn, true);
  });

  btn.addEventListener("mouseleave", function () {
    changeBg(btn, false);
  });
});

function changeBg(btn, isMouseOver) {
  const bg = btn.querySelector(".bg");
  const text = btn.querySelector(".btn_text");
  //set contrast
  var isContrast = false;
  if (btn.classList.contains("contrast")) {
    isContrast = true;
  }
  if (isMouseOver) {
    bg.style.transition = 'bottom 0.42s';
    bg.style.bottom = "-100%";

    bg.style.opacity = "1";
    text.style.color = `${isContrast ? baseColor : primColor}`
  } else {
    bg.style.transition = 'bottom 0.25s';
    bg.style.bottom = "100%";

    setTimeout(function () {
      bg.style.bottom = "-300%";
      bg.style.opacity = "0";
      text.style.color = `${isContrast ? primColor : baseColor}`;
    }, 200);
  }
}

// Contact form
let textarea = document.getElementById("quiz1");
let button1 = document.getElementById("quiz_btn1");
let button2 = document.getElementById("quiz_btn2");

let formState = {
  userData: ["", null, ""],
  step: 0,
  title: [
    ["Hi!", "What is your name?"],
    ["Nice to meet you", "How can we help you?"],
    ["What is your email?", "So we can reach you."],
  ],
  placeholder: ["My name is", "Leave us a message", "My email is"],
  isSending: false,
};

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
  let textBlock = document.getElementById("mainname_text-title");
  let step0Blocks = document.querySelector(".step0_block");
  let fullSection = document.querySelector(".main_name_content");

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
    step0Blocks.style.display = "block";
  } else if (button1) {
    button1.disabled = false;
    if (step0Blocks) {
      step0Blocks.style.display = "none";
    }
  }

  let isReversed = formState.step === 1 ? "reversed" : 0;
  let isSmileShow = formState.step < 2;
  let nameSubtext =
    formState.step === 1 ? `<div class="sub_name">, ${formState.userData[0]}</div>` : "";

  if (!formState.isSending) {
    // Title change
    textBlock.innerHTML = `
        <div class="${`step_${formState.step}_added`}">
            <div class="jtext_line ${isReversed}">
                ${
                  isSmileShow
                    ? '<div class="lottie-anim lottie-anim__yell"><lottie-player src="img/svg_json/7.json" background="transparent" speed="1" loop autoplay></lottie-player></div>'
                    : ""
                }
                <div class="quiz_text">${formState.title[formState.step][0]}${nameSubtext}</div>
            </div>
            <div class="jtext_line quiz_text">${formState.title[formState.step][1]}</div>
        </div>
        `;

    //Placeholder change
    textarea.placeholder = formState.placeholder[formState.step] + "...";

    //Change height if 1
    if (formState.step == 1) {
      textarea.style.cssText += "white-space:unset;height:2.2em;";
      textarea.rows = 3;
    } else {
      textarea.style.cssText = "";
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

    console.log("try to send");

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
var typedHero = new Typed(".header_anim01_bl", {
  strings: [`Hi,^40 we're <span class="ht__1">nolk,</span>`],
  typeSpeed: 70,
  startDelay: 10,
  onComplete: (self) => {
    document.querySelector(".head_sect1").classList.add("typed-header-hero");
    // alert('complete');
  },
});

//Desktop quiz form typing
var typedQuiz = new Typed("#quiz_typo", {
  strings: ["Hi !^40", "What is your name?"],
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
  const links = document.querySelectorAll(".scroll");
  links.forEach((each) => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
  const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top);
  e.preventDefault();
  var targetID = respond ? respond.getAttribute("href") : this.getAttribute("href");
  const targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
  const checkIfDone = setInterval(function () {
    const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = "-1";
      targetAnchor.focus();
      window.history.pushState("", "", targetID);
      clearInterval(checkIfDone);
    }
  }, 2000);
}
