import axios from "axios"; //fazendo requisições http com axios
import { act } from "react-dom/test-utils";


//Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=13cf77ea66560f26fbbbff9302a0b1a8&language=pt-br

const api = axios.create({
    baseURL:'https:api.themoviedb.org/3/'
});

export default api;