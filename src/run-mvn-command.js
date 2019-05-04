const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

function runMvnCommand(dir, command, callback) {
  const fullCommand = [
    'mvn',
    command
  ].join(' ');

  if (callback) {
    exec(fullCommand, function (err, output) {
      if (err) {
        return callback(err);
      }
      callback(null, removeEmptyLines(output));
    });
  } else {
    return removeEmptyLines('' + execSync(fullCommand));
  }
}

function removeEmptyLines(s) {
  if (!s) {
    return s;
  }

  return s.replace(/[\s\r\n]+$/, '');
}

module.exports = runMvnCommand;
