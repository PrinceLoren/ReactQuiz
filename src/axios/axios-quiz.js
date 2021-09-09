import axios from "axios";

export default axios.create({
    baseURL: 'https://quiz-list-159aa-default-rtdb.europe-west1.firebasedatabase.app/'
})