"use strict";

$(document).ready(function () {
  $(".navbar__container-link").click(function () {
    $(".navbar__checkbox").prop("checked", false);
  });
});

// Counter 1

var a = 0;
$(window).scroll(function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter-value").each(function () {
      var $this = $(".counter-value-1"),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },

        {
          duration: 3500,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum.toLocaleString("en") + " T");
            //alert('finished');
          },
        }
      );
    });
    a = 1;
  }
});

// Scroll 2

var b = 0;
$(window).scroll(function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (b == 0 && $(window).scrollTop() > oTop) {
    $(".counter-value").each(function () {
      var $this = $(".counter-value-3"),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },

        {
          duration: 3500,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum + " %");

            //alert('finished');
          },
        }
      );
    });
    b = 1;
  }
});

// SCROLL 3

var c = 0;
$(window).scroll(function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (c == 0 && $(window).scrollTop() > oTop) {
    $(".counter-value").each(function () {
      var $this = $(".counter-value-2"),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },

        {
          duration: 3500,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum + " KG");

            //alert('finished');
          },
        }
      );
    });
    c = 1;
  }
});
