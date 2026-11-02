
/* =====================================================
   EBRR WEBSITE — JAVASCRIPT
   Examination Board of Rohingya Refugees
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const siteHeader = document.getElementById("siteHeader");
    const backToTop = document.getElementById("backToTop");
    const yearElement = document.getElementById("year");

    // Automatically display the current year
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile navigation
    function closeMenu() {
        if (!menuToggle || !navigation) return;

        navigation.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        document.body.classList.remove("menu-open");
    }

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            document.body.classList.toggle("menu-open", isOpen);
        });

        // Close menu after clicking a navigation link
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when clicking outside it
        document.addEventListener("click", function (event) {
            const clickedInsideMenu = navigation.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (
                navigation.classList.contains("active") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMenu();
            }
        });

        // Close menu with Escape key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Close menu when screen becomes wider
        window.addEventListener("resize", function () {
            if (window.innerWidth > 780) {
                closeMenu();
            }
        });
    }

    // Header shadow and back-to-top button
    function handleScroll() {
        const scrollPosition = window.scrollY;

        if (siteHeader) {
            siteHeader.classList.toggle("scrolled", scrollPosition > 20);
        }

        if (backToTop) {
            backToTop.classList.toggle("visible", scrollPosition > 400);
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Back-to-top button
    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Highlight the current navigation section
    const navigationLinks = document.querySelectorAll(
        '.navigation a[href^="#"]'
    );

    const pageSections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;

                        navigationLinks.forEach(function (link) {
                            const isCurrent =
                                link.getAttribute("href") === "#" + sectionId;

                            link.classList.toggle("active", isCurrent);
                        });
                    }
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }
        );

        pageSections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

});
