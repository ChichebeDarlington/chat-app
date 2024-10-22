import mongoose from "mongoose";

export const databaseConnect = async (uri) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log("Error while connecting to the database", error.message);
  } finally {
    console.log("Finally!!!");
  }
};
