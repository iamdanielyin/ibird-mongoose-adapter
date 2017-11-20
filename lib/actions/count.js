/**
 * 导出count
 * @param {function} modelGetter - 模型获取函数
 * @param {function} getLocaleString - 国际化值获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, getLocaleString, opts) => {
    return async function count(name, cond) {
        try {
            const Model = modelGetter(name);
            const result = await Model.count(cond);
            return result;
        } catch (error) {
            throw new Error(getLocaleString('mongoose_adapter_error_count'));
        }
    };
};