domready = require('domready')

module.exports = class Carousel

  constructor: (@selector) ->

    unless @selector
      console.error "Please specify a CSS selector when creating a new Carousel,
        e.g. new Carousel('#my-carousel')"

    domready =>

      # Number of immediate children
      @slide_count = document.querySelectorAll("#{@selector} > *").length

      document.body.addEventListener 'keydown', (event) =>
        @next() if event.keyCode in [39, 40] # right or down
        @prev() if event.keyCode in [37, 38] # left or up

      @getOffset()

  getOffset: ->
    # Estimate which slide is nearest based on current window scroll position
    @offset = parseInt(document.body.scrollTop/window.innerHeight)

    # Whichever slide is more than half-revealed in the window prevails
    @offset++ if (document.body.scrollTop % window.innerHeight) > window.innerHeight/2

  next: ->
    @getOffset()
    @offset++ unless @offset is @slide_count-1
    @animate()

  prev: ->
    @getOffset()
    @offset-- unless @offset is 0
    @animate()

  animate: ->
    if typeof jQuery isnt "undefined"
      $("html, body").animate
        scrollTop: window.innerHeight*@offset
    else
      document.body.scrollTop = window.innerHeight*@offset

