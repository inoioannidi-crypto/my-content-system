figma.showUI(__html__, { width: 400, height: 560, title: 'Content Generator' });

function getSelectedTextNode() {
  const selection = figma.currentPage.selection;
  const textNodes = selection.filter(function(node) { return node.type === 'TEXT'; });
  return textNodes.length === 1 ? textNodes[0] : null;
}

function sendSelection() {
  var node = getSelectedTextNode();
  figma.ui.postMessage({
    type: 'selection-changed',
    text: node ? node.characters : null,
    hasSelection: node !== null,
  });
}

// Send initial selection state
sendSelection();

// Keep UI updated on selection changes
figma.on('selectionchange', sendSelection);

figma.ui.onmessage = async function(msg) {
  if (msg.type === 'apply-copy') {
    var node = getSelectedTextNode();
    if (!node) {
      figma.ui.postMessage({ type: 'apply-error', message: 'Select a single text layer first.' });
      return;
    }
    try {
      await figma.loadFontAsync(node.fontName);
      node.characters = msg.text;
      figma.notify('Copy applied');
      figma.ui.postMessage({ type: 'apply-success' });
    } catch (err) {
      figma.ui.postMessage({ type: 'apply-error', message: 'Could not apply copy: ' + err.message });
    }
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
