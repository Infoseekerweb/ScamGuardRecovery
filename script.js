// ==================== DATA STORAGE ====================
const scamDatabase = [
    {
        id: 1,
        type: 'crypto',
        title: 'Bitcoin Doubler Investment',
        description: 'Website promises to double your Bitcoin in 24 hours. Classic Ponzi scheme that disappears with your money.',
        contact: 'crypto-invest-2x.com',
        date: '2024-02-05',
        votes: 234,
        dangerLevel: 3,
        reported: true
    },
    {
        id: 2,
        type: 'phishing',
        title: 'Fake Amazon Security Alert',
        description: 'Email claiming suspicious activity on Amazon account. Links to fake login page stealing credentials.',
        contact: 'security@amazon-verify.com',
        date: '2024-02-06',
        votes: 189,
        dangerLevel: 3,
        reported: true
    },
    {
        id: 3,
        type: 'romance',
        title: 'Military Romance Scam',
        description: 'Fake military personnel on dating apps requesting money for emergencies or travel expenses.',
        contact: 'Various dating platforms',
        date: '2024-02-04',
        votes: 156,
        dangerLevel: 2,
        reported: true
    },
    {
        id: 4,
        type: 'investment',
        title: 'Forex Trading "Mentor"',
        description: 'Instagram influencer promises guaranteed returns with forex signals. Requires upfront payment for course.',
        contact: '@forexguru_millions',
        date: '2024-02-07',
        votes: 203,
        dangerLevel: 2,
        reported: true
    },
    {
        id: 5,
        type: 'phishing',
        title: 'IRS Tax Refund Scam',
        description: 'Email claiming you have an unclaimed tax refund. Asks for banking details to "deposit" money.',
        contact: 'refunds@irs-treasury.org',
        date: '2024-02-03',
        votes: 312,
        dangerLevel: 3,
        reported: true
    },
    {
        id: 6,
        type: 'crypto',
        title: 'NFT Minting Scam',
        description: 'Fake NFT project with Discord server. Phishing links steal wallet credentials during "minting".',
        contact: 'discord.gg/fake-nft-proj',
        date: '2024-02-08',
        votes: 98,
        dangerLevel: 2,
        reported: true
    }
];

const testimonials = [
    {
        name: 'Sarah M.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        loss: '$8,500',
        lossType: 'Crypto investment scam',
        saved: '$8,500',
        savedType: 'Identified scam before sending',
        quote: 'I was about to invest in a "guaranteed return" crypto platform. Searched it on ScamGuard Recovery and found 15 reports. Dodged a bullet thanks to this community!'
    },
    {
        name: 'James T.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        loss: '$3,200',
        lossType: 'Romance scam',
        saved: 'Prevented Further Loss',
        savedType: 'Reported scammer, helped 3 others',
        quote: 'After falling for a romance scam, I reported it here. The community helped me understand the tactics, and my report prevented three other people from losing money to the same scammer.'
    },
    {
        name: 'Maria R.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        loss: '$15,000',
        lossType: 'Investment Ponzi scheme',
        saved: '$15,000',
        savedType: 'Found warning before investing',
        quote: 'A colleague recommended an "exclusive investment opportunity." Before transferring funds, I checked here and found it was a classic Ponzi scheme. Shared the report with my colleague too!'
    },
    {
        name: 'David K.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        loss: '$1,200',
        lossType: 'Phishing attack',
        saved: 'Recovered Evidence',
        savedType: 'Community helped file police report',
        quote: 'Got phished via fake PayPal email. The ScamGuard community walked me through documenting everything and filing a proper report. Still fighting to recover funds, but I\'m not alone in this.'
    },
    {
        name: 'Lisa P.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
        loss: '$25,000',
        lossType: 'Fake investment platform',
        saved: '$25,000',
        savedType: 'Community confirmed it was fake',
        quote: 'My elderly mother almost wired $25K to a "wealth manager." I searched the company here first and found dozens of warnings. We reported them immediately. Thank you for saving her retirement!'
    },
    {
        name: 'Michael B.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
        loss: '$6,800',
        lossType: 'NFT minting scam',
        saved: '$6,800',
        savedType: 'Spotted fake Discord before minting',
        quote: 'Got excited about an NFT drop, but something felt off. Checked ScamGuard Recovery and found it was a phishing operation. You guys saved me from losing my entire crypto wallet!'
    }
];

// ==================== STATE MANAGEMENT ====================
let currentFilter = 'all';
let votedScams = JSON.parse(localStorage.getItem('votedScams') || '[]');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    animateStats();
    renderFilters();
    renderScams();
    renderTrending();
    renderTestimonials();
    setupScrollAnimations();
    setupScrollToTop();
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Form submission
    const reportForm = document.getElementById('reportForm');
    reportForm.addEventListener('submit', submitReport);

    // Header scroll effect
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
}

