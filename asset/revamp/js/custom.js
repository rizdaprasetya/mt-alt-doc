// Helper to prevent duplicate addEventListener handler 
// src: https://stackoverflow.com/q/64155405
function elementWithOneEventListener(el){
    el.oneEventListener = function(event, func) {
        if(el.lastEventListener == null){
          el.lastEventListener = {};
        }
        if(el.lastEventListener[event] != null){
          el.removeEventListener(event, el.lastEventListener[event]);
        }
        el.addEventListener(event, func);
        el.lastEventListener[event] = func;
    }
    return el;
}
function preventDuplicateListenerProxy(el) {
  if(!(el instanceof NodeList)){
    return elementWithOneEventListener(el);
  }else{
    el.forEach(function(ele) {
      ele = elementWithOneEventListener(ele);
    });
    return el;
  }
}

function generateRightSideBarContent() {
  setTimeout(function() {
    //right sidebar content
    var sideBarSelector = document.getElementById('right-bar-content')
    var sideBarContens = ''
    var getAllTitle = document.querySelectorAll("h2,h3")

    if(getAllTitle.length == 0) {
      getAllTitle = document.querySelectorAll("h1");
    }

    if(getAllTitle) {
      getAllTitle.forEach(function(element) {
        var titleText = element.innerText
        var titleId = element.id
        var linkPrefix = ""
        if(window.willUseDocsifyHashRouter){
          try {
            linkPrefix = ((window.location.href).split('?id='))[0]
          } catch(e) { }
        }

        if(titleId) {
          sideBarContens += '<li class="sidebar__right-list '+ element.localName  +'"><a href="'+ linkPrefix +'?id='+ titleId +'" class="sidebar__right-link sidebar__right-link--active">'+ titleText +'</a></li>'
        }
      });

      if(sideBarSelector) {
        sideBarSelector.innerHTML = sideBarContens
      }
    } 
  }, 150);
}

// for accordion icon (rotate icon) on click
// @TODO: optimize this to prevent duplicated listener
function applyAccordionLabelTagListener() {
  setTimeout(function() {
    var accordionLabelSelector = document.querySelectorAll('.collaps-label')
    if( accordionLabelSelector ) {
      accordionLabelSelector.forEach(function(element) {
        element.addEventListener('click', function() {
          if( element.classList.contains('open') ) {
            element.classList.remove('open')
          }else {
            element.classList.add('open')
          }
        });
      });
    }
  }, 50);
}

// add active to right side menus on scroll
function activateRightMenuOnScroll() {
  setTimeout(function() {
    var contents = document.querySelectorAll('h2[id], h3[id]');
    var navLinks = document.querySelectorAll(".sidebar__right-list");

    if(contents.length == 0) {
      contents = document.querySelectorAll('h1[id]');
    }
    if(!contents.length || !navLinks.length) { return 0; } //exit if no element found

    var contentLength = contents.length;
    // @fixed: scroll event listener is added on EACH navigation, BAD!
    windowProxyEl = preventDuplicateListenerProxy(window);
    windowProxyEl.oneEventListener("scroll", function (event) {
      event.preventDefault();
      var scrollPos =
        (window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0) + 100;
      var contentsTop = [];
      contents.forEach(function(content, index) {
        contentsTop.push(content.offsetTop);
      });

      contentsTop.forEach(function(contentTop, index) {
        if (index + 1 < contentLength) {
          if (
            scrollPos > contentTop &&
            scrollPos < contentsTop[index + 1] &&
            !navLinks[index].classList.contains("active")
          ) {
            navLinks[index].classList.add("active");
            navLinks[index].scrollIntoView({ block: 'center' });
          } else if (
            scrollPos > contentsTop[index + 1] &&
            navLinks[index].classList.contains("active")
          ) {
            navLinks[index].classList.remove("active");
          } else if (
            scrollPos <= contentTop &&
            navLinks[index].classList.contains("active") &&
            index !== 0
          ) {
            navLinks[index].classList.remove("active");
          }
        } else {
          if (
            scrollPos > contentTop &&
            !navLinks[index].classList.contains("active")
          ) {
            navLinks[index].classList.add("active");
            navLinks[index].scrollIntoView({ block: 'center' });
          } else if (
            scrollPos <= contentTop &&
            navLinks[index].classList.contains("active")
          ) {
            navLinks[index].classList.remove("active");
          }
        }
      });
    });
  }, 170);
  
}

// THEME CHANGER
function applySavedTheme() { // check from localstorage
  //check localstorage
  if(localStorage.getItem('theme') == 'dark') {
    document.getElementsByTagName('body')[0].classList.add('theme__dark')
    var checkboxThemeEl = document.querySelectorAll('.checkbox-theme')
    if(checkboxThemeEl) {
      checkboxThemeEl.forEach(function(element) {
        element.checked = true;
      });
    }
    
    replaceLogoImageDarkMode('dark')
    
  }
}
function changeTheme(param) {
  var body = document.getElementsByTagName('body')[0]
  var checkboxThemeEl = document.querySelectorAll('.checkbox-theme')
  if(!localStorage.getItem('theme')) { // set to dark mode
    replaceLogoImageDarkMode('dark')
    if(body.classList.contains('theme__light')) {
      body.classList.remove('theme__light')
    }
    body.classList.add('theme__dark')
    //store to local storage
    localStorage.setItem('theme', 'dark')
    
  } else if(localStorage.getItem('theme') == 'dark') { // set to light mode
    replaceLogoImageDarkMode('light')
    if(checkboxThemeEl) {
      checkboxThemeEl.forEach(function(element) {
        element.checked = false;
      });
    }
    body.classList.remove('theme__dark')
    //remove local storage
    localStorage.removeItem('theme')
  } else {
    return false
  }
  
}

function replaceLogoImageDarkMode(theme) {
  setTimeout(function() {
    //replace all midtrans logo to white
    var getAllImg = document.querySelectorAll('img')
    if(getAllImg) {
      getAllImg.forEach(function(element) {
        var checkSrc = theme == 'dark' ? "midtrans-logo.png" : "midtrans-logo-white.png";
        if(element.currentSrc.indexOf(checkSrc) !== -1 || element.currentSrc.includes(checkSrc)) {
          element.src = theme == 'dark' ? 
            element.src.replace("midtrans-logo.png", "midtrans-logo-white.png") : 
            element.src.replace("midtrans-logo-white.png", "midtrans-logo.png")
        }
      });
    }
  }, 500);
}
