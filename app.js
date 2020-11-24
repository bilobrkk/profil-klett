export default class Slider {
     constructor(sliderSelector,
                 sliderContainerSelector,
                 transitionTime,
                 sliderHeight,
                 previousSelector,
                 nextSelector = {}) {
          this.slider = document.querySelector(sliderSelector);
          this.slides = document.querySelectorAll(`${sliderContainerSelector} img`).length;
          this.sliderContainer = document.querySelector(sliderContainerSelector);
          this.previousBtn = document.querySelector(previousSelector);
          this.nextBtn = document.querySelector(nextSelector);
          this.slideSize = this.slider.offsetWidth;
          this.currentSlide = 0;
          this.setEventListeners();
          this.generateBullets();
          this.setAutoPlay(transitionTime);
          this.sliderContainer.style.height = sliderHeight;
     }

     moveSlides() {
          this.sliderContainer.style.transform = `translateX(-${this.currentSlide * this.slideSize}px)`;
          Array.from(this.bullets.children).forEach(bullet => bullet.classList.remove('active'));
          this.bullets.children[this.currentSlide].classList.add('active');
     };

     nextSlide() {
          this.currentSlide = this.currentSlide >= this.slides - 1 ? 0 : this.currentSlide + 1;
          this.moveSlides();
     };

     previousSlide() {
          this.currentSlide = this.currentSlide <= 0 ? this.slides - 1 : this.currentSlide - 1;
          this.moveSlides();
     };

     setEventListeners() {
          this.nextBtn.addEventListener('click', this.nextSlide.bind(this));
          this.previousBtn.addEventListener('click', this.previousSlide.bind(this));
     }

     generateBullets() {
          const bullets = document.createElement('div');
          bullets.classList.add('bullets');

          for (let i = 0; i < this.slides; i += 1) {
               const dot = document.createElement('span');
               dot.addEventListener('click', () => {
                    this.currentSlide = i;
                    this.moveSlides();
               });
               dot.classList.add('bullet');
               bullets.appendChild(dot);
          }
          bullets.firstChild.classList.add('active');
          this.slider.appendChild(bullets);
          this.bullets = bullets;
     }

     setAutoPlay(transitionTime) {
          setInterval(this.nextSlide.bind(this), transitionTime);
     }
}

new Slider('.slider1', '.wrapper1', 3000, '200px', '.prev1', '.next1');
new Slider('.slider2', '.wrapper2', 6000, '600px', '.prev2', '.next2');