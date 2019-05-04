const buildFile = require('./build-file');
const runMvnCommand = require('./run-mvn-command');

const VERSION_COMMAND = '-q -Dexec.executable=echo -Dexec.args=\'${project.version}\' --non-recursive exec:exec';

function MavenPlugin(options) {
    options = options || {};

    this.dir = options.dir;
    this.projectVersionCommand = options.projectVersionCommand || VERSION_COMMAND;
}

MavenPlugin.prototype.apply = function (compiler) {
    buildFile({
        compiler: compiler,
        dir: this.dir,
        command: this.projectVersionCommand,
        replacePattern: /\[maven-project-version\]/gi,
        asset: 'VERSION'
    });
};

MavenPlugin.prototype.projectVersion = function () {
    return runMvnCommand(
        this.dir,
        this.projectVersionCommand
    )
};

module.exports = MavenPlugin;
