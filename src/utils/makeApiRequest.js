import axios from "axios";

const makeApiRequest = async (
  type,
  microservice,
  url,
  body = {},
  authHeaders = {}
) => {
  if (!type || !url) {
    return {
      error: true,
      logout: false,
      message: "Something went wrong. Please try again.",
      status: 400,
    };
  }

  if (!["PUT", "POST", "DELETE", "GET"].includes(type)) {
    return {
      error: true,
      logout: false,
      message: "Something went wrong. Please try again.",
      status: 400,
    };
  }

  const headers = {...authHeaders};
  let data = body;

  try {
    let response;
    if (type === "POST") {
      response = await axios.post(`${microservice}/${url}`, data, {
        headers
      });
    } else if (type === "GET") {
      response = await axios.get(`${microservice}/${url}`, {
        params: {
          ...data,
        },
        headers: headers,
      });
    } else if (type === "PUT") {
      response = await axios.put(`${microservice}/${url}`, data, {
        headers,
      });
    } else if (type === "DELETE") {
      response = await axios.delete(`${microservice}/${url}`, {
        headers,
      });
    }

    return {
      error: false,
      logout: false,
      message: response.statusText,
      response: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: true,
      logout: false,
      message: `Something went wrong. Please try again.`,
      status: 400,
    };
  }
};

export default makeApiRequest;
