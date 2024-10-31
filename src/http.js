import axios from "axios";

// redid this function to remove to include the fetchuserplaces
export async function fetchAvailablePlaces(type) {
  //old fetch
  //   const response = await fetch("http://localhost:3000/places");
  //   const resData = await response.json();
  //   if (!response.ok) {
  //     const error = new Error("Failed to fetch places");
  //     throw error;
  //   }

  //fetch with axios
  const response = await axios.get(`http://localhost:3000/${type}`);
  return response.data.places;
}

export async function updateUserPlaces(places) {
  // old fetch call
  //   const response = await fetch("http://localhost:3000/user-places", {
  //     method: "PUT",
  //     body: JSON.stringify({ places }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const resData = await response.json();
  //   if (!response.ok) {
  //     throw new Error("Error update data");
  //   }
  //   return resData.message;

  //axios fetch call
  try {
    const response = await axios.put(
      "http://localhost:3000/user-places",
      { places },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update place");
  }
}
