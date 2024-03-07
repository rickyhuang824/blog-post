import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { email, name, message } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !message ||
            message.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid input" });
            return;
        }

        const newMessage = { email, name, message };

        let client;
        const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.e3ua6bv.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGODB_APPNAME}`;

        try {
            client = await MongoClient.connect(connectionString);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

        const db = client.db(process.env.MONGODB_DATABASE);

        try {
            const result = await db
                .collection("messages")
                .insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({ message: "Storing Message Faild" });
            return;
        }

        client.close();

        res.status(201).json({
            message: "Successfully store message",
            message: newMessage,
        });
        return;
    }
};

export default handler;
