const mongoose=require("mongoose");

const loanSchema=mongoose.Schema({
    
    loanName:String,
    loanType:String,
    loanAmount:String,
    loanIssueDate:String,
    loanStatus:String,
    dob:String
});

const loanModel= mongoose.model('customers',loanSchema);

module.exports=loanModel;