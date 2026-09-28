import axiosInstance from "../service/axios_instance";

const APIChooseLang = async (): Promise<
  {
    flag: string;
    country: string;
  }[]
> => {
  const data = await axiosInstance.get("/language/lang.json").then((res) => {
    return res.data;
  });
  return data;
};
export { APIChooseLang };

const APICVData = async (): Promise<any> => {
  const data = await axiosInstance.get("/language/cv_data.json").then((res) => {
    return res.data;
  });
  return data;
};
export { APICVData };
