(function() {
  var Carousel, domready;

  domready = require('domready');

  module.exports = Carousel = (function() {
    function Carousel(selector) {
      var _this = this;
      this.selector = selector;
      if (!this.selector) {
        console.error("Please specify a CSS selector when creating a new Carousel,        e.g. new Carousel('#my-carousel')");
      }
      domready(function() {
        _this.slide_count = document.querySelectorAll("" + _this.selector + " > *").length;
        document.body.addEventListener('keydown', function(event) {
          var _ref, _ref1;
          if ((_ref = event.keyCode) === 39 || _ref === 40) {
            _this.next();
          }
          if ((_ref1 = event.keyCode) === 37 || _ref1 === 38) {
            return _this.prev();
          }
        });
        return _this.getOffset();
      });
    }

    Carousel.prototype.getOffset = function() {
      this.offset = parseInt(document.body.scrollTop / window.innerHeight);
      if ((document.body.scrollTop % window.innerHeight) > window.innerHeight / 2) {
        return this.offset++;
      }
    };

    Carousel.prototype.next = function() {
      this.getOffset();
      if (this.offset !== this.slide_count - 1) {
        this.offset++;
      }
      return this.animate();
    };

    Carousel.prototype.prev = function() {
      this.getOffset();
      if (this.offset !== 0) {
        this.offset--;
      }
      return this.animate();
    };

    Carousel.prototype.animate = function() {
      if (typeof jQuery !== "undefined") {
        return $("html, body").animate({
          scrollTop: window.innerHeight * this.offset
        });
      } else {
        return document.body.scrollTop = window.innerHeight * this.offset;
      }
    };

    return Carousel;

  })();

}).call(this);
