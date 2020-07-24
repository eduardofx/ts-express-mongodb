import { Document, model, Model, Schema } from 'mongoose';

interface OrderModel extends Document {
  product: Schema.Types.ObjectId;
  quantity: number;
}

const OrderSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const Order: Model<OrderModel> = model('Order', OrderSchema);

export default Order;
