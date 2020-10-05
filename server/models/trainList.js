import mongoose from "mongoose";

const List = new mongoose.Schema({
    trainname: {type: 'string', required: true},
    tranPNR: {type: 'string', required: true}
    // from: {type: 'string', required: true},
    // to: {type: 'string', required: true}
});
List.static("findById", function (id) {
    return this.find({ id });
  });

  const trainList = mongoose.model("trainList", List);

  export default trainList;