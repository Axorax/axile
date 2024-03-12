/*  ©️ 2023 - Axile
 *  Coded by - Axorax
 *  Support - https://patreon.com/axorax/
 */

const winOrigin = window.origin;

function createLoaderTopBar() {
  const loaderTopBar = `
    <div class="bar"></div>
    <!-- <div class="spinner-border"></div> -->
    `;

  const loaderTopBarElement = document.createElement("div");
  loaderTopBarElement.classList.add("loading-top-bar");
  loaderTopBarElement.innerHTML = loaderTopBar;
  document.querySelector("body").prepend(loaderTopBarElement);
}

createLoaderTopBar();

const loaderTopBar__Bar = document.querySelector(".loading-top-bar .bar");
setTimeout(() => {
  loaderTopBar__Bar.style.width = String((Math.random() * 60) | 0) + "%";
}, 1);

window.addEventListener(
  "load",
  () => {
    setTimeout(() => {
      loaderTopBar__Bar.style.width = "100%";
    }, 10);
    setTimeout(() => {
      document.querySelector(".loading-top-bar").remove();
    }, 200);
  },
  { once: true }
);

let fileInAnotherFolder = false;
const DEFAULT_SEARCH_CONTENT_BOX_ITEMS = `
<li><a href="https://axorax.github.io/axile/tag?tag=discord">#discord</a></li>
<li><a href="https://axorax.github.io/axile/tag?tag=math">#math</a></li>
<li><a href="https://axorax.github.io/axile/tag?tag=science">#science</a></li>
<li><a href="https://axorax.github.io/axile/tag?tag=chemistry">#chemistry</a></li>
<li><a href="https://axorax.github.io/axile/tag?tag=greek">#greek</a></li>
<li>...</li>`;
const NAV_DONATE_CONTENT = `
<div class="flex-col-wrap-1" style="gap:1rem"><a href="//patreon.com" target="_blank"><button class="button-3">Patreon</button></a>
<a href="//zink.tips/axorax" target="_blank"><button class="button-3">Zink</button></a>
</div>`;

function loadNavigation(fileStructure = "d") {
  if (fileStructure == "d") {
    const navTemplate = `
    <nav class="">
        <a href="index.html"><img src="assets/img/axile.svg" alt="Axile Logo" id="nav-logo"></a>
        <button class="nav-menu-close" onclick="navMenuToggle();"><img src="assets/img/cancel.svg" alt="Close Menu"></button>
        <ul id="nav-ul-1">
            <!-- <li><a href=""><button>Authors</button></a></li> -->
            <li><a href="tag.html?tag=" id="tags"><button>Tags</button></a></li>
            <li><a href="tools.html" id="tools"><button>Tools</button></a></li>
            <!-- <li><a href=""><button>Contact</button></a></li> -->
            <li><button id="nav-more">More <img src="assets/img/arrow_down.svg" alt="Expand More"></button></li>
            <div class="nav-more-content" style="display: none;">
                <!-- <a href=""><button>Privacy Policy</button></a> -->
                <a href="metatagmakerforaxile.html"><button>Meta Maker</button></a>
                <a href="publishDate.html"><button>Publish Date</button></a>
                <a href="chat.html"><button>Chat</button></a>
                <a href="writer.html"><button>Write for us</button></a>
            </div>
        </ul>
        <ul class="nav-extra">
        </ul>
        <ul class="right">
            <li><button id="nav-search" onclick="navSearchToggle();"><img src="assets/img/search.svg" alt="Search Articles"></button></li>
            <li><button id="nav-menu" onclick="navMenuToggle();"><img src="assets/img/menu.svg" alt="Navigation Menu"></button></li>
            <li><button id="nav-support" onclick="navDonatePopupFun()">Donate</button></li>
        </ul>
    </nav>

<div class="nav-search-content">
    <div class="nav-searchBar">
        <input type="search" placeholder="Search...">
    </div>
    <div class="options">
        <button class="filter" onclick="navSearchFilterToggle()"><img src="assets/img/tune.svg" alt="Filter"> FILTER</button>
        <p class="box-title">✨ Popular Tags</p>
        <ul class="box">
        ${DEFAULT_SEARCH_CONTENT_BOX_ITEMS}
        </ul>
    </div>
    <div class="results"></div>
</div>`;

    const navDiv = document.createElement("div");
    navDiv.innerHTML = navTemplate;
    document.body.prepend(navDiv);
    navDiv.replaceWith(...navDiv.childNodes);
  } else if (fileStructure == "prevent") {
    document.querySelector("nav").remove();
    document.querySelector("div.nav-search-content").remove();
    return;
  } else {
    fileInAnotherFolder = true;
    document.querySelector("nav > a").href = "../index.html";
    document.querySelectorAll("nav img").forEach((e) => {
      e.src = (`${winOrigin}${e.src}`)
        .replace(winOrigin, '')
        .replace("/a/", "/")
        .replace("/t/", "/")
        .replace("/author/", "/");
    });
    document.querySelector("#nav-ul-1 #tags").href = "../tag.html";
    document.querySelector("#nav-ul-1 #tools").href = "../tools.html";
    document.querySelectorAll(".nav-more-content a").forEach((e) => {
      e.href =
        ".." +
        e.href
          .replace(e.origin, "")
          .replace("/a/", "/")
          .replace("/t/", "/")
          .replace("/author/", "/");
    });
    // document.querySelectorAll(".nav-search-content img").forEach((e) => {
    //   e.src = (".." + e.src)
    //     .replace(window.origin, "")
    //     .replace("/a/", "/")
    //     .replace("/t/", "/")
    //     .replace("/author/", "/");
    // });
  }
}

