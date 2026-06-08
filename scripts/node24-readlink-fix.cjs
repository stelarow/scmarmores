const fs = require('node:fs');

function normalizeReadlinkError(error) {
  if (error?.code === 'EISDIR') error.code = 'EINVAL';
  return error;
}

const originalReadlink = fs.readlink;
fs.readlink = function readlink(path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  return originalReadlink.call(fs, path, options, (error, link) => {
    callback(normalizeReadlinkError(error), link);
  });
};

const originalReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function readlinkSync(...args) {
  try {
    return originalReadlinkSync.apply(fs, args);
  } catch (error) {
    throw normalizeReadlinkError(error);
  }
};

const originalPromiseReadlink = fs.promises.readlink;
fs.promises.readlink = async function readlink(...args) {
  try {
    return await originalPromiseReadlink.apply(fs.promises, args);
  } catch (error) {
    throw normalizeReadlinkError(error);
  }
};
