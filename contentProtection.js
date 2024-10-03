// contentProtection.js

// Function to prevent default actions
function preventDefaults(e) {
    e.preventDefault();
}

// Disable right-click
document.addEventListener('contextmenu', preventDefaults);

// Disable keyboard shortcuts for saving (e.g., Ctrl+S)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && e.key === 's') || (e.key === 'F12') || (e.key === 'I')) {
        preventDefaults(e);
    }
});

// Disable text selection
document.addEventListener('mousedown', preventDefaults);

// Prevent drag-and-drop
document.addEventListener('dragstart', preventDefaults);

// Prevent copy-pasting
document.addEventListener('copy', preventDefaults);

// Prevent image saving using a canvas trick
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', preventDefaults);
    });
});

// Disable print functionality
window.onbeforeprint = preventDefaults;


// Create a style element and append styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Overlay to block screenshots
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';

overlay.style.zIndex = '9999';
overlay.style.pointerEvents = 'none';
document.body.appendChild(overlay);

// Alert when dev tools are opened (detects changes in viewport)
let devToolsOpen = false;
const threshold = 160;

setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold && !devToolsOpen) {
        devToolsOpen = true;
        alert("Please do not use developer tools.");
    } else if (!widthThreshold) {
        devToolsOpen = false;
    }
}, 1000);
