import axios from "axios";

export const base_URL = "http://127.0.0.1:8080/api";

export const AddSchool = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/super/store`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const FetchSchools = async () => {
  try {
    const response = await axios.get(`${base_URL}/super/fetch`);
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateUI = async (data) => {
  try {
    const response = await axios.put(
      `${base_URL}/super/school/updateui`,
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

export const UpdateExpiry = async (data) => {
  try {
    const response = await axios.put(
      `${base_URL}/super/school/updateexpiry`,
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

export const UpdateInfo = async (data) => {
  try {
    const response = await axios.put(
      `${base_URL}/super/school/updateinfo`,
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
export const UpdateAdmin = async (data) => {
  try {
    const response = await axios.put(
      `${base_URL}/super/school/updateadmin`,
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
export const DeleteSchool = async (id) => {
  try {
    const response = await axios.delete(
      `${base_URL}/super/school/delete/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const UpdateStatus = async (data) => {
  try {
    const response = await axios.put(
      `${base_URL}/super/school/updatestatus`,
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
export const AddLogo = async (formData) => {
  try {
    const response = await axios.post(`${base_URL}/super/addlogo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const UpdateLogo = async (formData) => {
  try {
    console.log(formData);
    const response = await axios.post(
      `${base_URL}/super/updatelogo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
