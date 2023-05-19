class Boat{
    constructor(){
        boatCount++;
        this.location = {
            y: Math.floor(Math.random() * window.innerHeight),
            x: -50
        };
        this.boat = this.boatSpawn();
        //this.boat.addEventListener('click', this.removeBoat.bind(this));
        
        this.boatMove()
    }
    
    boatSpawn(){
        let boat = document.createElement('div');
        boat.className = 'boat';
        boat.style.top = this.location.y + 'px'
        boat.style.left = this.location.x + 'px'
        document.body.appendChild(boat);

        return boat;
    }

    boatMove() {
        let boatInterval = setInterval(() => {
            // Check if boat has already been removed
            if (!this.boat || !document.body.contains(this.boat)) {
                clearInterval(boatInterval);
                return;
            }
            
            if(this.location.x < window.innerWidth) {
                this.location.x += 10;
                this.boat.style.left = this.location.x + 'px';
            } else {
                scoreBox.downScore();
                this.removeBoat();
            }
        }, 100)
    }

    removeBoat(){
        this.boat.remove();
        boatCount--;
    }
}

class ScoreBox{
    constructor(){
        this.bestScore = 0;
        this.score = 0;
        this.box = document.createElement('div');
        this.box.className = 'score-box';
        this.box.style.top = 0 + 'px';
        this.box.style.left = (window.innerWidth/2 - 100) + 'px';
        document.body.appendChild(this.box);
        this.updateScore();
    }
    updateScore(){
        if(this.score > this.bestScore)
            this.bestScore = this.score;
        this.box.textContent = `Best: ${this.bestScore} | Score: ${this.score}`;
    }
    upScore(){
        this.score++;
        this.updateScore();
    }
    downScore(){
        if(this.score > -11)
            this.score -= 5;
        this.updateScore();
    }
}

// ping function
document.getElementById('click-area').addEventListener('click', (mouse) => {
    let ping = document.createElement('div');
    ping.className = 'ping';
    ping.style.top = (mouse.clientY -50)+ 'px';
    ping.style.left = (mouse.clientX -50)+ 'px';
    mouse.currentTarget.appendChild(ping);

    // cleanup
    ping.addEventListener('animationend', () => {
        ping.remove();
    });
});

let boatCount = 0;
let scoreBox = new ScoreBox();
function boatRace(){
    setInterval(() => {
        if(boatCount < 10) {
            let newBoat = new Boat();
            console.log(boatCount)

            newBoat.boat.addEventListener('click', () => {
                newBoat.removeBoat();
                scoreBox.upScore();
            })
        }
       }, 555);
}
boatRace()