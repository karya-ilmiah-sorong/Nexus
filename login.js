document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Tambahkan di akhir event listener login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if(username === 'admin' && password === '12') {
        sessionStorage.setItem('isAuthenticated', 'true');
        
        // Mulai musik sebelum redirect
        const audio = new Audio('1.m4a');
        audio.loop = true;
        audio.volume = 0.3;
        audio.play()
            .then(() => {
                sessionStorage.setItem('audioPlaying', 'true');
                window.location.href = 'menu.html';
            })
            .catch(error => {
                console.log('Autoplay prevented, will play after redirect');
                sessionStorage.setItem('audioPlaying', 'true');
                window.location.href = 'menu.html';
            });
    } else {
        alert('Username atau password salah!');
    }
});
});

// Fungsi logout
function logout() {
    // Hapus session dan redirect ke login
    sessionStorage.removeItem('isAuthenticated');
    
    // Bersihkan history dan redirect
    window.location.replace('index.html');
    window.history.pushState(null, null, window.location.href);
}

// Tambahkan event listener untuk tombol logout
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// Proteksi history lebih ketat
window.history.pushState(null, null, window.location.href);
window.onpopstate = function(event) {
    window.history.go(1);
    if(!sessionStorage.getItem('isAuthenticated')) {
        window.location.replace('index.html');
    }
};

// Proteksi history lebih ketat
window.history.pushState(null, null, window.location.href);
window.onpopstate = function(event) {
    window.history.go(1);
    if(!sessionStorage.getItem('isAuthenticated')) {
        window.location.replace('index.html');
    }
};

// Tambahkan ini di login.js
document.addEventListener('DOMContentLoaded', function() {
    // Deteksi perangkat mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if(isMobile) {
        // Proteksi ekstra untuk mobile
        window.history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function() {
            window.history.pushState(null, null, document.URL);
            if(!sessionStorage.getItem('isAuthenticated')) {
                window.location.replace('index.html');
            }
        });
        
        // Force reload saat back button ditekan
        window.addEventListener('pageshow', function(event) {
            if(event.persisted || window.performance && window.performance.navigation.type === 2) {
                if(!sessionStorage.getItem('isAuthenticated')) {
                    window.location.replace('index.html');
                }
            }
        });
    }
});
