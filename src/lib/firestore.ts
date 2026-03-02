import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDbInstance } from "./firebase";

export interface WorkflowSettings {
  emailRecipient: string;
  gmailQuery: string;
  extractionSystemPrompt: string;
  extractionUserPrompt: string;
  substackSystemPrompt: string;
  substackUserPrompt: string;
  linkedinSystemPrompt: string;
  linkedinUserPrompt: string;
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
