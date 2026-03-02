import { WorkflowSettings } from "./firestore";

export async function triggerWorkflow(
  settings: WorkflowSettings
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(
        data?.error || `Server responded with status ${response.status}`
      );
    }

    return { success: true, message: "Workflow triggered successfully" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to trigger workflow",
    };
  }
}
