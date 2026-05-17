document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.querySelector('#timeLeft');
    const startButton = document.querySelector('#startButton');
    let timeLeft = 10;
    

    function countDown() {
        setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timeLeft = 0)
            }

            if (timeLeft == 1) {
                window.alert('Done!')
            }
            timeLeftDisplay.innerHTML = timeLeft;
            timeLeft -=1; //x = x - y
        }, 1000);
    }

    startButton.addEventListener('click', countDown);
});