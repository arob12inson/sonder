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

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key as keyof FormData]);
    }
    setIdentifactionState(true);

    // TODO: Send form data to the backend
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-dark-grey text-4xl m-3">Enter your information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="rounded-lg p-3 my-3 placeholder:text-light-grey"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="rounded-lg p-3 my-3 placeholder:text-light-grey"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="rounded-lg p-3 my-3 placeholder:text-light-grey"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button
            className="rounded-lg p-3 my-3 text-white bg-dark-green hover:bg-light-green"
            type="submit"
          >
            Submit Application
          </button>
        </div>
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
    <div className="flex flex-col justify-center items-center text-center w-screen h-screen">
      <div className="rounded-lg bg-dark-grey my-3 aspect-[4/3] h-3/4">
        <Webcam
          className={`rounded-lg transition-all duration-500 ease-in-out 
          ${interviewState === InterviewState.NOT_STARTED && "h-full w-full"}
          ${interviewState === InterviewState.STARTED && "h-1/4 ml-auto"}`}
        />
      </div>
      {interviewState === InterviewState.NOT_STARTED && (
        <button
          className="rounded-lg p-3 my-3 text-white bg-dark-green hover:bg-light-green"
          onClick={startInterview}
        >
          Start Interview
        </button>
      )}
      {interviewState === InterviewState.STARTED && (
        <button
          className="rounded-lg p-3 my-3 text-white bg-dark-green hover:bg-light-green"
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
    <div className="flex flex-col min-h-screen min-w-screen justify-center items-center bg-white">
      {!isIdentified ? (
        <ApplicantFields setIdentifactionState={setIdentifactionState} />
      ) : (
        <WebCamComponent />
      )}
    </div>
  );
};

export default CoffeeChat;
