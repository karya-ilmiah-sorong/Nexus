document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

document.addEventListener('touchmove', function(e) {
    if (e.scale !== 1) { e.preventDefault(); }
}, { passive: false });


document.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    if (e.scale !== 1) { 
        e.preventDefault(); 
    }
}, { passive: false });

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
    }
});

// Proteksi Copy-Paste
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Proteksi Zoom
document.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    if (e.scale !== 1) { 
        e.preventDefault(); 
    }
}, { passive: false });

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
    }
});

// Proteksi Back Button
history.pushState(null, null, location.href);
window.onpopstate = function() {
    history.go(1);
};

// Proteksi Halaman Menu
if(window.location.pathname.includes('menu.html') || 
   window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', function() {
        if(sessionStorage.getItem('isAuthenticated') !== 'true') {
            window.location.href = 'index.html';
        }
    });
}

// [Kode sebelumnya tetap sama]

// Proteksi khusus mobile
function disableBackNavigation() {
    // Bersihkan history
    window.history.pushState(null, null, window.location.href);
    
    // Tangkap event back button
    window.onpopstate = function() {
        // Jika tidak terautentikasi, redirect ke login
        if(!sessionStorage.getItem('isAuthenticated')) {
            window.location.replace('index.html');
        }
        // Tetap di halaman saat ini
        window.history.go(1);
    };
}

// Panggil fungsi saat load
disableBackNavigation();

// Tangkap event sebelum unload
window.addEventListener('beforeunload', function() {
    window.history.pushState(null, null, window.location.href);
});

// Handle musik saat logout
document.getElementById('logout-btn')?.addEventListener('click', function() {
    sessionStorage.removeItem('audioPlaying');
    const audio = document.querySelector('audio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
});
