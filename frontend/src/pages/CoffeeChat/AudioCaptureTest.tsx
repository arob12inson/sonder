import React, { useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

// Connect to your backend Socket.IO server
const socket: Socket = io("http://localhost:3000");

const CHUNK_DURATION = 3000; // Intended duration per chunk in ms
const FINAL_FLUSH_DELAY = 1500; // Extra delay to flush final chunk

const AudioCaptureTest: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Continuous recorder for building the complete file
  const continuousRecorderRef = useRef<MediaRecorder | null>(null);
  const continuousStreamRef = useRef<MediaStream | null>(null);

  // For self-contained chunk recording
  const recordingFlagRef = useRef<boolean>(false);
  const currentChunkRecorderRef = useRef<MediaRecorder | null>(null);
  const chunkTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Start continuous recorder (for complete file)
  const startContinuousRecorder = (stream: MediaStream) => {
    console.log("[Continuous] Starting recorder.");
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    recorder.ondataavailable = async (event: BlobEvent) => {
      console.log("[Continuous] Data available, size:", event.data.size);
      if (event.data.size > 0) {
        const buffer = await event.data.arrayBuffer();
        console.log("[Continuous] Emitting 'audio-chunk'");
        socket.emit("audio-chunk", buffer);
      }
    };
    recorder.onstop = () => {
      console.log("[Continuous] Recorder stopped.");
      socket.emit("audio-end");
    };
    recorder.start(CHUNK_DURATION);
    continuousRecorderRef.current = recorder;
  };

  // Function to record one self-contained chunk (fresh recorder per chunk)
  const recordChunk = async (stream: MediaStream) => {
    if (!recordingFlagRef.current) return;
    console.log("[Chunk] Starting a new chunk recorder.");

    // Local flag to ensure we emit only once per recorder
    let hasEmitted = false;

    const chunkRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    currentChunkRecorderRef.current = chunkRecorder;

    chunkRecorder.ondataavailable = async (event: BlobEvent) => {
      console.log("[Chunk] ondataavailable fired, size:", event.data.size);
      if (!hasEmitted && event.data.size > 0) {
        hasEmitted = true;
        const buffer = await event.data.arrayBuffer();
        console.log("[Chunk] Emitting 'audio-chunk-complete' with", event.data.size, "bytes");
        socket.emit("audio-chunk-complete", buffer);
      } else if (event.data.size === 0) {
        console.warn("[Chunk] Received empty data, ignoring.");
      }
    };

    chunkRecorder.onstop = () => {
      console.log("[Chunk] Chunk recorder stopped.");
      currentChunkRecorderRef.current = null;
      // If still recording, start a new chunk recorder on the same stream
      if (recordingFlagRef.current) {
        console.log("[Chunk] Restarting chunk recorder.");
        recordChunk(stream);
      }
    };

    chunkRecorder.start();
    console.log("[Chunk] Chunk recorder started.");
    // Set a timer to stop this recorder after CHUNK_DURATION
    chunkTimerRef.current = setTimeout(() => {
      if (chunkRecorder.state !== "inactive") {
        console.log("[Chunk] Timer reached, requesting data and stopping recorder.");
        chunkRecorder.requestData();
        chunkRecorder.stop();
      }
    }, CHUNK_DURATION);
  };

  const startRecording = async () => {
    setErrorMessage(null);
    try {
      console.log("[StartRecording] Requesting user media.");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("[StartRecording] Media stream obtained.");
      continuousStreamRef.current = stream;

      // Start continuous recorder (for complete file)
      startContinuousRecorder(stream);

      // Set flag and start the self-contained chunk recorder on a cloned stream
      recordingFlagRef.current = true;
      const chunkStream = stream.clone();
      recordChunk(chunkStream);

      setIsRecording(true);
    } catch (err) {
      console.error("[StartRecording] Error accessing microphone:", err);
      setErrorMessage("Unable to access microphone. Check your permissions.");
    }
  };

  const stopRecording = () => {
    console.log("[StopRecording] Stopping recording.");
    // Stop continuous recorder
    if (continuousRecorderRef.current && continuousRecorderRef.current.state !== "inactive") {
      console.log("[StopRecording] Stopping continuous recorder.");
      continuousRecorderRef.current.stop();
      continuousRecorderRef.current = null;
    }
    // Stop further chunk recording
    recordingFlagRef.current = false;
    if (chunkTimerRef.current) {
      clearTimeout(chunkTimerRef.current);
      chunkTimerRef.current = null;
    }
    // Flush the current chunk recorder if active
    if (currentChunkRecorderRef.current && currentChunkRecorderRef.current.state !== "inactive") {
      console.log("[StopRecording] Flushing current chunk recorder.");
      currentChunkRecorderRef.current.requestData();
      currentChunkRecorderRef.current.stop();
      currentChunkRecorderRef.current = null;
    }
    // Allow a final delay to let any ondataavailable events fire
    setTimeout(() => {
      if (continuousStreamRef.current) {
        console.log("[StopRecording] Stopping all tracks on media stream.");
        continuousStreamRef.current.getTracks().forEach((track) => track.stop());
        continuousStreamRef.current = null;
      }
      setIsRecording(false);
      console.log("[StopRecording] Recording stopped completely.");
    }, FINAL_FLUSH_DELAY);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded ${isRecording ? "bg-red-600" : "bg-green-600"} text-white`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default AudioCaptureTest;
