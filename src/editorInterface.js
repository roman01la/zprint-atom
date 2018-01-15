const getBufferRange = editor => editor.getBuffer().getRange();

const getCurrentScope = editor => editor.getGrammar().scopeName;

const getCurrentFilePath = editor =>
  editor.buffer.file ? editor.buffer.file.path : undefined;

module.exports = { getBufferRange, getCurrentScope, getCurrentFilePath };
