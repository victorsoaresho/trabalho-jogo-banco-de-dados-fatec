const { createApp } = Vue;
const API_URL = 'http://localhost:5000';

createApp({
    data() {
        return {
            heroiVida: 0,
            vilaoVida: 0
        };
    },
    mounted() {
        this.fetchLatestData();
        this.setupSocket();
    },
    methods: {
        async fetchLatestData() {
            try {
                const response = await fetch(`${API_URL}/ultimaAcao`);
                const data = await response.json();
                if (data.success) {
                    this.heroiVida = data.vidaHeroi;
                    this.vilaoVida = data.vidaVilao;
                } else {
                    console.error('Erro ao buscar a última ação:', data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do banco de dados:', error);
            }
        },
        setupSocket() {
            const socket = io();
            socket.on('atualizarVida', (data) => {
                this.heroiVida = data.vidaHeroi;
                this.vilaoVida = data.vilaoVida;
            });
        }
    }
}).mount('#app');
