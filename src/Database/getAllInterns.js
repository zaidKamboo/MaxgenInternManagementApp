// getAllInterns.js
import * as Realm from "realm-web";
import axios from "axios";

// Initialize the Realm app
const app = new Realm.App({ id: "data-yzxnyyx" });

// Function to log in using email and password
async function loginEmailPassword(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    return user;
}

// Log in and get the user object
const user = await loginEmailPassword(
    "zaidkamboo100@gmail.com",
    "s6JrDVIOIsXsV7wb"
);

// Define the data for the request
const data = JSON.stringify({
    collection: "interns",
    database: "test",
    dataSource: "Cluster0",
});

// Configure the request
const config = {
    method: "post",
    url: "https://ap-south-1.aws.data.mongodb-api.com/app/data-yzxnyyx/endpoint/data/v1/action/find",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
    },
    data: data,
};

// Fetch data function
const fetchData = async () => {
    try {
        const response = await axios(config);
        return response.data.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default fetchData;
