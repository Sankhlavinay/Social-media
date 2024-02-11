const mongoose = require("mongoose");

module.exports = async () => {
  const mongoUri =
    "mongodb+srv://vinaysankhla4233:vinay@cluster0.i6tcgqr.mongodb.net/?retryWrites=true&w=majority";

  try {
    const connect = await mongoose.connect(mongoUri, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log(`Monogo connected: ${connect.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
