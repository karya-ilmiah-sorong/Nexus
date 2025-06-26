document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    let isZoomed = false;

    function openLightbox(imgSrc, caption) {
        lightbox.style.display = 'block';
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        document.body.style.overflow = 'hidden'; // Mencegah scroll
        isZoomed = false;
        lightboxImg.classList.remove('zoomed');
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('.gallery-photo').forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.src;
            const caption = this.nextElementSibling.textContent;
            openLightbox(imgSrc, caption);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!isZoomed) {
            this.classList.add('zoomed');
            isZoomed = true;
        } else {
            this.classList.remove('zoomed');
            isZoomed = false;
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});