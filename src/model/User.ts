import { Schema, model } from 'mongoose'
import { UserInterface } from '../interface/interface'

const userSchemna = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      Selection: false,
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<UserInterface>('user', userSchemna)
