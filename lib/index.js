/**
 * 模块依赖
 */

const actions = {
    list: require('./actions/list'),
    count: require('./actions/count'),
    one: require('./actions/one'),
    id: require('./actions/id'),
    create: require('./actions/create'),
    update: require('./actions/update'),
    remove: require('./actions/remove'),
};

/**
 * 导出fn
 */
module.exports = fn;

/**
 * 入口文件
 */
function fn(modelGetter, opts) {
    if (typeof modelGetter !== 'function') {
        throw new Error(`'modelGetter' must be a function.`);
    }
    for (const key in actions) {
        let action = actions[key];
        if (opts.override && (typeof opts.override[key] === 'function')) {
            action = opts.override[key];
        }
        actions[key] = action(modelGetter, opts);
    }
    module.exports = actions;
    return actions;
}