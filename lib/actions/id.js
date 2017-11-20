/**
 * 导出id
 * @param {function} modelGetter - 模型获取函数
 * @param {function} getLocaleString - 国际化值获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, getLocaleString, opts) => {
    return async function id(name, id, callback, projection, opts) {
        try {
            const Model = modelGetter(name);
            const query = Model.findById(id, projection, opts);
            if (typeof callback === 'function') {
                await callback(query);
            }
            const result = await query.exec();
            return result;
        } catch (error) {
            throw new Error(getLocaleString('mongoose_adapter_error_id'));
        }
    };
};