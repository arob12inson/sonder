import React from "react";

const EndInterviewPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen justify-center items-center bg-white">
      <h1 className="text-dark-grey text-4xl m-3">Thank you for completing this interview!</h1>
      <p className="text-dark-grey">We will get back to you with a decision shortly</p>
    </div>
  );
};

export default EndInterviewPage;
