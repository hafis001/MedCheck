// contentProtection.js

// Function to prevent default actions
function preventDefaults(e) {
    e.preventDefault();
}

// Disable right-click
document.addEventListener('contextmenu', preventDefaults);

// Disable keyboard shortcuts for saving (e.g., Ctrl+S)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 's') {
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

// Apply styles dynamically (could be replaced with a link to a CSS file)
const styles = `
    /* Prevent text selection */
    body {
        user-select: none; /* Standard syntax */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }
    /* Prevent dragging of images */
    img {
        pointer-events: none;
    }
    /* Hide elements when right-clicked */
    .no-save img {
        pointer-events: none;
    }
    /* Example watermark */
    .watermarked {
        position: relative;
        display: inline-block;
    }
    .watermarked::after {
        content: '© YourSite';
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        pointer-events: none;
    }
    /* Obfuscated text */
    .obfuscated {
        color: transparent;
        background-color: transparent;
    }
`;

// Create a style element and append styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
