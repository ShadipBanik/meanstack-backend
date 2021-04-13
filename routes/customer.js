var express = require('express');
const { isValidObjectId } = require('mongoose');
var router = express.Router();
const customerModel=require('../models/customers.model');
/* GET customers listing. */
router.get('/all', function(req, res, next) {
  customerModel.find((err,docs)=>{
    if(!err){res.send({status:200,recodcount:docs.length,results:docs})}
    else {console.log("error in retriving employees:"+JSON.stringify(err,undefined,2))}
})
});
// add new customer
router.post('/add', function(req, res, next) {
  let customer=new customerModel({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    phone:req.body.phone,
    dob:req.body.dob,
    department:req.body.department
  })
  customer.save(function(err,customer){
     if(err){
      res.send({status:500,message:"unable add customer"});
      
     }else{
      res.send({status:200,message:"customer add successfully!",customerDetails:customer});

     }
  })
});
// get by custmer id
router.get('/:id', function(req, res, next) {
  if(!isValidObjectId(req.params.id))
  return res.status(400).send(`No record with given id:${req.params.id}`)
  customerModel.findById(req.params.id,(err,docs)=>{
   if(err){
     res.send({status:500,message:"unable to found thi customer"});
   }else{
     res.send({status:200,results:docs});
   } 
  })
});
// update customer id 
router.put('/update/:id', function(req, res, next) {
  if(!isValidObjectId(req.params.id))
  return res.status(400).send(`No record with given id:${req.params.id}`)
  customer={ 
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    phone:req.body.phone,
    dob:req.body.dob,
    department:req.body.department
  }
  customerModel.findByIdAndUpdate(req.params.id,{$set:customer},{new:true},(err,docs)=>{
    if(err){
      res.send({status:500,message:"unable to update customers"});
    }else{
     res.send({status:200,message:"succesfully updated customer",results:docs})
    }
  })
});
//delete
router.delete('/delete/:id', function(req, res, next) {
   if(!isValidObjectId(req.params.id))
   return res.status(400).send(`No record with given id:${req.params.id}`)
   customerModel.findByIdAndDelete(req.params.id,(err,docs)=>{
     if(err){
       res.send({status:500,message:"unable to delete customer"});
     }else{
       res.send({status:200,message:"successfully deleted customer"});
     }
   })
});
module.exports = router;