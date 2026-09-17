import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const contentDiv = row.firstElementChild;
  if (!contentDiv) return;

  // Transfer Universal Editor instrumentation to the outer block
  moveInstrumentation(contentDiv, block);

  // Unwrap the content so elements render cleanly at top level inside the block
  block.replaceChildren(...contentDiv.childNodes);
}
