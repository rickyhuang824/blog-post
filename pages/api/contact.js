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

        try {
            client = await MongoClient.connect(
                "mongodb+srv://ricky:uVf6E0SLTsUnd0wP@cluster0.sceyq.mongodb.net/blog-posts-next-js?retryWrites=true&w=majority"
            );
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

        const db = client.db("blog-posts-next-js");

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
