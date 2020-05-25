const gameSummary = {
    numbers: 0,
    wins: 0,
    loses: 0,
    draws: 0,
}

const game = {
    playerHand: 0,
    aiHand: 0
}

const hands = [...document.querySelectorAll("img")];

function handSelection() {
    game.playerHand = this.dataset.option;
    console.log(game.playerHand);
    hands.forEach(hand => hand.style.boxShadow = "")
    this.style.boxShadow = "0 0 0 3px yellow"
}

function aiChoice() {
    const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option
    return aiHand
}

function checkResult(player, ai) {
    if (player == ai) {
        return "draw"
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return "win"
    } else {
        return "lost"
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player
    document.querySelector('[data-summary="ai-choice"]').textContent = ai
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers

    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins

        document.querySelector('[data-summary="who-win"]').textContent = "Ty wygrałeś!"
    } else if (result === "lost") {
        document.querySelector('p.losses span').textContent = ++gameSummary.loses

        document.querySelector('[data-summary="who-win"]').textContent = "Komp wygrał!"
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws

        document.querySelector('[data-summary="who-win"]').textContent = "REMIS!"
    }
}

function endGame() {
    document.querySelector(`[data-option=${game.playerHand}]`).style.boxShadow = "";
    game.playerHand = 0;
}

function startGame() {
    if (!game.playerHand) return alert('wybierz dłoń!');
    game.aiHand = aiChoice()
    const gameResult = checkResult(game.playerHand, game.aiHand)
    publishResult(game.playerHand, game.aiHand, gameResult)
    endGame()
}
hands.forEach(hand => hand.addEventListener("click", handSelection))
document.querySelector("button").addEventListener('click', startGame)