loadNavigation();

// NAVIGATION LOADER END

const newDate = new Date(),
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  nav = document.querySelector("nav"),
  navMoreContent = document.querySelector(".nav-more-content"),
  navMoreBtn = document.querySelector("#nav-more"),
  navMenu = document.querySelector("#nav-menu"),
  navSearchContent = document.querySelector(".nav-search-content"),
  navInput = document.querySelector(".nav-searchBar input"),
  navResults = document.querySelector(".nav-search-content .results"),
  navExtra = document.querySelector(".nav-extra"),
  body = document.body,
  head = document.head,
  navSearchContentBox = document.querySelector(
    ".nav-search-content .options .box"
  ),
  navSearchContentBoxTitle = document.querySelector(
    ".nav-search-content .options .box-title"
  );
windowHref = window.location.href;
let navSearchInitialized = false;
let navHidden = false;
let navSearchBoxOption = "default";

if (window.location.search.split("redirect=")[1]) {
  const v = window.location.search.split("redirect=")[1];
  window.location.replace(v);
}

if (windowHref.toLowerCase().includes("?hidenav=true")) {
  nav.remove();
  document.querySelector("main").style.marginTop = "0";
  navHidden = true;
}

if (windowHref.includes("?testFeature=rainbowSideBar")) {
  const e = document.createElement("div");
  e.classList.add("rainbowSideBar1");
  body.prepend(e);
}

const lazyImages = document.querySelectorAll("img[data-src]") || undefined;

function lazyLoadImageFn(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }
  function lazyLoadImgFilterRemove() {
    img.style.filter = null;
  }
  img.style.filter = "blur(5px)";
  img.src = src.replace("rm1:", "https://axorax.github.io/acdn1/cdn1/");
  img.addEventListener("load", lazyLoadImgFilterRemove, { once: true });
}

const lazyLoadImageObserver = new IntersectionObserver(
  (entries, lazyLoadImageObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        lazyLoadImageFn(entry.target);
        lazyLoadImageObserver.unobserve(entry.target);
      }
    });
  },
  {}
);

lazyImages.forEach((e) => {
  lazyLoadImageObserver.observe(e);
});

function navDonatePopupFun() {
  createMessagePopup("Donate to axile", NAV_DONATE_CONTENT, {
    zIndex: "999",
  });
}

