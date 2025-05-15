// This script prevents context menu and adds other protections against copying
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
}, false);

// Prevent text selection via double-click
document.addEventListener('mousedown', (e) => {
  if (e.detail > 1) {
    e.preventDefault();
    return false;
  }
}, false);

// Disable pinch zoom on touch devices
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// Prevent keyboard shortcuts for copying
document.addEventListener('keydown', (e) => {
  // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, F12 (Dev Tools)
  if (
    (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'a')) ||
    e.key === 'F12'
  ) {
    e.preventDefault();
    return false;
  }
}, false);
