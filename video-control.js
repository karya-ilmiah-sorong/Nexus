document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.media-video');
    
    videos.forEach(video => {
        video.addEventListener('play', function() {
            videos.forEach(otherVideo => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                }
            });
        });
    });
    
    const videoSources = [
        'https://example.com/video1.mp4',
        'https://example.com/video2.mp4'
    ];
    
    document.querySelectorAll('.media-video').forEach((video, index) => {
        if (index < videoSources.length) {
            video.querySelector('source').src = videoSources[index];
            video.load();
        }
    });
});