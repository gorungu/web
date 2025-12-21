const fallbackImages = document.querySelectorAll("img[data-fallback]");

fallbackImages.forEach((img) => {
    img.addEventListener(
        "error",
        () => {
            const fallback = img.getAttribute("data-fallback");
            if (fallback) {
                img.src = fallback;
            }
        },
        { once: true }
    );
});

const downloadModal = document.getElementById("apk-download-modal");
const downloadTriggers = document.querySelectorAll("[data-download-modal]");
let pendingDownload = null;

const openDownloadModal = () => {
    if (!downloadModal) {
        return;
    }
    downloadModal.classList.add("is-open");
    downloadModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const focusTarget =
        downloadModal.querySelector("[data-modal-confirm]") ||
        downloadModal.querySelector("[data-modal-close]");
    if (focusTarget) {
        focusTarget.focus();
    }
};

const closeDownloadModal = () => {
    if (!downloadModal) {
        return;
    }
    downloadModal.classList.remove("is-open");
    downloadModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    pendingDownload = null;
};

const setPendingDownload = (trigger) => {
    const href = trigger.getAttribute("href");
    if (!href) {
        pendingDownload = null;
        return;
    }
    pendingDownload = {
        href,
        download: trigger.getAttribute("download"),
    };
};

const startPendingDownload = () => {
    if (!pendingDownload) {
        return;
    }
    const link = document.createElement("a");
    link.href = pendingDownload.href;
    link.setAttribute("download", pendingDownload.download || "");
    document.body.appendChild(link);
    link.click();
    link.remove();
    pendingDownload = null;
};

if (downloadModal && downloadTriggers.length) {
    downloadTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            setPendingDownload(trigger);
            openDownloadModal();
        });
    });

    downloadModal.addEventListener("click", (event) => {
        if (event.target === downloadModal) {
            closeDownloadModal();
        }
    });

    downloadModal.querySelectorAll("[data-modal-close]").forEach((button) => {
        button.addEventListener("click", () => {
            closeDownloadModal();
        });
    });

    const confirmButton = downloadModal.querySelector("[data-modal-confirm]");
    if (confirmButton) {
        confirmButton.addEventListener("click", () => {
            startPendingDownload();
            closeDownloadModal();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && downloadModal.classList.contains("is-open")) {
            closeDownloadModal();
        }
    });
}

/* Mobile Menu Toggle */
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinksGroup = document.querySelectorAll('.nav-links a, .nav-cta a');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('is-active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when any link is clicked
    navLinksGroup.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

function openMenu() {
    menuToggle.classList.add('is-active');
    navMenu.classList.add('is-active');
    document.body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
    menuToggle.classList.remove('is-active');
    navMenu.classList.remove('is-active');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
}
