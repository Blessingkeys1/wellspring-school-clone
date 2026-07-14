// TODO bundle and minification:
// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

//TODO: MOVE CODE THAT WILL ONLY AFFECT THE ADMIN areas and the Admin Top Toolbar.

/*
$(function () {
    console.log("location: " + window.location.href)


    // Code to get normal URL

    var url = window.location.href, // in real app this would have to be replaced with window.location.pathname
        urlRegExp = new RegExp(url.replace(/\/$/, '')); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
    var path = window.location.pathname.split("/").pop();



    // Code to get URL with parameters

    var param_url = new URL(window.location.href);
    param_url.search = ''; // set search property to blank
    var new_param_url = param_url.toString();

    console.log("new_param_url: " + new_param_url);  // output : new URL without parameters
    console.log("new_param_url_last: " + new_param_url.split("/").pop());  // output : new URL without parameters


    // now grab every link from the navigation
    $('.nav-data li a').each(function () {
        // and test its href against the url pathname regexp

        var param_href = this.href;

        if (urlRegExp.test(this.href) && path == this.href.split("/").pop()) {
            $(this).addClass('active-nav');

            console.log("urlRegExp.test(this.href): " + urlRegExp.test(this.href))
            console.log("this.href.split(' / ').pop(): " + this.href.split("/").pop());
            console.log("path: " + path);

            return false;
        }

    });

});
*/


$(document).ready(function () {
    $(".header-option-block").click(function () {
        $(".front-action-wrapper").slideToggle('slow');
        $(".front-option-block").toggleClass("active-front-option-block");

        $(".front-action-wrapper").toggleClass("active-frontend-action-wrapper");
        $(".front-action-wrapper").toggleClass("active-frontend-option-wrapper");
        //$(".front-option-block").addClass("active-front-option-block");
        //$(".front-action-wrapper").slideDown("slow");
    });

    //$(".header-reponsive-option").click(function () {
    //    $(".front-action-wrapper").slideUp();
    //    $(".front-option-block").removeClass("active-front-option-block");
    //    $(".front-action-wrapper").removeClass("active-frontend-option-wrapper");

    //    $(".front-action-wrapper").addClass("active-frontend-action-wrapper");
    //    $(".front-responsive-option").addClass("active-front-responsive-option");
    //    $(".front-action-wrapper").slideDown("slow");
    //});

    $(".front-action-wrapper .front-action-wrapper-close i").click(function () {
        $(".front-action-wrapper").slideUp();
        $(".front-action-wrapper").removeClass("active-frontend-action-wrapper");
        $(".front-option-block").removeClass("active-front-option-block");
        $(".front-responsive-option").removeClass("active-front-responsive-option");
        $(".front-action-wrapper").removeClass("active-frontend-option-wrapper");
    });

    $(".nav-edit-website a").addClass('active-nav');
    $(".nav-block.cms-nav-block").addClass("active-nav-block");
    $(".nav-block.cms-nav-block .nav-data").show();
    $(".nav-block.cms-nav-block .nav-title").addClass("active-nav-title");


    $(".cms-feature-option-button").click(function () {
        $(this).toggleClass("cms-feature-option-button-active");

        $(this).parents(".cms-feature-bar").next(".cms-feature-options").toggleClass("cms-feature-options-active")
        $(this).parents(".cms-feature-bar").next(".cms-feature-options").slideToggle("cms-feature-options-active")
    });
});

var $activeFeature = null;
var featureBarTimer;

function featureBarPosition($feature) {
    var $bar = $feature.find('.cms-feature-block');
    if (!$bar.length) return;

    var offset = $feature.offset();

    var barWidth = parseInt($bar.css('width'), 10);
    var nearBottom = offset.top > $(window).innerHeight() + $(window).scrollTop() - 470;
    var nearRightEdge = offset.left + barWidth > $(window).innerWidth() + $(window).scrollLeft();

    $bar.toggleClass('dropup', nearBottom)
        .toggleClass('dropleft', nearRightEdge);
}

if ($('body').hasClass('cms-page-is-in-edit-mode')) {
    $(document)
        .on('mouseenter', '.featureMainDiv', function () {
            $activeFeature = $(this);
            featureBarPosition($activeFeature);
        })
        .on('mouseleave', '.featureMainDiv', function () {
            $activeFeature = null;
        });

    $(window).on('scroll resize', function () {
        if (!$activeFeature) return;

        clearTimeout(featureBarTimer);
        featureBarTimer = setTimeout(function () {
            if ($activeFeature) featureBarPosition($activeFeature);
        }, 50);
    });
}