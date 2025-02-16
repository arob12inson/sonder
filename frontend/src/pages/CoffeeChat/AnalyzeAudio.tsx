import React, { useState, ChangeEvent } from "react";

const AnalyzeAudio: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select an audio file.");
      return;
    }
    setError("");
    setLoading(true);
    setAnalysisResult("");

    try {
      const formData = new FormData();
      formData.append("audio", selectedFile);
      
      const response = await fetch("http://localhost:3000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setAnalysisResult(data.analysis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Content Analysis</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleAnalyze}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {analysisResult && (
        <div className="mt-6 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-2">Analysis Result:</h2>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default AnalyzeAudio;
