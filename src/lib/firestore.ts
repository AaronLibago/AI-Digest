import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

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

const SETTINGS_DOC = doc(db, "settings", "workflow-config");

export async function getSettings(): Promise<WorkflowSettings | null> {
  const snap = await getDoc(SETTINGS_DOC);
  if (!snap.exists()) return null;
  return snap.data() as WorkflowSettings;
}

export async function saveSettings(settings: WorkflowSettings): Promise<void> {
  await setDoc(SETTINGS_DOC, settings);
}
