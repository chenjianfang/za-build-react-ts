const path = require('path');
const utils = require('../build/utils');

/**
 * 返回入口文件
 */
exports.entryMap = {};

exports.getPagesEntry = () => {
    if (!Object.keys(exports.entryMap).length) {
        const pathStr = utils.parentResolve();
        const entryFile = path.join(path.join(pathStr, `${process.env.NODE_ENV === 'development' ? 'test' : 'src'}/index.tsx`));
        console.log('entryFile: ', entryFile);
        exports.entryMap = {
            index: entryFile
        };
    }
    return exports.entryMap;
};
