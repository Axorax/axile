let json;
let title;
let author;
let description;
let content;
const writer = document.querySelector("#writer");
const dt = document.querySelector("#d-t");
const da = document.querySelector("#d-a");
const dd = document.querySelector("#d-d");

function iac(txt) {
  if (document.selection) {
    document.querySelector("#writer").focus();
    sel = document.selection.createRange();
    sel.text = txt;
    updatePreview();
  } else if (
    document.querySelector("#writer").selectionStart ||
    document.querySelector("#writer").selectionStart == "0"
  ) {
    var startPos = document.querySelector("#writer").selectionStart;
    var endPos = document.querySelector("#writer").selectionEnd;
    document.querySelector("#writer").value =
      document.querySelector("#writer").value.substring(0, startPos) +
      txt +
      document
        .querySelector("#writer")
        .value.substring(
          endPos,
          document.querySelector("#writer").value.length
        );
    updatePreview();
  } else {
    document.querySelector("#writer").value += txt;
    updatePreview();
  }
}

writer.addEventListener("input", () => {
  updatePreview();
});

function updatePreview(preventReplaceAll = false) {
  content = writer.value.replaceAll("\n", "<br>");
  document.querySelector("main").innerHTML = content;
  writer.focus();
}

dt.addEventListener("input", () => {
  title = dt.value;
});

da.addEventListener("input", () => {
  author = da.value;
});

dd.addEventListener("input", () => {
  description = dd.value;
});

const btnTemp = `<i class="fa-solid fa-copy" style="font-size: 16px"></i> Copy JSON`;

function copyJSON(button) {
  if (title == "" || title == null) {
    button.textContent = "Enter a title!";
    setTimeout(() => {
      button.innerHTML = btnTemp;
    }, 3000);
  } else if (content == null || content == "") {
    button.textContent = "Article cannot be empty!";
    setTimeout(() => {
      button.innerHTML = btnTemp;
    }, 3000);
  } else {
    json = `"${title.replaceAll(" ", "-").toLowerCase()}": {
            "title": "${title}",
            "author": "${author}",
            "publishDate": "",
            "tags": [],
            "read": "",
            "recommended": [],
            "banner": "../assets/img/banner/*.png",
            "CONTENT": "${content}"
        }`;
    copyText(json);
    if (author == null || author == "") {
      button.textContent = "Copied with anonymous author!";
    } else {
      button.textContent = "Copied!";
    }
    setTimeout(() => {
      button.innerHTML = btnTemp;
    }, 3000);
  }
}
