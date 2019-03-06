const mongoose = require("mongoose");

mongoose.set("useFindAndModify", true);
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));

module.exports = mongoose;
