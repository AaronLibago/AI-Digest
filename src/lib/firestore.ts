import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDbInstance } from "./firebase";

export interface WorkflowSettings {
  emailRecipient: string;
  gmailQuery: string;

  // Phase 1: Extraction (Top 10 Topics)
  extractionSystemPrompt: string;
  extractionUserPrompt: string;

  // Phase 2: Per-Topic Article Generation
  articleSystemPrompt: string;
  articleUserPrompt: string;

  // Phase 3: Infographic Generation (DALL-E 3)
  infographicPromptTemplate: string;
  infographicStyle: string;
  infographicSize: "1024x1024" | "1024x1792" | "1792x1024";

  // Phase 4: Web Image Search
  webImageSearchEnabled: boolean;
  webImageMaxPerTopic: number;

  // Phase 5: Link Discovery
  linkDiscoverySystemPrompt: string;
  linkDiscoveryUserPrompt: string;
  linkSearchMaxPerTopic: number;
}

function getSettingsDoc() {
  return doc(getDbInstance(), "settings", "workflow-config");
}

export async function getSettings(): Promise<WorkflowSettings | null> {
  const snap = await getDoc(getSettingsDoc());
  if (!snap.exists()) return null;
  return snap.data() as WorkflowSettings;
}

export async function saveSettings(settings: WorkflowSettings): Promise<void> {
  await setDoc(getSettingsDoc(), settings);
}
