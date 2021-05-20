import { RequestHandler } from "express";
import mongoose from "mongoose";
import Order from "../models/order";
import Product from "../models/product";

const create: RequestHandler = async ({ body }, res) => {
  const { productId, quantity: productQty } = body;

  try {
    const validProduct = await Product.findById(productId);

    if (!validProduct) {
      res.status(404).json({ message: "The product does not exist" });
    } else {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: productId,
        quantity: productQty,
      });

      const { _id, product, quantity } = await order.save();

      const response = {
        message: "Order created",
        order: { _id, product, quantity },
      };

      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAll: RequestHandler = async (req, res) => {
  try {
    const result = await Order.find().exec();

    const response = {
      count: result.length,
      orders: result.map(({ _id, product, quantity }) => ({
        _id,
        product,
        quantity,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOne: RequestHandler = async ({ params }, res) => {
  const { orderId } = params;

  try {
    const result = await Order.findById(orderId)
      .select("_id product quantity")
      .populate("product", "_id name price")
      .exec();

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const destroy: RequestHandler = async ({ params }, res) => {
  const { orderId } = params;

  try {
    Order.remove({ _id: orderId }).exec();

    res.status(204);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  create,
  getAll,
  getOne,
  destroy,
};
