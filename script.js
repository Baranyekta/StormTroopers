let slideshowInterval = 5000; // Set the desired interval (5 seconds)

document.addEventListener("DOMContentLoaded", function () {
    // Fetch header content
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        fetch('header.html')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.text();
        })
        .then(data => {
            console.log('Header content:', data);  // Check if header content is loaded
            headerContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
    }

    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    let slideshowTimer; // Timer for automatic slide transition

    // Function to update slide positions
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
        });
    }

    // Function to move to the next slide
    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        updateSlides();
    }

    // Function to move to the previous slide
    function prevSlide() {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        updateSlides();
    }

    // Function to start the automatic slideshow
    function startSlideshow() {
        slideshowTimer = setInterval(() => {
            nextSlide();
        }, slideshowInterval);
    }

    // Function to pause the slideshow
    function pauseSlideshow() {
        clearInterval(slideshowTimer);
    }

    // Function to reset the slideshow timer without speeding up
    function resetSlideshowTimer() {
        pauseSlideshow(); // Stop the slideshow
        startSlideshow(); // Restart with the same interval
    }

    // Check if the slideshow arrows exist before adding event listeners
    const rightArrow = document.querySelector(".right-arrow");
    const leftArrow = document.querySelector(".left-arrow");

    if (rightArrow) {
        rightArrow.addEventListener("click", () => {
            pauseSlideshow(); // Pause the slideshow to avoid overlapping transitions
            nextSlide(); // Move to the next slide
            resetSlideshowTimer(); // Reset the slideshow timer without speeding it up
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener("click", () => {
            pauseSlideshow(); // Pause the slideshow to avoid overlapping transitions
            prevSlide(); // Move to the previous slide
            resetSlideshowTimer(); // Reset the slideshow timer without speeding it up
        });
    }

    // Pause slideshow on hover and resume on mouse leave
    const slideshowContainer = document.querySelector(".slideshow-container");
    if (slideshowContainer) {
        slideshowContainer.addEventListener("mouseenter", pauseSlideshow);
        slideshowContainer.addEventListener("mouseleave", resetSlideshowTimer);
    }

    // Initialize the slideshow
    updateSlides();
    startSlideshow(); // Start the automatic slideshow
});

// Modal functionality (Consultation Button)
document.addEventListener("DOMContentLoaded", function () {
    const consultationBtn = document.getElementById("consultation-btn");
    const modal = document.getElementById("consultation-modal");
    const closeBtn = document.querySelector(".close-btn");

    if (consultationBtn && modal && closeBtn) {
        // Open modal when consultation button is clicked
        consultationBtn.addEventListener("click", () => {
            modal.style.display = "block";
        });

        // Close modal when close button is clicked
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close modal when clicking outside the modal
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});
