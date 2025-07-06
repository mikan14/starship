/*// --- SLIDER 1: Hero/Multi Slider ---
document.querySelectorAll('.hero-slider, .multi-slider').forEach((slider) => {
  const track = slider.querySelector('.slider-track') || slider.querySelector('.multi-track');
  const slides = Array.from(track.children);
  let index = 0;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;
  let isDragging = false;
  let autoplayInterval;

  function getSlideWidth() {
    return slider.offsetWidth;
  }

  function setPositionByIndex() {
    currentTranslate = index * -getSlideWidth();
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function touchStart(event) {
    stopAutoplay();
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
  }

  function touchMove(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }

  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && index < slides.length - 1) index++;
    if (movedBy > 100 && index > 0) index--;

    setPositionByIndex();
    startAutoplay();
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      index = (index + 1) % slides.length;
      setPositionByIndex();
    }, 3000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  slider.addEventListener('mousedown', touchStart);
  slider.addEventListener('touchstart', touchStart);

  slider.addEventListener('mousemove', touchMove);
  slider.addEventListener('touchmove', touchMove);

  slider.addEventListener('mouseup', touchEnd);
  slider.addEventListener('touchend', touchEnd);
  slider.addEventListener('mouseleave', () => isDragging && touchEnd());

  window.addEventListener('resize', setPositionByIndex);

  setPositionByIndex();
  startAutoplay();

  // Prevent dragging image to new tab
  slides.forEach(img => {
    img.setAttribute('draggable', 'false');
  });
});
--- end slider 1 */


document.addEventListener("DOMContentLoaded", function () {
  // --- SLIDER 2: Free Scroll Slider ---
  document.querySelectorAll('.free-slider').forEach((slider) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  });

  // --- hamburger toggle ---
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }

  // --- homepage video play button ---
  const video = document.getElementById('homepage-video');
  const playBtn = document.querySelector('.play-button');

  if (video && playBtn) {
    playBtn.addEventListener('click', () => {
      video.controls = true;
      video.play();
      playBtn.style.display = 'none';
    });
  }

  // --- artistpage photo slider ---
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    slides[currentSlide]?.classList.remove("active");
    dots[currentSlide]?.classList.remove("active");
    currentSlide = index;
    slides[currentSlide]?.classList.add("active");
    dots[currentSlide]?.classList.add("active");
  }

  // --- scroll to top button ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.onscroll = function () {
    if (!scrollTopBtn) return;
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  };

  scrollTopBtn?.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- audition form submit ---
  const form = document.getElementById("auditionForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) return;
      e.preventDefault();
      window.location.href = "thankyoupage.html";
    });
  }
});

const enterArrow = document.getElementById('enter-arrow');
  const splash = document.getElementById('artist-splash'); // make sure the ID matches!

  if (enterArrow && splash) {
    enterArrow.addEventListener('click', () => {
      splash.classList.add('hide');

      setTimeout(() => {
        splash.style.display = 'none';
      }, 1000);
    });
  }

  const fadeSections = document.querySelectorAll('.fade-in-section, .left-fade, .right-fade');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeSections.forEach(section => {
    observer.observe(section);
  });