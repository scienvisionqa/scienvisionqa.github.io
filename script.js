// Tab navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Handle tab switching
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Scroll to top of content
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#38a169';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // Handle download button clicks
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip demo alert for actual files
            if (this.href && !this.href.includes('#')) {
                return; // Let the real download proceed
            }
            
            e.preventDefault();
            
            // Show alert for demo purposes (replace with actual download logic)
            const fileName = this.textContent.replace('Download ', '');
            alert(`Download for ${fileName} would start here. This is a demo website.`);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to contribution cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe contribution cards
    document.querySelectorAll('.contribution-card, .step-card, .faq-item').forEach(card => {
        observer.observe(card);
    });

    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .contribution-card,
        .step-card,
        .faq-item {
            opacity: 0;
        }
        
        /* Loading animation for buttons */
        .loading {
            position: relative;
            overflow: hidden;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        /* Enhanced table responsiveness */
        @media (max-width: 768px) {
            .table-container {
                position: relative;
            }
            
            .table-container::after {
                content: 'Scroll horizontally →';
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 0.8rem;
                color: #718096;
                background: rgba(255,255,255,0.9);
                padding: 4px 8px;
                border-radius: 4px;
                pointer-events: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Enhanced table interaction for mobile
    const tables = document.querySelectorAll('.table-container');
    tables.forEach(container => {
        const table = container.querySelector('table');
        let isScrolling = false;
        
        container.addEventListener('scroll', () => {
            if (!isScrolling) {
                container.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                isScrolling = true;
            }
            
            clearTimeout(container.scrollTimeout);
            container.scrollTimeout = setTimeout(() => {
                container.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                isScrolling = false;
            }, 150);
        });
    });

    // Add keyboard navigation for tabs
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key >= '1' && e.key <= '6') {
            e.preventDefault();
            const tabIndex = parseInt(e.key) - 1;
            const targetButton = navButtons[tabIndex];
            if (targetButton) {
                targetButton.click();
            }
        }
    });

    // Add search functionality (basic implementation)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search content... (Alt+F)';
    searchInput.style.cssText = `
        position: fixed;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        width: 300px;
        padding: 10px;
        border: 2px solid #667eea;
        border-radius: 25px;
        background: white;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 1000;
        transition: top 0.3s ease;
        font-size: 14px;
    `;
    document.body.appendChild(searchInput);

    // Toggle search with Alt+F
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'f') {
            e.preventDefault();
            const isVisible = searchInput.style.top === '20px';
            searchInput.style.top = isVisible ? '-50px' : '20px';
            if (!isVisible) {
                setTimeout(() => searchInput.focus(), 300);
            }
        }
    });

    // Hide search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && searchInput.style.top === '20px') {
            searchInput.style.top = '-50px';
        }
    });

    // Basic search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length < 2) return;

        const allText = document.querySelectorAll('p, h2, h3, h4, td, th');
        let found = false;

        allText.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                element.style.backgroundColor = '#fff3cd';
                element.style.transition = 'background-color 0.3s ease';
                if (!found) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
            } else {
                element.style.backgroundColor = '';
            }
        });
    });

    // Clear search highlights when search is cleared
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || (e.key === 'Backspace' && this.value.length === 1)) {
            const highlighted = document.querySelectorAll('[style*="background-color: rgb(255, 243, 205)"]');
            highlighted.forEach(el => el.style.backgroundColor = '');
            if (e.key === 'Escape') {
                this.style.top = '-50px';
            }
        }
    });

    // Add tooltips for accessibility
    const elementsWithTooltips = [
        { selector: '.nav-btn', tooltip: 'Navigate to section' },
        { selector: '.download-btn', tooltip: 'Download file' },
        { selector: '.submit-btn', tooltip: 'Send message' },
        { selector: '.positive', tooltip: 'Improvement metric' }
    ];

    elementsWithTooltips.forEach(({ selector, tooltip }) => {
        document.querySelectorAll(selector).forEach(element => {
            element.title = tooltip;
        });
    });
    function replaceLastHyphen(str) {
        const lastIndex = str.lastIndexOf('-');
        if (lastIndex === -1) return str; // No hyphen found
        return str.substring(0, lastIndex) + '/' + str.substring(lastIndex + 1);
    }
    $(document).ready( function () {
        $('#samplesTable').DataTable({
            ajax: {
                url: 'sample_data.json',
                dataSrc: '',
            },
            columns: [
                { 
                    data: 'paper_id',
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html("<a href='https://arxiv.org/pdf/"+replaceLastHyphen(oData.paper_id)+"#page="+oData.page+"' target='_blank'>"+oData.paper_id+"</a>");
                    }
                },
                { data: 'page' },
                { data: 'question', width: '40%' },
                { data: 'answer', width: '40%' },
            ],
            colReorder: {
                enable: true,
            },
            order: [],
            scrollX: true,
            responsive: true
        });
    } );

    console.log('🚀 ScienVisionQA website loaded successfully!');
    console.log('💡 Keyboard shortcuts:');
    console.log('   Alt+1-6: Switch between tabs');
    console.log('   Alt+F: Toggle search');
    console.log('   Escape: Close search');
}); 