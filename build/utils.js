const path = require('path');

exports.cssLoaders = function (options) {
    options = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            camelCase: options.camelCase,
            localIdentName: options.localIdentName,
            sourceMap: options.sourceMap
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

        if (loader) {
            loaders.push({
                loader: `${loader}-loader`,
                options: { ...loaderOptions, sourceMap: options.sourceMap }
            });
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
    };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options);

    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp(`\\.${extension}$`),
            use: loader
        });
    }

    return output;
};

// cmd命令行的参数 形式为: --page=index,auth
const argsMap = {};
const filterArg = (name = '') => {
    if (Object.keys(argsMap).length === 0) {
        const argv = JSON.parse(process.env.npm_config_argv).original.slice(2);
        argv.forEach((item) => {
            if (/^--/.test(item)) {
                const argItem = item.slice(2);
                if (argItem.includes('=')) {
                    const argArr = argItem.split('=');
                    argsMap[argArr[0]] = argArr[1];
                }
            }
        });
        console.log('命令行参数：', argsMap);
    }
    return argsMap[name];
};

exports.filterArg = filterArg;

exports.parentResolve = (dir = '') => path.join(filterArg('path') || exports.resolve(), dir);

exports.resolve = (dir = '') => path.join(__dirname, '..', dir);
