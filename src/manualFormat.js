const { execOnBufferRange } = require('./execZPrint');
const { getBufferRange, getCurrentFilePath } = require('./editorInterface');

const format = editor =>
  execOnBufferRange({
    editor,
    bufferRange: getBufferRange(editor),
    file: getCurrentFilePath(editor)
  });

module.exports = format;