function navSearchFilterToggle() {
  if (navSearchBoxOption == "filter") {
    navSearchBoxOption = "default";
    navSearchContentBoxTitle.textContent = "✨ POPULAR TAGS";
    navSearchContentBox.innerHTML = DEFAULT_SEARCH_CONTENT_BOX_ITEMS;
    const inputBox = document.querySelector(
      ".nav-search-content .nav-searchBar input"
    );
    inputBox.value = " ";
    navSearch();
    inputBox.value = "";
  } else {
    navSearchBoxOption = "filter";
    navSearchContentBoxTitle.textContent = "🎛️ Filter by";
    navSearchContentBox.innerHTML = `
            <li><button onclick="navSearchCOIABExit('filter')">Default</button></li>
            <li><button onclick="navSearchCOIAB('Date', 'filter')">Date</button></li>
            <li><button onclick="navSearchCOIAB('Tag', 'filter')">Tag</button></li>
        `;
  }
}

function navSearchCOIS(type) {
  const value = document.querySelector(
    ".nav-search-content .options .box input"
  ).value;
  if (type == "date") {
    navSearch(
      true,
      `document.querySelectorAll('.nav-search-content .results a div .time')[i].textContent.toLowerCase().includes(text.toLowerCase())`,
      value
    );
  } else if (type == "tag") {
    navSearch(
      true,
      `(String(document.querySelectorAll('.nav-search-content .results a')[i].classList.value).replaceAll('tag-','')).includes(text.toLowerCase())`,
      value
    );
  }
}

function navSearchCOIAB(txt, type) {
  navSearchContentBox.innerHTML = `
        <input type="text" placeholder="Filter ${txt}">
        <button class="s-btn" onclick="navSearchCOIABExit('${type}')">Cancel</button>
        <button class="s-btn" onclick="navSearchCOIS('${txt.toLowerCase()}')">Go</button>
    `;
  document.querySelector(".nav-search-content .options .box input").focus();
}

function navSearchCOIABExit(type) {
  navSearchBoxOption = "default";
  const inputBox = document.querySelector(
    ".nav-search-content .nav-searchBar input"
  );
  if ((type = "filter")) {
    navSearchFilterToggle();
  }
  inputBox.value = " ";
  navSearch();
  inputBox.value = "";
}

navMoreBtn.addEventListener("click", () => {
  if (navMoreContent.style.display == "flex") {
    navMoreContentClose();
  } else {
    navMoreContent.style.display = "flex";
    setTimeout(() => {
      windowEventClick(true, navMoreContentClose);
    }, 100);
  }
});

function navMoreContentClose() {
  navMoreContent.style.display = "none";
  windowEventClick(false, navMoreContentClose);
}

function navMenuToggle() {
  if (nav.classList.contains("mobile-active")) {
    nav.classList.remove("mobile-active");
    body.classList.remove("unscroll");
  } else {
    nav.classList.add("mobile-active");
    body.classList.add("unscroll");
  }
}

function navSearchToggle() {
  if (navSearchContent.style.display == "block") {
    navSearchContent.style.transform = "translate(-50%, 100%)";
    navSearchContent.style.opacity = "0";
    setTimeout(() => {
      navSearchContent.style.display = "none";
      body.classList.remove("unscroll");
      document
        .querySelector(".nav-search-overlay")
        .removeEventListener("click", navSearchToggle);
      document.querySelector(".nav-search-overlay").remove();
      if (fileInAnotherFolder) {
        document.querySelector("#nav-search img").src =
          "../assets/img/search.svg";
      } else {
        document.querySelector("#nav-search img").src = "assets/img/search.svg";
      }
      navInput.removeEventListener("input", navSearch);
    }, 300);
  } else {
    navSearchContent.style.display = "block";
    setTimeout(() => {
      navSearchContent.style.transform = "translate(-50%, 0%)";
      navSearchContent.style.opacity = "1";
    }, 100);
    body.classList.add("unscroll");
    document.querySelector(".nav-searchBar input").focus();
    const blurOv = document.createElement("div");
    blurOv.classList.add("nav-search-overlay");
    document.body.appendChild(blurOv);
    document
      .querySelector(".nav-search-overlay")
      .addEventListener("click", navSearchToggle);
    if (!navSearchInitialized) {
      navSearchInit();
      navSearchInitialized = true;
    }
    if (fileInAnotherFolder) {
      document.querySelector("#nav-search img").src = "../assets/img/close.svg";
    } else {
      document.querySelector("#nav-search img").src = "assets/img/close.svg";
    }
    // navSearch();
    navInput.addEventListener("input", navSearch);
  }
}

