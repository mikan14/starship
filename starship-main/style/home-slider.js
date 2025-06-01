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

  // prevent dragging image to new tab
  slides.forEach(img => {
    img.setAttribute('draggable', 'false');
  });
});


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
    const walk = (x - startX) * 2; // scroll speed
    slider.scrollLeft = scrollLeft - walk;
  });
});