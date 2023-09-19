const mongoose = reqired('mongoose');
const mongoosePaginate = required('mongoose-paginate-v2');

const collectionName = 'products';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};


const productsSchema = new mongoose.Schema({
    title: stringTypeSchemaUniqueRequired,
    description: stringTypeSchemaUniqueRequired,
    price: Number,
    thumbnail: stringTypeSchemaNonUniqueRequired,
    code: stringTypeSchemaUniqueRequired,
    stock: Number    
})

productsSchema.plugin(mongoosePaginate);


//Definimos el modelo
export const productsModel = mongoose.model(collectionName, productsSchema);
