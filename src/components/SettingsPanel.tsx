"use client";

import { WorkflowSettings } from "@/lib/firestore";

interface Props {
  settings: WorkflowSettings;
  onChange: (settings: WorkflowSettings) => void;
  onSave: () => void;
  saveStatus: string | null;
}

export default function SettingsPanel({
  settings,
  onChange,
  onSave,
  saveStatus,
}: Props) {
  const update = (field: keyof WorkflowSettings, value: string) => {
    onChange({ ...settings, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-lg font-semibold">Workflow Settings</h2>

      {/* General Settings */}
      <section className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          General
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Recipient
          </label>
          <input
            type="email"
            value={settings.emailRecipient}
            onChange={(e) => update("emailRecipient", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gmail Search Query
          </label>
          <input
            type="text"
            value={settings.gmailQuery}
            onChange={(e) => update("gmailQuery", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Gmail search filter. Default: newer_than:1d label:AI-Digest
          </p>
        </div>
      </section>

      {/* Extraction Prompts */}
      <section className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          AI Prompt - Extraction (Top 10 Developments)
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            System Prompt
          </label>
          <textarea
            rows={3}
            value={settings.extractionSystemPrompt}
            onChange={(e) => update("extractionSystemPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Prompt
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Use {"{digest_text}"} where the email content should be inserted.
          </p>
          <textarea
            rows={8}
            value={settings.extractionUserPrompt}
            onChange={(e) => update("extractionUserPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Substack Prompts */}
      <section className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          AI Prompt - Substack Article
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            System Prompt
          </label>
          <textarea
            rows={3}
            value={settings.substackSystemPrompt}
            onChange={(e) => update("substackSystemPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Prompt
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Use {"{top10_json}"} where the extracted developments should be
            inserted.
          </p>
          <textarea
            rows={8}
            value={settings.substackUserPrompt}
            onChange={(e) => update("substackUserPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* LinkedIn Prompts */}
      <section className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          AI Prompt - LinkedIn Article
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            System Prompt
          </label>
          <textarea
            rows={3}
            value={settings.linkedinSystemPrompt}
            onChange={(e) => update("linkedinSystemPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Prompt
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Use {"{top10_json}"} where the extracted developments should be
            inserted.
          </p>
          <textarea
            rows={8}
            value={settings.linkedinUserPrompt}
            onChange={(e) => update("linkedinUserPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Save Button */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={onSave}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 cursor-pointer"
        >
          Save Settings
        </button>
        {saveStatus && (
          <span
            className={`text-sm ${
              saveStatus.includes("Error")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {saveStatus}
          </span>
        )}
      </div>
    </div>
  );
}
