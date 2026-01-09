/**
 * TREP DAWOUD - Modal System
 * Enhanced modal functionality for blog system
 */

class ModalSystem {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
        });
    }

    openModal(content, options = {}) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay show';
        modalOverlay.id = 'customModal';

        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.onclick = () => this.closeModal();

        // Add content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = content;

        // Assemble modal
        modalContainer.appendChild(closeBtn);
        modalContainer.appendChild(modalContent);
        modalOverlay.appendChild(modalContainer);

        // Add to body
        document.body.appendChild(modalOverlay);
        this.activeModal = modalOverlay;

        // Add click outside to close
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        return modalOverlay;
    }

    closeModal() {
        if (this.activeModal) {
            this.activeModal.remove();
            this.activeModal = null;
            document.body.style.overflow = '';
        }
    }

    // Utility method to create blog modal content
    createBlogModalContent(post) {
        return `
            <div class="modal-header">
                <h2 class="modal-title">${post.title}</h2>
                <div class="modal-meta">
                    <span class="modal-meta-item">
                        <i class="fas fa-user"></i> ${post.author}
                    </span>
                    <span class="modal-meta-item">
                        <i class="fas fa-calendar"></i> ${this.formatDate(post.date)}
                    </span>
                    <span class="modal-meta-item">
                        <i class="fas fa-clock"></i> ${post.readTime}
                    </span>
                </div>
            </div>

            <img src="${post.image}" alt="${post.title}" class="modal-image">

            <div class="modal-content">
                <p class="modal-excerpt">${post.excerpt}</p>
                <div class="modal-full-content">${post.content}</div>

                <div class="modal-tags">
                    ${post.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
                </div>

                <div class="modal-actions">
                    <button class="modal-btn secondary" onclick="window.modalSystem.sharePost(${post.id})">
                        <i class="fas fa-share-alt"></i> مشاركة
                    </button>
                    <button class="modal-btn primary" onclick="window.modalSystem.closeModal()">
                        إغلاق
                    </button>
                </div>
            </div>
        `;
    }

    sharePost(postId) {
        // This would be implemented in the main blog system
        console.log('Sharing post:', postId);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Initialize modal system
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔲 Initializing modal system...');
    window.modalSystem = new ModalSystem();
});
