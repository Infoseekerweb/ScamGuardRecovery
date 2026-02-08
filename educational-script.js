// Educational Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeEducationalPage();
});

function initializeEducationalPage() {
    setupAccordions();
    setupSmoothScrolling();
    setupCheckboxes();
}

// Accordion functionality for scam types
function setupAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        if (header) {
            header.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                
                // Close all accordions
                accordionItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked accordion if it wasn't active
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Interactive checkboxes
function setupCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('label') || this.closest('.checklist-item') || this.closest('.doc-item') || this.closest('.check-item');
            if (label) {
                if (this.checked) {
                    label.style.opacity = '0.6';
                    label.style.textDecoration = 'line-through';
                } else {
                    label.style.opacity = '1';
                    label.style.textDecoration = 'none';
                }
            }
        });
    });
}
