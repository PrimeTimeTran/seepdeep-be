import { mongoose} from 'mongoose'
export const connectToTestDatabase = async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
export const disconnectFromTestDatabase = async () => {
    await mongoose.disconnect();
};