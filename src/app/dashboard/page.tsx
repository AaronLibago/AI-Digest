"use client";

import { useState, useEffect } from "react";
import {
  getSettings,
  saveSettings,
  WorkflowSettings,
} from "@/lib/firestore";
import SettingsPanel from "@/components/SettingsPanel";
import TriggerButton from "@/components/TriggerButton";

const DEFAULT_SETTINGS: WorkflowSettings = {
  emailRecipient: "aaroncarllibago@gmail.com",
  gmailQuery: "newer_than:1d label:AI-Digest",
  extractionSystemPrompt:
    "You are an expert AI analyst. Extract signal, not hype. Return valid JSON only. No markdown. No code fences. No preamble.",
  extractionUserPrompt: `From the content below, extract the 10 most important AI developments.
Rank by long-term significance.
Return a STRICT JSON array where each item has exactly these fields:
  rank (number),
  title (string),
  one_sentence_summary (string),
  why_it_matters (string),
  practical_implication (string),
  risk_or_opportunity (string)

Content:
{digest_text}

Return JSON array only. No markdown. No explanation.`,
  substackSystemPrompt:
    "You are writing a strategic AI newsletter article for a sophisticated audience of business leaders, technologists, and investors.",
  substackUserPrompt: `Using the ranked AI developments below, write a 900-1200 word Substack article analyzing the trajectory of AI.

Requirements:
- Strategic, composed tone
- Focus on patterns and 2-5 year implications
- 3-5 section headers (use ## for headers)
- Close with a 'What to Watch Next' section
- Do not mechanically list items, weave them into narrative
- Start with a compelling hook

Ideas:
{top10_json}

Return plain text only.`,
  linkedinSystemPrompt:
    "You are writing a professional LinkedIn article for AI implementation leaders, operators, and business owners who want to apply AI practically.",
  linkedinUserPrompt: `Using the AI developments below, write a 500-800 word LinkedIn article focused on practical applications and automation.

Requirements:
- Clear structure with 5-7 short sections (use ## for headers)
- 3 specific actionable steps readers can take this week
- 1 example automation workflow described concretely
- Professional but conversational tone
- End with exactly one engagement question for readers

Ideas:
{top10_json}

Return plain text only.`,
};

export default function DashboardPage() {
  const [settings, setSettings] =
    useState<WorkflowSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const stored = await getSettings();
        if (stored) setSettings(stored);
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaveStatus("Saving...");
    try {
      await saveSettings(settings);
      setSaveStatus("Saved successfully");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus("Error saving settings");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          AI Digest Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Configure and trigger your Daily AI Digest workflow.
        </p>
      </div>

      <TriggerButton settings={settings} />

      <SettingsPanel
        settings={settings}
        onChange={setSettings}
        onSave={handleSave}
        saveStatus={saveStatus}
      />
    </div>
  );
}
