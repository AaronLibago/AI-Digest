"use client";

import { useState } from "react";
import { triggerWorkflow } from "@/lib/n8n";
import { WorkflowSettings } from "@/lib/firestore";

interface Props {
  settings: WorkflowSettings;
}

export default function TriggerButton({ settings }: Props) {
  const [status, setStatus] = useState<
    "idle" | "triggering" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleTrigger = async () => {
    setStatus("triggering");
    setMessage("");
    const result = await triggerWorkflow(settings);
    if (result.success) {
      setStatus("success");
      setMessage("Workflow triggered! Check your email in a few minutes.");
    } else {
      setStatus("error");
      setMessage(result.message);
    }
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 10000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Run Digest</h2>
          <p className="text-sm text-gray-500">
            Trigger the AI Digest workflow manually with current settings.
          </p>
        </div>
        <button
          onClick={handleTrigger}
          disabled={status === "triggering"}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium cursor-pointer"
        >
          {status === "triggering" ? "Triggering..." : "Run Digest Now"}
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-sm ${
            status === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : status === "error"
              ? "bg-red-50 text-red-800 border border-red-200"
              : "bg-blue-50 text-blue-800 border border-blue-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
