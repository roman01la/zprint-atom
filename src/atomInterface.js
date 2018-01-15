'use strict';

const getConfigOption = key => atom.config.get(`zprint-atom.${key}`);

const setConfigOption = (key, value) =>
  atom.config.set(`zprint-atom.${key}`, value);

const isFormatOnSaveEnabled = () =>
  getConfigOption('formatOnSaveOptions.enabled');

const toggleFormatOnSave = () =>
  setConfigOption('formatOnSaveOptions.enabled', !isFormatOnSaveEnabled());

const getScopes = () => getConfigOption('formatOnSaveOptions.clojureScopes');

const isHangEnabled = () => getConfigOption('Configuration.isHangEnabled');

module.exports = {
  toggleFormatOnSave,
  getScopes,
  isFormatOnSaveEnabled,
  isHangEnabled
};
