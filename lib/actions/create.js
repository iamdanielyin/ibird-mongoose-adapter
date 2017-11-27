/**
 * 导出create
 * @param {function} modelGetter - 模型获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, opts) => {
    return async function create(name, params) {
        try {
            const Model = modelGetter(name);
            params = Array.isArray(params) ? params : [params];
            const array = [];
            for (const item of params) {
                if (!item) continue;
                array.push(new Model(item));
            }
            const result = await Model.create(array);
            return result;
        } catch (error) {
            throw error;
        }
    }
};