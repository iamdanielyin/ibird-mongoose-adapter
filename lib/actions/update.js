/**
 * 导出update
 * @param {function} modelGetter - 模型获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, opts) => {
    return async function update(name, cond, doc, options) {
        try {
            const Model = modelGetter(name);
            let result = await Model.update(cond, doc, options);
            result = options && options.multi ? (await Model.find(cond)) : (await Model.findOne(cond));
            return result;
        } catch (error) {
            throw error;
        }
    };
};