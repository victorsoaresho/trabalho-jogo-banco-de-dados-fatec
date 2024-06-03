new Vue({
  el: '#app',
  data: {
    isLogin: true,
    email: '',
    password: '',
    message: ''
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.email = '';
      this.password = '';
      this.message = '';
    },
    async handleLogin() {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });
      const result = await response.json();
      if (result.success) {
        alert(result.message); // Exibe uma mensagem de sucesso
        window.location.href = 'index.html'; // Redireciona para index.html
      } else {
        alert(result.message); // Exibe a mensagem de erro
        this.message = result.message;
      }
    },
    async handleRegister() {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });
      const result = await response.json();
      if (result.success) {
        alert(result.message); // Exibe uma mensagem de sucesso
        this.message = result.message;
        this.toggleForm(); // Alterna para a tela de login
      } else {
        alert(result.message); // Exibe a mensagem de erro
        this.message = result.message;
      }
    }
  }
});
