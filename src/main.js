'use strict';

const config = require('./config.json');
const { CompositeDisposable } = require('atom');

let format = null;
let formatOnSave = null;
let toggleFormatOnSave = null;
let subscriptions = null;

const lazyFormat = () => {
  if (!format) format = require('./manualFormat');
  const editor = atom.workspace.getActiveTextEditor();
  if (editor) format(editor);
};

const lazyFormatOnSave = editor => {
  if (!formatOnSave) formatOnSave = require('./formatOnSave');
  if (editor) formatOnSave(editor);
};

const lazyToggleFormatOnSave = () => {
  if (!toggleFormatOnSave) {
    toggleFormatOnSave = require('./atomInterface').toggleFormatOnSave;
  }
  toggleFormatOnSave();
};

const activate = () => {
  subscriptions = new CompositeDisposable();

  subscriptions.add(
    atom.commands.add('atom-workspace', 'zprint:format', lazyFormat)
  );

  subscriptions.add(
    atom.commands.add(
      'atom-workspace',
      'zprint:toggle-format-on-save',
      lazyToggleFormatOnSave
    )
  );

  subscriptions.add(
    atom.workspace.observeTextEditors(editor =>
      subscriptions.add(
        editor.getBuffer().onWillSave(() => lazyFormatOnSave(editor))
      )
    )
  );
};

const deactivate = () => {
  subscriptions.dispose();
};

module.exports = {
  activate,
  deactivate,
  config,
  subscriptions
};
