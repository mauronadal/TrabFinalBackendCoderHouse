import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  fullName: { type: String, required: true },
  age: { type: Number, required: false },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: false },
  photo: { type: String },
});

UsersSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UsersSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UsersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model('User', UsersSchema); 