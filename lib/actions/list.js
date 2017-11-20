/**
 * 导出list
 * @param {function} modelGetter - 模型获取函数
 * @param {function} getLocaleString - 国际化值获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, getLocaleString, opts) => {
    return async function list(name, cond, callback, projection, opts) {
        try {
            const Model = modelGetter(name);
            const query = Model.find(cond, projection, opts);
            if (typeof callback === 'function') {
                await callback(query);
            }
            // 逻辑删除情况下加工查询对象
            tombstoneQuery(name, query, opts);
            const result = await query.exec();
            return result;
        } catch (error) {
            throw new Error(getLocaleString('mongoose_adapter_error_list'));
        }
    };
};

/**
 * 逻辑删除情况下加工查询对象
 * @param {Object} name - 模型名称
 * @param {Object} query - 查询对象
 * @param {Object} opts - 适配器配置
 */
function tombstoneQuery(name, query, opts) {
    const tombstoneKey = opts && (typeof opts.tombstoneKeyGetter === 'function') ? opts.tombstoneKeyGetter(name) : null;
    if (!tombstoneKey) return query;

    const cond = { [tombstoneKey]: { $ne: true } };
    if (query._conditions.$and && Array.isArray(query._conditions.$and)) {
        query._conditions.$and.push(cond);
    } else {
        Object.assign(query._conditions, cond);
    }
    return query;
}