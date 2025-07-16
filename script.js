 // Enhanced Starfield Animation with Shooting Stars
        document.addEventListener('DOMContentLoaded', () => {
            const starsContainer = document.getElementById('stars');
            const starCount = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--star-count'));

            // Improved star creation with better distribution
            const createStar = (isShooting = false) => {
                const star = document.createElement('div');
                star.classList.add('star');

                if (isShooting) {
                    star.classList.add('shooting');
                    star.style.left = `${Math.random() * 20}%`;
                    star.style.top = `${Math.random() * 20}%`;
                    star.style.width = '0';
                    star.style.height = '1px';
                    star.style.opacity = '0';
                    return star;
                }

                // Size distribution (more small stars, fewer large ones)
                const sizeCategory = Math.random();
                let size;

                if (sizeCategory > 0.98) { // 2% largest stars
                    size = 3 + Math.random() * 2;
                    star.classList.add('large');
                } else if (sizeCategory > 0.9) { // 8% medium stars
                    size = 1.5 + Math.random() * 1.5;
                } else { // 90% small stars
                    size = 0.5 + Math.random();
                }

                // Position with slight edge avoidance
                const x = Math.min(98, Math.max(2, Math.random() * 100));
                const y = Math.min(98, Math.max(2, Math.random() * 100));

                // Natural twinkle properties
                const baseOpacity = 0.1 + Math.random() * 0.3;
                const peakOpacity = baseOpacity + 0.3 + Math.random() * 0.4;
                const duration = 3 + Math.random() * 7;
                const delay = Math.random() * 15;

                // Apply styles
                star.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}%;
                    top: ${y}%;
                    --opacity: ${peakOpacity};
                    --base-opacity: ${baseOpacity};
                    --duration: ${duration}s;
                    animation-delay: ${delay}s;
                `;

                return star;
            };

            // Create initial stars
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < starCount; i++) {
                fragment.appendChild(createStar());
            }
            starsContainer.appendChild(fragment);

            // Add occasional shooting stars
            function addShootingStar() {
                const shootingStar = createStar(true);
                starsContainer.appendChild(shootingStar);

                // Remove after animation completes
                setTimeout(() => {
                    shootingStar.remove();
                }, 3000);
            }

            // Start shooting star interval
            setInterval(addShootingStar, 5000);

            // Parallax effect for stars on mouse move
            document.addEventListener('mousemove', (e) => {
                const stars = document.querySelectorAll('.star:not(.shooting)');
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;

                stars.forEach((star, index) => {
                    // Larger stars move more than smaller ones
                    const sizeFactor = parseFloat(star.style.width) / 3;
                    const moveX = (x - 0.5) * 20 * sizeFactor;
                    const moveY = (y - 0.5) * 20 * sizeFactor;

                    star.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            });

            // Responsive adjustment
            function adjustStars() {
                const currentStars = document.querySelectorAll('.star:not(.shooting)').length;
                const newCount = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--star-count'));

                if (newCount > currentStars) {
                    const fragment = document.createDocumentFragment();
                    for (let i = currentStars; i < newCount; i++) {
                        fragment.appendChild(createStar());
                    }
                    starsContainer.appendChild(fragment);
                } else if (newCount < currentStars) {
                    const stars = document.querySelectorAll('.star:not(.shooting)');
                    for (let i = currentStars - 1; i >= newCount; i--) {
                        stars[i].remove();
                    }
                }
            }

            window.addEventListener('resize', adjustStars);

            // Add subtle twinkling effect to profile image
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                setInterval(() => {
                    const brightness = 0.9 + Math.random() * 0.2;
                    profileImage.style.filter = `brightness(${brightness})`;
                }, 2000);
            }
        });

        // Social Icons Hide/Show on Scroll
        document.addEventListener('DOMContentLoaded', function () {
            const socialIcons = document.querySelector('.social-icons');
            const landingPage = document.getElementById('landingPage');
            const aboutPage = document.getElementById('aboutPage');

            function handleScroll() {
                const landingRect = landingPage.getBoundingClientRect();
                const aboutRect = aboutPage.getBoundingClientRect();

                // Check if we've scrolled past the landing page
                if (window.scrollY > landingRect.height * 0.7 ||
                    aboutRect.top < window.innerHeight * 0.7) {
                    // Hide social icons
                    socialIcons.classList.remove('social-icons-visible');
                    socialIcons.classList.add('social-icons-hidden');
                } else {
                    // Show social icons
                    socialIcons.classList.remove('social-icons-hidden');
                    socialIcons.classList.add('social-icons-visible');
                }
            }

            // Initial check
            handleScroll();

            // Listen to scroll events with debounce
            let isScrolling;
            window.addEventListener('scroll', function () {
                window.clearTimeout(isScrolling);
                isScrolling = setTimeout(handleScroll, 50);
            }, false);
        });