'use strict';

const { execOnBufferRange } = require('./execZPrint');
const { getBufferRange, getCurrentFilePath } = require('./editorInterface');
const { isHangEnabled } = require('./atomInterface');

const format = editor =>
  execOnBufferRange({
    editor,
    bufferRange: getBufferRange(editor),
    file: getCurrentFilePath(editor),
    isHangEnabled: isHangEnabled()
  });

module.exports = format;
