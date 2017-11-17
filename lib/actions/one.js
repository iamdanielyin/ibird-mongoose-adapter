/**
 * 导出one
 * @param {function} modelGetter - 模型获取函数
 * @param {function} getLocaleString - 国际化值获取函数
 */
module.exports = (modelGetter, getLocaleString) => {
    return async function one(name, cond, callback, projection, opts) {
        try {
            const Model = modelGetter(name);
            const query = Model.findOne(cond, projection, opts);
            if (typeof callback === 'function') {
                await callback(query);
            }
            const result = await query.exec();
            return result;
        } catch (error) {
            throw new Error(getLocaleString('mongoose_adapter_error_one'));
        }
    };
};