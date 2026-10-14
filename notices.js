const wall = document.querySelector("#wall");
const up = document.querySelector("#up");
const down = document.querySelector("#down");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const move = document.querySelector("#move");
const fireAt = document.querySelector("#fire-at");
const spot = document.querySelector("#spot");

if (!wall || !up || !down || !left || !right || !move || !fireAt || !spot) {
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

function goMove() {
  const position = Number(spot.value);

  if (isNaN(position)) {
    spot.setCustomValidity("not a number");
    spot.reportValidity();
    return;
  }
  spot.setCustomValidity("");

  const current = getCurrent();
  if (current === null) {
    return;
  }

  if (position < 1 || position > 6) {
    return;
  }

  // the other notices in order, with the current one placed at its spot
  const order = [];
  const all = wall.querySelectorAll(".notice");
  for (let i = 0; i < all.length; i++) {
    if (all[i] !== current) {
      order.push(all[i]);
    }
  }
  order.splice(position - 1, 0, current);

  // three notices per row
  const rows = wall.querySelectorAll(".row");
  for (let i = 0; i < order.length; i++) {
    rows[Math.floor(i / 3)].append(order[i]);
  }

  afterMove();
}