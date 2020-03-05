const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = (document.getElementById('dead'));
//const header = document.querySelector('.headeer');
let table = document.getElementById('enemy');
let again = document.getElementById('again');

const game = {
    ships:[
        {
            location:['26','36','46','56'],
            hit:["","","",""]
        },
        {
            location:['13','14','15'],
            hit:["","",""]
        },
        {
            location:['75','76'],
            hit:["",""]
        },
        {
            location:['61'],
            hit:[""]
        }        
    ],
    shipCount: 4/*ships.length*/
};
const play = {
    record: localStorage.getItem('myrecord') || 0,
    shot: 0,
    hit: 0,
    dead: 0,
    render() {
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    },
    set updateData(data) {
        this[data] += 1;
        this.render();
    }
};
const show = {
    hit(elem) {
        this.changeClass(elem, 'hit');
    },
    miss(elem) {
        this.changeClass(elem, 'miss');
    },
    changeClass(elem, value) {
        elem.className = value;
    },
    dead(elem) {
        this.changeClass(elem, 'dead');
    }
};


const fire = (event) => {
    const target = event.target;
    if (game.shipCount <1 || target.className == 'dead') {
        return;
    }
    if (target.classList.length <= 0 && target.tagName == 'TD' ) {
        show.miss(target);
        play.updateData = 'shot';
    }
    for(let i=0;i < game.ships.length; i++){
        let ship = game.ships[i];
        let index = ship.location.indexOf(target.id);
        if (index >= 0) {
            show.hit(target);
            play.updateData= 'hit';
            ship.hit[index] = 'x';
            let sDead = ship.hit.indexOf('');
            if (sDead < 0) {
                play.updateData = 'dead';
                game.shipCount-=1;
                for (const deck of ship.location) {
                    show.dead(document.getElementById(deck));
                    
                    if (game.shipCount < 1) {
                        let gameOver = document.querySelector('.header');
                        gameOver.textContent = 'Игра окончена';
                        gameOver.style.color = 'red';

                        if(play.shot < play.record || play.record ===0){
                            localStorage.setItem('myrecord', play.shot);
                            play.record = play.shot;
                            play.render();
                        }
                        
                    }
                }
            }
        }
    }
    
};
localStorage.clear();
const init = () => {
    const event = addEventListener('click', fire);
    play.render();
    again.addEventListener('click', () =>{
        location.reload();
    });
};
init();