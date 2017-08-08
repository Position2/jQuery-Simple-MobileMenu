# jQuery-Simple-MobileMenu

A Simple jQuery Plugin for Mobile Menu

Here the steps to configure...

**Step 1 :** Download and link to the Jquery plugin

**Step 2 :** Download and link to the Jquery simpleMobileMenu plugin

**Step 3 :** Fire the jQuery inlinePopup Plugin 
```js
$(document).ready(function(){
  $(".mobile_menu").slideMobileMenu()
});
```

## Plugin Options

*  **submenuClass**<br/>
_Mobile menu submenu class.This class should be there in each submenu UL's_(Default : submenu)
*  **hamburgerId**<br/>
_Mobile menu Hamburger Id._(Default : sm_menu_ham)
*  **wrapperClass**<br/>
_Mobile menu wrapper element class._(Default : sm_menu_outer)

## Callbacks

*  **onMenuLoad**<br/>
_Executes immediately after the mobilemenu is fully loaded.Function argument is the current mobile menu element_
```js
$(".mobile_menu").slideMobileMenu({
  "onMenuLoad" : function(menu) { 
    //onload callback
  }
})
```
*  **onMenuToggle**<br/>
_Executes on mobile menu toggle(open/close).Function argument is the current mobile menu state._
```js
$(".mobile_menu").slideMobileMenu({
  "onMenuToggle" : function(menu,open) { 
    //If opened "open" returns true,otherwise false
  }
})
```
## Getting started

### Include Stylesheet
```html
<link rel="stylesheet" href="dist/css/jquery.simpleMobileMenu.css" />
```

### Include JS
```html
<script src="dist/js/jquery.simpleMobileMenu.min.js"></script>
```

### Setting up HTML
```html
<ul class="mobile_menu">
  <li><a href="menu1.com">Menu 1</a></li>
  <li>
    <a href="menu2.com">Menu 2</a>
    <ul class="submenu">
      <li><a href="submenu1.com">Sub Menu 1</a></li>
      <li>
        <a href="submenu2.com">Sub Menu 2</a>
        <ul class="submenu">
          <li><a href="subsubmenu1.com">Sub Sub Menu 1</a></li>
          <li><a href="subsubmenu2.com">Sub Sub Menu 2</a></li>
          <li><a href="subsubmenu3.com">Sub Sub Menu 3</a></li>
        </ul>
       </li>
      <li><a href="submenu3.com">Sub Menu 3</a></li>
    </ul>
  </li>
  <li><a href="menu3.com">Menu 3</a></li>
</ul>
```

### Setting up JS
```js
$(document).ready(function() {
  $(".mobile_menu").slideMobileMenu({
    //Hamburger Id
    "hamburgerId" : "sm_menu_ham", 
    //Menu Wrapper Class
    "wrapperClass" : "sm_menu_outer", 
    //Submenu Class
    "submenuClass" : "submenu",
    // Callback - Menu loaded 
    "onMenuLoad" : function(menu) {
       console.log("menu loaded")
       console.log(menu)
     },
     //Callback - menu toggle(open/close)
     "onMenuToggle" : function(menu,open) {
       console.log(open)
      }
   });
})
```
