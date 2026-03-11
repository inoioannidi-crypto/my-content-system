figma.showUI(__html__, { width: 400, height: 560, title: 'Content Generator' });

function getSelectedTextNode() {
  const selection = figma.currentPage.selection;
  const textNodes = selection.filter(function(node) { return node.type === 'TEXT'; });
  return textNodes.length === 1 ? textNodes[0] : null;
}

// Walk the ancestor chain and return the nearest Component and Frame ancestors.
// parentComponent — nearest COMPONENT or COMPONENT_SET (tells us what UI component the text lives in)
// parentFrame     — nearest FRAME (immediate screen section or container)
// topFrame        — topmost FRAME direct descendant of the page (the whole screen)
function getAncestorInfo(node) {
  var parentComponent = null;
  var parentFrame = null;
  var topFrame = null;
  var parent = node.parent;

  while (parent) {
    if (parent.type === 'PAGE') break;

    if ((parent.type === 'COMPONENT' || parent.type === 'COMPONENT_SET') && !parentComponent) {
      parentComponent = parent;
    }

    if (parent.type === 'FRAME') {
      if (!parentFrame) parentFrame = parent;
      topFrame = parent; // keep overwriting — ends up as the topmost FRAME
    }

    parent = parent.parent;
  }

  return {
    parentComponentName: parentComponent ? parentComponent.name : null,
    parentFrameName:     parentFrame     ? parentFrame.name     : null,
    topFrameName:        topFrame        ? topFrame.name        : null,
  };
}

// Build a human-readable context string, e.g.:
//   "Button label" in Create Job Modal, Onboarding page
function buildAutoContext(nodeName, info, pageName) {
  var parts = [];
  if (nodeName) parts.push('"' + nodeName + '"');
  var container = info.topFrameName || info.parentFrameName;
  if (container) parts.push('in ' + container);
  parts.push(pageName + ' page');
  return parts.join(', ');
}

function sendSelection() {
  var node = getSelectedTextNode();

  if (!node) {
    figma.ui.postMessage({
      type: 'selection-changed',
      hasSelection: false,
      text: null,
      autoContext: null,
      nodeName: null,
      parentComponentName: null,
      parentFrameName: null,
      topFrameName: null,
      pageName: null,
    });
    return;
  }

  var info = getAncestorInfo(node);
  var pageName = figma.currentPage.name;

  figma.ui.postMessage({
    type: 'selection-changed',
    hasSelection: true,
    text: node.characters,
    autoContext: buildAutoContext(node.name, info, pageName),
    nodeName: node.name,
    parentComponentName: info.parentComponentName,
    parentFrameName: info.parentFrameName,
    topFrameName: info.topFrameName,
    pageName: pageName,
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

  if (msg.type === 'generate') {
    fetch('https://my-content-system-o9l2.vercel.app/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contentType: msg.contentType,
        description: msg.description,
        context: msg.context
      })
    })
    .then(function(res) {
      if (!res.ok) {
        return res.json().catch(function() { return {}; }).then(function(err) {
          throw new Error(err.error || 'Request failed (' + res.status + ')');
        });
      }
      return res.json();
    })
    .then(function(data) {
      figma.ui.postMessage({ type: 'generate-result', copies: data.copies });
    })
    .catch(function(err) {
      figma.ui.postMessage({ type: 'generate-error', error: err.message || 'Something went wrong. Try again.' });
    });
  }

  if (msg.type === 'tone-check') {
    fetch('https://my-content-system-o9l2.vercel.app/api/tone-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: msg.text,
        contentType: msg.contentType
      })
    })
    .then(function(res) {
      if (!res.ok) {
        return res.json().catch(function() { return {}; }).then(function(err) {
          throw new Error(err.error || 'Request failed (' + res.status + ')');
        });
      }
      return res.json();
    })
    .then(function(data) {
      figma.ui.postMessage({ type: 'tone-check-result', data: data });
    })
    .catch(function(err) {
      figma.ui.postMessage({ type: 'tone-check-error', error: err.message || 'Something went wrong. Try again.' });
    });
  }
};
