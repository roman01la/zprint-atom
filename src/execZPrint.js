'use strict';

const format = require('zprint-clj');

const execOnBufferRange = ({
  editor,
  bufferRange,
  setTextViaDiff,
  file,
  isHangEnabled
}) => {
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = editor.getTextInBufferRange(bufferRange);

  let transformed;

  try {
    transformed = format(textToTransform, file, { isHangEnabled });
  } catch (err) {
    console.error(err);
    return;
  }

  const isTextUnchanged = transformed === textToTransform;
  if (!transformed || isTextUnchanged) return;

  if (setTextViaDiff) {
    editor.getBuffer().setTextViaDiff(transformed);
  } else {
    editor.setTextInBufferRange(bufferRange, transformed);
  }

  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
};

module.exports = { execOnBufferRange };
