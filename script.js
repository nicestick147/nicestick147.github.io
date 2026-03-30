let label1 = document.getElementById("label1");
let label2 = document.getElementById("label2");
let label3 = document.getElementById("label3");
let label4 = document.getElementById("label4");

class rand{
    randint(start, end){
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }
}

const random = new rand();

class basic{
    constructor(HP, maxHP, STR, STR_start, STR_end, critical){
        this.HP = HP;
        this.maxHP = maxHP;
        this.STR = STR;
        this.STR_start = STR_start;
        this.STR_end = STR_end;
        this.critical = critical;
        this.basic_STR_start = STR_start;
        this.basic_STR_end = STR_end;
    }
    attack(target){
        this.STR = random.randint(this.STR_start, this.STR_end);
        this.critical = random.randint(1, 30);
        if (this.critical == 1){
            this.STR *= 1.2;
            this.STR = Math.trunc(this.STR);
        }
        target.HP -= this.STR;
    }
}

class player extends basic{
    constructor(HP, maxHP, STR, STR_start, STR_end, critical, heal, heal_start, heal_end, win_nam, lose_nam){
        super(HP, maxHP, STR, STR_start, STR_end, critical);
        this.heal = heal;
        this.heal_start = heal_start;
        this.heal_end = heal_end;
        this.basic_heal_start = heal_start;
        this.basic_heal_end = heal_end;
        this.win_nam = win_nam;
        this.lose_nam = lose_nam;
    }
    player_heal(){
        if (this.HP > this.maxHP){
            this.attack(enemy1);
        }
        else{
            this.heal = random.randint(this.heal_start, this.heal_end);
            this.HP += this.heal;
            if (this.HP > this.maxHP){
                this.HP = this.maxHP;
            }
        }
    }
}

class enemy extends basic{
    constructor(HP, maxHP, STR, STR_start, STR_end, critical,  roar ,roar_start, roar_end){
        super(HP, maxHP, STR, STR_start, STR_end, critical);
        this.roar_nam = 0;
        this.roar = roar;
        this.roar_start = roar_start;
        this.roar_end = roar_end;
        this.basic_roar_start = roar_start;
        this.basic_roar_end = roar_end;
    }
    enemy_roar(){
        if (this.roar_nam > 3){
            this.attack(player1);
        }
        else{
            this.roar = random.randint(this.roar_start, this.roar_end);
            this.STR += this.roar;
            this.roar_nam += 1;
        }
    }
}

const player1 = new player(20, 20, 1, 2, 5, 1, 1, 1, 5, 0, 0);
const enemy1 = new enemy(20, 20, 1, 2, 7, 1, 1, 1, 3);

class label_generate{
    player_attack_label(){
        label1.textContent = "あなたの攻撃。敵に " + String(player1.STR) + " ダメージ";
    }
    player_critical_label(){
        label1.textContent = "会心の一撃。敵に " + String(player1.STR) + " ダメージ";
    }
    player_heal_label(){
        label1.textContent = "あなたは回復した。HPが " + String(player1.heal) + " 回復";
    }
    player_win_label(){
        label1.textContent = "あなたの勝ち";
    }
    player_lose_label(){
        label1.textContent = "あなたの負け";
    }
    enemy_attack_label(){
        label2.textContent = "敵の攻撃。あなたに " + String(enemy1.STR) + " ダメージ";
    }
    enemy_critical_label(){
        label2.textContent = "痛恨の一撃。あなたに " + String(enemy1.STR) + " ダメージ";
    }
    enemy_roar_label(){
        label2.textContent = "敵が咆哮をあげた。敵の攻撃力が " + String(enemy1.roar) + "アップした";
    }
    player_HP_bar_label(){
        label3.textContent = "あなたのHP  " + String(player1.HP) + "/" + String(player1.maxHP);
    }
    enemy_HP_bar_label(){
        label4.textContent = "敵のHP  " + String(enemy1.HP) + "/" + String(enemy1.maxHP);
    }
}

const label_generate1 = new label_generate();

class battle{
    constructor(turn1, enemy_turn1){
        this.turn = turn1;
        this.enemy_turn = enemy_turn1;
    }

    retry(){
        player1.HP = player1.maxHP;
        enemy1.HP = enemy1.maxHP;
        enemy1.roar_nam = 0;
        player1.STR_start = player1.basic_STR_start;
        player1.STR_end = player1.basic_STR_end;
        player1.heal_start = player1.basic_heal_start;
        player1.heal_end = player1.basic_heal_end;
        enemy1.STR_start = enemy1.basic_STR_start;
        enemy1.STR_end = enemy1.basic_STR_end;
        enemy1.roar_start = enemy1.basic_roar_start;
        enemy1.roar_end = enemy1.basic_roar_end;
        bar1.player_update_HP_bar();
        bar1.enemy_update_HP_bar();
        label_generate1.player_HP_bar_label();
        label_generate1.enemy_HP_bar_label();
        label1.textContent = "リトライ";
        label2.textContent = "win : " + String(player1.win_nam) + "   lose : " + String(player1.lose_nam);
        retry_button.style.display = "none";
    }

