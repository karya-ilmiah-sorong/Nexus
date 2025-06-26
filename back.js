document.addEventListener('DOMContentLoaded', function() {
    history.pushState(null, null, location.href);
    window.onpopstate = function() {
        history.go(1);
    };

    document.getElementById('back-btn').addEventListener('click', function() {
        window.location.href = 'menu.html';
    });
});