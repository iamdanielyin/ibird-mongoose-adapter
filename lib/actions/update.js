/**
 * 导出update
 * @param {function} modelGetter - 模型获取函数
 * @param {function} getLocaleString - 国际化值获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, getLocaleString, opts) => {
    return async function update(name, cond, doc, opts) {
        try {
            const Model = modelGetter(name);
            let result = await Model.update(cond, doc, opts);
            result = opts && opts.multi ? (await Model.find(cond)) : (await Model.findOne(cond));
            return result;
        } catch (error) {
            throw error;
        }
    };
};