// ==================== ANIMATED STATISTICS ====================
function animateStats() {
    const stats = [
        { id: 'totalReports', target: 1247, prefix: '', suffix: '' },
        { id: 'totalUsers', target: 8521, prefix: '', suffix: '' },
        { id: 'preventedLoss', target: 2.4, prefix: '$', suffix: 'M' }
    ];

    stats.forEach(stat => {
        animateCounter(stat.id, stat.target, stat.prefix, stat.suffix);
    });
}

function animateCounter(elementId, target, prefix = '', suffix = '') {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
            current = target;
            clearInterval(timer);
        }

        const displayValue = elementId === 'preventedLoss' 
            ? current.toFixed(1) 
            : Math.floor(current).toLocaleString();
        
        element.textContent = prefix + displayValue + suffix;
    }, duration / steps);
}

// ==================== FILTER RENDERING ====================
function renderFilters() {
    const filtersContainer = document.getElementById('filters');
    const filters = [
        { type: 'all', label: 'All Types' },
        { type: 'crypto', label: 'Cryptocurrency' },
        { type: 'investment', label: 'Investment' },
        { type: 'romance', label: 'Romance' },
        { type: 'phishing', label: 'Phishing' }
    ];

    filtersContainer.innerHTML = filters.map(filter => `
        <button class="filter-btn ${filter.type === 'all' ? 'active' : ''}" 
                onclick="filterScams('${filter.type}', event)">
            ${filter.label}
        </button>
    `).join('');
}

function filterScams(type, event) {
    currentFilter = type;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderScams();
}

