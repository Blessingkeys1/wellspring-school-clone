let body = $("body");
let bodyClass = "no-scroll";
let bodyEdit = "cms-page-is-in-edit-mode";

$(document).ready(function () {
  // Click on search icon to get seach box
  $(".site-search-icon").click(function (e) {
    $(".site-search-block").toggleClass("site-search-block-active");
    $(".site-search-input").focus();
    e.stopPropagation();
  });

  // Click anywhere on screen to close searchbar
  $(document).on("click", function (e) {
    if ($(e.target).closest(".site-search-data").length == 0) {
      $(".site-search-block").removeClass("site-search-block-active");
    } else {
      $(".site-search-block").addClass("site-search-block-active");
    }
  });

  // Mobile toggle menu
  $(".site-menu-toggle").click(function () {
    $('body').toggleClass('stop-scrolling');
    $('#site-header').toggleClass('active-header');
    if (!$('body').hasClass('cms-page-is-in-edit-mode')) {
      $('#site-footer').toggleClass('active-footer');
    }
    $(this).toggleClass("active-menu-toggle");
    $(".site-navigation-wrapper").toggleClass("site-navigation-active");
  });

  // For level 1 items
  $(".level1 > .site-nav-expand").click(function () {
    $(".level1 .site-nav-expand").not($(this)).removeClass("site-nav-expand-active");
    $(".level1 .site-subnav-wrapper").not($(this).next(".site-subnav-wrapper")).removeClass("site-subnav-wrapper-active");
    $(this).toggleClass("site-nav-expand-active");
    $(this).next(".site-subnav-wrapper").toggleClass("site-subnav-wrapper-active");
  });

  // For level 2 items
  $(".level2 > .site-nav-expand").click(function () {
    $(".level2 .site-nav-expand").not($(this)).removeClass("site-nav-expand-active");
    $(".level2 .site-subnav-wrapper").not($(this).next(".site-subnav-wrapper")).removeClass("site-subnav-wrapper-active");
    $(this).toggleClass("site-nav-expand-active");
    $(this).next(".site-subnav-wrapper").toggleClass("site-subnav-wrapper-active");
  });

  $(".site-nav-active-parent").each(function () {
    $(this).find(".site-subnav-wrapper:first").addClass("site-subnav-wrapper-active");
    $(this).find(".site-nav-expand:first").addClass("site-nav-expand-active");
  });

  $(".site-nav-active").each(function () {
    $(this).find(".site-subnav-wrapper:first").addClass("site-subnav-wrapper-active");
    $(this).find(".site-nav-expand:first").addClass("site-nav-expand-active");
  });

  $(".site-subnav-active").each(function () {
    $(this).find(".site-subnav-wrapper:first").addClass("site-subnav-wrapper-active");
    $(this).find(".site-nav-expand:first").addClass("site-nav-expand-active");
  });

  $("body:not(.home-page) .site-nav-active-grandparent").each(function () {
    $(this).find(".site-subnav-wrapper:first").addClass("site-subnav-wrapper-active");
    $(this).find(".site-nav-expand:first").addClass("site-nav-expand-active");
  });

  // Custom link active
  $(".custom-link-active-wrapper.cms-text-feature-wrapper .cms-text-feature-content a").each(function () {
    if ($(this).attr("href").replace("/", "").toUpperCase() === window.location.pathname.replace("/", "").toUpperCase()) {
      $(this).addClass("custom-link-active")
    }
  });

  // Current Year
  if ($("#current-year").length) {
    function getCopyrightYear() {
      return new Date().getFullYear();
    }

    const currentYearElement = document.getElementById('current-year');
    const copyrightYear = getCopyrightYear();
    currentYearElement.textContent = copyrightYear;
  }

  // Button Arrow
  $('.site-button-primary, .site-button-secondary, .site-button-full-primary, .site-button-full-secondary, .site-form-button').append('<i class="bg-arrow"></i>');

  // We Believe
  var listBelieveItems = $('div.site-nav-believe-wrapper ul.site-nav-block li');
  listBelieveItems.each(function () {
    if ($(this).hasClass('custom-nav-site-nav-school') || $(this).hasClass('custom-nav-site-nav-activities')) {
      $(this).css('display', 'none');
    }
  });

  // School
  $('div.site-nav-school-wrapper li').not('.site-subnav-level2 li').css('display', 'none');
  $('div.site-nav-school-wrapper li.custom-nav-site-nav-school').css('display', 'inline-block');

  // Activities
  $('div.site-nav-activities-wrapper li').not('.site-subnav-level2 li').css('display', 'none');
  $('div.site-nav-activities-wrapper li.custom-nav-site-nav-activities').css('display', 'inline-block');

  // .site-table-mobile-stack
  if ($(".site-table-mobile-stack").length) {
    $(function () {
      var array = [];

      $('.site-table-mobile-stack th').each(function (index) {
        array.push($(this).text());
      });

      $(".site-table-mobile-stack tbody tr td").each(function (index, element) {
        var $this = $(this);
        $this.attr("data-label", array[$this.index()]);
      });
    });
  }

  // Iframe Resize
  $('.iframe-resize').on('load', function () {
    var iframe_height = this.contentDocument.body.scrollHeight
    this.style.height = iframe_height + 'px';
  });

  $(".iframe-resize-video").each(function () {
    $(this).wrapAll('<div class=iframe-resize-video-wrapper></div>');
  });

  // Video Popup - mp4/vimeo/youtube
  $(document).on("click", ".video-popup-button", function (event) {
    event.preventDefault();

    $(".video-popup-button").removeClass("video-popup-button-active");
    $(".video-popup-section").remove();

    $(this).addClass("video-popup-button-active");

    $('<div>', {
      id: 'video-popup-section',
      class: 'video-popup-section video-popup-wrapper video-popup-wrapper-active',
    }).insertAfter("#page-wrapper");

    $(".video-popup-section").append("<div class='video-popup'></div>");
    $(".video-popup").append("<div class='remove-video-popup'></div>");

    let videoUrl = $(this).attr('href');

    if (!videoUrl) {
      videoUrl = $(this).find('a').attr('href');
    }

    const videoId = getVideoIdFromURL(videoUrl);

    if (isVimeoVideo(videoUrl)) {
      const videoSrc = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      $('.video-popup-section .video-popup').append(`<iframe width="100%" height="500" src="${videoSrc}" frameborder="0" allow="autoplay" allowfullscreen></iframe>`);
    } else if (isYouTubeVideo(videoUrl)) {
      const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      $('.video-popup-section .video-popup').append(`<iframe width="100%" height="500" src="${videoSrc}" frameborder="0" allow="autoplay" allowfullscreen></iframe>`);
    } else {
      $('.video-popup-section .video-popup').append(`
                  <video width="100%" height="auto" controls autoplay>
                      <source src="${videoUrl}" type="video/mp4">
                      Your browser does not support the video tag.
                  </video>
              `);
    }

    // Hide previous videos in dynamic-modal
    $('.dynamic-modal').removeClass('active-modal');
  });

  function getVideoIdFromURL(url) {
    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const vimeoRegex = /vimeo\.com\/(?:channels\/|groups\/[^\/]*\/videos\/|video\/|)([0-9]+)/;

    const youtubeMatch = url.match(youtubeRegex);
    const vimeoMatch = url.match(vimeoRegex);

    if (youtubeMatch) {
      return youtubeMatch[1];
    } else if (vimeoMatch) {
      return vimeoMatch[1];
    } else {
      return null;
    }
  }

  function isYouTubeVideo(url) {
    return /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)/.test(url);
  }

  function isVimeoVideo(url) {
    return /vimeo\.com/.test(url);
  }

  $(function () {
    $(document).on("click", '.remove-video-popup', function () {
      $(".video-popup-section .video-popup-wrapper").removeClass("video-popup-wrapper-active");
      $(".remove-video-popup").remove();
      $(".video-popup-section").remove();
    });
  });

  function custom_video_popup(event, href) {
    event.preventDefault();

    $(".video-popup-button").removeClass("video-popup-button-active");
    $(".video-popup-section").remove();

    $(this).addClass("video-popup-button-active");

    $('<div>', {
      id: 'video-popup-section',
      class: 'video-popup-section video-popup-wrapper video-popup-wrapper-active',
    }).insertAfter("#page-wrapper");

    $(".video-popup-section").append("<div class='video-popup'> </div>");
    $(".video-popup").append("<div class='remove-video-popup'> </div>");

    var video_id = '';
    if (href) {
      if (href.includes('youtube.com') || href.includes('youtu.be')) {
        video_id = href.includes('v=') ? href.split('v=')[1].split('&')[0] : href.split('/').slice(-1)[0];
        $('.video-popup-section .video-popup').append('<iframe width="100%" height="500" src="https://www.youtube.com/embed/' + video_id + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
      } else if (href.includes('vimeo.com')) {
        video_id = href.split('/').slice(-1)[0];
        $('.video-popup-section .video-popup').append('<iframe src="https://player.vimeo.com/video/' + video_id + '?autoplay=1" width="100%" height="500" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>');
      } else if (href.includes('.mp4')) {
        $('.video-popup-section .video-popup').append('<video width="100%" height="500" controls autoplay><source src="' + href + '" type="video/mp4">Your browser does not support the video tag.</video>');
      }
    } else {
      video_id = $(this).attr('href').split('/').slice(-1)[0];
      var ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      $('.video-popup-section .video-popup').append('<iframe width="100%" height="500" src="https://www.youtube.com/embed/' + video_id + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
    }

    event.preventDefault();
  }

  $(".custom-link-popup a.site-slide-link:not([target])").on('click', function (event) {
    custom_video_popup(event, $(this).attr('href'));
  });


  // Important Popup
  $(document).on("click", function (e) {
    if ($(e.target).closest(".site-opened-popup").length == 0) {
      $("body:not(.cms-page-is-in-edit-mode) .site-opened-popup-wrapper").hide();
    }
  });

  $('<div class="site-popup-close"></div>').prependTo('.site-opened-popup');
  $("body:not(.cms-page-is-in-edit-mode) .site-popup-close").click(function () {
    $(".site-opened-popup-wrapper").hide();
  });

  var popupInitialized = false; // Flag to track initialization

  function initializePopup() {
    // Check if initialization has already occurred
    if (popupInitialized) {
      return;
    }

    $.get("/site-wide-popup", function (data) {
      var $sidebarContent = $(data);
      var $popup = $sidebarContent.find('.site-wide-popup');

      // Wrap the popup in a div with class .popup-wrapper
      $popup.wrap('<div class="popup-wrapper"></div>');

      // Check if the close button is not already present within the site-opened-popup
      if ($popup.find('.site-popup-close').length === 0) {
        var $closeButton = $('<div class="site-popup-close"></div>');
        // Append the close button only within the site-opened-popup
        $popup.prepend($closeButton);
      }

      var $popupWrapper = $popup.parent('.popup-wrapper');

      // Check if the site-opened-popup has the class site-desktop-hide
      if ($popup.hasClass('site-desktop-hide')) {
        // Add the class hide-desktop to .popup-wrapper
        $popupWrapper.addClass('hide-desktop');
      }

      // Check if the site-opened-popup has the class site-mobile-hide
      if ($popup.hasClass('site-mobile-hide')) {
        // Add the class hide-mobile to .popup-wrapper
        $popupWrapper.addClass('hide-mobile');
      }

      if ($popup.length != 0) {
        $("#site-wide-popup").each(function () {
          $(this).append($popupWrapper.clone());
          $(this).removeClass("no-features");
        });
      }

      // Attach the click event handler only once
      $("body:not(.cms-page-is-in-edit-mode)").on("click", ".site-popup-close", function () {
        $(".popup-wrapper").hide();
      });

      // Set the flag to true to indicate initialization
      popupInitialized = true;
    });
  }

  // Call the function once to initialize the popup
  initializePopup();

  // Header Colour 
  if (window.innerWidth >= 1024 && (document.body.classList.contains('home-page') || document.body.classList.contains('landing-page')) && !document.body.classList.contains('cms-page-is-in-edit-mode')) {
    $('.site-custom-red-header-wrapper').attr('data-midnight', 'colour-red');
    $('.site-header-logo').midnight({
      axis: 'X'
    });

    $('.site-header-right').midnight({
      axis: 'X'
    });
  }

  // Home Intro Iframe
  var banners = document.querySelectorAll('.site-custom-video-banner-wrapper .site-slide');
  banners.forEach(function (banner) {
    var iframe = banner.querySelector('iframe');
    if (iframe) {
      var siteSlide = banner.closest('.site-slide');
      if (siteSlide) {
        siteSlide.appendChild(iframe);
      }
    }
  });

  var isBannerFadedOut = false;

  // Banner scroll Mobile
  if (document.body.classList.contains('home-page') && !document.body.classList.contains('cms-page-is-in-edit-mode')) {
    if ($('.site-custom-intro-banner-wrapper').length) {
      var delay = window.innerWidth > 1024 ? 2000 : 1500;
      var isBannerFadedOut = false;

      function fadeOutBanner() {
        $('.site-custom-intro-banner-wrapper h2').addClass('zoom-in');

        setTimeout(function () {
          $('.site-custom-intro-banner-wrapper').addClass('fade-out');
          $('body').removeClass('stop-scrolling');
          isBannerFadedOut = true;
        }, delay);
      }

      setTimeout(() => {
        fadeOutBanner();
      }, 2000);

      function handleScroll() {
        if (window.scrollY > 5) {
          fadeOutBanner();
        }
      }

      function handleWheel(event) {
        fadeOutBanner();
      }

      var startX, startY, distX, distY;
      function handleTouchStart(e) {
        var touch = e.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
      }

      function handleTouchMove(e) {
        var touch = e.touches[0];
        distX = touch.pageX - startX;
        distY = touch.pageY - startY;

        if (Math.abs(distY) > Math.abs(distX) && distY < -50) {
          fadeOutBanner();
        } else if (window.innerWidth <= 1280 && Math.abs(distX) > Math.abs(distY) && distX < -50) {
          fadeOutBanner();
        }
      }

      if (window.innerWidth < 1024) {
        if (window.scrollY > 0) {
          isBannerFadedOut = true;
          $('.site-custom-intro-banner-wrapper').addClass('fade-out');
          $('body').removeClass('stop-scrolling');
        } else {
          $('.site-custom-intro-banner-wrapper').addClass('fade-in');
          $('body').addClass('stop-scrolling');
        }
      } else {
        if (!window.location.hash) {
          $('.site-custom-intro-banner-wrapper').addClass('fade-in');
          if (window.innerWidth < 1024) {
            $('body').addClass('stop-scrolling');
          }
        }
      }

      function applyEventListeners() {
        if (window.innerWidth > 1280) {
          $(document).on('wheel', handleWheel);
          $(window).off('scroll', handleScroll);
          document.removeEventListener('touchstart', handleTouchStart, false);
          document.removeEventListener('touchmove', handleTouchMove, false);
        } else {
          $(window).on('scroll', handleScroll);
          $(document).on('wheel', handleWheel);
          document.addEventListener('touchstart', handleTouchStart, false);
          document.addEventListener('touchmove', handleTouchMove, false);
        }
      }

      $('.site-custom-intro-banner-wrapper').on('click', function () {
        fadeOutBanner();
      });

      applyEventListeners();

      $(window).on('resize', function () {
        applyEventListeners();
      });
    }
  }

  // Mousewheel scroll Homepage & landing-page
  if (window.innerWidth >= 1024 && (document.body.classList.contains('home-page') || document.body.classList.contains('landing-page')) && !document.body.classList.contains('cms-page-is-in-edit-mode')) {
    if ($('.site-scroller-wrapper').length) {
      const scroller = document.querySelector('.site-scroller-wrapper #MainContent');
      const siteFooter = document.getElementById("site-footer");
      const verticalScrollClasses = ['cms-text-feature-content', 'site-slider-tab-content-list'];
      let isHoveringOverVerticalScrollElement = false;
      let isDragging = false;
      let startX;
      let scrollLeft;

      scroller.scrollLeft = 0;

      // Footer Visibility
      function checkFooterVisibility() {
        if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth) {
          siteFooter.style.opacity = "1";
          siteFooter.style.pointerEvents = "all";
          $(".site-custom-last-slide-wrapper .site-slider-image, .site-custom-last-slide-wrapper .site-slider-video").addClass("resize-image");
        } else {
          siteFooter.style.opacity = "0";
          siteFooter.style.pointerEvents = "none";
          $(".site-custom-last-slide-wrapper .site-slider-image, .site-custom-last-slide-wrapper .site-slider-video").removeClass("resize-image");
        }
      }

      if ($(window).width() >= 1024) {
        document.addEventListener("mousemove", function (e) {
          const hoveredElement = e.target;
          const scrollableElement = verticalScrollClasses.map(className => hoveredElement.closest(`.${className}`)).find(el => el !== null);

          isHoveringOverVerticalScrollElement = scrollableElement ? (scrollableElement.scrollHeight > scrollableElement.clientHeight) : false;
        });

        scroller.addEventListener('touchstart', function (event) {
          const touch = event.touches[0];
          const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
          const scrollableElement = verticalScrollClasses.map(className => touchedElement.closest(`.${className}`)).find(el => el !== null);

          isHoveringOverVerticalScrollElement = scrollableElement ? (scrollableElement.scrollHeight > scrollableElement.clientHeight) : false;

          if (!isHoveringOverVerticalScrollElement) {
            isDragging = true;
            startX = touch.clientX;
            scrollLeft = this.scrollLeft;
          }
        });

        scroller.addEventListener("touchmove", function (event) {
          if (isDragging) {
            event.preventDefault();
            const x = event.touches[0].clientX;
            const walk = (x - startX) * 2;
            this.scrollLeft = scrollLeft - walk;
            checkFooterVisibility();
          }
        });

        scroller.addEventListener("touchend", function () {
          isDragging = false;
        });

        if (document.body.classList.contains('home-page')) {
          // Home
          scroller.addEventListener("wheel", function (event) {
            if (!isHoveringOverVerticalScrollElement && isBannerFadedOut) {
              event.preventDefault();
              this.scrollLeft += event.deltaY;
              checkFooterVisibility();
            }
          });
        }

        if (document.body.classList.contains('landing-page')) {
          // Landing Page
          scroller.addEventListener("wheel", function (event) {
            if (!isHoveringOverVerticalScrollElement) {
              event.preventDefault();
              this.scrollLeft += event.deltaY;
              checkFooterVisibility();
            }
          });
        }
      }

      // Anchor to Section
      function scrollToElementWithParentPadding(element) {
        const targetOffset = element.getBoundingClientRect().left;
        const scrollerOffset = scroller.getBoundingClientRect().left;
        const parentElement = element.closest('.featureMainDiv');
        const parentPadding = parseInt(window.getComputedStyle(parentElement).paddingLeft, 10) || 0;

        const newScrollLeft = scroller.scrollLeft + (targetOffset - scrollerOffset) - parentPadding;

        const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
        scroller.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
      }

      window.addEventListener('hashchange', function () {
        const hashElement = document.querySelector(location.hash);
        if (hashElement) {
          scrollToElementWithParentPadding(hashElement);
        }
      });

      if (location.hash) {
        const hashElement = document.querySelector(location.hash);
        if (hashElement) {
          setTimeout(() => scrollToElementWithParentPadding(hashElement), 0);
        }
      }
    }
  }

  var $galleryWrappers = $('.site-display-slideshow .slick-slider');

  if ($galleryWrappers.length > 0) {
    setTimeout(() => {
      $galleryWrappers.each(function () {
        var $sliderImageBlock = $(this).find('.site-display-image');
        var sliderImageBlockHeight = $sliderImageBlock.outerHeight();
        $(this).find('.slick-prev, .slick-next').css('top', sliderImageBlockHeight / 2);
      });
    }, 750);
  }

  // Custom slide gallery 
  function handleCustomGallery() {
    if ($(window).width() > 600 && $(window).width() < 1024) {
      $(".site-custom-team-gallery-wrapper .slick-slider, .site-custom-number-gallery-wrapper .slick-slider").slick('slickSetOption', {
        slidesToShow: 2
      });
    }

    $('.site-custom-slide-gallery-wrapper .slick-slider').slick('refresh')
  }
  handleCustomGallery();

  if (window.innerWidth >= 1024 && (document.body.classList.contains('home-page') || document.body.classList.contains('landing-page'))) {
    $('.site-custom-team-gallery-wrapper .slick-slider').slick('unslick');
  }

  // Resize Functions
  $(window).on('resize', function () {
    handleCustomGallery();
  });

  if ($('.site-custom-slide-gallery-wrapper').length) {
    // Force display flex
    const slides = document.querySelectorAll('.site-custom-slide-gallery-wrapper .site-slide');
    slides.forEach(slide => {
      slide.style.setProperty('display', 'flex', 'important');
    });

    // Site Custom Slide Gallery
    $(".site-custom-slide-gallery-wrapper .site-slide").click(function () {
      $(".site-custom-slide-gallery-wrapper .site-slide").not(this).removeClass("active");
      $(this).toggleClass("active", !$(this).hasClass("active"));
    });
  }

  // Unslick Slider
  if (window.innerWidth >= 1024) {
    function verticalGrid() {
      if ($.fn.slick) {
        $(".site-custom-image-grid-wrapper .slick-slider").slick('slickSetOption', {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1,
          speed: 9000,
          pauseOnHover: true,
          cssEase: 'linear',
          vertical: true,
          verticalSwiping: true,
          centerMode: true,
          centerPadding: '250px',
        });

        $('.site-custom-image-grid-wrapper .slick-slider').slick('refresh')
      }
    }

    verticalGrid();
  }

  // Unslick Desktop only
  if (window.innerWidth >= 1024) {
    $('.site-custom-number-gallery-wrapper .slick-slider').slick('unslick');
  }

  // Adaptive Height
  if ($(window).width() <= 600) {
    $(".site-custom-number-gallery-wrapper .slick-slider").slick('slickSetOption', {
      adaptiveHeight: true
    });
  }

  // Number Gallery move caption
  if ($(".site-custom-number-gallery-wrapper").length && $(window).width() >= 1024) {
    document.querySelectorAll('.site-custom-number-gallery-wrapper .site-slide').forEach(slide => {
      const imageBlock = slide.querySelector('.site-slider-image-block .site-slider-image');
      const captionBlock = slide.querySelector('.site-slider-caption-block');

      if (imageBlock && captionBlock) {
        const imageHeight = imageBlock.offsetHeight;
        const captionHeight = captionBlock.offsetHeight;

        captionBlock.style.top = `-${imageHeight + captionHeight}px`;
      }
    });
  }

  // Campus Map
  function hotspotMap() {
    $(".site-hotspots").each(function () {
      let map_wrapper = $(this);
      let img = map_wrapper.find("> p > img");
      let table = map_wrapper.find(" > table");
      img.wrap('<div class="map" />');

      img.attr("usemap", "#image-map");
      img.mapster({
        fillOpacity: 0,
        staticState: true,
        render_highlight: {
          fillOpacity: 0,
        },
        scaleMap: true,
      });

      let table_count = 0;

      table.each(function (index) {
        table_count++;

        $(this).attr("data-table-popup", table_count);
        $(this).prepend('<span class="close" />');
      });

      function position_shapes() {
        let areas = "";

        areas = map_wrapper.find("map[name='image-map'] > area");

        // Clear existing divs before repositioning
        map_wrapper.find(".shape-container").remove();
        table.removeClass("active");
        if ($(window).width() < 600) {
          table.find(" > tbody").slideUp();
        }

        let area_count = 0;
        areas.each(function (index) {
          area_count++;
          var area = $(this);

          var coords = area
            .attr("coords")
            .split(",")
            .map((coord) => parseInt(coord));
          var areaName = area.attr("title");

          // Create a div element
          var button = $("<button>");
          button.addClass("shape-container");
          button.addClass(areaName);

          // Set position and size
          button.css({
            position: "absolute",
            top: coords[1] - coords[2] + "px",
            left: coords[0] - coords[2] + "px",
          });

          button.attr("data-popup", area_count);

          // Set additional styles based on shape type
          button.width(coords[2] * 5);
          button.height(coords[2] * 5);

          // Add a title span
          var span = $("<span>");
          span.text(areaName);

          span.addClass("shape-title");
          button.append(span);

          button.append(
            '<span class="shape-counter">' + area_count + "</span>"
          );

          // Append the div to the map
          map_wrapper.find(".map").append(button);

          // Attach a click event to the new div
          button.click(function (event) {
            $(".shape-container").removeClass("active");
            $(this).addClass("active");

            if (body.hasClass(bodyEdit)) {
              alert(
                "table " +
                button.attr("data-popup") +
                " show when you click this point"
              );
            }

            table.removeClass("active");

            map_wrapper
              .find('[data-table-popup="' + $(this).attr("data-popup") + '"]')
              .addClass("active");

            if ($(window).width() < 600) {
              table.find(" > tbody").slideUp();

              map_wrapper
                .find(
                  ' [data-table-popup="' +
                  $(this).attr("data-popup") +
                  '"] > tbody'
                )
                .stop()
                .slideUp();
              map_wrapper
                .find(
                  '> [data-table-popup="' +
                  $(this).attr("data-popup") +
                  '"] > tbody'
                )
                //  .addClass("test");
                .slideDown();

              setTimeout(function () {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: {
                    y: "table.active",
                    offsetY: 150,
                  },

                  delay: 0.5,
                });
              }, 400);
            }
          });

          table.find(" > .close").click(function (event) {
            $(this).parent().removeClass("active");
            $(".shape-container").removeClass("active");
          });
        });

        if (body.hasClass(bodyEdit)) {
          let button_total = map_wrapper.find($(".shape-container")).length / 2;

          map_wrapper
            .find(
              $(".shape-container:nth-child(1n+" + (button_total + 2) + ")")
            )
            .remove();
        }
      }

      setTimeout(() => {
        position_shapes();
      }, 2000);

      window.addEventListener("resize", position_shapes());
      window.addEventListener("load", position_shapes());

      table.each(function (index) {
        if ($(window).width() < 600) {
          //  $('.map').insertBefore()
          $(this).prepend("<th />");
          $(this)
            .find("> tbody > tr > td > h6")
            .detach()
            .prependTo($(this).find("> th "));

          $(this).find("> tbody").hide();

          $(this)
            .find("> th")
            .click(function (e) {
              //   $(this).parent().find("> tbody").slideToggle();
              let table_id = $(this).parent().attr("data-table-popup");

              if ($(this).parent().hasClass("active")) {
                $(this).parent().find("> tbody").slideUp();
                $(this).parent().removeClass("active");
                map_wrapper
                  .find('.shape-container[data-popup="' + table_id + '"]')
                  .removeClass("active");
              } else {
                table.removeClass("active");

                $(this).parent().addClass("active");
                table.find(" > tbody").slideUp();
                $(this).parent().find("> tbody").stop().slideUp();
                $(this).parent().find("> tbody").slideDown();

                $(".shape-container").removeClass("active");
                map_wrapper
                  .find('.shape-container[data-popup="' + table_id + '"]')
                  .addClass("active");

                setTimeout(function () {
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                      y: ".map",
                      offsetY: 150,
                    },

                    delay: 0.5,
                  });
                }, 400);
              }
            });
        } else {
          $(this).find(">tbody").slick({
            dots: false,
            slidesToShow: 1,
            fade: true,
          });
        }
      });
    });
  }

  hotspotMap();

  //integration feature accordion active state
  $(".cms-integration-feature.site-feature-accordion-wrapper").each(
    function () {
      $(this)
        .find(".cms-feature-title")
        .click(function () {
          $(this).toggleClass("active");
        });
    }
  );
  if ($(window).width() < 1100) {
    $(".cms-integration-feature").each(function () {
      $(this)
        .find(".cms-bb-search-block-desc")
        .append('<span class="integration-close" />');

      $(this)
        .find(".cms-bb-search-block-mbl-title")
        .on("click", function (e) {
          $(this).next().toggleClass("cms-bb-search-block-desc-active");
        });

      $(this)
        .find(".integration-close")
        .on("click", function (e) {
          $(this).parent().removeClass("cms-bb-search-block-desc-active");
        });
    });
  }

  $(".site-bb-directory-grid").each(function () {
    if ($(window).width() < 1100) {
      $(this)
        .find(".cms-bb-search-block-mbl-title")
        .on("click", function (e) {
          $(this).next().toggleClass("cms-bb-search-block-desc-active");
        });
      $(this).find(".integration-close").remove();
    }

    $(this).find(".cms-bb-directory-phone-Business_College").replaceWith("P: ");
    $(this)
      .find(".cms-bb-directory-desc-wrapper")
      .each(function () {
        $(this)
          .find(
            ".cms-bb-directory-employment-appointed-year, .cms-bb-directory-employment-departments, .cms-bb-directory-education, .cms-bb-directory-personal-bio, .description-wrap"
          )
          .wrapAll("<div class='description-wrap'></div>");

        $(this).find(".description-wrap").hide();

        $(this)
          .find(".cms-bb-directory-job-title")
          .append(
            "<p class='int-read-more' style='margin-top:15px; cursor:pointer;'>Read more</p>"
          );

        $(this)
          .find(".int-read-more")
          .on("click", function (e) {
            $(this).text(
              $(this).text() == "Read less" ? "Read more" : "Read less"
            );
            $(this)
              .parents(".cms-bb-directory-desc")
              .find(".description-wrap")
              .slideToggle();
          });

        ScrollTrigger.refresh();
      });
  });

  // athletic pagingation scroll to
  function athletic_pagination() {
    $(
      "body:not(.cms-page-is-in-edit-mode) .cms-integration-feature-wrapper a.site-page-link"
    ).click(function (event) {
      let clicked = $(this);

      let wrapper = clicked.parents(".cms-feature-wrapper");
      location.href = location.href + "&scroll=" + wrapper.attr("id");
    });

    let scroll_query = new URLSearchParams(window.location.search).get(
      "scroll"
    );

    if (scroll_query != null) {
      //alert(scroll_query);
      let scrolled_feature = $("#" + scroll_query);
      scrolled_feature.addClass("site-feature-accordion-active");
      scrolled_feature.find(".cms-feature-title").addClass("active");

      setTimeout(function () {
        scrolled_feature.find(".site-feature-accordion").slideDown();
      }, 100);

      $("html, body").animate(
        {
          scrollTop: $(scrolled_feature).offset().top - 75,
        },
        2000
      );
    }
  }
  athletic_pagination();

  if (window.innerWidth >= 1024) {
    // Site Wide Animations
    if (!$('body').hasClass('cms-page-is-in-edit-mode') && ($('body').hasClass('home-page') || $('body').hasClass('landing-page'))) {

      // Check if there's a hash in the URL
      const hasHashInUrl = window.location.hash;

      if (!hasHashInUrl) {
        // Galleries
        $('.site-custom-number-gallery-wrapper .site-slick-wrapper').children().each(function (index) {
          $(this).attr('data-aos', 'fade-up').attr('data-aos-delay', (index + 1) * 100);
        });

        $('.site-custom-slide-gallery-wrapper .slick-track').children().each(function (index) {
          $(this).attr('data-aos', 'fade-up').attr('data-aos-delay', (index + 1) * 100);
        });

        $('.site-custom-team-gallery-wrapper .site-slick-wrapper').children().each(function (index) {
          $(this).attr('data-aos', 'fade-up').attr('data-aos-delay', '100');
        });

        $('.site-custom-image-grid-wrapper').each(function (index) {
          $(this).attr('data-aos', 'fade-up').attr('data-aos-delay', (index + 1) * 100);
        });

        $('.site-desktop-width-50-wrapper').attr('data-aos', 'fade-up').attr('data-aos-delay', '200');
        $('.site-custom-cutout-image-wrapper .slick-slide').attr('data-aos', 'fade-up').attr('data-aos-delay', '200');

        // Text 
        $('.cms-text-feature.site-custom-red-header-wrapper').attr('data-aos', 'fade-down').attr('data-aos-delay', '200');
        $('.site-custom-tab-text-wrapper').attr('data-aos', 'fade-down').attr('data-aos-delay', '200');


        // Custom
        $('.site-custom-fade-wrapper').attr('data-aos', 'fade').attr('data-aos-delay', '200');
        $('.site-custom-fade-up-wrapper').attr('data-aos', 'fade-up').attr('data-aos-delay', '200');
        $('.site-custom-fade-down-wrapper').attr('data-aos', 'fade-down').attr('data-aos-delay', '200');
      }

      setTimeout(function () {
        AOS.init({
          duration: 500,
          once: true,
        });
      }, 100);
    }

    if (document.body.classList.contains('home-page') || document.body.classList.contains('landing-page')) {
      const elementsToObserve = document.querySelectorAll('[data-aos]');
      const hasHashInUrl = window.location.hash;

      if (window.innerWidth >= 1280 && !hasHashInUrl) {
        setTimeout(() => {
          elementsToObserve.forEach(element => {
            element.classList.remove('aos-animate');
          });
        }, 200);
      }

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains('aos-animate')) {
              entry.target.classList.add('aos-animate');
            }
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
      });

      elementsToObserve.forEach(element => {
        observer.observe(element);
      });
    }
  }
});