const express = require("express");
let { userModel } = require("../models/usersModel");
let route = express.Router();

route.get("/", async (req, res) => {
  let userData = await userModel.find();
  res.send(userData);
});

route.post("/", async (req, res) => {
  try {
    let insertedData = await userModel.create(req.body);
    res.send({
      success: true,
      message: "Data has been inserted succcessfully",
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    if (id == null || id == undefined) {
      return res.send({ success: false, message: "Id Not Found" });
    }

    let currentUser = await userModel.findOne({ _id: id });
    //   console.log("currentUser",currentUser);
    // findByIdAndUpdate
    if (currentUser) {
      let updatedDate = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.send({
        success: true,
        message: "Data has been updated Successfully",
      });
    } else {
      return res.send({ success: false, message: "Id is not exist" });
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

route.delete('/:id',async(req,res)=>{
try {
    await userModel.findByIdAndDelete(req.params.id);
    res.send({success:true,message:"successfully deleted"})

} catch (error) {
res.send({success:false,message:error.message})
}

})
module.exports = route;
