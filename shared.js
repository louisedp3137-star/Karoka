// Karoka — shared script (mobile menu + reviews carousel)
// Consolidated from the 7 pages' individually-duplicated <script> blocks.
// See claude/site-notes.md (Round 34) for the history of this change.

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (menu.classList.contains('active') &&
        !menu.contains(event.target) &&
        !toggle.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Reviews carousel -- safe to include on every page: it simply does
// nothing if the page has no #reviewsWidget .review-slide elements
// (e.g. reviews.html, which uses a static list instead of a carousel).
(function() {
    const slides = document.querySelectorAll('#reviewsWidget .review-slide');
    const dots = document.querySelectorAll('#reviewsWidget .review-dot');
    let current = 0;
    let timer;

    function show(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        current = index;
    }

    function restartAuto() {
        clearInterval(timer);
        timer = setInterval(function() {
            show((current + 1) % slides.length);
        }, 6000);
    }

    window.showReview = function(index) {
        show(index);
        restartAuto();
    };

    window.closeReviews = function() {
        document.getElementById('reviewsWidget').style.display = 'none';
        clearInterval(timer);
    };

    if (slides.length) {
        show(Math.floor(Math.random() * slides.length));
        restartAuto();
    }
})();
