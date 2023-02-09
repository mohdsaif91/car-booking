import axios from "axios";
import { config } from "process";

export const getToken = async () => {
  const data = {
    client_id: "64B10822-3902-4590-AD9D-EF77C8688C66",
    grant_type: "client_credentials",
    scope:
      "Shopper MeAdmin ProductReader MeCreditCardAdmin BuyerImpersonation SupplierAddressReader SupplierReader",
  };
  return await axios
    .post("https://australiaeast-sandbox.ordercloud.io/oauth/token", data, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      sessionStorage.setItem("tokenData", JSON.stringify(res.data));
    });
};

const axiosInstance = axios.create({
  baseURL: "https://australiaeast-sandbox.ordercloud.io",
});
// axiosInstance.interceptors.request.use()
const token = JSON.parse(sessionStorage.getItem("tokenData") || "{}");
axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${token.access_token}`;
export const onAuthenticatedApi = async (payloadData: any) => {
  const res = await axiosInstance(payloadData.url, {
    method: payloadData.method,
    data: payloadData.data,
  });
  return res;
};

export const onAuthenticatedScync = (payloadData: any) => {
  const res = axiosInstance(payloadData.url, {
    method: payloadData.method,
    data: payloadData.data,
  });
  return res;
};
