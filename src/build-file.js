const runMvnCommand = require('./run-mvn-command');

function buildFile({compiler, dir, command, replacePattern, asset}) {
    var data = '';

    compiler.hooks.compilation.tap('compilation', (compilation) => {
        compilation.hooks.optimizeTree.tapAsync('optimize-tree', (chunks, modules, callback) => {
            runMvnCommand(dir, command, function (err, res) {
                if (err) {
                    return callback(err);
                }
                data = res;

                callback();
            });
        });

        compilation.mainTemplate.hooks.assetPath.tap('asset-path', (path) => {
            return path.replace(replacePattern, data)
        });
    });

    compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
        compilation.assets[asset] = {
            source: function () {
                return data;
            },
            size: function () {
                return data.length;
            }
        };

        callback();
    });
}

module.exports = buildFile;