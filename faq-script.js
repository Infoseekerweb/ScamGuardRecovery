// FAQ Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
});

function initializeFAQ() {
    setupCategoryNavigation();
    setupAccordions();
}

// Category Navigation
function setupCategoryNavigation() {
    const navButtons = document.querySelectorAll('.faq-nav-btn');
    const categories = document.querySelectorAll('.faq-category');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const categoryId = button.dataset.category;
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show selected category
            categories.forEach(category => {
                if (category.id === categoryId) {
                    category.classList.add('active');
                } else {
                    category.classList.remove('active');
                }
            });
            
            // Scroll to top of categories
            document.querySelector('.faq-navigation').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    });
}

// FAQ Accordions
function setupAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            
            // Close all items in this category
            const category = item.closest('.faq-category');
            category.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
}
