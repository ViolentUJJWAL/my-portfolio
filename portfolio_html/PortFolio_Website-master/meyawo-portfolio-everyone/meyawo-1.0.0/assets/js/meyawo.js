/*!
=========================================================
* Meyawo Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});



document.addEventListener("DOMContentLoaded", () => {
    const cards = document.getElementsByClassName("course-card");
  
    const scrollAnimation = () => {
      Array.from(cards).forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
  
        if (cardPosition < screenPosition) {
          card.classList.add("scroll-in");
        }else{
            card.classList.remove("scroll-in");
        }
      });
    };
  
    window.addEventListener("scroll", scrollAnimation);
    scrollAnimation(); // Trigger animation if already in view on load
  });
  
  