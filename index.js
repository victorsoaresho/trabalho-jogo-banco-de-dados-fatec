const { createApp } = Vue;
const API_URL = 'http://localhost:3000';

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            jogoAcabou: false,
            logAcoes: []
        };
    },
    computed: {
        ultimasTresAcoes() {
            return this.logAcoes.slice(-3);
        }
    },
    methods: {
        atacar(isHeroi) {
            if (isHeroi) {
                this.vilao.vida -= 10;
                this.logAcoes.push("Herói atacou o vilão (-10 vida)");
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                if (this.verificarFimDeJogo()) return;
                this.acaoVilao();
            } else {
                this.heroi.vida -= 20;
                this.logAcoes.push("Vilão atacou o herói (-20 vida)");
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                this.verificarFimDeJogo();
            }
        },
        async atualizarVidaNoBancoDeDados(vidaHeroi, vidaVilao) {
            try {
                const response = await fetch(`${API_URL}/atualizarVida`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ vidaHeroi, vidaVilao })
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar a vida no banco de dados.');
                }
                console.log('Vida do herói e do vilão atualizada com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar a vida no banco de dados:', error);
            }
        },
        defender(isHeroi) {
            if (isHeroi) {
                this.logAcoes.push("Herói defendeu");
            } else {
                this.logAcoes.push("Vilão defendeu");
            }
            this.acaoVilao();
        },
        usarPocao(isHeroi) {
            if (isHeroi) {
                this.heroi.vida = Math.min(this.heroi.vida + 10, 100);
                this.logAcoes.push("Herói usou uma poção (+10 vida)");
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                if (this.verificarFimDeJogo()) return;
                this.acaoVilao();
            } else {
                this.vilao.vida = Math.min(this.vilao.vida + 10, 100);
                this.logAcoes.push("Vilão usou uma poção (+10 vida)");
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
            }
        },
        correr(isHeroi) {
            if (isHeroi) {
                this.logAcoes.push("Herói tentou correr");
            } else {
                this.logAcoes.push("Vilão tentou correr");
            }
            this.acaoVilao();
        },
        acaoVilao() {
            if (this.jogoAcabou) return;
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
            console.log('O vilão usou: ' + acaoAleatoria);
        },
        verificarFimDeJogo() {
            if (this.heroi.vida <= 0) {
                this.jogoAcabou = true;
                alert('O vilão ganhou!');
                return true;
            }
            if (this.vilao.vida <= 0) {
                this.jogoAcabou = true;
                alert('O herói ganhou!');
                return true;
            }
            return false;
        },
        reiniciarJogo() {
            this.heroi.vida = 100;
            this.vilao.vida = 100;
            this.jogoAcabou = false;
            this.logAcoes = [];
        }
    }
}).mount("#app");
