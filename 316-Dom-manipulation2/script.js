const menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
        {text: 'all', href: '/catalog/all'},
        {text: 'top selling', href: '/catalog/top' },
        {text: 'search', href: '/catalog/search'},
      ]},
    {text: 'orders', href: '#' , subLinks: [
        {text: 'new', href: '/orders/new'},
        {text: 'pending', href: '/orders/pending' },
        {text: 'history', href: '/orders/history'},
      ]},
    {text: 'account', href: '#', subLinks: [
        {text: 'profile', href: '/account/profile'},
        {text: 'sign out', href: '/account/signout'},
     ]},
  ];
  
  //Main Menu
  let mainEl = document.querySelector("main");
  mainEl.style.backgroundColor = "var(--main-bg)";
  mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
  mainEl.classList.add("flex-ctr");
  
  
  // Top Menu
  let topMenuEl = document.getElementById("top-menu");
  console.log("top-menu element: ", topMenuEl);
  topMenuEl.style.height = "100%";
  topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
  topMenuEl.classList.add("flex-around");
  
  
  // Sub Menu
  const subMenuEl = document.getElementById("sub-menu");
  console.log("sub-menu element: ", subMenuEl);
  subMenuEl.style.height = "100%";
  subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
  subMenuEl.classList.add("flex-around");
  subMenuEl.style.position = "absolute";
  subMenuEl.style.top = "0";
  
  
  //Top Menu Links
  for (let i = 0; i < menuLinks.length; i++) {
    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", menuLinks[i].href);
    linkElement.textContent = menuLinks[i].text;
    topMenuEl.appendChild(linkElement);
  }
  
  
  
  // Menu Event Links
  let topMenuLinks = topMenuEl.querySelectorAll("a");
  const submenuStates = {};
  topMenuEl.addEventListener("click", function(event) {
    event.preventDefault();
    if(!event.target.matches("a")) {
      return;
    }
    const clickedLink = event.target;
    topMenuLinks.forEach((link) => {
      link.classList.remove("active");
    });
  
    clickedLink.classList.toggle("active");
  
    const clickedLinkObject = menuLinks.find((linkObject) => linkObject.text === clickedLink.textContent);
   
    if (clickedLinkObject && clickedLinkObject.subLinks) {
      if (submenuStates[clickedLinkObject.text]) {
        subMenuEl.style.top = "0";  
        subMenuEl.innerHTML = ''; 
        submenuStates[clickedLinkObject.text] = false;
      } else {
        subMenuEl.style.top = "100%"; 
        buildSubmenu(clickedLinkObject.subLinks);
        submenuStates[clickedLinkObject.text] = true;
      }
    } else {
      subMenuEl.style.top = "0";
      subMenuEl.innerHTML = ''; 
    }
  
    if (event.target.textContent === "about") {
      mainEl.innerHTML = "<h1>About</h1>";
    } else {
      mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
    }
    // Log content of <a> to verify the handler is working.
    console.log("Clicked link text: ", event.target.textContent);
  })
  
  
  //Submenu Links
  function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = '';
    for (let link of subLinks) {
      let subLinkElement = document.createElement("a");
      subLinkElement.setAttribute("href", link.href);
      subLinkElement.textContent = link.text;
      subMenuEl.appendChild(subLinkElement);
    }
  }
  
  //Event Elements
  subMenuEl.addEventListener("click", (event) => {
    event.preventDefault();
    if(!event.target.matches("a")) {
      return;
    }
    subMenuEl.style.top = "0";
    topMenuLinks.forEach((link) => {
      link.classList.remove("active");
    });
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
  
    // Log content of <a> to verify the handler is working.
    console.log("Clicked link text: ", event.target.textContent);
  })
  