// ==================== SCAM RENDERING ====================
function renderScams(scams = scamDatabase) {
    const grid = document.getElementById('scamGrid');
    
    const filteredScams = currentFilter === 'all' 
        ? scams 
        : scams.filter(s => s.type === currentFilter);

    grid.innerHTML = '';

    filteredScams.forEach((scam, index) => {
        const card = createScamCard(scam);
        grid.appendChild(card);
        
        // Stagger animation
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
}

function createScamCard(scam) {
    const card = document.createElement('div');
    card.className = 'scam-card';

    const typeLabels = {
        crypto: 'Cryptocurrency',
        investment: 'Investment',
        romance: 'Romance',
        phishing: 'Phishing'
    };

    const isVoted = votedScams.includes(scam.id);

    card.innerHTML = `
        <span class="scam-type ${scam.type}">${typeLabels[scam.type]}</span>
        <h3 class="scam-title">${scam.title}</h3>
        <p class="scam-description">${scam.description}</p>
        ${scam.contact ? `<p style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.5rem;">📧 ${scam.contact}</p>` : ''}
        <div class="scam-meta">
            <div>
                <div class="scam-date">${formatDate(scam.date)}</div>
                <div class="danger-level" style="margin-top: 0.5rem;">
                    ${Array(3).fill(0).map((_, i) => 
                        `<span class="danger-dot ${i < scam.dangerLevel ? 'active' : ''}"></span>`
                    ).join('')}
                </div>
            </div>
            <div class="vote-section">
                <button class="vote-btn ${isVoted ? 'voted' : ''}" onclick="voteScam(${scam.id})">
                    👍 <span class="vote-count">${scam.votes}</span>
                </button>
            </div>
        </div>
    `;

    return card;
}

function renderTrending() {
    const trending = [...scamDatabase]
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 6);

    const grid = document.getElementById('trendingGrid');
    grid.innerHTML = '';

    trending.forEach((scam, index) => {
        const card = createScamCard(scam);
        grid.appendChild(card);
        
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
}

// ==================== TESTIMONIALS RENDERING ====================
function renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    
    testimonials.forEach((testimonial, index) => {
        const card = createTestimonialCard(testimonial);
        grid.appendChild(card);
        
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 150);
    });
}

function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    card.innerHTML = `
        <div class="testimonial-header">
            <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
            <div class="testimonial-info">
                <h4>${testimonial.name}</h4>
                <p>Verified User</p>
            </div>
        </div>
        <div class="loss-box">
            <p>❌ ${testimonial.loss.startsWith('$') ? 'Nearly Lost' : 'Lost'}: ${testimonial.loss}</p>
            <p>${testimonial.lossType}</p>
        </div>
        <div class="recovery-box">
            <p>✅ ${testimonial.saved.startsWith('$') ? 'Saved' : testimonial.saved}</p>
            <p>${testimonial.savedType}</p>
        </div>
        <p class="testimonial-quote">${testimonial.quote}</p>
        <p class="testimonial-credit">— Helped by ScamGuard Recovery</p>
    `;
    
    return card;
}

// ==================== SEARCH FUNCTIONALITY ====================
function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) return;

    // Add search animation
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        searchBtn.style.transform = '';
    }, 200);

    const results = scamDatabase.filter(scam => 
        scam.title.toLowerCase().includes(query) ||
        scam.description.toLowerCase().includes(query) ||
        (scam.contact && scam.contact.toLowerCase().includes(query))
    );

    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const resultsDiv = document.getElementById('searchResults');
    const resultsContent = document.getElementById('resultsContent');

    resultsDiv.classList.remove('hidden');

    if (results.length === 0) {
        resultsContent.innerHTML = `
            <div class="no-results">
                <h3>✅ No scams found matching "${query}"</h3>
                <p>This is good news! However, always stay vigilant and trust your instincts.</p>
                <p style="margin-top: 1rem;">If you suspect this might be a scam, please report it to help others.</p>
            </div>
        `;
    } else {
        resultsContent.innerHTML = `
            <div class="alert-badge high">⚠️ WARNING: ${results.length} Scam Report${results.length > 1 ? 's' : ''} Found</div>
            ${results.map(scam => `
                <div class="result-item">
                    <span class="scam-type ${scam.type}">${scam.type.toUpperCase()}</span>
                    <h3 style="margin: 0.5rem 0;">${scam.title}</h3>
                    <p style="color: var(--text-gray);">${scam.description}</p>
                    ${scam.contact ? `<p style="margin-top: 0.5rem; color: var(--primary); font-weight: 600;">Reported Contact: ${scam.contact}</p>` : ''}
                    <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-gray);">
                        ${scam.votes} people confirmed this as a scam
                    </p>
                </div>
            `).join('')}
        `;
    }

    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==================== VOTING SYSTEM ====================
function voteScam(id) {
    const scam = scamDatabase.find(s => s.id === id);
    if (!scam) return;

    if (votedScams.includes(id)) {
        scam.votes--;
        votedScams = votedScams.filter(v => v !== id);
    } else {
        scam.votes++;
        votedScams.push(id);
    }

    localStorage.setItem('votedScams', JSON.stringify(votedScams));
    
    // Update UI with animation
    const voteButtons = document.querySelectorAll(`[onclick="voteScam(${id})"]`);
    voteButtons.forEach(btn => {
        btn.classList.add('voted');
        const countSpan = btn.querySelector('.vote-count');
        if (countSpan) {
            countSpan.textContent = scam.votes;
            countSpan.style.transform = 'scale(1.3)';
            setTimeout(() => {
                countSpan.style.transform = '';
            }, 300);
        }
    });

    renderScams();
    renderTrending();
}

// ==================== TAB SWITCHING ====================
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// ==================== FORM SUBMISSION ====================
function submitReport(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.classList.add('loading');

    // Simulate submission delay
    setTimeout(() => {
        const newScam = {
            id: scamDatabase.length + 1,
            type: document.getElementById('scamType').value,
            title: document.getElementById('scamTitle').value,
            description: document.getElementById('scamDescription').value,
            contact: document.getElementById('scamContact').value,
            date: new Date().toISOString().split('T')[0],
            votes: 1,
            dangerLevel: parseInt(document.getElementById('dangerLevel').value),
            reported: true
        };

        scamDatabase.unshift(newScam);
        
        document.getElementById('successMessage').classList.add('show');
        e.target.reset();
        submitBtn.classList.remove('loading');
        
        setTimeout(() => {
            document.getElementById('successMessage').classList.remove('show');
            switchTab('recent');
        }, 3000);

        renderScams();
        renderTrending();
        animateStats();
    }, 1500);
}

// ==================== SCROLL ANIMATIONS ====================
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all animatable elements
    document.querySelectorAll('.scam-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// ==================== SCROLL TO TOP ====================
function setupScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove('hidden');
        } else {
            scrollBtn.classList.add('hidden');
        }
    });
}

// ==================== HEADER SCROLL EFFECT ====================
function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// ==================== UTILITY FUNCTIONS ====================
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
        // Auto-suggest could be implemented here
    }, 300));
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c🛡️ ScamGuard Recovery', 'color: #dc2626; font-size: 24px; font-weight: bold;');
console.log('%cProtecting the community, one report at a time.', 'color: #64748b; font-size: 14px;');
console.log('%cFounded by infoseeker_web', 'color: #059669; font-size: 12px;');