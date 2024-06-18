
import { celebrate, Joi } from 'celebrate';

const strRequiredValid = keys => {
    let schema = {}
    for (let key of keys) {
        schema[key] = Joi.string().required()
    }
    return celebrate({ body: Joi.object(schema) }, {
        messages: {
            'string.base': '{#label} 需为字符串',
            'string.empty': '{#label} 不能为空',
            'any.required': '{#label} 为必须项',
        },
    });
};

export default strRequiredValid;