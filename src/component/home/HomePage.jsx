import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import CitiesSlider from "../fragment/Slider";

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
