import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "api/v1/restaurants"
    : "http://localhost:3001/api";

export default axios.create({ baseURL });
