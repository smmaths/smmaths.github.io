// Blog posts data structure
const blogPosts = [
    {
        title: "The Future of Algorithm Development",
        date: "2024-03-15",
        excerpt: "Exploring the latest trends in algorithm development and their impact on business solutions.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        link: "blog/future-of-algorithm-development.html"
    },
    {
        title: "Web Application Best Practices",
        date: "2024-03-10",
        excerpt: "Essential best practices for developing scalable and maintainable web applications.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        link: "blog/web-application-best-practices.html"
    },
    {
        title: "Mathematics in Modern Business",
        date: "2024-03-05",
        excerpt: "How mathematical models are transforming business decision-making processes.",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        link: "blog/mathematics-in-modern-business.html"
    }
];

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to create blog post cards
function createBlogPostCard(post) {
    return `
        <div class="col-md-6 col-lg-4">
            <div class="card blog-card">
                <img src="${post.image}" class="card-img-top" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text text-muted">${formatDate(post.date)}</p>
                    <p class="card-text">${post.excerpt}</p>
                    <a href="${post.link}" class="btn btn-primary">Read More</a>
                </div>
            </div>
        </div>
    `;
}

// Load blog posts
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (blogContainer) {
        blogContainer.innerHTML = blogPosts.map(post => createBlogPostCard(post)).join('');
    }
}

// Initialize EmailJS
(function() {
    try {
        emailjs.init("I1SjlAeF-i2vTKmxC");
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("Error initializing EmailJS:", error);
    }
})();

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    formStatus.innerHTML = '';

    // Get form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    // Log the form data (for debugging)
    console.log('Sending form data:', formData);

    // Send email using EmailJS
    emailjs.send("service_xj4qzgg","template_xsgwr1h", formData)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            formStatus.innerHTML = '<div class="alert alert-success">Thank you for your message! We will get back to you soon.</div>';
            form.reset();
        })
        .catch(function(error) {
            console.error('EmailJS error details:', error);
            formStatus.innerHTML = '<div class="alert alert-danger">Sorry, there was an error sending your message. Please try again later.</div>';
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load blog posts
    loadBlogPosts();
    
    // Add contact form handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 