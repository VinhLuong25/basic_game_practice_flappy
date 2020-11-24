document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const container = document.querySelector(".container");
  const ground = document.querySelector("ground");

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 460;

  function start() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
  let timerId = setInterval(start, 20);

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }
  function jump() {
    birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
  }

  document.addEventListener("keyup", control);

  function createObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 50;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }
    container.appendChild(obstacle);
    container.appendChild(topObstacle);

    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.left = obstacleLeft + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";
      if (obstacleLeft === -40) {
        clearInterval(timer);
        container.removeChild(obstacle);
        container.removeChild(topObstacle);
      }
      if (
        birdBottom === 0 ||
        (obstacleLeft > 220 &&
          obstacleLeft < 260 &&
          birdLeft == 220 &&
          (birdBottom < obstacleBottom + 150 ||
            birdBottom > obstacleBottom + gap - 190))
      ) {
        gameOver();
        clearInterval(timer);
        console.log(birdBottom);
        console.log(obstacleBottom);
      }
    }
    let timer = setInterval(moveObstacle, 20);

    if (!isGameOver) setTimeout(createObstacle, 3000);
  }
  createObstacle();

  function gameOver() {
    clearInterval(timerId);
    isGameOver = true;
    document.removeEventListener("keyup", control);
  }
});
