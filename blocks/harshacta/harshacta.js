import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const contentDiv = row.firstElementChild;
  if (!contentDiv) return;

  moveInstrumentation(contentDiv, block);

  // Style links inside paragraph containers as buttons
  contentDiv.querySelectorAll('a').forEach((a) => {
    a.classList.add('button');
  });

  block.replaceChildren(...contentDiv.childNodes);
}
