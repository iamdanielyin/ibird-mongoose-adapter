/**
 * 导出one
 * @param {function} modelGetter - 模型获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, opts) => {
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
            throw error;
        }
    };
};