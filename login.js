new Vue({
    el: '#app',
    data: {
      isLogin: true,
      email: '',
      password: ''
    },
    methods: {
      toggleForm() {
        this.isLogin = !this.isLogin;
        this.email = '';
        this.password = '';
      },
      handleLogin() {
        // Lógica de login
        alert(`Email: ${this.email}, Senha: ${this.password}`);
      },
      handleRegister() {
        // Lógica de registro
        alert(`Email: ${this.email}, Senha: ${this.password}`);
      }
    }
  });
  