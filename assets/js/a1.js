loadNavigation("a");

const authorInfoAndRecommendationsTemplate = `
        <div class="author">
            <img src="" alt="Author">
            <div class="content">
                <a href=""><div class="name">axile</div></a>
                <div class="bio"></div>
            </div>
        </div>

        <div class="recommended">
            <p>Recommended for you</p>
            <section class="card-wrapper even" id="recommended-articles">

            </section>
        </div>
`;

const bottomAuthorAndRecommentDiv = document.createElement("div");
bottomAuthorAndRecommentDiv.className = "main";
bottomAuthorAndRecommentDiv.style.marginBottom = "-6rem";
bottomAuthorAndRecommentDiv.innerHTML = authorInfoAndRecommendationsTemplate;
document.querySelector("main").after(bottomAuthorAndRecommentDiv);

const overlay = document.querySelector(".overlay");
const recommended = document.querySelector(".recommended");
const title = document.querySelector("main .title");
const dataTitle = title.textContent.replaceAll(" ", "-").toLowerCase();
const authorName = document.querySelector(".author .name");
const authorLink = document.querySelector(".author a");
const dataAuthorName = authorName.textContent
  .replaceAll(" ", "_")
  .toLowerCase();
const authorBio = document.querySelector(".author .bio");
const authorImg = document.querySelector(".author img");
const details = document.querySelector("main .details");
const detailsPublishDate = document.querySelector("main .details .publishDate");
const detailsPublishDateSpan = document.querySelector(
  "main .details .publishDate span"
);
const detailsTags = document.querySelector(".details .tags");
const controlsTop1Template = `
<button id="play-audio-btn" onclick="playArticleAudio(this)">🔊 Play audio</button>
<button class="ArpTxt beta" onclick="articlePlainText(this)">View Plain Text</button>
`;
const controlsTop1 = document.createElement("div");
controlsTop1.id = "controls-top-1";
controlsTop1.innerHTML = controlsTop1Template;
document.querySelector("main").insertBefore(controlsTop1, details.nextSibling);

// Skip Navigation
const skipNav = document.createElement("a");
skipNav.className = "skip-navigation";
skipNav.textContent = "Skip Navigation";
skipNav.href = "#play-audio-btn";
body.prepend(skipNav);

if (document.querySelector("article-settings")) {
  const settings = document
    .querySelector("article-settings")
    .textContent.toLowerCase()
    .replaceAll(" ", "");
  if (settings.includes("codehighlight:true")) {
    head.innerHTML += `<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/monokai_sublime.css">`;
    hljs.highlightAll();
    document.addEventListener("DOMContentLoaded", (event) => {
      document.querySelectorAll("code").forEach((el) => {
        hljs.highlightElement(el);
      });
    });
  }
}

detailsPublishDate.href = "https://axorax.github.io/axile/publishDate.html?date=" +
  detailsPublishDateSpan.textContent.replaceAll(" ", "_");

// fetch('../assets/data/authors.json')
//     .then(response => response.json())
//     .then(data => {
//             const author = data[dataAuthorName];
//             authorBio.textContent = data[dataAuthorName].bio;
//             authorImg.src = '../assets/img/' + author.pfp;
//         }
//     );

document.querySelectorAll("main img").forEach((e) => {
  e.addEventListener("click", () => {
    overlay.style.display = "block";
    overlay.style.cursor = "zoom-out";
    const newImg = document.createElement("img");
    newImg.src = e.src;
    newImg.alt = e.alt;
    newImg.classList.add("overlay-popup-image");
    overlay.appendChild(newImg);
    document.body.classList.add("unscroll");
    overlay.addEventListener("click", overlayHideAndRemoveFirstChild);
  });
});

function overlayHideAndRemoveFirstChild() {
  overlay.style.display = "none";
  document.body.classList.remove("unscroll");
  overlay.removeChild(overlay.firstElementChild);
  overlay.removeEventListener("click", overlayHideAndRemoveFirstChild);
}

let accordinForI = 0;
const accordinAll = document.querySelectorAll(".accordin-1");
const accordinBtnAll = document.querySelectorAll(".accordin-1 button");

accordinBtnAll.forEach((e) => {
  const g = accordinForI;
  e.onclick = () => {
    if (accordinAll[g].classList.contains("active")) {
      accordinAll[g].classList.remove("active");
    } else {
      accordinAll[g].classList.add("active");
    }
  };
  accordinForI++;
});

let postAuthor = '';

fetch(`https://axorax.github.io/axile/assets/data/articles.json`)
  .then((response) => response.json())
  .then((data) => {
    const ud = data[dataTitle];
    postAuthor = data[dataTitle].author;
    ud.tags.forEach((e) => {
      detailsTags.innerHTML += `<a href="${
        window.origin + "/axile/tag.html?tag=" + e.replace("#", "")
      }">${e}</a> `;
    });
    if (ud.recommended.length < 1) {
      document.querySelector(".recommended .card-wrapper").innerHTML =
        "<p>NO RECOMMENDATIONS!</p>";
    } else {
      for (let i = 0; i < ud.recommended.length; i++) {
        if (`${data[ud.recommended[i]].author}.svg` == 'axorax.svg') {
          makeCard(
            `Axorax.svg`,
            ud.recommended[i],
            ".recommended .card-wrapper"
          );
        } else {
          makeCard(
            `${data[ud.recommended[i]].author}.svg`,
            ud.recommended[i],
            ".recommended .card-wrapper"
          );
        }
      }
    }
  });

  fetch(`https://axorax.github.io/axile/assets/data/authors.json`)
  .then((response) => response.json())
  .then((authors) => {
    authorName.textContent = postAuthor;
    authorBio.textContent = authors[postAuthor].bio;
    authorLink.href = `https://axorax.github.io/axile/author/${postAuthor}`;
    authorImg.src = "https://axorax.github.io/axile/assets/img/" + String(authors[postAuthor].pfp).replace('axorax', 'Axorax');
  });

let articleAudioPlaying = false;

function playArticleAudio(a) {
  if (articleAudioPlaying) {
    a.textContent = "🔊 Play audio";
    articleAudioPlaying = false;
    speechSynthesis.cancel();
  } else {
    a.textContent = "🔇 Stop audio";
    articleAudioPlaying = true;
    const text = document
      .querySelector("main")
      .textContent.replace(a.textContent, "");
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    utterance.onend = (e) => {
      a.textContent = `🔊 Play audio | ${(e.elapsedTime / 1000).toFixed(1)}s`;
      articleAudioPlaying = false;
    };
  }
}

function articlePlainText(node) {
  const t = document.title.replace(" - Axile", "");
  const text = document.querySelector("main").innerHTML;
  createMessagePopup(t + " - Plain Text", text, { all: "revert" });
}
