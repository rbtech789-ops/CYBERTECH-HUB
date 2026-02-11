// 1. Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

// 2. Typing Effect for the Header
const textElement = document.querySelector('.typing-text');
const words = ["Cybertech Hub", "Tour  DMC", "Tech Solutions"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500); // Pause before next word
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start the typing effect when page loads
document.addEventListener('DOMContentLoaded', type);

// 3. Simple Form Alert (Since we don't have a backend yet)
// const form = document.getElementById('contactForm');
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert("Thank you! Cybertech Hub will contact you shortly.");
//     form.reset();
// });
// 3. Send Details to WhatsApp
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the page from reloading

    // 1. Get the values the customer typed
    let name = form.querySelector('input[type="text"]').value;
    let mobile = form.querySelector('input[type="number"]').value;
    let message = form.querySelector('textarea').value;

    // 2. Create the WhatsApp Message format
    // (%0a makes a new line)
    let whatsappText = `*New Customer Enquiry!*%0a%0a` +
                       `👤 *Name:* ${name}%0a` +
                       `📞 *Mobile:* ${mobile}%0a` +
                       `📝 *Message:* ${message}`;

    // 3. Create the WhatsApp Link (Your Number: 9382344882)
    let whatsappUrl = `https://wa.me/919382344882?text=${whatsappText}`;

    // 4. Open WhatsApp
    window.open(whatsappUrl, '_blank');
    alert("Thank you! Cybertech Hub will contact you shortly.");
    
    // 5. Clear the form
    form.reset();
});