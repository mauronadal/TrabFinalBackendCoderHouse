import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now, trim: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true },
  thumbnail: { type: String, required: false, trim: true },
  price: { type: Number, required: true, trim: true },
  stock: { type: Number, required: true, trim: true },
});

productsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) { delete ret._id }
});

export default mongoose.model('Products', productsSchema);
