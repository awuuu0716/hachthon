$(function(){
  $('.judge__gallery').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.judge__nav'
  });
  
  $('.judge__nav').slick({
    centerMode: true,
    centerPadding: '20px',
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.judge__gallery',
    autoplay: true,
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      }
    ]
  });
  
  /*
  nav 縮小
  from: https://benmarshall.me/attaching-javascript-handlers-to-scroll-events/
  */
  document.addEventListener('wheel', () => {
    if (window.scrollY > 300) return
    if (window.scrollY > 50) {
      document.querySelector('.nav').classList.add('nav-scrolled')
    } else {
      document.querySelector('.nav').classList.remove('nav-scrolled')
    }
  }, {capture: false, passive: true })

});

