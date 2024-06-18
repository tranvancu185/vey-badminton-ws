import connectMariaDB from "./mariadb";

// import connectMongoDB from "./mongodb";

class Database {
    private static instance: Database;

    constructor() {
        this.connectDB();
    }

    private async connectDB() {
        connectMariaDB(); // Connect to mariadb.
        // connectMongoDB(); // Connect to mongodb.
    }

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export default Database;