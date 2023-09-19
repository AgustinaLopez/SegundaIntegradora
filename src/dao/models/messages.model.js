const mongoose = reqired('mongoose');

const collectionName = 'messages';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const messagesSchema = new mongoose.Schema({
    name: stringTypeSchemaUniqueRequired,
    messages: String,
    timestamp: {type: Date, default: Date.now},
});


//Definimos el modelo
export const messageModel = mongoose.model(collectionName, messagesSchema);