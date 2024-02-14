import React, { useEffect } from "react";
import { axiosClient } from "../../utils/axiosClient";

function Home() {
  useEffect(() => {}, []);

  async function fetchData() {
    const response = await axiosClient.get("/posts/all");

    console.log("get  the response");
  }

  return <div>Home</div>;
}

export default Home;
