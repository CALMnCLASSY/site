// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Tab functionality
document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.demo-pane').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Case study functionality
document.querySelectorAll('.case-study').forEach(caseStudy => {
    caseStudy.addEventListener('click', () => {
        const details = caseStudy.querySelector('.case-details');
        details.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.close-case').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.case-details').forEach(d => d.classList.remove('active'));
        document.body.style.overflow = '';
    });
});


// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle mobile menu visibility
            mainNav.classList.toggle('mobile-menu-active');
            
            // Change icon between bars and times
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('mobile-menu-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// Chat toggle
const chatToggle = document.querySelector('.chat-toggle');
const chatWindow = document.querySelector('.chat-window');

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    // Simple chatbot responses
    const chatInput = document.querySelector('.chat-input input');
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const userMessage = chatInput.value;
            addMessage(userMessage, 'user');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const responses = [
                    "Our web development services include...",
                    "For cloud solutions, we offer...",
                    "I can connect you with a specialist for that question."
                ];
                addMessage(responses[Math.floor(Math.random() * responses.length)], 'bot');
            }, 1000);
        }
    });

    function addMessage(text, sender) {
        const messages = document.querySelector('.chat-messages');
        const message = document.createElement('div');
        message.classList.add('message', sender);
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }
}

// Knowledge base search
const kbSearch = document.querySelector('.search-box input');
const kbResults = document.querySelector('.kb-results');

if (kbSearch) {
    kbSearch.addEventListener('input', () => {
        const searchTerm = kbSearch.value.toLowerCase();
        const items = document.querySelectorAll('.kb-item');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });
}

// Animated counter
const counters = document.querySelectorAll('.result-value');
counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const increment = target / 30;
    let current = 0;
    
    const updateCount = () => {
        if (current < target) {
            current += increment;
            counter.innerText = Math.ceil(current);
            setTimeout(updateCount, 50);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

// Tab functionality
document.querySelectorAll('.tab-button').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and panes
        document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.maxHeight;
        
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(a => {
            a.style.maxHeight = null;
            a.previousElementSibling.querySelector('i').classList.remove('fa-chevron-up');
            a.previousElementSibling.querySelector('i').classList.add('fa-chevron-down');
        });
        
        // Open clicked answer if it was closed
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            question.querySelector('i').classList.remove('fa-chevron-down');
            question.querySelector('i').classList.add('fa-chevron-up');
        }
    });
});

// Testimonial Slider
const slider = document.querySelector('.testimonial-slider');
if (slider) { // Ensure slider exists before proceeding
    const slides = Array.from(slider.querySelectorAll('.testimonial-slide'));
    const dotsContainer = slider.querySelector('.slider-dots');
    const prevButton = slider.querySelector('.slider-prev');
    const nextButton = slider.querySelector('.slider-next');

    let currentSlide = 0; // Initialize currentSlide to 0

    // Function to create dots
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                showSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Function to update dots
    function updateDots() {
        if (dotsContainer) { // Ensure dotsContainer exists
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    // Function to show a specific slide
    function showSlide(index) {
        // Ensure index is within bounds
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach((slide, i) => {
            if (i === currentSlide) { // Use currentSlide for comparison
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        updateDots();
    }

    // Navigation functions
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }

    // Initial setup
    createDots(); 
    showSlide(currentSlide); 
    setInterval(nextSlide, 8000); 
}

// Case Study Cards
document.querySelectorAll('.case-study').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if(count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Start counters when section is in view
window.addEventListener('scroll', function() {
    const statsSection = document.querySelector('.stats-section');
    
    // Only proceed if the stats section exists on this page
    if (statsSection) {
        const position = statsSection.getBoundingClientRect();
        
        if(position.top < window.innerHeight && position.bottom >= 0) {
            animateCounters();
        }
    }
});

// Case Studies Filtering
document.querySelectorAll('.case-filters select').forEach(select => {
    select.addEventListener('change', filterCaseStudies);
});

function filterCaseStudies() {
    const industry = document.getElementById('industry').value;
    const service = document.getElementById('service').value;
    
    document.querySelectorAll('.case-study-card').forEach(card => {
        const cardIndustry = card.getAttribute('data-industry');
        const cardService = card.getAttribute('data-service');
        
        const industryMatch = industry === 'all' || industry === cardIndustry;
        const serviceMatch = service === 'all' || service === cardService;
        
        card.style.display = industryMatch && serviceMatch ? 'block' : 'none';
    });
}

// Case Study Modal
document.querySelectorAll('.case-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const caseStudyUrl = this.getAttribute('href');
        loadCaseStudy(caseStudyUrl);
    });
});

function loadCaseStudy(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector('.modal-body').innerHTML = html;
            document.getElementById('caseModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        })
        .catch(error => {
            console.error('Error loading case study:', error);
            // Fallback to regular link if fetch fails
            window.location.href = url;
        });
}

document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('caseModal').style.display = 'none';
    document.body.style.overflow = '';
});

// Close modal when clicking outside content
document.getElementById('caseModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = '';
    }
});