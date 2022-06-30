import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import CitiesSlider from "../partial/Slider";

function HomePage() {
  return (
    <HomeLayout>
      <div>
        <CitiesSlider />
      </div>
    </HomeLayout>
  );
}

export default HomePage;
