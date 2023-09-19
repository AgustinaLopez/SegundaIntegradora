const Server = require('socket.io');
const router = require('express');
const ProductManager = require('../managers/product-manager')
let admin = require('../managers/AdminManager.js');


//Mediante DB
const productsModel = required ('../dao/models/products.model');


const router = router();
const products = new ProductManager()
const productsService = new productsService

// -----------------------------Mediante DB----------------------------------------
router.post('/', async(req, res) =>{
    try{
        let result = await productsService.save(req.body);
        res.status(201).send(result);
    }catch{
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo guardar el producto."});
    }
} )

router.get('/',async(req,res)=>{
    try {
         // Aggregation
        let aggregationStages = [];
    
        // Stage 1: Filtrar por el tipo de elemento que quieres buscar
        aggregationStages.push({ $match: { description: "" } });

        // Stage 2: Ordenar los resultados de forma ascendente
        aggregationStages.push({ $sort: { price: 1 } });
    
        // Stage 3: Limitar la cantidad de resultados
        aggregationStages.push({ $limit: 10 });
    
        // Ejecutar la agregación en el modelo
        let products = await productsModel.aggregate(aggregationStages);
    
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo obtener los productos."});
    }
})


router.get('/',async(req,res)=>{
    try {
        let products = await productsModel.paginate();
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo obtener los productos."});
    }
})


// router.get('/',async(req,res)=>{
//     try {
//         let products = await productsService.getAll();
//         res.send(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({error:  error, message: "No se pudo obtener los productos."});
//     }
// })







// -----------------------------FileSystem----------------------------------------
//Creacion de endpoints
router.get('/', (req, res) =>{
    products.getProducts().then(productos => res.send(productos))
    res.render('home', {productos})
})

router.get('/:pid', (req, res) =>{
    let param = req.params.id 
    if (isNaN(param)) return (res.status(400).send({ error: "No es un numero"}))
    let id = parseInt(param)
    products.getProductById(id).then( productId => res.send(productId))
})


router.post('/', (req, res) =>{

    if (admin) {
    let product = req.body
    products.addProduct(product).then(newProduct => res.send(newProduct)).then(socket.broadcast.emit('mensaje1', "Producto Agregado"))
    }else {
        res.send({ status: "error", description: "Error"})
    }

    
})

router.put("/:pid", (req, res) =>{
    if(admin) {
        let param =req.params.id
        if (isNaN(param)) return (res.status(400).send({error: "No es un numero"}))
        let id = parseInt(param)
        let product = req.body
        products.updateProduct(product, id).then (productoEditado => res.send(productoEditado))
    }else{
        res.send({status: "error", description: "Error"})
    }
})

router.delete("/:pid", (req, res) =>{
    if (admin) {
        let param = req.params.id
        if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
        let id = parseInt(param)
        products.deleteProduct(id).then(productoEliminado => res.send(productoEliminado))
    }else {
        res.send({status: "error", description: "Error"}).then(socket.broadcast.emit('mensaje2', "Producto Eliminado"))
    }

})

//Instanciamos Socket del lado del Server
// const socketServer = new Server(httpServer);
// socketServer.on('connection', socket =>{
//     socket.on('mensaje1', data =>{
//         console.log(data);
//     })
// })


module.exports = router;