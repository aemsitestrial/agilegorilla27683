import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Assuming a standard single row input from the table: [ [text], [image] ]
  const row = block.firstElementChild;
  if (!row) return;

  const textDiv = row.children[0];
  const imageDiv = row.children[1];

  // Configure text column
  if (textDiv) {
    textDiv.className = 'feature-column-body';

    // Look for button links and style them (optional enhancement)
    textDiv.querySelectorAll('a').forEach((a) => {
      if (a.title && a.title.includes('Explore')) { // Simple logic for button check
        a.className = 'button primary';
      }
    });
  }

  // Configure image column (the right side blue box)
  if (imageDiv) {
    imageDiv.className = 'feature-column-image';

    const img = imageDiv.querySelector('img');
    if (img) {
      // Create optimized picture with standard breakpoints, lazy loading
      const optimizedPic = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  }
}
