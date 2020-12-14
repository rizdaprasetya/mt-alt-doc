
setTimeout(() => {

  console.log('running')
  //right sidebar content
  let sideBarSelector = document.getElementById('right-bar-content')
  let sideBarContens = ''
  let getAllTitle = document.querySelectorAll("h2")
  if(getAllTitle) {
    console.log('getalltitle', getAllTitle)
    getAllTitle.forEach(element => {
      let titleText = element.innerText
      let titleId = element.id
      if(titleId) {
        sideBarContens += '<li class="sidebar__right-list"><a href="?id='+ titleId +'" class="sidebar__right-link sidebar__right-link--active">'+ titleText +'</a></li>'
      }
      

    });

    console.log('hasil', sideBarContens)
    if(sideBarSelector) {
      sideBarSelector.innerHTML = sideBarContens
    }
  }
}, 150);



