// Parallax Effect for Hero Section
document.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;
    const hero = document.getElementById("hero");

    hero.style.backgroundPositionY = scrollPosition * 0.4 + "px";
});

// 3D Rotation for Title
document.getElementById("title3D").addEventListener("mousemove", (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    e.target.style.transform = `perspective(500px) rotateY(${x / 20}deg) rotateX(${y / -20}deg)`;
});

document.getElementById("title3D").addEventListener("mouseleave", (e) => {
    e.target.style.transform = "perspective(500px) rotateY(0deg) rotateX(0deg)";
});


// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent page refresh on submit

    // Simulate form data processing
    const formMessage = document.getElementById("formMessage");
    formMessage.textContent = "Sending message...";
    
    setTimeout(() => {
        // Display success message
        formMessage.textContent = "Thank you! Your message has been sent.";
        
        // Clear form
        document.getElementById("contactForm").reset();
    }, 2000); // Simulate a delay for form processing
}
