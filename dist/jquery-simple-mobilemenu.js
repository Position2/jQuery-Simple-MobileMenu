/**
* JQuery Simple MobileMenu
* Copyright (c) 2017 Position2 Inc.
* Licensed under MIT (http://opensource.org/licenses/MIT)
* https://github.com/Position2/jQuery-Simple-MobileMenu
*/
(function($) {
  var defaults = {  
                    "hamburgerId"   : "sm_menu_ham", //Hamburger Id
                    "wrapperClass"  : "sm_menu_outer", //Menu Wrapper Class
                    "submenuClass"  : "submenu", //Submenu Class
                    "onMenuLoad"    : function() { return true; }, //Calls when menu loaded
                    "onMenuToggle"  : function() { return true; } //Calls when menu open/close
                  };
  $.fn.slideMobileMenu = function(options) {
    if (this.length === 0) { return this; }
    var smMenu = {}, ds = $(this);
    var init = function() {
          smMenu.settings = $.extend({}, defaults, options);
          // Create Wrapper div & hamburger
          createWrapper_Ham();
          // Create Back Menu for each sub menu
          createBackButton();
          // Callback - Menu loaded
          if(typeof smMenu.settings.onMenuLoad == 'function') {
            smMenu.settings.onMenuLoad(ds);
          }
        },
        createWrapper_Ham = function() {
          smMenu.hamburger = $("<div/>",{ "id"   : smMenu.settings.hamburgerId,
                                          "html" : "<span></span><span></span><span></span><span></span>" }),
          smMenu.smmOuter = $("<div/>",{ "class" : smMenu.settings.wrapperClass });
          ds.appendTo(smMenu.smmOuter);
          smMenu.hamburger.add(smMenu.smmOuter).appendTo($("body"));
        },
        createBackButton = function() {
          smMenu.smmOuter.find("ul."+smMenu.settings.submenuClass).each(function() {
            var dis     = $(this),
                disPar  = dis.closest("li"),
                disfA   = disPar.find("> a"),
                disBack = $("<li/>",{ 
                              "class" : "back",
                              "html"  : "<a href='#'>"+disfA.text()+"</a>" })
            disPar.addClass("hasChild");
            disBack.prependTo(dis);
          });
        },
        toggleMobileMenu = function(e) {
          $("#"+smMenu.settings.hamburgerId).toggleClass("open");
          $("."+smMenu.settings.wrapperClass).toggleClass("active").find("li.active").removeClass("active");
          $("body").toggleClass("mmactive");
          // Callback - Menu Toggle
          if(typeof smMenu.settings.onMenuToggle == 'function') {
            smMenu.settings.onMenuToggle(ds,$("#"+smMenu.settings.hamburgerId).hasClass("open"));
          }
        },
        showSubMenu = function(e) {
          e.preventDefault();
          $("."+smMenu.settings.wrapperClass).scrollTop(0);
          $(this).parent().addClass("active").siblings().removeClass("active");
        },
        goBack = function(e) {
          e.preventDefault();
          $(this).closest("ul."+smMenu.settings.submenuClass).parent().removeClass("active");
        }
    /*Init*/
    init();
    /* Open Menu */
    smMenu.hamburger.click(toggleMobileMenu);
    /* Show SubMenu */
    smMenu.smmOuter.find("li.hasChild > a").click(showSubMenu);
    /* Go Back */
    smMenu.smmOuter.find("li.back a").click(goBack);
  };
})(jQuery)
