const Product = require('../models/product.model')

exports.findAll = async (req,res) => {
    try{
        const result = await Product.find();
        res.status(200).json({data:result})
        console.log("Find all products")

    }catch(err){
    console.log("error in find product")}
}

exports.findOne = async(req,res) => {
    console.log('Find One Product')
    const product = req.params.product
    try{
        const result = await Product.findOne({product:product});
        res.status(200).json({data:result})
    }catch(err){
        console.log(`Error in Find Product: ${err}`)
    }
}

exports.create = async (req,res) => {
    const newProduct = new Product({
        product:req.body.product,
        cost : req.body.cost,
        description : req.body.description,
        quantity : req.body.quantity
    })

    try{
        const result = await newProduct.save();
        res.status(200).json({data:result})
        console.log("product saved")
    }catch(err){
        res.status(400).json({data:err})
        console.log("Error in saving product", err)
    }
}

exports.update = async (req,res) => {
    const product = req.params.product

    console.log("Update product: ", product)
    
    const productToUpdate = ({
        cost: req.body.cost,
        description: req.body.description,
        quantity:req.body.quantity
    })

    try{
        const result = await Product.findOneAndUpdate(
            {product:product},
            productToUpdate,
           { new : true}
        )
            res.status(200).json({data:result})
    }catch(err){
        res.status(400).json({data:err})
    }
}

exports.delete = async(req,res) => {
    const productToDelete = req.params.product
    try{
        result = await Product.findOneAndDelete({product:productToDelete})
        res.status(200).json({data:result})
        console.log("succes in deleting product")
    }catch(err){
        res.status(400).json({data:err})
        console.log("Error in deleting product")
    }
}

