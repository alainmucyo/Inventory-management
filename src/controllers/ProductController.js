import models from "../models"

class ProductController {
    static index(req, res) {
        models.product.findAll()
            .then(products => {
                return res.status(200).send({products})
            })
            .catch(err => {
                return res.status(500).send({message: "Server error!"})
            })
    }

    static store(req, res) {
        if (!req.body)
            return res.status(422).send({message: "Input field are required!"})

        models.product.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description
        })
            .then(product => {
                return res.status(201).send({message: "Product created successfully!", product})
            })
            .catch(err => {
                console.log("Error", err)
                return res.status(500).send({message: "Server error!"})
            })
    }

    static update(req, res) {
        if (!req.body)
            return res.status(422).send({message: "Input field are required!"})
        const {id} = req.params
        models.product.update(req.body, {where: {id}})
            .then(([updated]) => {
                if (!updated)
                    return res.status(404).send({message: "Product not found!"})
                return res.status(200).send({message: "Product updated successfully!"})
            })
            .catch(err => {
                console.log("Error", err)
                return res.status(500).send({message: "Server error!"})
            })
    }
    static destroy(req, res) {
        const {id} = req.params
        models.product.destroy({where: {id}})
            .then(deleted => {
                if (!deleted)
                    return res.status(404).send({message: "Product not found!"})
                return res.status(200).send({message: "Product deleted successfully!"})
            })
            .catch(err => {
                console.log("Error", err)
                return res.status(500).send({message: "Server error!"})
            })
    }
}

export default ProductController