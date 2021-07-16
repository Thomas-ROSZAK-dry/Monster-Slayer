
// on crée cette fonction qui sera utilisée dans les différentes méthodes du projet en dehors de app vue
function getRandomValue (min,max) {
     return Math.floor(Math.random() * (max - min)) + min;
}

const app = new Vue ( {
    el: "#game",
    // les datas sont toujours à mettre dans un projet vuejs
    // ici on indique les données des barres de vie du player et du monster
    data() {
        return {
           playerHealth: 100,
           monsterHealth: 100,
           currentRound:0,
           winner:null,
           messages: [],

        };
    },
    computed: {
        levelMonsterBar() {
            if (this.monsterHealth <0) {
                return {width: '0%' } 
            }
            return {width: this.monsterHealth + '%' } 
                    },
        levelPlayerBar(){
            if (this.playerHealth <0) {
                return {width: '0%' } 
            }
            return {width: this.playerHealth + '%' } 
        },
        
        MayIuseSpecialAttack() {
            return this.currentRound % 3 == 0;
        }
    },
    watch: {
        playerHealth(value) {
                if (value <=0 && this.monsterHealth <=0) {
                    this.winner='draw';
                }
                
                else if (value <=0) {
                    this.winner='monster';
                }
                //lost
        },
        monsterHealth(value) {
            if (value <=0 && this.playerHealth <=0) {
                    this.winner='draw'
                }
            
            else if (value <=0) {
                this.winner='player'
            }
            
    },
        },
    
    methods: {
        newGame() {
            this.monsterHealth =100,
            this.playerHealth= 100,
            this.winner= null,
            this.currentRound=0,
            this.messages= []
        },
     
        attackMonster() {
            this.currentRound++;
            // formule permettant de calculer un chiffrer aléatoire entre un min et un max
            const attackValue= getRandomValue(8,14);
            //permets de retirer le nombre aléatoire à la vie monsterHealth
            // this.monsterHealth = this.monsterHealth -attackValue;
            // autre option d'écriture
           this.monsterHealth-=attackValue
           this.addLogMessage('player', 'attack', attackValue)
        
       
        },
        attackPlayer() {
            this.currentRound++;
            const attackValue= getRandomValue(8,14);
            // this.playerHealth = this.playerHealth -attackValue;
            // autre option d'écriture
            this.playerHealth-=attackValue
            this.addLogMessage('monster', 'attack', attackValue)
            
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue= getRandomValue(12,25);
            this.monsterHealth-=attackValue;
            this.addLogMessage('player', 'special-attack', attackValue)
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healPlayerValue= getRandomValue(5,12);
            if (this.playerHealth + healPlayerValue >100) {
                this.playerHealth =100;
            }
            else(
                this.playerHealth+=healPlayerValue
            )
            this.addLogMessage('player', 'heal', healPlayerValue)
            this.attackPlayer();
    },
    surrender() {
        this.winner ='monster';
    },
    addLogMessage(who, what, value) {
        this.messages.unshift( {
            actionBy: who,
            actionType: what,
            actionValue: value,
                  
        });
    },
}

}) 