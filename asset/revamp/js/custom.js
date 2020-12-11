//remove sidebarSearch
setTimeout(() => {
  let sidebarSearch = document.querySelector(".search");
  
  console.log("siderbar search", sidebarSearch);
  if (sidebarSearch) {
    sidebarSearch.remove();
  }
  console.log('sidebar',sidebarSearch)


  

}, 50);



