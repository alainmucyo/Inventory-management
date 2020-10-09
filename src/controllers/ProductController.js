import models from "../models";
import productValidation from "../validations/product.validator";

class ProductController {
  static index(req, res) {
    models.product
      .findAll()
      .then((products) => {
        return res.status(200).send({ products });
      })
      .catch((err) => {
        return res.status(500).send({ message: "Server error!" });
      });
  }

  static store(req, res) {
    const {error} = productValidation(req.body);
    if (error)
    return res.status(422).send({message:"Validation failed",data:error.details[0].message})

    models.product
      .create({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
      })
      .then((product) => {
        return res
          .status(201)
          .send({ message: "Product created successfully!", product });
      })
      .catch((err) => {
        console.log("Error", err);
        return res.status(500).send({ message: "Server error!" });
      });
  }

  static update(req, res) {
    const {error} = productValidation(req.body);
    if (error)
      return res.status(422).send({message:"Validation failed",data:error.details[0].message})

    const { id } = req.params;
    models.product
      .update(req.body, { where: { id } })
      .then(([updated]) => {
        if (!updated)
          return res.status(404).send({ message: "Product not found!" });
        return res
          .status(200)
          .send({ message: "Product updated successfully!" });
      })
      .catch((err) => {
        console.log("Error", err);
        return res.status(500).send({ message: "Server error!" });
      });
  }

  static async updateQuantity(req, res) {
    try {
      if (!req.body)
        return res.status(422).send({ message: "Input field are required!" });
      const { id } = req.params;
      const item = await models.product.findByPk(id);
      const { quantity } = req.body;
      item.quantity += quantity;
      await item.save();
      return res
        .status(200)
        .json({ message: "Updated quantity", quantity: item.quantity });
    } catch (err) {
      console.log("Error", err);
      return res.status(404).send({ message: "Not found!" });
    }
  }

  static destroy(req, res) {
    const { id } = req.params;
    models.product
      .destroy({ where: { id } })
      .then((deleted) => {
        if (!deleted)
          return res.status(404).send({ message: "Product not found!" });
        return res
          .status(200)
          .send({ message: "Product deleted successfully!" });
      })
      .catch((err) => {
        console.log("Error", err);
        return res.status(500).send({ message: "Server error!" });
      });
  }
}

export default ProductController;