function createNavExtraItem(c) {
  const e = document.createElement("li");
  e.innerHTML = c;
  navExtra.append(e);
}

function navSearchInit() {
  fetch(`https://axorax.github.io/axile/assets/data/articles.json`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < Object.keys(data).length; i++) {
        let tags = "";
        for (let k = 0; k < data[Object.keys(data)[i]].tags.length; k++) {
          tags += `tag-${data[Object.keys(data)[i]].tags[k]} `;
        }
        const t = `
                        <a href="${
                          window.origin + "/axile/a/" + Object.keys(data)[i]
                        }" class="${tags}">
                            <div>
                                <p class="title">${
                                  data[Object.keys(data)[i]].title
                                }</p>
                                <p class="time">${
                                  data[Object.keys(data)[i]].publishDate
                                }</p>
                            </div>
                        </a>`;
        const r = document.createElement("div");
        r.innerHTML = t;
        navResults.append(r);
        r.replaceWith(...r.childNodes);
      }
    });
}

function navSearch(
  firstLoad = false,
  condition = `document.querySelectorAll('.nav-search-content .results a div .title')[i].textContent.toLowerCase().includes(text.toLowerCase())`,
  searchVal
) {
  let res = 0;
  const text = navInput.value || searchVal;
  const a = document.querySelectorAll(".nav-search-content .results a");
  for (let i = 0; i < a.length; i++) {
    if (eval(condition)) {
      a[i].style.display = "block";
      document
        .querySelectorAll(".nav-search-content .results .noRes")
        .forEach((e) => {
          e.remove();
        });
      res++;
    } else {
      a[i].style.display = "none";
    }
  }
  if (firstLoad && res == 0) {
    document
      .querySelectorAll(".nav-search-content .results .noRes")
      .forEach((e) => {
        e.remove();
      });
    const r1 = document.createElement("p");
    r1.classList.add("noRes");
    r1.textContent = "NO RESULTS!";
    navResults.append(r1);
  }
}

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (
    currentScroll > lastScroll + 10 &&
    !nav.classList.contains("scroll-down")
  ) {
    nav.classList.add("scroll-down");
    navMoreContentClose();
  }

  if (currentScroll < lastScroll && nav.classList.contains("scroll-down")) {
    nav.classList.remove("scroll-down");
  }

  lastScroll = currentScroll;
});

// NAVIGATION END

window.addEventListener("offline", () => {
  createPopup2(
    "NO WIFI!",
    "Looks like you have gone offline",
    '<svg class="img" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M44.85 21.7q-4.4-4.2-9.625-6.7T24 12.5q-1.85 0-3.55.225-1.7.225-2.85.625L13.95 9.7q2.2-.8 4.775-1.25Q21.3 8 24 8q7 0 13.175 2.9Q43.35 13.8 48 18.55Zm-8.45 8.45q-1.65-1.6-3-2.575-1.35-.975-3.45-1.925L24.3 20q4.75.1 8.375 1.95Q36.3 23.8 39.55 27Zm3.85 14.4-19.7-19.7q-2.7.65-4.975 2.1-2.275 1.45-3.975 3.2L8.45 27q1.85-1.85 3.825-3.25T17 21.25l-5.55-5.55Q9.1 16.85 7 18.425 4.9 20 3.15 21.7L0 18.55q1.8-1.85 3.85-3.45t4.2-2.75l-4.6-4.6L5.6 5.6l36.8 36.8Zm-16.25-2-7.4-7.45q1.45-1.45 3.325-2.275Q21.8 32 24 32t4.075.825q1.875.825 3.325 2.275Z"/></svg>'
  );
});

if (document.querySelector("footer")) {
  const footerTemplate = `
    <hr><br>
    <div class="content">
    <img src="https://axorax.github.io/axile/assets/img/axile.svg"}" alt="Logo">
    <p class="btm-txt">© ${new Date().getFullYear()} - Axile</p>
    </div>
    `;
  document.querySelector("footer").innerHTML = footerTemplate;
}

