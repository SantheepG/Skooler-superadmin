import axios from "axios";
export const AddSchool = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/super/store",
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const FetchSchools = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/super/fetch");
    return response;
  } catch (error) {
    return error;
  }
};
