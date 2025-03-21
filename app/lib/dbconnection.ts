import mongoose from "mongoose";

type connectionType = {
  isConnected: number;
};

const connection: connectionType = { isConnected: 0 };

const dbconnection = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("New database connection established");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed");
  }
};

export default dbconnection;
