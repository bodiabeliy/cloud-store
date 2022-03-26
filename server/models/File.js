const  {Schema, model, mongoose} = require('mongoose')

const File = new Schema({
    name: {type:String, required: true},
    type: {type:String, required: true},
    accessLink: {type:String},
    size: {type:Number, default: 0},
    path: {type:String, default: ''},
    user: {type:mongoose.Types.ObjectId, ref:"User"},
    parent: {type:mongoose.Types.ObjectId, ref:"File"},
    children: [{type:mongoose.Types.ObjectId, ref:"File"}],


})

module.exports = model("File", File);