function makeCard(author = "axile.svg", article, appendAt) {
  fetch(`https://axorax.github.io/axile/assets/data/articles.json`)
    .then((response) => response.json())
    .then((data) => {
      let tagDiv = ``;
      data[article].tags.forEach((e) => {
        tagDiv += `<a href="${
          "https://axorax.github.io/axile/tag.html?tag=" + e.replace("#", "")
        }">#${e}</a> `;
      });
      const pdarr = data[article].publishDate.split(" ");
      let pdn = 0;
      let pdnn = 0;
      months.forEach((e) => {
        pdnn++;
        if (pdarr[1] == e) {
          pdn = pdnn;
        }
      });
      const date = new Date(`${pdarr[2]}-${pdn}-${pdarr[0]}`);
      let pTime = data[article].publishDate;
      const timeSDiff =
        Math.floor(newDate.getTime() / 1000) -
        Math.floor(date.getTime() / 1000);
      let newArticle = "";
      let currentForm;
      if (Math.floor(timeSDiff / 60) < 61) {
        currentForm = Math.floor(timeSDiff / 60);
        if (currentForm == 1) {
          pTime = 1 + " minute ago";
        } else {
          pTime = currentForm + " minutes ago";
        }
      } else if (Math.floor(timeSDiff / 60 / 60) < 24) {
        currentForm = Math.floor(timeSDiff / 60 / 60);
        if (currentForm == 1) {
          pTime = 1 + " hour ago";
        } else {
          pTime = currentForm + " hours ago";
        }
      } else if (Math.floor(timeSDiff / 60 / 60 / 24) < 365) {
        currentForm = Math.floor(timeSDiff / 60 / 60 / 24);
        if (currentForm == 1) {
          pTime = 1 + " day ago";
        } else {
          pTime = currentForm + " days ago";
        }
      } else {
        currentForm = Math.floor(timeSDiff / 60 / 60 / 24 / 365);
        if (currentForm == 1) {
          pTime = 1 + " year ago";
        } else {
          pTime = currentForm + " years ago";
        }
      }

      // console.log(data[article].publishDate, timeSDiff, Math.floor((timeSDiff / 60)))
      // [] false info
      if (
        Math.floor(date.getTime() / 1000) >
        Math.floor(newDate.getTime() / 1000) - 86400
      ) {
        newArticle = " new";
      }
      const cardTemplate = `
<card-wrapper>
    <div class="head">
        <a href="https://axorax.github.io/axile/author/axorax" class="author" data-tooltip="Posted by ${
          data[article].author
        }"><div style="background: url('https://axorax.github.io/axile/assets/img/${author}');background-size:cover;"></div></a>
        <a href="${
          window.origin + "/axile/a/" + article
        }.html"><img data-src="https://axorax.github.io/axile/assets/img/banner/${article}.png" alt="Article Banner"></a>
    </div>
    <div class="body${newArticle}">
        <div class="tags">${tagDiv}</div>
        <a href="${window.origin + "/axile/a/" + article}">
            <div class="title" title="${data[article].title}">${
        data[article].title
      }</div>
        </a>
    </div>
    <div class="details"><span>${pTime}</span> • <span>${
        data[article].read
      } read</span></div>
</card-wrapper>`;
      const e1 = document.createElement("div");
      e1.innerHTML = cardTemplate;
      document.querySelector(appendAt).appendChild(e1);
      e1.replaceWith(...e1.childNodes);
    })
    .then(() => {
      document
        .querySelectorAll("card-wrapper:last-child .head img")
        .forEach((e) => {
          lazyLoadImageObserver.observe(e);
        });
    });
}

// createFixedBtmNotif(`
// 
// Help us get a custom domain for this website. &nbsp; <a href="${
//   window.location.origin + "/axile/a/support-us"
// }">Learn more.</a> &nbsp; <a href="https://www.patreon.com/axorax" target="_blank"><button class="btm-notif-donate">Donate</button></a>
// 
// `);

