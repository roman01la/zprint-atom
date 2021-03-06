'use strict';

const { execOnBufferRange } = require('./execZPrint');
const {
  getBufferRange,
  getCurrentScope,
  getCurrentFilePath
} = require('./editorInterface');
const {
  getScopes,
  isFormatOnSaveEnabled,
  isHangEnabled
} = require('./atomInterface');

const hasFilePath = editor => !!getCurrentFilePath(editor);

const isInScope = editor => getScopes().includes(getCurrentScope(editor));

const shouldFormatOnSave = editor =>
  isFormatOnSaveEnabled() && hasFilePath(editor) && isInScope(editor);

const formatOnSave = editor => {
  if (shouldFormatOnSave(editor)) {
    execOnBufferRange({
      editor,
      bufferRange: getBufferRange(editor),
      file: getCurrentFilePath(editor),
      setTextViaDiff: true,
      isHangEnabled: isHangEnabled()
    });
  }
};

module.exports = formatOnSave;
