(function(){
    document.addEventListener('DOMContentLoaded', init, false);

    var creative = {};
    var timer = {};

    function init () {
        creative.banner                         = document.getElementById("banner");
        creative.click_tag                      = document.getElementById("click_tag");
        creative.totalDivs                      = creative.banner.querySelectorAll("*");
        creative.allDivs                        = creative.banner.children;
        creative.tl                             = new TimelineMax();
        creative.preload_counter                = 0;

        creative.width                          = document.getElementById('banner').offsetWidth;
        creative.height                         = document.getElementById('banner').offsetHeight;
        
        timer.banner_startTimer;
        timer.banner_start                      = Date.now();
        timer.banner_end                        = timer.banner_start + 15000;

        // Start Timer
        // timer.banner_startTimer = setInterval(bannerTime, 100);

        addListeners();
        elements_off();
    }

    function init_broadcast_elements () {
      var particle_container = document.getElementById("particle_container");
      var particle_png_length = 5;
  
      for (var i = 0; i < particle_png_length; i++) {
        var particle_div = document.createElement('div');
            particle_div.className = 'particles';
            particle_div.id = 'particle' + i;
            particle_div.setAttribute("style", "background-image:url('images/particle_seq/particle_" + i + ".jpg'); opacity:0;");         
            particle_container.appendChild(particle_div);
      }
      
      elements_off();
    }

    function elements_off () {
        // elements opacity off
        for (i = 0; i < creative.allDivs.length; i++) {TweenMax.set(creative.allDivs[i], {opacity:0}); }
        
        add_preload_class();
    }

    function add_preload_class () {
        //add class for image loader
        addClass(creative.totalDivs, 'load_images');
        imagesLoaded( '#banner', {
          background: '.load_images'
        }, function( imgLoad ) {
          console.log(imgLoad.images.length + "images loaded checking .load_images backgrounds")
          frameOne();
        });        
    }

    function frameOne () {

// -- Initial states for the Banner and Particle effec.5
      CSSPlugin.defaultForce3D = false;
      CSSPlugin.force3D = false;
      TweenMax.to([creative.banner, border], 0.2, {opacity:1});
      TweenMax.set([bg, logo_1, frame_One], {opacity:1})
      var particle_tl = new TimelineMax({});

// -- Setting Initial States

      const frameOneTl = new TimelineMax({});
      frameOneTl
        .set([logo, txt4, cta],  { opacity:0, y: 18})
        .set([bg], {x: 1, scale: 1.1, y: -20})
        .set([towerCon], {opacity: 1, y: -185, transformOrigin: "250px 394px"})
        .set([bucket, bucketCon1, bucketCon2], {opacity: .8})
        .set([bottomDataCon2, bottomDataCon1], {opacity: .3} )
        .set([topDataCon1, topDataCon2], {opacity: .4})
        .set([tower], {opacity: 1})
        .set([txt1, txt2, txt3, flashlight, sparkles1, man], {opacity: 0})
// -- Frame One Animation Starts

        .to([txt1], .4, 
          {opacity: 1, yoyo:true, repeat:1, repeatDelay:1.2, onComplete:frameTwo })
        .to([bg], 5, 
          { x: 15, y: -20}, "sync-=1")
        .to([towerCon], 7, 
          {y: -170}, "sync-=1")

// -- Bottom Data Animation 

        .to([bottomDataCon1], 7, 
          {opacity: .9, y: -120, ease: Power2.easeOut}, "sync-=.5")
        .to([bottomDataCon2], 7, 
          {opacity: .9, y: 120, ease: Power2.easeOut}, "sync-=.5")
        .to([bottomData], 7, 
          {opacity: .9, ease: Power2.easeOut}, "sync-=.5")
        .to([bottomDataCon1], 2, 
          {opacity:0}, "synco+=.1")

// -- Bucketman Animation

      // -- Horizontal reveal
        .to([bucketCon1], 6, 
          {opacity: 1, x: 270, ease: Power2.easeOut, delay: .5}, "sync-=.5")
        .to([bucketCon2], 6, 
          {opacity: 1, x: -270, ease: Power2.easeOut, delay: .5}, "sync-=.5")
        .to([bucket], 6, 
          {opacity: 1, ease: Power2.easeOut, delay: .5}, "sync-=.5")

      // -- Vertical Reveal
        .to([bucketCon1], 4, 
          {y: -100, ease: Power2.easeOut}, "sync2-=6.2")
        .to([bucketCon2], 4, 
          {y: 100, ease: Power2.easeOut}, "sync2-=6.2")
        .to([man], 2, {opacity: .7}, "-=4.8")
      
      // - Bucket and Man dissappear
        .to([bucketCon1, bucketCon2, bucket], 3, {opacity: 1}, "sync2-=2")
        .to([bucketCon1, man], 2, 
          {opacity: 1}, "synco-=.1")

// -- Top Data Animation

        .to([topDataCon1], 4, 
          {opacity: 1, x: 220, ease: Power2.easeOut, delay: 1.4}, "sync-=.8")
        .to([topDataCon2], 4, 
          {opacity: 1, x: -220, ease: Power2.easeOut, delay: 1.4}, "sync-=.8")
        .to([topData], 4, 
          {opacity: 1, ease: Power2.easeOut, delay: 1.4}, "sync-=.8")
        .to([topDataCon1], 8, {y: 300}, "sync+=1.5")
        .to([topDataCon2], 8, {y: -300}, "sync+=1.5")
        .to([topData], 2, {opacity: 0}, "synco+=.3")

// -- Particle Animation

      particleTl = new TimelineMax();
      particleTl
          .set('.particle_img', {s:0, skewY:10}, "-=3")
          .set(['.particle_img3', '.particle_img5'], 
            {opacity: 1}) 
          .set(particle_hold2, 
            {x: -30, y:280, rotation:50, scale: 1.3, opacity: 1})
          .staggerTo('.particle_img2', 0, 
            {cycle: {x: [-20, -25, -29, -25, -23, -11, -39, -23, -11, -39], y:[-80, -86, -82]}, scale:0, skewY:10})
          .staggerTo('.particle_img3', 0, 
            {cycle: {x: [320, 325, 329, 325, 323, 321, 329, 325], y:[10, 16, 12]}, opacity: 1, scale:.2, skewY:10})
          .staggerTo('.particle_img4', 0, 
            {cycle: {x: [320, 325, 329, 325, 323, 321, 329, 325], y:[10, 16, 12]}, opacity: 1, scale:.2, skewY:10})
          .staggerTo('.particle_img5', 0, 
            {cycle: {x: [280, 285, 289, 285, 283, 281, 289, 285], y:[10, 16, 12]}, opacity: 1, scale:.19, skewY:10})
          .staggerTo('.particle_img6', 0, 
            {cycle: {x: [350, 355, 359, 355, 353, 351, 359, 355], y:[-5, -5, -5]}, opacity: 1, scale:.2, skewY:10})
          .set(['particle_hold6'], {"display": "none"})

      

      
      TweenMax.staggerFrom('.particle_img2', 1.3, 
        {cycle: {scale: [0.1, 0.06, 0.09, 0.2]},  skewX:-10, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img2', 1.3, 
        {cycle: {rotation: [10.1, -20.06, 40.09, -31.12]}, opacity:0.9, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img2', 1.3, 
        {y:-50, cycle: {x: [60, 62, 64, 65]}, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFromTo('.particle_img2', 0.1, 
        {borderTop:"solid 1px rgba(255,255,255,0)", yoyo:true, repeat:30, ease: Power4.easeIn}, {borderTop:"solid 1px rgba(90,255,5,1)"}, 0.1)
      
          
      TweenMax.set(particle_hold3, {x: -250, y:50, scale: .9})
      TweenMax.staggerFrom('.particle_img3', 2, {cycle: {scale: [0.01, 0.06, 0.09, 0.2]},  skewX:-50, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img3', 2, {cycle: {rotation: [10.1, -20.06, 40.09, -31.12]}, opacity:1, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img3', 2, {y:-50, cycle: {x: [-200, -320, -340, -35]}, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.to([particleContainer], 1, {x:90}, "+=1")

      TweenMax.set(particle_hold4, {x: -250, y:35, scale: .9})
      TweenMax.staggerFrom('.particle_img4', 2, {cycle: {scale: [0.01, 0.06, 0.09, 0.2]},  skewX:-50, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img4', 2, {cycle: {rotation: [10.1, -20.06, 40.09, -31.12]}, opacity:1, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img4', 2, {y:-50, cycle: {x: [-200, -320, -340, -35]}, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      // TweenMax.to([particleContainer], 6, {x:90}, "+=1")

      TweenMax.set(particle_hold5, {x: -270, y:135, scale: .9})
      TweenMax.staggerFrom('.particle_img5', 2, {cycle: {scale: [0.01, 0.06, 0.09, 0.2]},  skewX:-50, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img5', 2, {cycle: {rotation: [10.1, -20.06, 40.09, -31.12]}, opacity:1, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img5', 2, {y:-50, cycle: {x: [-200, -320, -340, -35], y:[120, 200]}, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      // TweenMax.to([particleContainer], 6, {x:90}, "+=1")

      TweenMax.set(particle_hold6, {x: -270, y:135, scale: .9})
      TweenMax.staggerFrom('.particle_img6', 2, {cycle: {scale: [0.01, 0.06, 0.09, 0.2]},  skewX:-50, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img6', 2, {cycle: {rotation: [10.1, -20.06, 40.09, -31.12]}, opacity:1, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      TweenMax.staggerFrom('.particle_img6', 2, {y:-50, cycle: {x: [280, 287, 270, 285], y:[120, 200]}, ease:Power1.easeOut, repeat:1, delay:2.2}, 0.1)
      // TweenMax.to([particleContainer], 6, {x:90}, "+=1")
    }

    const dn = () => {
      particleTl
        .set(['.particle_img6'], {"display": "none"})
    }

    function frameTwo() {
      frameTwoTl = new TimelineMax();
      frameTwoTl
        .to([txt2], .6, {opacity: 1, yoyo: true, repeat:1, repeatDelay:1.2}, "sync+=1")
        .to([sparkles1], .5, {opacity:1, x: 0}, "sync+=.8")
        .to([particleContainer], 3, {opacity: 0})
        .to([sparkles1], .5, {opacity: .8, onComplete: frameThree})
        .to([txt3], .6, {opacity:1, yoyo:true, repeat:1, repeatDelay:1.2}, "-=2")
    }

    function frameThree() {
      frameThreeTl = new TimelineMax();
      frameThreeTl
        .to([flashlight], .3, {opacity: .8, onComplete: frameFour}, "sync-=10")
        .to([logo_1], 1, {opacity:0, y:30})
        
    }

    function frameFour() {
      TweenMax.set([bgff],  { opacity:1})
      TweenMax.set([sheen, sheenCont], {opacity: 1, y: -1})
      TweenMax.set(bgff, {scale:2, y:-50, opacity: 0, transformOrigin: "150px 125px"})
      frameFourTl = new TimelineMax();
      frameFourTl
        .to([towerCon], 1.8, {y: 200, opacity: .4, ease: Power4.easeInOut, scale: .9}, "-=.3")
        .to([bg], 1.8, {y: 250, ease: Power4.easeInOut, opacity: 0}, "-=1.5")
        .to([bgff], 1, {opacity: 1, scale: 1, y:0, ease: Power4.easeOut}, "-=1")
        .staggerTo([logo, txt4, cta], 2, {y:0, opacity:1, ease: Power3.easeOut}, 0.4, "-=.8")
        .from(sheen, 2, {x:-200,  ease:Power3.easeInOut}, "-=1.2")
     
// Transition to EF

        // .to(bloom, 2, {opacity:0.4, delay:5.5, scale:1.9, ease: Power2.easeIn})
        // .to(bloom, 0.7, {opacity:0, delay:7.4, ease:Power2.easeOut})
        // .to(frame_One, 5.5, {scale:3, y:0, ease:Power2.easeIn, delay:1, force3D:false})
        // .to([primera_building, '.maskMe'], 2.5, {y:110, ease:Power2.easeIn, delay:5, opacity:0})
        
    }



    // function ctaAnimation () {
        // Legal
        // creative.legal_overMouse = document.getElementById("legal_hover")
        // creative.legal_overIt = document.getElementById("legal_over")
        // creative.legal_overMouse.addEventListener("mouseover", legal_in); 
    // }

    function legal_in () {
        TweenMax.set([legal_over], {opacity:1, y:0});
        TweenMax.from([legal_over],  0.2, {opacity:0, y:creative.height});

        creative.legal_overMouse.addEventListener("mouseout", legal_out); 
        creative.legal_overMouse.addEventListener("click", legalStay);
    }

    function legalStay () {
        TweenMax.set([legal_over], {opacity:1, pointerEvents:"auto"});
        
        addClass("#legal_hover", "clicked");

        if(hasClass(creative.legal_overMouse, "clicked")){
            creative.legal_overMouse.removeEventListener("mouseout", legal_out);
            creative.legal_overMouse.removeEventListener("mouseover", legal_in); 
        }
  
        creative.legal_overIt.addEventListener("click", legal_out);         
    }

    function legal_out () {
        TweenMax.set([legal_over], {pointerEvents:"none"});
        TweenMax.to([legal_over],  0.2, {opacity:0, y:creative.height});
        
        removeClass(creative.legal_overMouse, "clicked")
        creative.legal_overIt.removeEventListener("click", legal_out);
        creative.legal_overMouse.addEventListener("mouseover", legal_in);
        creative.legal_overMouse.addEventListener("mouseout", legal_out);
    }

    function addListeners () {
        creative.click_tag.addEventListener('click', bgExitHandler, false);
    }

    function bgExitHandler () {
        Enabler.exit('Background Exit');
    }

    /*--------------- Snippets --------------------*/

        function bannerTime (){
            timer.banner_start = Date.now();

            if(timer.banner_start > timer.banner_end){
                clearInterval(timer.banner_startTimer);
                // TweenMax.killAll();
                console.log('Banner time = 15 seconds');
            }
        }
        
        function Random (max) {
            return Math.random()*max;
        }

        function random (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function hasClass(el, className) {
          if (el.classList)
            return el.classList.contains(className)
          else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
        }

        function addClass(elements, myClass) {

          // if there are no elements, we're done
          if (!elements) { return; }

          // if we have a selector, get the chosen elements
          if (typeof(elements) === 'string') {
            elements = document.querySelectorAll(elements);
          }

          // if we have a single DOM element, make it an array to simplify behavior
          else if (elements.tagName) { elements=[elements]; }

          // add class to all chosen elements
          for (var i=0; i<elements.length; i++) {

            // if class is not already found
            if ( (' '+elements[i].className + ' ').indexOf(' '+myClass+' ') < 0 ) {

              // add class
              elements[i].className += ' ' + myClass;
            }
          }
        }

        function removeClass(el, className) {
          if (el.classList)
            el.classList.remove(className)
          else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className=el.className.replace(reg, ' ')
          }
        }

        // function replay_banner (){
        //     TweenMax.killAll();
        //     for (i = 0; i < creative.allDivs.length; i++) {
        //         TweenMax.set(creative.allDivs[i], {
        //             x:0,
        //             y:0,
        //             rotation:0,
        //             scale:1,
        //         });
        //     }               
        // } 
    /*--------------- Snippets ^ --------------------*/

    /*--------------- GSAP Snippets --------------------*/

        // Bump
        // TweenMax.from([],  0.3, {scale:0, transformOrigin:"0px 0px", ease:Back.easeOut});    

        //Clip Mask
        // TweenMax.set(element, {clip:"rect(0px, 300px, 0px, 0px);"}); 
        // TweenMax.to(element, 0, {clip:"rect(0px, 300px, 188px, 0px);"});

        // Gsap Css Value
        // console.log(element._gsTransform.scaleX);

        // GLOW-----
        // var glowTimeline = new TimelineMax ({
        //   delay: 2.25
        // });
  
        // glowTimeline.from([glow],  0.5, {opacity:0});
        // glowTimeline.to([glow],  0.5, {delay:0.2, opacity:0});

    /*--------------- GSAP Snippets ^ --------------------*/

})();
