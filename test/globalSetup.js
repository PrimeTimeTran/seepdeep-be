import { mongoose } from 'mongoose'

export default function setup({ provide }) {
  provide('MONGODB_URI', 'mongodb://localhost:27017/turboship')
  db: mongoose.connect('mongodb://localhost:27017/turboship')
}
