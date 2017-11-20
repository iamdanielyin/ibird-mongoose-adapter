/**
 * 模块依赖
 */

const mongoose = require('mongoose');
const utility = require('ibird-utils');
const actions = {
    list: require('./actions/list'),
    count: require('./actions/count'),
    id: require('./actions/id'),
    one: require('./actions/one'),
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
function fn(modelGetter, getLocaleString, opts) {
    if (typeof modelGetter !== 'function') {
        modelGetter = name => mongoose.model(name)
    }
    if (typeof getLocaleString !== 'function') {
        getLocaleString = (key) => {
            const object = {
                mongoose_adapter_error_list: '抱歉，查询失败，请稍后重试',
                mongoose_adapter_error_count: '抱歉，查询失败，请稍后重试',
                mongoose_adapter_error_one: '抱歉，查询失败，请稍后重试',
                mongoose_adapter_error_id: '抱歉，查询失败，请稍后重试',
                mongoose_adapter_error_create: '抱歉，新增失败，请稍后重试',
                mongoose_adapter_error_update: '抱歉，更新失败，请稍后重试',
                mongoose_adapter_error_remove: '抱歉，删除失败，请稍后重试',
            };
            return object[key];
        };
    }
    for (const key in actions) {
        let action = actions[key];
        if (opts.override && (typeof opts.override[key] === 'function')) {
            action = opts.override[key];
        }
        actions[key] = action(modelGetter, getLocaleString, opts);
    }
    module.exports = actions;
    return actions;
}