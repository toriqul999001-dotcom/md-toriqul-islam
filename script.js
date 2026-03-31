// পেজ লোড ও পপ-আপ লজিক
window.onload = function() {
    const popup = document.getElementById('welcome-popup');
    if(popup) {
        popup.style.display = 'flex';
    }
    renderFeed();
};

function closePopup() {
    document.getElementById('welcome-popup').style.display = 'none';
}

// ----------------------------------------------------
// স্ক্রল অ্যানিমেশন (Scroll Intersection Observer)
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
            }
        });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-bottom');
    hiddenElements.forEach((el) => observer.observe(el));
});

// ----------------------------------------------------
// কন্টাক্ট ফর্ম লজিক - (জিমেইল অ্যাপ ওপেন করবে)
// ----------------------------------------------------
var contactForm = document.getElementById("contact-form");
if(contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // পেজ রিলোড হওয়া বন্ধ করবে
        
        // ইনপুট বক্স থেকে সঠিক ID দিয়ে ডাটা নেওয়া
        var name = document.getElementById("senderName").value;
        var email = document.getElementById("senderEmail").value;
        var message = document.getElementById("senderMessage").value;
        var status = document.getElementById("form-status");

        // ইমেইল অ্যাপের জন্য সাবজেক্ট এবং বডি তৈরি
        var mailSubject = encodeURIComponent("Portfolio Message from " + name);
        var mailBody = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);

        // সরাসরি জিমেইল বা মেইল অ্যাপ ওপেন করার আসল কমান্ড
        window.location.href = "mailto:toriqul8810@gmail.com?subject=" + mailSubject + "&body=" + mailBody;

        // বাটনের নিচে স্ট্যাটাস দেখানো
        if(status) {
            status.innerHTML = "Opening Email App... Just click send!";
            status.style.color = "#00f2ff";
        }
        
        contactForm.reset(); // ফরম খালি করে দেওয়া
    });
}

// ----------------------------------------------------
// পাবলিক ওয়াল লজিক
// ----------------------------------------------------
function addPost() {
    const input = document.getElementById('postInput');
    const content = input.value.trim();
    if (!content) return;
    const posts = JSON.parse(localStorage.getItem('toriqul_posts_full') || '[]');
    posts.unshift({ id: Date.now(), text: content, date: new Date().toLocaleString() });
    localStorage.setItem('toriqul_posts_full', JSON.stringify(posts));
    input.value = '';
    renderFeed();
}

function renderFeed() {
    const container = document.getElementById('postContainer');
    if(!container) return;
    const posts = JSON.parse(localStorage.getItem('toriqul_posts_full') || '[]');
    container.innerHTML = posts.map(p => `
        <div class="glass" style="padding: 25px; margin-top: 20px; border-left: 5px solid #00f2ff;">
            <p style="color: #ccc; font-size: 15px; line-height: 1.6;">${p.text}</p>
            <small style="color: #444; display: block; margin-top: 15px; font-weight: 600;">${p.date}</small>
        </div>
    `).join('');
}