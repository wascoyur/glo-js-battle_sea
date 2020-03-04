/*jshint esversion: 6 */
const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = (document.getElementById('dead'));

let table= document.getElementById('enemy');
let again= document.getElementById('again');

const play = {
    record:0,
    shot:0,
    hit:0,
    dead:0, 
    render(){
        record.textContent = this.record;
        shot.textContent= this.shot;
        hit.textContent= this.hit;
        dead.textContent= this.dead;
    }  ,
    set updateData(data){
        this[data]+=1;
        this.render();
    }
};
const show ={
    hit(){},
    miss(elem){
        this.changeClass(elem, 'miss');
        
    },
    changeClass(elem, value) {
       elem.className = value; 
    },
    dead(){}
};

const fire = (event) =>{
    const target = event.target;
    if(target.className!='miss'){
        show.miss(target);
        play.updateData = 'shot';
    }
    
   // play.render();
};
const init =()=>{
    const event = addEventListener('click', fire);
};
init();
