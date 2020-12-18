function getRightSideBarContent() {
  console.log('runn get sidebarrr')
  setTimeout(() => {
    //right sidebar content
    let sideBarSelector = document.getElementById('right-bar-content')
    let sideBarContens = ''
    let getAllTitle = document.querySelectorAll("h2")
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
      console.log('checked and get collaps')
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
    const contents = document.querySelectorAll('h2[id]');
    const navLinks = document.querySelectorAll(".sidebar__right-list");

    console.log('content', contents)
    console.log('navLinks', navLinks)

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

function themeChanger() {
  console.log('theme changer runing')
  // THEME CHANGER
  setTimeout(() => {
    let darkMobile = document.getElementById('dark-mobile')
    let lightMobile = document.getElementById('light-mobile')
    let body = document.getElementsByTagName('body')[0]
    let darkDesktop = document.getElementById('dark-desktop')
    let lightDesktop = document.getElementById('light-desktop')
    if( darkMobile ) {
      darkMobile.addEventListener('click', () => {
          body.classList.remove('theme__light')
          body.classList.add('theme__dark')
          lightMobile.classList.remove('active')
          darkMobile.classList.add('active')
      })
    }
    if( lightMobile ) {
      lightMobile.addEventListener('click', () => {
        body.classList.remove('theme__dark')
        body.classList.add('theme__light')
        lightMobile.classList.add('active')
        darkMobile.classList.remove('active')
      })
    }
    if( darkDesktop ) {
      darkDesktop.addEventListener('click', () => {
        if(body.classList.contains('theme__light')) {
          body.classList.remove('theme__light')
        }
        body.classList.add('theme__dark')
        
        // if(lightMobile.classList.contains('active')){
        //   lightMobile.classList.remove('active')
        // }
        // darkMobile.classList.add('active')
      })
    }
    if( lightDesktop ) {
      lightDesktop.addEventListener('click', () => {
        body.classList.remove('theme__dark')
        body.classList.add('theme__light')
        lightMobile.classList.add('active')
        darkMobile.classList.remove('active')
      })
    }
  }, 180);
  
}
