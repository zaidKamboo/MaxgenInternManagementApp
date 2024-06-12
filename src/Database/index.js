import * as Realm from "realm-web";
const app = new Realm.App({ id: "data-yzxnyyx" });

async function loginEmailPassword(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    return user;
}

const user = await loginEmailPassword(
    "zaidkamboo100@gmail.com",
    "s6JrDVIOIsXsV7wb"
);

var data = JSON.stringify({
    collection: "interns",
    database: "test",
    dataSource: "Cluster0",
});

var datebaseConfig = {
    method: "post",
    url: "https://ap-south-1.aws.data.mongodb-api.com/app/data-yzxnyyx/endpoint/data/v1/action/find",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        Authorization: `Bearer ${user?.accessToken}`,
    },
    data: data,
};
export default datebaseConfig;
