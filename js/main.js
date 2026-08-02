// open nav menu
const toggleMenu = document.querySelector(".toggle-menu");
const links = document.querySelector(".links");

toggleMenu.addEventListener("click", (e) => {
  links.classList.toggle("open");
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  toggleMenu.classList.toggle("menu-active");
});
// remove nav menu on link click
const navLinks = document.querySelectorAll(".links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    links.classList.remove("open");
    navLinks.forEach((link) => link.classList.remove("active"));
    allBullets.forEach((bullet) => bullet.classList.remove("active"));
    allBullets.forEach((bullet) => {
      if (link.dataset.section === bullet.dataset.section) {
        bullet.classList.add("active");
        localStorage.setItem("active-bullet", e.target.dataset.section);
      }
    });
  });
});
// remove nav menu and settings box on click outside
document.body.addEventListener("click", (e) => {
  if (
    !links.contains(e.target) &&
    !toggleMenu.contains(e.target) &&
    !settingsBox.contains(e.target) &&
    !settingsIcon.contains(e.target)
  ) {
    links.classList.remove("open");
    toggleMenu.classList.remove("menu-active");
    settingsBox.classList.remove("open");
    settingsI.classList.remove("fa-spin");
  }
});
// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    allBullets.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    localStorage.setItem("active-bullet", e.target.dataset.section);
  });
});
// check if active bullet is saved in local storage
const activeBullet = localStorage.getItem("active-bullet");
if (activeBullet !== null) {
  allBullets.forEach((bullet) => {
    bullet.classList.remove("active");
    if (bullet.dataset.section === activeBullet) {
      bullet.classList.add("active");
    }
  });
}
// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// random background image
const images = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "04.jpg", "05.jpg"];
const landing = document.querySelector(".landing-page");
const backgroundOption = localStorage.getItem("background-option");
let backgroundInterval;
landing.style.backgroundImage = 'url("./gallary/bg3.jpg")';
let BackgroundOption = true;
function startBackgroundInterval() {
  if (BackgroundOption === true) {
    backgroundInterval = setInterval(() => {
      const randomImage = Math.floor(Math.random() * images.length);
      landing.style.backgroundImage =
        'url("./gallary/' + images[randomImage] + '")';
    }, 10000);
  } else {
    clearInterval(backgroundInterval);
  }
}
startBackgroundInterval();

// open settings box
const settingsBox = document.querySelector(".settings-box");
const settingsIcon = document.querySelector(".toggle-settings");
const settingsI = document.querySelector(".toggle-settings i");

settingsIcon.addEventListener("click", () => {
  settingsI.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
});
// switch colors
const colorOptions = document.querySelectorAll(".colors-list li");

colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const selectedColor = option.getAttribute("data-color");
    document.documentElement.style.setProperty("--main-color", selectedColor);
    localStorage.setItem("main-color", selectedColor);
    colorOptions.forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");
  });
});
// check if main color is saved in local storage
const savedColor = localStorage.getItem("main-color");
if (savedColor !== null) {
  document.documentElement.style.setProperty("--main-color", savedColor);
  colorOptions.forEach((option) => {
    if (option.getAttribute("data-color") === savedColor) {
      option.classList.add("selected");
    } else {
      option.classList.remove("selected");
    }
  });
} else {
  console.log("localStorage of color is empty");
}
// stop and start random background
const randomBackgroundOption = document.querySelectorAll(
  ".random-background span",
);
randomBackgroundOption.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll("span").forEach((span) => {
      span.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      BackgroundOption = true;
      startBackgroundInterval();
      localStorage.setItem("background-option", "yes");
    } else {
      BackgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", "no");
    }
  });
});
// check if background option is active in local storage
const backgroundOptionSaved = localStorage.getItem("background-option");
if (backgroundOptionSaved !== null) {
  randomBackgroundOption.forEach((option) => {
    option.classList.remove("active");
    if (option.dataset.background === backgroundOptionSaved) {
      option.classList.add("active");
    }
  });
  if (backgroundOptionSaved === "yes") {
    BackgroundOption = true;
  } else {
    BackgroundOption = false;
    clearInterval(backgroundInterval);
  }
}
// show and hide nav bullets
const bulletsOption = document.querySelectorAll(".bullets-option span");
const navBullets = document.querySelector(".nav-bullets");
bulletsOption.forEach((option) => {
  option.addEventListener("click", () => {
    option.parentElement.querySelectorAll("span").forEach((span) => {
      span.classList.remove("active");
    });
    option.classList.add("active");
    if (option.dataset.bullets === "show") {
      navBullets.classList.add("show");
      localStorage.setItem("bullets-option", "show");
    } else {
      navBullets.classList.remove("show");
      localStorage.setItem("bullets-option", "hide");
    }
  });
});
// check if bullets option is active in local storage
const bulletsOptionSaved = localStorage.getItem("bullets-option");
if (bulletsOptionSaved !== null) {
  bulletsOption.forEach((option) => {
    option.classList.remove("active");
    if (option.dataset.bullets === bulletsOptionSaved) {
      option.classList.add("active");
    }
    if (bulletsOptionSaved === "show") {
      navBullets.classList.add("show");
    } else {
      navBullets.classList.remove("show");
    }
  });
}
// reset button
const resetButton = document.querySelector(".reset-options");
resetButton.addEventListener("click", () => {
  localStorage.removeItem("main-color");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");
  window.location.reload();
});
// style span on our skills
const SpanProgress = document.querySelectorAll(".skill-progress span");
SpanProgress.forEach((span) => {
  span.style.width = span.dataset.progress;
});
// open pop box on click photo
const Images = document.querySelectorAll(".images-box img");
Images.forEach((img) => {
  img.addEventListener("click", () => {
    let popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");
    document.body.appendChild(popupOverlay);
    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");
    document.body.appendChild(popupBox);
    let popupHeading = document.createElement("h3");
    let popupHeadingText = document.createTextNode(img.alt);
    popupHeading.appendChild(popupHeadingText);
    popupHeading.classList.add("popup-heading");
    popupBox.appendChild(popupHeading);
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.classList.add("close-button");
    popupBox.appendChild(closeButton);
    closeButton.addEventListener("click", () => {
      popupBox.remove();
      popupOverlay.remove();
    });
  });
});
// close pop box