    win_lose(target1, target2){
        if (target1.HP <= 0){
            label_generate1.player_lose_label();
            retry_button.style.display = "block"
            player1.STR_start = 0;
            player1.STR_end = 0;
            player1.heal_start = 0;
            player1.heal_end = 0;
            enemy1.STR_start = 0;
            enemy1.STR_end = 0;
            enemy1.roar_start = 0;
            enemy1.roar_end = 0;
            player1.lose_nam += 1;
        }
        else if (target2.HP <= 0){
            label_generate1.player_win_label();
            retry_button.style.display = "block"
            player1.STR_start = 0;
            player1.STR_end = 0;
            player1.heal_start = 0;
            player1.heal_end = 0;
            enemy1.STR_start = 0;
            enemy1.STR_end = 0;
            enemy1.roar_start = 0;
            enemy1.roar_end = 0;
            player1.win_nam += 1;
    }   }

    com_player_attack(){
        if (this.turn == "player"){
            player1.attack(enemy1);
            this.turn = "enemy";
            if (player1.critical == 1){
                label_generate1.player_critical_label();
            }
            else{
                label_generate1.player_attack_label();
            }
            bar1.enemy_update_HP_bar();
            label_generate1.enemy_HP_bar_label();
            this.win_lose(player1, enemy1);
            // setTimeoutで関数がうまく実行できなかったのが原因
            this.com_enemy_attack();
        }
        else{
            return;
        }
    }

    com_player_heal(){
        if (this.turn == "player"){
            if (player1.HP < 20){
                player1.player_heal();
                this.turn = "enemy";
                label_generate1.player_heal_label();
                bar1.player_update_HP_bar();
                label_generate1.player_HP_bar_label();
                label_generate1.enemy_HP_bar_label();
                this.com_enemy_attack();
            }
            else{
                this.com_player_attack();
            }
        }
        else{
            return;
        }
    }

    com_enemy_attack(){
        this.enemy_turn = random.randint(1, 3);
        if (this.turn == "enemy"){
            if (this.enemy_turn == 1 || this.enemy_turn == 2){
                enemy1.attack(player1);
                this.turn = "player";
                if (enemy1.critical == 1){
                    label_generate1.enemy_critical_label();
                }
                else{
                    label_generate1.enemy_attack_label();
                }
                bar1.player_update_HP_bar();
                label_generate1.player_HP_bar_label();
                this.win_lose(player1, enemy1);
            }
            else{
                if (enemy1.roar_nam < 3){
                    enemy1.enemy_roar();
                    this.turn = "player";
                    label_generate1.enemy_roar_label();
                    battle1.win_lose(player1, enemy1);
                }
                else{
                    enemy1.attack(player1);
                    this.turn = "player"
                    if (enemy1.critical == 1){
                    label_generate1.enemy_critical_label();
                }
                else{
                    label_generate1.enemy_attack_label();
                }
                    bar1.player_update_HP_bar();
                    label_generate1.player_HP_bar_label();
                    this.win_lose(player1, enemy1);
                }
            }
        }
        else{
            return;
        }
    }
}

class bar{
    player_update_HP_bar(){
        const ratio = player1.HP / player1.maxHP;
        const HP = document.getElementById("player_HP")
        HP.style.width = (ratio * 200) + "px";
        if (ratio > 0.6){
            HP.style.background = "green";
        }
        else if (ratio > 0.3){
            HP.style.background = "yellow";
        }
        else{
            HP.style.background = "red";
        }
    }

    enemy_update_HP_bar(){
        const ratio = enemy1.HP / enemy1.maxHP;
        const HP = document.getElementById("enemy_HP")
        HP.style.width = (ratio * 200) + "px";
        if (ratio > 0.6){
            HP.style.background = "green";
        }
        else if (ratio > 0.3){
            HP.style.background = "yellow";
        }
        else{
            HP.style.background = "red";
        }
    }
}

const battle1 = new battle("player", 1);
const bar1 = new bar();

const attack_button = document.getElementById("attack");
const heal_button = document.getElementById("heal");
const retry_button = document.getElementById("retry");

const turn_detection_button = document.getElementById("turn_detection");

attack_button.addEventListener("click",() => {
    battle1.com_player_attack();
});
heal_button.addEventListener("click", () => {
    battle1.com_player_heal();
});
retry_button.addEventListener("click", () => {
    battle1.retry();
});

turn_detection_button.addEventListener("click",() => {
    battle1.turn_detection();
})
