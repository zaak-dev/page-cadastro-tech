// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const registerForm = document.getElementById('registerForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const btnIcon = document.querySelector('.btn-icon');
    const btnLoading = document.querySelector('.btn-loading');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const continueBtn = document.getElementById('continueBtn');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    // Alternar visibilidade da senha
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Validação do formulário
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const terms = document.getElementById('terms').checked;
        
        // Verifica se todos os campos estão preenchidos
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showNotification('Por favor, preencha todos os campos.');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            showNotification('As senhas não coincidem. Por favor, verifique.');
            return;
        }
        
        // Verifica se a senha tem pelo menos 6 caracteres
        if (password.length < 6) {
            showNotification('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        
        // Verifica os termos
        if (!terms) {
            showNotification('Você deve aceitar os Termos de Serviço e Política de Privacidade.');
            return;
        }
        
        // Simula o envio do formulário (para demonstração)
        simulateFormSubmission();
    });
    
    // Função para simular o envio do formulário
    function simulateFormSubmission() {
        // Mostra o estado de carregamento
        btnText.style.opacity = '0';
        btnIcon.style.opacity = '0';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Simula uma requisição de rede
        setTimeout(() => {
            // Esconde o formulário e mostra a mensagem de sucesso
            registerForm.style.opacity = '0';
            setTimeout(() => {
                registerForm.style.display = 'none';
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                }, 10);
            }, 300);
            
            // Reseta o botão
            btnText.style.opacity = '1';
            btnIcon.style.opacity = '1';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Mostra uma notificação de sucesso
            showNotification('Cadastro realizado com sucesso!', 'success');
        }, 2000);
    }
    
    // Botão continuar na tela de sucesso
    continueBtn.addEventListener('click', function() {
        // Simula redirecionamento ou ação adicional
        showNotification('Redirecionando para o dashboard...', 'success');
        
        // Aqui você pode redirecionar para outra página
        // window.location.href = 'dashboard.html';
        
        // Para demonstração, vamos resetar o formulário após 2 segundos
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.style.display = 'none';
                registerForm.style.display = 'block';
                setTimeout(() => {
                    registerForm.style.opacity = '1';
                }, 10);
                registerForm.reset();
                
                // Reseta os labels
                document.querySelectorAll('.input-group input').forEach(input => {
                    if (input.value === '') {
                        input.nextElementSibling.style.top = '18px';
                        input.nextElementSibling.style.fontSize = '1rem';
                    }
                });
            }, 300);
        }, 1500);
    });
    
    // Função para mostrar notificações
    function showNotification(message, type = 'error') {
        notificationText.textContent = message;
        
        // Define a cor baseada no tipo
        if (type === 'success') {
            notification.style.background = 'rgba(0, 255, 136, 0.9)';
        } else {
            notification.style.background = 'rgba(255, 50, 50, 0.9)';
        }
        
        notification.style.display = 'block';
        
        // Esconde a notificação após 5 segundos
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
    
    // Efeitos visuais para os inputs
    document.querySelectorAll('.input-group input').forEach(input => {
        // Efeito ao focar
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Efeito ao perder o foco
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Anima o label quando há conteúdo
        input.addEventListener('input', function() {
            if (this.value !== '') {
                this.nextElementSibling.style.top = '8px';
                this.nextElementSibling.style.fontSize = '0.8rem';
                this.nextElementSibling.style.color = '#00d9ff';
            } else {
                this.nextElementSibling.style.top = '18px';
                this.nextElementSibling.style.fontSize = '1rem';
                this.nextElementSibling.style.color = '#a0a0ff';
            }
        });
    });
    
    // Efeitos para os elementos flutuantes
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});