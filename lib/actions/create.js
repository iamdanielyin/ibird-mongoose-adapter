/**
 * 导出create
 * @param {function} modelGetter - 模型获取函数
 * @param {function} getLocaleString - 国际化值获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, getLocaleString, opts) => {
    return async function create(name, params) {
        params = Array.isArray(params) ? params : [params];
        const array = [];
        for (const item of params) {
            if (!item) continue;
            array.push(new Model(item));
        }
        try {
            const Model = modelGetter(name);
            const result = await Model.create(array);
            return result;
        } catch (error) {
            throw new Error(getLocaleString('mongoose_adapter_error_create'));
        }
    }
};