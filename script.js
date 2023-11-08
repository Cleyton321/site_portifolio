// Efeito da barra de menu header

window.addEventListener("scroll", function(){
    let header = document.querySelector('.header')
    header.classList.toggle('scroll',window.scrollY > 400)
})

// Efeito de rolagem da página

const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

// function nativeScroll(distanceFromTheTop) {
//   window.scroll({
//     top: distanceFromTheTop,
//     behavior: "smooth",
//   });
// }

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 30;
  smoothScrollTo(0, distanceFromTheTop, 1000);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

const logoLink = document.querySelector('.header .menu #logo');

logoLink.addEventListener("click", (event) => {
  event.preventDefault();
  smoothScrollTo(0, document.querySelector("#home").offsetTop, 1000);
});


function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
}

// Efeito de aparição de elementos da página

/*const observer = new IntersectionObserver(entries => {

    Array.from(entries).forEach(entry => {
        if (entry.intersectionRatio >= 1) {
            entry.target.classList.add('-off')
        }
    })
}, {
    threshold: [0, .5, 1]
})

Array.from(document.querySelectorAll('')).forEach(element => {
    observer.observe(element)
})*/