import React, { useState, ChangeEvent, FormEvent } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

interface ApplicantFieldsProps {
  setIdentifactionState: (state: boolean) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const ApplicantFields: React.FC<ApplicantFieldsProps> = ({ setIdentifactionState }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIdentifactionState(true);

    // TODO: Send form data to the backend
  };

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto bg-gray-200 shadow-lg rounded-lg p-6">
      <h1 className="text-gray-800 text-2xl font-bold mb-4">Enter Your Information</h1>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          className="w-full rounded-lg border border-gray-300 p-3 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded-lg border border-gray-300 p-3 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded-lg border border-gray-300 p-3 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button
          className="w-full rounded-lg bg-green-600 text-white py-3 font-medium hover:bg-green-700 transition"
          type="submit"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

const WebCamComponent: React.FC = () => {
  const navigate = useNavigate();

  const InterviewState = Object.freeze({
    NOT_STARTED: "notstarted",
    STARTED: "started",
    ENDED: "ended",
  });

  const [interviewState, setInterviewState] = useState<string>(
    InterviewState.NOT_STARTED
  );

  const startInterview = () => setInterviewState(InterviewState.STARTED);
  const endInterview = () => {
    setInterviewState(InterviewState.ENDED);
    navigate("/chat/end");
  };

  return (
    <div className="flex flex-col justify-center items-center text-center w-screen h-screen bg-gray-50">
      <div className="rounded-lg bg-gray-800 overflow-hidden my-3 aspect-[4/3] h-3/4">
        <Webcam
          className={`rounded-lg transition-all duration-500 ease-in-out 
          ${interviewState === InterviewState.NOT_STARTED && "h-full w-full"}
          ${interviewState === InterviewState.STARTED && "h-1/4 ml-auto"}`}
        />
      </div>
      {interviewState === InterviewState.NOT_STARTED && (
        <button
          className="rounded-lg px-6 py-3 my-3 text-white bg-green-600 hover:bg-green-700 font-medium transition"
          onClick={startInterview}
        >
          Start Interview
        </button>
      )}
      {interviewState === InterviewState.STARTED && (
        <button
          className="rounded-lg px-6 py-3 my-3 text-white bg-red-600 hover:bg-red-700 font-medium transition"
          onClick={endInterview}
        >
          End Interview
        </button>
      )}
    </div>
  );
};

const CoffeeChat: React.FC = () => {
  const [isIdentified, setIdentifactionState] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen min-w-screen justify-center items-center bg-grey-50">
      {!isIdentified ? (
        <div className="flex flex-row justify-center items-center w-full h-full max-w-6xl">
          {/* Left Side - Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src="https://wallpapers.com/images/hd/job-interview-animated-illustration-res1kxrwcs75bt2q.jpg"
              alt="Placeholder"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          {/* Right Side - Form */}
          <div className="flex-1 flex justify-center items-center">
            <ApplicantFields setIdentifactionState={setIdentifactionState} />
          </div>
        </div>
      ) : (
        <WebCamComponent />
      )}
    </div>
  );
};

export default CoffeeChat;
