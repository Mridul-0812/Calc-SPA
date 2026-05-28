/**
 * math.js - CalcSPA Central Engine
 * Handles: MathJax, Element Toggling, Sidebar Highlighting, 
 * and Dynamic Calculus Visualisations.
 */

// 1. MATHJAX CONFIGURATION
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$']],
        processEscapes: true
    },
    svg: { fontCache: 'global' }
};

// 2. GLOBAL UI HELPERS
function toggleElement(id) {
    const el = document.getElementById(id);
    if (!el) return;
    // Toggle between none and block
    el.style.display = (el.style.display === "none" || el.style.display === "") ? "block" : "none";
    // Trigger MathJax to render inside the revealed box
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise([el]);
    }
}

// 3. THE DYNAMIC VISUALISER ENGINE
document.addEventListener("input", (e) => {
    // Only trigger if the input is a range slider
    if (e.target.type !== "range") return;

    const val = parseFloat(e.target.value);

    // --- PRODUCT RULE LOGIC (The Growing Garden) ---
    const widthStrip = document.getElementById("width-growth-strip");
    const heightStrip = document.getElementById("height-growth-strip");
    const corner = document.getElementById("corner-growth");

    if (widthStrip || heightStrip) {
        const scale = 50; // Controls how much the strips grow
        if (widthStrip) widthStrip.setAttribute("width", val * scale);
        
        if (heightStrip) {
            const growthH = val * scale;
            const originalY = 100; // Matches your base rectangle's Y position
            heightStrip.setAttribute("height", growthH);
            heightStrip.setAttribute("y", originalY - growthH); // Grows "up"
        }
        
        if (corner) {
            const size = val * scale;
            corner.setAttribute("width", size);
            corner.setAttribute("height", size);
            corner.setAttribute("y", 100 - size);
        }
    }

    // --- QUOTIENT RULE LOGIC (The Tug-of-War) ---
    // --- QUOTIENT RULE LOGIC (The Tug-of-War) ---
// --- QUOTIENT RULE LOGIC (The Tug-of-War) ---
const indicator = document.getElementById("balance-indicator");
const numBox = document.getElementById("numerator-box");
const denBox = document.getElementById("denominator-box");

if (indicator) {
    // Shift the circle based on center point 200
    indicator.setAttribute("cx", 200 + val);

    if (numBox) {
        const nSize = 60 + (val / 4); // Grows as slider moves right
        numBox.setAttribute("width", nSize);
        numBox.setAttribute("height", nSize);
        numBox.setAttribute("y", 100 - nSize); 
    }
    if (denBox) {
        const dSize = 60 - (val / 4); // Grows as slider moves left
        denBox.setAttribute("width", dSize);
        denBox.setAttribute("height", dSize);
        denBox.setAttribute("y", 100 - dSize);
    }
}
});

// 4. SIDEBAR & INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    // Auto-highlight the current page in the sidebar
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("href") === currentFile) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
    
    console.log("CalcSPA Engine Loaded: " + currentFile);
});