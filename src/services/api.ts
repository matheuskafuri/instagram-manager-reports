import axios from "axios";

const api = axios.create({
  baseURL: "https://graph.facebook.com/v13.0/",
});



// ("https://graph.facebook.com/v13.0/me?fields=id%2Cname%2Caccounts&access_token=");

export default api;

//  "https://graph.facebook.com/v13.0/me?fields=id%2Cname%2Caccess_token%2Cinstagram_business_account&access_token="

//  "https://graph.facebook.com/v13.0/me?fields=id%2Cname%2Cinstagram_business_account&access_token="
