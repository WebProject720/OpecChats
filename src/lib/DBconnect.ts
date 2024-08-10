import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};
const connection: connectionObject = {};

async function DBconnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  try {
    const DB = await mongoose.connect(process.env.MONGODB_URL || "", {});
    connection.isConnected = DB.connections[0].readyState;
  } catch (error) {
    console.log("MONGODB connection failed!!");
    process.exit(1);
  }
}

export default DBconnect;
