const wall = document.querySelector("#wall");
const up = document.querySelector("#up");
const down = document.querySelector("#down");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const move = document.querySelector("#move");
const fireAt = document.querySelector("#fire-at");

if (!wall || !up || !down || !left || !right || !move || !fireAt) {
  throw new Error("A needed node is missing");
}

wall.addEventListener("click", pickNotice);
up.addEventListener("click", goUp);
down.addEventListener("click", goDown);
left.addEventListener("click", goLeft);
right.addEventListener("click", goRight);
move.addEventListener("click", goMove);

function pickNotice(event) {
  const notice = event.target.closest(".notice");
  if (notice === null) {
    return;
  }

  const all = wall.querySelectorAll(".notice");
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("now");
  }
  notice.classList.add("now");
}

function getCurrent() {
  return wall.querySelector(".now");
}

function showFirePosition() {
  const all = wall.querySelectorAll(".notice");
  for (let i = 0; i < all.length; i++) {
    if (all[i].querySelector("span").textContent === "Fire") {
      fireAt.textContent = i + 1;
    }
  }
}

function afterMove() {
  showFirePosition();
}

function goLeft() {
  const current = getCurrent();
  if (current === null) {
    return;
  }
  const neighbour = current.previousElementSibling;
  if (neighbour === null) {
    return;
  }
  neighbour.before(current);
  afterMove();
}

function goRight() {
  const current = getCurrent();
  if (current === null) {
    return;
  }
  const neighbour = current.nextElementSibling;
  if (neighbour === null) {
    return;
  }
  neighbour.after(current);
  afterMove();
}

function goUp() {
  const current = getCurrent();
  if (current === null) {
    return;
  }
  const row = current.parentElement;
  const rowAbove = row.previousElementSibling;
  if (rowAbove === null) {
    return;
  }
  const index = Array.from(row.children).indexOf(current);
  swap(current, rowAbove.children[index]);
  afterMove();
}

function goDown() {
  const current = getCurrent();
  if (current === null) {
    return;
  }
  const row = current.parentElement;
  const rowBelow = row.nextElementSibling;
  if (rowBelow === null) {
    return;
  }
  const index = Array.from(row.children).indexOf(current);
  swap(current, rowBelow.children[index]);
  afterMove();
}

// trades two notices that sit in different rows
function swap(a, b) {
  const aRow = a.parentElement;
  const bRow = b.parentElement;
  const aNext = a.nextElementSibling;
  bRow.insertBefore(a, b);
  aRow.insertBefore(b, aNext);
}

function goMove() {}