(function ($) {
  'use strict';

  /* ------------------------------------#
      FlashModule
  #------------------------------------ */
  var FlashModule = function(){};
  FlashModule.prototype = {
    init: function(options){
      var flashNode = options.node;

      $(flashNode).closest('[data-tab]').off('tab:changed').on('tab:changed', function() {
        $(flashNode).find('.slick-slider').slick('setPosition')
      })

      this.vars = {
        flash: flashNode,
        flashes: flashNode.querySelectorAll('.flash'),
        flashLinks: flashNode.querySelectorAll('nav button'),
        flashLists: flashNode.querySelectorAll('.flash_list'),
        flashPaginations: flashNode.querySelectorAll('.flash_pagination'),
        defaultFlashtype: options.defaultFlashtype
      }

      this.jQueryObjects = {
        $flashLists: $(this.vars.flashLists),
        $flashPaginations: $(this.vars.flashPaginations)
      }

      this.attachIds();
      this.attachEvents();

      for(var i=0; i < this.vars.flashLists.length; i++){
        this.initPagination(i);
      }

      //Attach active class to first flashList
      for(var k in this.vars.flashLists){
        var cur = this.vars.flashLists[k];
        if(typeof(cur) == 'object'){
          cur.classList.remove('active');
        }
      }
      this.vars.flashLists[0].classList.add('active');

      //Attach active class to first flashPagination
      for(var k in this.vars.flashPaginations){
        var cur = this.vars.flashPaginations[k];
        if(typeof(cur) == 'object'){
          cur.classList.remove('active');
        }
      }
      this.vars.flashPaginations[0].classList.add('active');
    },
    attachIds: function(){
      for(var i=0; i<this.vars.flashLinks.length; i++){
        var cur = this.vars.flashLinks[i];
        cur.dataset.id = i+1;
      }
    },
    attachEvents: function(){
      var curFlashModule = this;
      for(var i=0; i<this.vars.flashLinks.length; i++){
        var cur = this.vars.flashLinks[i];

        cur.addEventListener('click', this.displayList.bind(this));
      }
    },
    displayList: function(e){
      var id = e.target.dataset.id;

      for(var i=0; i < this.vars.flashLinks.length; i++){
        this.vars.flashLinks[i].classList.remove('active');
      }
      e.target.classList.add('active');

      for(var i=0; i < this.vars.flashLists.length; i++){
        this.vars.flashLists[i].classList.remove('active');
      }
      this.vars.flashLists[id-1].classList.add('active');

      for(var i=0; i < this.vars.flashPaginations.length; i++){
        this.vars.flashPaginations[i].classList.remove('active');
      }
      this.vars.flashPaginations[id-1].classList.add('active');
    },
    initPagination: function(i){
      var $list = $(this.vars.flashLists[i]),
          $pagination = $(this.vars.flashPaginations[i]),
          $pageCurrent = $pagination.find('.page_current'),
          $pageTotal = $pagination.find('.page_total'),
          pageCount = $list.find('.flash_page').length;

      $list.off('init').on('init', function(event, slick){
        $pageCurrent.text('1');
        $pageTotal.text(pageCount);
      });

      $list.off('afterChange').on('afterChange', function(event, slick, currentSlide){
        $pageCurrent.text(currentSlide + 1);
      });

      $pagination.remove('.slick-prev');
      $pagination.remove('.slick-next');

      $list.slick({
        appendArrows: $pagination,
        prevArrow: '<button type="button" class="slick-prev">Précédent</button>',
        nextArrow: '<button type="button" class="slick-next">Suivant</button>'
      });
    }
  };



  /* ------------------------------------#
      initSticky
  #------------------------------------ */
  function initSticky() {
  
    

    var $asideSticky = $('.sticky'),
        $asideStickyWrapper = $('.sticky_wrapper');
    
    if ( $asideStickyWrapper.length === 0 ) return;
    
    var
        windowTop = $(window).scrollTop(),
        asideStickyTop = $asideStickyWrapper.offset().top,
        asideStickyHeight = $asideSticky.innerHeight(),
        margeTopSticky = 30;

        if ($.mq.is.M()) {
          var $itemBottomRef = $('.block_main'),
              heightHeader    = $('.header_top').innerHeight();
        } else if ($.mq.is.L()) {
          var $itemBottomRef = $('.block_une'),
              heightHeader    = $('#nav_sub').innerHeight();
        }


    if($.mq.is.L() || $.mq.is.M()) {

      var bottomTop = $itemBottomRef.offset().top,
          bottomHeight = $itemBottomRef.innerHeight();

      // début de page ou on déclenche le sticky
      if ( (windowTop + heightHeader) >= asideStickyTop - margeTopSticky ){

        // on déclenche le sticky fixed
        if ( ( windowTop + heightHeader + margeTopSticky) < ( bottomTop + bottomHeight - asideStickyHeight ) ){
          $asideSticky.attr('style', '').css({
            position: 'fixed',
            top: heightHeader + margeTopSticky
          });
          // on déclenche le sticky absolute
        } else if ( ( windowTop + heightHeader + margeTopSticky) >= ( bottomTop + bottomHeight - asideStickyHeight) ){
          $asideSticky.attr('style', '').css({
            position: 'absolute',
            top: bottomHeight - asideStickyHeight
          });
        } else if ( ( windowTop + heightHeader) > ( bottomTop + bottomHeight ) ) {
          $asideSticky.attr('style', '');
        }
      } else {
        $asideSticky.attr('style', '');
      }
    } else {
      $asideSticky.attr('style', '');
    }
  };


  /* ------------------------------------#
      Init Slick
  #------------------------------------ */
  function initSlickCandidate() {
    $('.block_candidate_slick').slick({
      slidesToShow: 5,
      slidesToScroll: 3,
      variableWidth: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 760,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }


  /* ------------------------------------#
      EVENT
  #------------------------------------ */
  //Init block flash
  var cur = document.querySelector('.block_une');

    if(cur){

      //Init flash module
      var flash = new FlashModule(),
        thisFlashs = cur.querySelectorAll('.actu_une_flash');
      
        thisFlashs.forEach(function(thisFlash) {
            
            flash.init({
              node: thisFlash,
              defaultFlashtype: 'actu'
            });
            
        })
      
    }

  //scroll
  $(window).on('scroll load', $.throttle(function() {
    initSticky();
  }, 50));

  //screensize init
  $(document).on('screensize:init', function(e, currentSize, previousSize) {

    initSlickCandidate();

    if(currentSize == 'M' || currentSize == 'L'){
      initSticky();
    }
  });

  //screensize change
  $(document).on('screensize:change', function(e, currentSize, previousSize) {
    if(currentSize == 'M' || currentSize == 'L'){
      initSticky();
    }
  });

})(jQuery);


/* ------------------------------------#
    Module Decompte
#------------------------------------ */
function makeTimer() {

  var endTime   = new Date("June 18, 2017 20:00:00"),
      endTime   = (Date.parse(endTime)) / 1000,
      now       = new Date(),
      now       = (Date.parse(now) / 1000),
      timeLeft  = endTime - now,
      hours     = Math.floor(timeLeft / 3600),
      minutes   = Math.floor((timeLeft - (hours * 3600 )) / 60),
      seconds   = Math.floor((timeLeft - (hours * 3600) - (minutes * 60)))

  if (hours   < "10") hours   = "0" + hours;
  if (minutes < "10") minutes = "0" + minutes;
  if (seconds < "10") seconds = "0" + seconds;

  var $timer = $(".timer_container")

  $timer.each(function(index) {

    $this = $(this);
    $this.find(".hours").html(hours + "<span>h</span>");
    $this.find(".minutes").html(minutes + "<span>m</span>");
    $this.find(".seconds").html(seconds + "<span>s</span>");

    if(endTime < now)$this.hide()
  });

}setInterval(function() { makeTimer(); }, 1000);