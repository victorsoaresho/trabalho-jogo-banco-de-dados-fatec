const { createApp } = Vue;
const socket = io();

createApp({
    data() {
        return {
            heroiVida: 0,
            vilaoVida: 0
        };
    },
    mounted() {
        this.fetchLatestGameData();
        this.setupSocket();
    },
    methods: {
        async fetchLatestGameData() {
            try {
                const response = await fetch('http://localhost:5000/ultimaAcao');
                const data = await response.json();
                if (data.success) {
                    this.heroiVida = data.vidaHeroi;
                    this.vilaoVida = data.vidaVilao;
                } else {
                    console.error('Erro ao buscar os dados da última ação:', data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar dados da última ação:', error);
            }
        },
        setupSocket() {
            socket.on('atualizarVida', (data) => {
                this.heroiVida = data.vidaHeroi;
                this.vilaoVida = data.vidaVilao;
                this.fetchLatestGameData();
            });
        }
    }
}).mount('#app');
