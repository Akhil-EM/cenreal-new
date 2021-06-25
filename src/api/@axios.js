import axios from "axios";
import Config from '../config';


export default axios.create({
    baseURL:Config.appBaseUrl,
    headers:Config.Headers
});
