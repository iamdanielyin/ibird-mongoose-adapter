/**
 * 导出count
 * @param {function} modelGetter - 模型获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, opts) => {
    return async function count(name, cond) {
        try {
            const Model = modelGetter(name);
            const result = await Model.count(cond);
            return result;
        } catch (error) {
            throw error;
        }
    };
};