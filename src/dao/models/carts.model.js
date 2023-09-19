const mongoose = reqired('mongoose');

const collectionName = 'carts';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const cartsSchema = new mongoose.Schema({
    name: stringTypeSchemaUniqueRequired,
    products: {
        type:[
            {
                id:{
                    type: mongoose.Schema.type.ObjectId,
                    ref:"products",
                }
            }
        ],
        default:[]
    },
    total: Number
});

cartsSchema.pre('findOne', function(){
    this.populate("id.products");
});


//Definimos el modelo
export const cartsModel = mongoose.model(collectionName, cartsSchema);