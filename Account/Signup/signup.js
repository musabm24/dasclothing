document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        
        if (username && password) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            message.textContent = 'Sign up successful!';
            signupForm.reset();
        } else {
            message.textContent = 'Please fill in all fields.';
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');

        if (username === savedUsername && password === savedPassword) {
            message.textContent = 'Login successful!';
            loginForm.reset();
        } else {
            message.textContent = 'Invalid username or password.';
        }
    });
});
