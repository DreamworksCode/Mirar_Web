import React from "react";

const page = () => {
  return (
    <div>
      <iframe
      width="560"
      height="315"
        src={`https://www.youtube.com/embed/2Vv-BfVoq4g?si=E-UnnbgX-UIxaora`}
        title="Youtube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default page;
