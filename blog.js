/* ═══════════════════════════════════════════════════════════════════════
   🏔️ TREP DAWOUD - Blog Renderer
   ═══════════════════════════════════════════════════════════════════════
   يعرض المقالات من data_blog.js بتصميم OLED + Neon */

let blogApp = {
    posts: [],
    displayedCount: 0,
    itemsPerLoad: 6
};

document.addEventListener('DOMContentLoaded', () => {
    blogApp.posts = BLOG_POSTS;
    initializeBlog();
    initializeSnowEffect();
    initializeLightRays();
    addBlogVibrationHandlers();
});

function initializeBlog() {
    const blogGrid = document.getElementById('blogGrid');
    const initialPosts = blogApp.posts.slice(0, blogApp.itemsPerLoad);

    initialPosts.forEach((post, index) => {
        const delay = index * 0.1;
        const card = createBlogCard(post, delay);
        blogGrid.appendChild(card);
    });

    blogApp.displayedCount = blogApp.itemsPerLoad;

    // Handle load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (blogApp.displayedCount >= blogApp.posts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.addEventListener('click', loadMoreBlogPosts);
    }
}

function createBlogCard(post, delay = 0) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.style.animationDelay = `${delay}s`;
    
    const formattedDate = formatDate(post.date);
    
    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-image" onerror="this.src='images/logo.jpg'">
        <div class="blog-content">
            <div class="blog-date">
                <i class="fas fa-calendar-alt"></i>
                ${formattedDate}
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-author">
                <i class="fas fa-user"></i>
                ${post.author}
            </div>
            <div class="blog-read-more">
                <i class="fas fa-arrow-left"></i>
                اقرأ المزيد
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        triggerVibration(card);
        openBlogModal(post);
    });
    
    return card;
}

function triggerVibration(card) {
    card.classList.add('vibrate');
    
    if (navigator.vibrate) {
        navigator.vibrate([10, 20, 10]);
    }
    
    setTimeout(() => {
        card.classList.remove('vibrate');
    }, 300);
}

function addBlogVibrationHandlers() {
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('touchstart', () => {
            triggerVibration(card);
        });
    });
}

function openBlogModal(post) {
    const blogModal = document.getElementById('blog-modal');
    const modalContent = blogModal.querySelector('.modal-content');
    
    const formattedDate = formatDate(post.date);
    const contentParagraphs = post.content.split('\n').map(p => `<p>${p}</p>`).join('');

    const html = `
        <button class="blog-modal-close">
            <i class="fas fa-times"></i>
        </button>
        <img src="${post.image}" alt="${post.title}" class="blog-modal-image" onerror="this.src='images/logo.jpg'">
        <h2 class="blog-modal-title">${post.title}</h2>
        <div class="blog-modal-meta">
            <span><i class="fas fa-calendar-alt"></i> ${formattedDate}</span>
            <span><i class="fas fa-user"></i> ${post.author}</span>
            <span><i class="fas fa-tag"></i> ${post.category}</span>
        </div>
        <div class="blog-modal-body">
            ${contentParagraphs}
        </div>
    `;

    modalContent.innerHTML = html;
    blogModal.classList.add('active');

    // Close button
    modalContent.querySelector('.blog-modal-close').addEventListener('click', () => {
        blogModal.classList.remove('active');
    });
}

function loadMoreBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    const nextPosts = blogApp.posts.slice(
        blogApp.displayedCount,
        blogApp.displayedCount + blogApp.itemsPerLoad
    );

    nextPosts.forEach((post, index) => {
        const delay = index * 0.1;
        const card = createBlogCard(post, delay);
        blogGrid.appendChild(card);
    });

    blogApp.displayedCount += blogApp.itemsPerLoad;

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (blogApp.displayedCount >= blogApp.posts.length) {
        loadMoreBtn.style.display = 'none';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', options);
}

/* Snow Effect */
function initializeSnowEffect() {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-effect';
    document.body.appendChild(snowContainer);

    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❅';
        
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 5;
        const randomDuration = 8 + Math.random() * 5;
        const randomSway = (Math.random() - 0.5) * 100;
        
        snowflake.style.left = randomX + 'px';
        snowflake.style.animationDelay = randomDelay + 's';
        snowflake.style.animationDuration = randomDuration + 's';
        snowflake.style.setProperty('--snowX', randomSway + 'px');
        
        snowContainer.appendChild(snowflake);
    }
}

/* Light Rays Effect */
function initializeLightRays() {
    const lightContainer = document.createElement('div');
    lightContainer.className = 'light-rays';
    document.body.appendChild(lightContainer);

    const rayCount = 5;
    
    for (let i = 0; i < rayCount; i++) {
        const ray = document.createElement('div');
        ray.className = 'light-ray';
        
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 4;
        
        ray.style.left = randomX + 'px';
        ray.style.animationDelay = randomDelay + 's';
        
        lightContainer.appendChild(ray);
    }
}

document.addEventListener('click', (e) => {
    const blogModal = document.getElementById('blog-modal');
    if (e.target === blogModal) {
        blogModal.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const blogModal = document.getElementById('blog-modal');
        blogModal.classList.remove('active');
    }
});
