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
  risk_or_opportunity (string),
  source_urls (array of strings - relevant URLs from the source content)

Also available source URLs from the emails:
{source_urls_json}

Content:
{digest_text}

Return JSON array only. No markdown. No explanation.`,

  articleSystemPrompt:
    "You are an expert AI analyst and technical writer. Write comprehensive, detailed articles on individual AI topics with proper structure, deep analysis, and actionable insights.",
  articleUserPrompt: `Write a comprehensive article (800-1200 words) about the following AI development topic.

Topic:
{topic_json}

Source Links:
{source_links_json}

Requirements:
- Clear, compelling title and introduction
- In-depth analysis of the development and its significance
- Why it matters for business leaders, developers, and investors
- Practical implications and actionable insights
- Include references to the source links where relevant
- Use ## for section headers
- Professional, insightful tone
- Include a "Key Takeaways" section at the end
- Include a "Related Resources" section linking to source materials

Return plain text only.`,

  infographicPromptTemplate:
    "Create a professional infographic illustration about: {topic_title}. Summary: {topic_summary}. Style: clean, modern data visualization with icons and minimal text. No watermarks. Suitable for a professional newsletter.",
  infographicStyle: "modern flat design infographic",
  infographicSize: "1024x1024",

  webImageSearchEnabled: true,
  webImageMaxPerTopic: 2,

  linkDiscoverySystemPrompt:
    "You are a research assistant. Suggest relevant search queries for finding additional authoritative resources about AI topics.",
  linkDiscoveryUserPrompt: `For the following AI topic, suggest 3 search queries that would find the most relevant and authoritative articles, blog posts, or research papers about this topic.

Topic:
{topic_json}

Return a JSON array of objects with fields: query (string), description (string).
Return JSON only. No markdown. No explanation.`,
  linkSearchMaxPerTopic: 3,
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
        if (stored) setSettings({ ...DEFAULT_SETTINGS, ...stored });
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
