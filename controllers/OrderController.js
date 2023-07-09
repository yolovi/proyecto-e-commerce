//IMPORT
const { Order, Product, User } = require("../models/index.js");

const OrderController = {
  async insert(req, res) {
    try {
      req.body.UserId = req.user.id;
      const productIds = req.body.ProductId; // Array de IDs de productos

      // Buscar los productos en la base de datos
      const products = await Product.findAll({
        where: {
          id: productIds, // Filtrar por los IDs proporcionados
        },
      });

      // Verificar si todos los productos existen
      if (products.length !== productIds.length) {
        const existingProductIds = products.map((product) => product.id);
        const missingProductIds = productIds.filter(
          (productId) => !existingProductIds.includes(productId)
        );
        return res
          .status(404)
          .send({
            error: `Product(s) ${missingProductIds.join(", ")} not found.`,
          });
      }

      // Crear la orden
      const order = await Order.create(req.body);
      await order.addProducts(products);

      res.status(201).send({
        message: "Order created successfully",
        order_created: order,
        products_added: productIds,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error creating order", error});
    }
  },

  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        //el include equivale al inner join pero no se puede hacer hasta tener las relaciones y FK
        include: [
          {
            model: Product,
            attributes: ["id", "name_product", "price"],
            through: { attributes: [] },
          },
        ],
      });
      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Failed to retrieve orders", error });
    }
  },
};

//EXPORT
module.exports = OrderController;
