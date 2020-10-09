import joi from 'joi'

const productValidation =  (body) => {
    const productSchema = joi.object({
        name: joi.string().required().min(3).max(100),
        description: joi.string().required().min(3),
        price: joi.number().required().min(0),
        quantity: joi.number().required().min(0),
    })
    return productSchema.validate(body)
}
export default productValidation