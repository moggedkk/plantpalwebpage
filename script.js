// Typewriter Effect
const text = "AI-assisted smart plant care system that listens to your plants and talks to you.";
const speed = 50; 
let i = 0;

function typeWriter() {
    const target = document.getElementById("typewriter-text");
    if (target && i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// Email Signup Logic
async function handleSignup(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('signup-email');
    const signupBtn = document.getElementById('signup-btn');
    const messageDiv = document.getElementById('signup-message');
    const email = emailInput.value;

    // Reset UI
    messageDiv.className = 'mt-3 small';
    messageDiv.innerText = '';
    signupBtn.disabled = true;
    signupBtn.innerText = 'Sending...';

    try {
        const response = await fetch('https://plantpal.david-nawloka.at/api/v1/email-signups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.classList.add('text-success');
            messageDiv.innerText = 'Thank you! You have successfully signed up.';
            emailInput.value = '';
        } else {
            messageDiv.classList.add('text-danger');
            messageDiv.innerText = data.detail || 'Failed to sign up. Please try again.';
        }
    } catch (error) {
        messageDiv.classList.add('text-danger');
        messageDiv.innerText = 'An error occurred. Please check your connection.';
        console.error('Signup error:', error);
    } finally {
        signupBtn.disabled = false;
        signupBtn.innerText = 'Sign Up';
    }
}

// Initialize on Load
window.onload = () => {
    typeWriter();
    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
};
