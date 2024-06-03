const { createApp } = Vue;
const API_URL = 'http://localhost:5000';

createApp({
    data() {
        return {
            partidaId: null,
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
    mounted() {
        this.iniciarPartida();
    },
    methods: {
        async iniciarPartida() {
            try {
                const response = await fetch(`${API_URL}/iniciarPartida`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        vidaHeroi: this.heroi.vida,
                        vidaVilao: this.vilao.vida,
                        ultimaAcao: 'Partida iniciada'
                    })
                });
                const data = await response.json();
                if (data.success) {
                    this.partidaId = data.partidaId;
                    console.log('Partida iniciada com sucesso. ID da partida:', this.partidaId);
                } else {
                    console.error('Erro ao iniciar a partida:', data.message);
                }
            } catch (error) {
                console.error('Erro ao iniciar a partida:', error);
            }
        },
        async atualizarVidaNoBancoDeDados(vidaHeroi, vidaVilao, ultimaAcao) {
            try {
                const response = await fetch(`${API_URL}/atualizarVida`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ partidaId: this.partidaId, vidaHeroi, vidaVilao, ultimaAcao })
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar a vida no banco de dados.');
                }
                console.log('Vida do herói e do vilão atualizada com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar a vida no banco de dados:', error);
            }
        },
        async deletarPartida() {
            try {
                await fetch(`${API_URL}/deletarPartida`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ partidaId: this.partidaId })
                });
                console.log('Partida deletada com sucesso.');
            } catch (error) {
                console.error('Erro ao deletar a partida:', error);
            }
        },
        atacar(isHeroi) {
            if (isHeroi) {
                this.vilao.vida -= 10;
                const acao = "Herói atacou o vilão (-10 vida)";
                this.logAcoes.push(acao);
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida, acao);
                if (this.verificarFimDeJogo()) return;
                this.acaoVilao();
            } else {
                this.heroi.vida -= 20;
                const acao = "Vilão atacou o herói (-20 vida)";
                this.logAcoes.push(acao);
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida, acao);
                this.verificarFimDeJogo();
            }
        },
        defender(isHeroi) {
            const acao = isHeroi ? "Herói defendeu" : "Vilão defendeu";
            this.logAcoes.push(acao);
            this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida, acao);
            this.acaoVilao();
        },
        usarPocao(isHeroi) {
            if (isHeroi) {
                this.heroi.vida = Math.min(this.heroi.vida + 10, 100);
                const acao = "Herói usou uma poção (+10 vida)";
                this.logAcoes.push(acao);
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida, acao);
                if (this.verificarFimDeJogo()) return;
                this.acaoVilao();
            } else {
                this.vilao.vida = Math.min(this.vilao.vida + 10, 100);
                const acao = "Vilão usou uma poção (+10 vida)";
                this.logAcoes.push(acao);
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida, acao);
            }
        },
        correr(isHeroi) {
            const acao = isHeroi ? "Herói tentou correr" : "Vilão tentou correr";
            this.logAcoes.push(acao);
            this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida, acao);
            this.acaoVilao();
        },
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acao = acoes[Math.floor(Math.random() * acoes.length)];
            this[acao](false);
        },
        verificarFimDeJogo() {
            if (this.heroi.vida <= 0 || this.vilao.vida <= 0) {
                this.jogoAcabou = true;
                const acao = this.heroi.vida <= 0 ? "O vilão venceu!" : "O herói venceu!";
                this.logAcoes.push(acao);
                this.deletarPartida();
                return true;
            }
            return false;
        },
        reiniciarJogo() {
            this.heroi.vida = 100;
            this.vilao.vida = 100;
            this.jogoAcabou = false;
            this.logAcoes = [];
            this.iniciarPartida();
        }
    }
}).mount('#app');