function createFixedBtmNotif(c) {
  const t = `
    <div class="fixed-btm-notif">
        <div class="content">${c}</div>
        <button class="close">×</button>
    </div>`;
  const e = document.createElement("div");
  e.innerHTML = t;
  body.prepend(e);
  e.replaceWith(...e.childNodes);
  document.querySelector(".fixed-btm-notif .close").onclick = () => {
    document.querySelector(".fixed-btm-notif").remove();
  };
}

function generateValueOfPi(m = 10019n) {
  let i = 1n;
  let x = 3n * 10n ** m;
  let pi = x;
  while (x > 0) {
    x = (x * i) / ((i + 1n) * 4n);
    pi += x / (i + 2n);
    i += 2n;
  }

  const v = String(pi / 10n ** 20n).replace("1", ".1");
  return v;
}

function copyText(txt) {
  navigator.clipboard.writeText(txt);
  createSidePopup("✅ Copied Text!");
}

function createSidePopup(msg) {
  const t = `<div class="side-popup-notif">
        ${msg}
        <button class="close">×</button>
    </div>`;
  const e = document.createElement("div");
  e.innerHTML = t;
  document.body.prepend(e);
  e.replaceWith(...e.childNodes);
  setTimeout(() => {
    document.querySelector(".side-popup-notif").style.transform =
      "translate(0)";
  }, 1);
  setTimeout(() => {
    document.querySelector(".side-popup-notif").style.transform =
      "translate(300%)";
  }, 2000);
  setTimeout(() => {
    document.querySelector(".side-popup-notif").remove();
  }, 3000);
}

function makeTable(id, data) {
  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    for (let k = 0; k < data[i].length; k++) {
      const td = document.createElement("td");
      td.innerText = data[i][k];
      tr.append(td);
    }
    document.querySelector(id).append(tr);
  }
}

function createPopup2(title, content, img) {
  // add transition
  const t = `
    <div class="side-popup-2">
        ${img}
        <div class="txt">
            <div class="title">${title}</div>
            <div class="content">${content}</div>
        </div>
        <div class="close" onclick="document.querySelector('.side-popup-2').remove();">×</div>
    </div>`;
  const div = document.createElement("div");
  div.innerHTML = t;
  body.append(div);
  div.replaceWith(...div.childNodes);
  setTimeout(() => {
    document.querySelector(".side-popup-2").remove();
  }, 3000);
}

function createMessagePopup(
  title,
  msg,
  options = {
    all: "",
    zIndex: "1",
  }
) {
  const t = `
    <div class="msgPopupOverlay"></div>
    <div class="msgPopupWrapper" style="z-index: ${options.zIndex}">
        <div class="container">
            <div class="head">
                <button class="close" onclick="closeMessagePopup()">×</button>
                <div class="title">${title}</div>
            </div>
            <div class="body">
                <div class="msg ${options.all}">${msg}</div>
            </div>
        </div>
    </div>`;
  const e = document.createElement("div");
  e.innerHTML = t;
  body.prepend(e);
  e.replaceWith(...e.childNodes);
  body.classList.add("unscroll");
  setTimeout(() => {
    document.querySelector(".msgPopupWrapper").style.transform = "scale(1)";
    document.querySelector(".msgPopupWrapper").style.opacity = "1";
  }, 300);
  document
    .querySelector(".msgPopupWrapper")
    .addEventListener("click", function msgpopupremoveoverlayclick(e) {
      if (!e.target.classList[0].includes("msgPopupWrapper")) {
        return;
      } else {
        e.target.removeEventListener(e.type, msgpopupremoveoverlayclick);
        closeMessagePopup();
      }
    });
}

function closeMessagePopup() {
  // document.querySelector('.msgPopupWrapper').removeEventListener('click', closeMessagePopup)
  body.classList.remove("unscroll");
  const e = document.querySelector(".msgPopupWrapper");
  document.querySelector(".msgPopupOverlay").remove();
  e.style.transform = "scale(0)";
  e.style.opacity = "0";
  setTimeout(() => {
    e.remove();
  }, 300);
}

function windowEventClick(type, func) {
  if (type) {
    window.addEventListener("click", func);
  } else {
    window.removeEventListener("click", func);
  }
}

function generateHexCode() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// setTimeout(() => {
//     console.clear();
// }, 100)
