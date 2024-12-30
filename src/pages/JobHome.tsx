import { useParams } from "react-router-dom";

const JobHome = () => {
  const { jobId } = useParams();

  return (
    <div>
      <h1>{jobId}</h1>
    </div>
  );
}

export default JobHome;