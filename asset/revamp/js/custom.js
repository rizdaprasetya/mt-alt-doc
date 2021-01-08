function getRightSideBarContent() {
  setTimeout(() => {
    //right sidebar content
    let sideBarSelector = document.getElementById('right-bar-content')
    let sideBarContens = ''
    let getAllTitle = document.querySelectorAll("h2")

    if(getAllTitle.length == 0) {
      getAllTitle = document.querySelectorAll("h1");
    }

    if(getAllTitle) {
      getAllTitle.forEach(element => {
        let titleText = element.innerText
        let titleId = element.id
        if(titleId) {
          sideBarContens += '<li class="sidebar__right-list"><a href="?id='+ titleId +'" class="sidebar__right-link sidebar__right-link--active">'+ titleText +'</a></li>'
        }
      });

      if(sideBarSelector) {
        sideBarSelector.innerHTML = sideBarContens
      }
    } 
  }, 150);
}

// for accordion icon (rotate icon) on click
function accordionLabelTag() {
  setTimeout(() => {
    let accordionLabelSelector = document.querySelectorAll('.collaps-label')
    if( accordionLabelSelector ) {
      accordionLabelSelector.forEach(element => {
        element.addEventListener('click', () => {
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
function rightMenusActiveScroll() {
  setTimeout(() => {
    let contents = document.querySelectorAll('h2[id]');
    const navLinks = document.querySelectorAll(".sidebar__right-list");

    if(contents.length == 0) {
      contents = document.querySelectorAll('h1[id]');
    }

    const contentLength = contents.length;
    window.addEventListener("scroll", function (event) {
      event.preventDefault();
      const scrollPos =
        (window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0) + 100;
      let contentsTop = [];
      contents.forEach((content, index) => {
        contentsTop.push(content.offsetTop);
      });

      contentsTop.forEach((contentTop, index) => {
        if (index + 1 < contentLength) {
          if (
            scrollPos > contentTop &&
            scrollPos < contentsTop[index + 1] &&
            !navLinks[index].classList.contains("active")
          ) {
            navLinks[index].classList.add("active");
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
// DROPDOWN
function dropDownTopNav() {
  setTimeout(() => {
    let drpdwn = document.getElementsByClassName('dropdown')
    for (let j = 0; j < drpdwn.length; j++) {
        drpdwn[j].addEventListener('click', () => {
            drpdwn[j].classList.toggle('dropdown-active')
            let panel = drpdwn[j].lastElementChild
            if (panel.style.display === 'flex') {
                panel.style.display = 'none'
            } else {
                panel.style.display = 'flex'
                panel.style.flexDirection = 'column'
            }
        })
    }
    window.onclick = (event) => {
        if (!event.target.matches('.dropdown__button')) {
            let dropdowns = document.getElementsByClassName("dropdown")
            for (let k = 0; k < dropdowns.length; k++) {
                let openDropdown = dropdowns[k].lastElementChild;
                if (openDropdown.style.display === 'flex') {
                  dropdowns[k].classList.remove('dropdown-active')
                  openDropdown.style.display = 'none'
                }
            }
        }
    }
  }, 50);
}

// THEME CHANGER
function themeChanger() { // check from localstorage
  //check localstorage
  if(localStorage.getItem('theme') == 'dark') {
    document.getElementsByTagName('body')[0].classList.add('theme__dark')
    let checkboxThemeEl = document.querySelectorAll('.checkbox-theme')
    if(checkboxThemeEl) {
      checkboxThemeEl.forEach(element => {
        element.checked = true;
      });
    }
    
    replaceLogoImageDarkMode('dark')
    
  }
}
function changeTheme(param) {
  let body = document.getElementsByTagName('body')[0]
  let checkboxThemeEl = document.querySelectorAll('.checkbox-theme')
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
      checkboxThemeEl.forEach(element => {
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

//search mobile
function searchMob() {
  let getNavEl = document.querySelector('nav.app-nav')
  if(getNavEl) {
    if(getNavEl.classList.contains('active-search-mob')) {
      getNavEl.classList.remove('active-search-mob')
    }else {
      getNavEl.classList.add('active-search-mob')
      //focus to input
      const searchInput = document.querySelector('input[type="search"]')
      if(searchInput) {
        searchInput.focus()
      }
      //close when click outside elemen
      let mainEl = document.querySelector('main')
      mainEl.addEventListener('click', function(event) {
          getNavEl.classList.remove('active-search-mob')
      });
    }
  }
}

//show menus mobile
function showMenusMob() {
  let mainEl = document.querySelector('main')
  let overlay = document.querySelector('.overlay')
  if(mainEl) {
    if(mainEl.classList.contains('show-menu-mob')) {
      mainEl.classList.remove('show-menu-mob')
      if(overlay) {
        overlay.classList.remove('active')
      }
    }else {
      mainEl.classList.add('show-menu-mob')
      if(overlay) {
        overlay.classList.add('active')
      }

      //close menus
      overlay.addEventListener('click', function(event) {
          //the click was outside the specifiedElement, do something
        if(mainEl.classList.contains('show-menu-mob')) {
          mainEl.classList.remove('show-menu-mob')
          if(overlay) {
            overlay.classList.remove('active')
          }
        }
      });
    }
  }
}

function getCurrentPageTitle() {
  let selectorMob = document.getElementById('current-menu-mob')
  const docTitle = document.title
  if(selectorMob) {
    selectorMob.innerHTML = docTitle
  }
}

function replaceLogoImageDarkMode(theme) {
  setTimeout(() => {
    //replace all midtrans logo to white
    let getAllImg = document.querySelectorAll('img')
    if(getAllImg) {
      getAllImg.forEach(element => {
        let checkSrc = theme == 'dark' ? "midtrans-logo.png" : "midtrans-logo-white.png";
        if(element.currentSrc.indexOf(checkSrc) !== -1 || element.currentSrc.includes(checkSrc)) {
          // console.log('running', element)
          element.src = theme == 'dark' ? "/asset/revamp/img/midtrans-logo-white.png" : "/asset/image/main/midtrans-logo.png"
          // console.log(element.src,"element.src")
        }
      });
    }
  }, 100);
  
}
