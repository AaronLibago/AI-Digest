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
    onChange({ ...settings, [field]: value } as WorkflowSettings);
  };

  const updateNumber = (field: keyof WorkflowSettings, value: number) => {
    onChange({ ...settings, [field]: value } as WorkflowSettings);
  };

  const updateBoolean = (field: keyof WorkflowSettings, value: boolean) => {
    onChange({ ...settings, [field]: value } as WorkflowSettings);
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
            Use {"{digest_text}"} for email content, {"{source_urls_json}"} for
            extracted URLs.
          </p>
          <textarea
            rows={8}
            value={settings.extractionUserPrompt}
            onChange={(e) => update("extractionUserPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Per-Topic Article Generation */}
      <section className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          AI Prompt - Per-Topic Article Generation
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            System Prompt
          </label>
          <textarea
            rows={3}
            value={settings.articleSystemPrompt}
            onChange={(e) => update("articleSystemPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Prompt
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Use {"{topic_json}"} for the topic data, {"{source_links_json}"} for
            related links.
          </p>
          <textarea
            rows={10}
            value={settings.articleUserPrompt}
            onChange={(e) => update("articleUserPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Infographic & Image Settings */}
      <section className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Infographic & Image Settings
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Infographic Prompt Template
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Use {"{topic_title}"} and {"{topic_summary}"} as placeholders.
          </p>
          <textarea
            rows={4}
            value={settings.infographicPromptTemplate}
            onChange={(e) =>
              update("infographicPromptTemplate", e.target.value)
            }
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Infographic Style
          </label>
          <input
            type="text"
            value={settings.infographicStyle}
            onChange={(e) => update("infographicStyle", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            e.g. &quot;modern flat design infographic&quot;, &quot;minimalist
            data visualization&quot;
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Infographic Size
          </label>
          <select
            value={settings.infographicSize}
            onChange={(e) =>
              update(
                "infographicSize",
                e.target.value as WorkflowSettings["infographicSize"]
              )
            }
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1024x1024">1024x1024 (Square)</option>
            <option value="1024x1792">1024x1792 (Portrait)</option>
            <option value="1792x1024">1792x1024 (Landscape)</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="webImageSearchEnabled"
            checked={settings.webImageSearchEnabled}
            onChange={(e) =>
              updateBoolean("webImageSearchEnabled", e.target.checked)
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="webImageSearchEnabled"
            className="text-sm font-medium text-gray-700"
          >
            Enable Web Image Search
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Web Images Per Topic
          </label>
          <input
            type="number"
            min={1}
            max={5}
            value={settings.webImageMaxPerTopic}
            onChange={(e) =>
              updateNumber("webImageMaxPerTopic", parseInt(e.target.value) || 1)
            }
            className="mt-1 w-24 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Link Discovery Settings */}
      <section className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Link Discovery Settings
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            System Prompt
          </label>
          <textarea
            rows={3}
            value={settings.linkDiscoverySystemPrompt}
            onChange={(e) =>
              update("linkDiscoverySystemPrompt", e.target.value)
            }
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Prompt
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Use {"{topic_json}"} where the topic data should be inserted.
          </p>
          <textarea
            rows={8}
            value={settings.linkDiscoveryUserPrompt}
            onChange={(e) => update("linkDiscoveryUserPrompt", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Search Links Per Topic
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={settings.linkSearchMaxPerTopic}
            onChange={(e) =>
              updateNumber(
                "linkSearchMaxPerTopic",
                parseInt(e.target.value) || 1
              )
            }
            className="mt-1 w-24 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
