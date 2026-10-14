const wall = document.querySelector("#wall");
const up = document.querySelector("#up");
const down = document.querySelector("#down");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const move = document.querySelector("#move");

if (!wall || !up || !down || !left || !right || !move) {
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

function goUp() {}
function goDown() {}
function goLeft() {}
function goRight() {}
function goMove() {}