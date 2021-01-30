var mySwiper = new Swiper ('.product-swipe', {
direction: 'horizontal',
nextButton: '.swiper-button-next',
prevButton: '.swiper-button-prev',
speed:500,
});

var mySwiper = new Swiper ('.logo-swipe', {
direction: 'horizontal',
autoplay: 5000,
speed:500,
});

// key word slider
var swiper = new Swiper('.hot-keyword', {
  slidesPerView: 'auto',
  freeMode: true,
  pagination: {
	clickable: true,
  },
});


//category height
var child = document.querySelector(".dee-category");
var parent = document.getElementById("category-parent");

var childHeight = parseInt(window.getComputedStyle(child).height) - 20 + "px";
parent.style.paddingTop = childHeight; 



// countdown timmer
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 24 * 60 * 60 * 1000);
//initializeClock('clockdiv', deadline);