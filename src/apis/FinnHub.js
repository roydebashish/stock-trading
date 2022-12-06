import axios from "axios";
const TOKEN = 'cdltddaad3i9qbphm6rgcdltddaad3i9qbphm6s0';
export default  axios.create({
	baseURL: 'https://finnhub.io/api/v1',
	params: {
		token: TOKEN
	}
})