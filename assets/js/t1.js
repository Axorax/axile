loadNavigation("t");

function convertTextToLowerGreek(t) {
  const g = t.toLowerCase();
  return g
    .replaceAll("a", "α")
    .replaceAll("b", "β")
    .replaceAll("c", "c")
    .replaceAll("d", "δ")
    .replaceAll("e", "ε")
    .replaceAll("f", "ξ")
    .replaceAll("k", "κ")
    .replaceAll("l", "ι")
    .replaceAll("n", "η")
    .replaceAll("o", "σ")
    .replaceAll("p", "ρ")
    .replaceAll("q", "φ")
    .replaceAll("r", "π")
    .replaceAll("s", "ς")
    .replaceAll("t", "τ")
    .replaceAll("u", "υ")
    .replaceAll("v", "ν")
    .replaceAll("w", "ω")
    .replaceAll("x", "χ")
    .replaceAll("y", "γ");
}

function impossibleColor1(
  c1,
  c2,
  c3,
  c4,
  t1,
  t2c = "#000",
  t3c = "#000",
  time = 25000
) {
  const text = document.querySelector(".text");
  text.style.color = t2c;
  text.textContent = "Focus eyes on × until background changes.";
  document.querySelector(".wrapper .c").style.background = c1;
  document.querySelector(".wrapper").style.background = c2;
  document.querySelector(".wrapper .run").style.display = "none";
  text.style.display = "block";
  setTimeout(() => {
    text.style.display = "none";
  }, 3000);
  setTimeout(() => {
    document.querySelector(".wrapper .c").style.background = c3;
    document.querySelector(".wrapper").style.background = c4;
    text.style.color = t3c;
    text.textContent = t1;
    text.style.display = "block";
    setTimeout(() => {
      document.querySelector(".wrapper .run").style.display = "flex";
    }, 10000);
  }, time);
}
