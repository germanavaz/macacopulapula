const character = document.getElementById('character');
const finish = document.getElementById('finish');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const homeLink = document.getElementById('home');

let positionX = 0;
let positionY = 0;
const step = 40; // Tamanho do movimento (igual ao tamanho do personagem)

const walls = [
    {x: 0, y: 170, width: 100, height: 20},
    {x: 80, y: 60, width: 100, height: 20},
    {x: 180, y: 150, width: 20, height: 170},
    {x: 80, y: 0, width: 20, height: 100},
    {x: 70, y: 300, width: 250, height: 20},
    // Adicione mais paredes aqui conforme necessário
];

function drawWalls() {
    walls.forEach(wall => {
        const wallDiv = document.createElement('div');
        wallDiv.classList.add('wall');
        wallDiv.style.width = `${wall.width}px`;
        wallDiv.style.height = `${wall.height}px`;
        wallDiv.style.left = `${wall.x}px`;
        wallDiv.style.top = `${wall.y}px`;
        document.getElementById('maze').appendChild(wallDiv);
    });
}

function moveCharacter(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (isMoveAllowed(positionX, positionY - step)) positionY -= step;
            break;
        case 'ArrowDown':
            if (isMoveAllowed(positionX, positionY + step)) positionY += step;
            break;
        case 'ArrowLeft':
            if (isMoveAllowed(positionX - step, positionY)) positionX -= step;
            break;
        case 'ArrowRight':
            if (isMoveAllowed(positionX + step, positionY)) positionX += step;
            break;
    }

    character.style.left = `${positionX}px`;
    character.style.top = `${positionY}px`;

    if (checkFinish()) {
        endGame();
    }
}

function isMoveAllowed(newX, newY) {
    for (let wall of walls) {
        if (
            newX < wall.x + wall.width &&
            newX + step > wall.x &&
            newY < wall.y + wall.height &&
            newY + step > wall.y
        ) {
            return false;
        }
    }
    return newX >= 0 && newX <= 360 && newY >= 0 && newY <= 360; // Limites do labirinto
}

function checkFinish() {
    return positionX === 360 && positionY === 360; // Posição do final
}

function endGame() {
    message.textContent = "Parabéns! Você chegou ao final!";
    message.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    homeLink.classList.remove('hidden');
    document.removeEventListener('keydown', moveCharacter);
}

function restartGame() {
    positionX = 0;
    positionY = 0;
    character.style.left = '0px';
    character.style.top = '0px';
    message.classList.add('hidden');
    restartButton.classList.add('hidden');
    homeLink.classList.add('hidden');
    document.addEventListener('keydown', moveCharacter);
}

drawWalls();
document.addEventListener('keydown', moveCharacter);
restartButton.addEventListener('click', restartGame);
