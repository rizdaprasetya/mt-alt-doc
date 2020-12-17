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

function accordionLabelTag() {
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

}

