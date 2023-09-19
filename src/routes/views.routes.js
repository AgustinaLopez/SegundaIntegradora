const express = require('express');
const router = express.Router();
const productsModel = require ('../dao/models/products.model');



router.get('/', (req, res) =>{
    res.render('index', {})
})

router.get('/products', async (req, res)=>{
    try{
    let page = parseInt(req.query.page);
    if(!page) page = 1;

    let result = await productsModel.paginate({$match: ""}, {page, limit: 8, lean: true})
    result.prevLink = result.hasPrevPage ? ` http://localhost:8080/products?page=${result.prevPage} }` :'';
    result.nextLink = result.hasNextPage ? ` http://localhost:8080/products?page=${result.nextPage} }` :'';
    result.isValid = !(page <= 0 || page > result.totalPages);

    res.status(200).json({
        status: 'success'
    });
    res.render('realTimeProducts', result)
    }catch(error){
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while fetching data',
        })
    }
})

module.exports = routerView;