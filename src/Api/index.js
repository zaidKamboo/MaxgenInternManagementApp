import axios from "axios";

const backendHost = axios.create({ baseURL: "http://localhost:5000" });

export default backendHost;
