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