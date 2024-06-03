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
        this.fetchCharacterData();
        this.setupSocket();
    },
    methods: {
        async fetchCharacterData() {
            try {
                const response = await fetch('http://localhost:3000/characters');
                const data = await response.json();
                this.heroiVida = data.heroi.vida;
                this.vilaoVida = data.vilao.vida;
            } catch (error) {
                console.error('Erro ao buscar dados dos personagens:', error);
            }
        },
        setupSocket() {
            socket.on('atualizarVida', (data) => {
                this.heroiVida = data.vidaHeroi;
                this.vilaoVida = data.vidaVilao;
            });
        }
    }
}).mount('#app');
