const articles = document.querySelector(".articles");
const loadMoreBtn = document.querySelector("#loadMore");
const loadMoreBtnSp = document.querySelector("#loadMore span");
const loadMoreBtnSpinner = document.querySelector("#loadMore .spinner-border");
let showing = -1;

function showCards() {
  fetch(`https://axorax.github.io/axile/assets/data/articles.json`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 9; i++) {
        showing++;
        // if (showing == Object.keys(data).length) loadMoreBtn.style.display = 'none';
        if (showing == Object.keys(data).length) loadMoreBtn.remove();
        if (`${data[Object.keys(data)[showing]].author}.svg` == 'axorax.svg') {
          makeCard(
            `Axorax.svg`,
            Object.keys(data)[showing],
            ".articles"
          );
        } else {
          makeCard(
            `${data[Object.keys(data)[showing]].author}.svg`,
            Object.keys(data)[showing],
            ".articles"
          );
        }
      }
    });
}

showCards();

function loadMore() {
  loadMoreBtnSp.innerText = "";
  loadMoreBtnSpinner.style.display = "block";
  loadMoreBtn.classList.add("active");
  setTimeout(() => {
    showCards();
    loadMoreBtnSpinner.style.display = "none";
    loadMoreBtn.classList.remove("active");
    loadMoreBtnSp.innerText = "Load more";
  }, 500);
}

function showSiteStatusBox() {
  const content = document.querySelector(".site-status .content"),
    siteStatus = document.querySelector(".site-status");
  if (content.style.display == "block") {
    siteStatus.style.transform = "translateY(150%)";
    setTimeout(() => {
      content.style.display = "none";
      siteStatus.style.transform = "translateY(0%)";
    }, 700);
  } else {
    siteStatus.style.transform = "translateY(150%)";
    setTimeout(() => {
      content.style.display = "block";
      siteStatus.style.transform = "translateY(0%)";
    }, 680);
  }
}

function siteStatusCopyLink(obj) {
  window.navigator.clipboard.writeText(window.location.href);
  obj.innerText = "✅ Copied Link";
  setTimeout(() => {
    obj.innerText = "🔗 Copy Link";
  }, 3000);
}

const handleFeatureHover = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left;
  y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

for (const card of document.querySelectorAll("#features .box")) {
  card.onmousemove = (e) => handleFeatureHover(e);
}
