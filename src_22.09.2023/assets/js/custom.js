(function ($, window, Typist) {
  /*---------owl-carousel------------*/

  $(document).ready(function () {
    $('.accordion-list > li > .answer').hide();

    $('.accordion-list > li').click(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
      } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
      }
      return false;
    });

  });


  $(".listing-sec-slider").owlCarousel({
    loop: true,
    margin: 10,
    //nav: true,
    dots: true,

    items: 3,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
  $(".course-slider").owlCarousel({
    loop: true,
    margin: 10,
    //nav: true,
    dots: false,

    items: 3,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      1000: {
        items: 2,
      },
      1300: {
        items: 3,
      },
    },
  });
  $(".benefits-slider").owlCarousel({
    loop: true,
    margin: 10,
    //nav: true,
    dots: true,

    items: 3,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 2,
      },
    },
  });

  $(".pro-slider").owlCarousel({
    loop: true,
    margin: 10,
    //nav: true,
    dots: true,

    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 4,
      },
      1202: {
        items: 5,
      },
    },
  });
  $(".testi-slider").owlCarousel({
    loop: true,
    margin: 10,
    //nav: true,
    dots: true,

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 2,
      },
    },
  });
  $(".topic-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    navText: [
      "<img src='img/angle-left.png'>",
      "<img src='img/angle-right.png'>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  $(".banner-slider").owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsiveClass: true,
    smartSpeed: 2500,
    responsive: {
      0: {
        items: 1,
        nav: true,
        loop: true,
      },
      600: {
        items: 1,
        nav: true,
        loop: true,
      },
      1000: {
        items: 1,
        nav: true,
        loop: true,
      },
    },
  });

  $(".skillitem").owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsiveClass: true,
    navText: [
      "<i class='fas fa-arrow-left'></i>",
      "<i class='fas fa-arrow-right'></i>",
    ],
    smartSpeed: 2500,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 1,
        nav: true,
      },
      1000: {
        items: 3,
        nav: true,
      },
    },
  });

  $(".teacher").owlCarousel({
    loop: true,
    margin: 15,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsiveClass: true,
    smartSpeed: 2500,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 1,
        nav: true,
      },
      1000: {
        items: 5,
        nav: true,
      },
    },
  });

  $(".teacher2").owlCarousel({
    loop: true,
    margin: 15,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsiveClass: true,
    smartSpeed: 2500,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 1,
        nav: true,
      },
      1000: {
        items: 3,
        nav: true,
      },
    },
  });

  $(document).ready(function () {
    $(".testimonials-step .step-tab a").click(function () {
      var tab_id = $(this).attr("data-tab");

      $(".testimonials-step .step-tab a").removeClass("current");
      $(".tab-content").removeClass("current");

      $(this).addClass("current");
      $("#" + tab_id).addClass("current");
    });
  });

  /*-------tooltip---------*/

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  /*-------------headder_fixed-------------*/

  $(window).scroll(function () {
    var sticky = $(".header"),
      scroll = $(window).scrollTop();

    if (scroll >= 20) sticky.addClass("fixed");
    else sticky.removeClass("fixed");
  });

  /*--------------ASO.JS---------------*/

  AOS.init();

  //refresh animations

  $(window).on("load", function () {
    AOS.refresh();
  });

  jQuery(document).ready(function ($) {
    var feedbackSlider = $(".feedback-slider");
    feedbackSlider.owlCarousel({
      items: 1,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 2500,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      navText: [
        "<i class='fas fa-arrow-left'></i>",
        "<i class='fas fa-arrow-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
          nav: true,
        },
        600: {
          items: 1,
          nav: true,
        },
        1000: {
          items: 1,
          nav: true,
        },
      },
    });
  }); //end ready

  // Footer Content Read More / Read Less

  $(".footer-readmore").click(function () {
    $(".foot-note").toggleClass("d-block");
    $(".footer-readmore").toggleClass("read-less");
    if ($(".footer-readmore").hasClass("read-less")) {
      $(".read-less").text("Read Less...");
    } else {
      $(".footer-readmore").text("Read More...");
    }
  });
})(jQuery, window);

/*--------------Menu---------------------*/

$(function () {
  var siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  var siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      var counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter,
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter,
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      var $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function (e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();
});

/* Ajax Form */

$(".ajax-form").submit(function (e) {
  e.preventDefault();

  var form = $(this),
    url = $(this).attr("action"),
    data = $(this).serialize();

  $.ajax({
    type: "POST",
    url: url,
    data: data,
  }).done(function (response) {
    if (response == 1) {
      form.find(".error").hide();
      form.find(".success").show();
    } else {
      form.find(".error").show();
      form.find(".success").hide();
    }
  });
});

let testImage = document.querySelectorAll(".test-thumb");

testImage.forEach((t) => t.addEventListener("click", getValue));

function getValue() {
  let modal = document.getElementById("modalIframe");
  let value = this.childNodes[1].value;
  modal.setAttribute("src", value);
}

//  testImage.onClick = function () {
//    let val = this.value;
//    console.log(val);
//  }

$(function () {
  "use strict";

  $(".input").on("input", function () {
    var $field = $(this).closest(".form-group");
    if (this.value) {
      $field.addClass("field--not-empty");
    } else {
      $field.removeClass("field--not-empty");
    }
  });
});

const dashboardSidebar = document.querySelector(".sidebar");
const dashBoardRight = document.querySelector(".dashboard-right");
const overlay = document.querySelector('.overlay')


// const bars = document.querySelector('.bars')

// // bars.addEventListener('click', (e) => {
// //   dashboardSidebar.classList.toggle("show-sidebar");
// //   dashBoardRight.classList.toggle("margin-init");
// //   overlay.classList.add('show-overlay')
// // })

// // overlay.addEventListener('click', (e) => {
// //   overlay.classList.remove('show-overlay')
// //   dashboardSidebar.classList.add('show-sidebar')
// //   dashBoardRight.classList.add('margin-init')
// // })

// function myFunction(x) {
//   if (x.matches) {
//     // If media query matches
//     dashboardSidebar.classList.add("show-sidebar");
//     dashBoardRight.classList.add("margin-init");
//   } else {
//     dashboardSidebar.classList.remove("show-sidebar");
//     dashBoardRight.classList.remove("margin-init");
//   }
// }

// var x = window.matchMedia("(max-width: 990px)");
// myFunction(x); // Call listener function at run time
// //x.addListener(myFunction); // Attach listener function on state changes
// x.addEventListener("change", myFunction);

// const passwordInput = document.querySelector("#password");
// const passIcon = document.querySelector(".view-pass-icon");

// passIcon.addEventListener("click", (e) => {
//   const passwordInputType = passwordInput.getAttribute("type");
//   //console.log(passwordInputType)

//   if (passwordInputType === "password") {
//     if (passwordInput.value !== "") {
//       passIcon.classList.add("show");
//     }

//     passwordInput.setAttribute("type", "text");
//   } else {
//     passIcon.classList.remove("show");
//     passwordInput.setAttribute("type", "password");
//   }
// });




