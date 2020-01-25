import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}


const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
}, {
    timestamps: true,
})

export default model<IUser>('User', userSchema)
