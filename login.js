document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Validasi sederhana (ganti dengan validasi sesungguhnya)
        if(username === 'admin' && password === '12') {
            // Simpan status login di sessionStorage
            sessionStorage.setItem('isAuthenticated', 'true');
            
            // Redirect ke halaman menu
            window.location.href = 'menu.html';
        } else {
            alert('Username atau password salah!');
        }
    });
    
    // Blok akses langsung ke halaman menu
    if(window.location.pathname.includes('menu.html') || 
       window.location.pathname === '/') {
        if(sessionStorage.getItem('isAuthenticated') !== 'true') {
            window.location.href = 'index.html';
        }
    }
});