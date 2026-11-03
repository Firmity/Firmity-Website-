// Prose-first module page. Content lives in src/lib/module-stories/facility-expense-automation-erp.ts and the layout
// in src/components/module-story.tsx. Metadata and JSON-LD come from this folder's layout.tsx.
// (The previous card-and-stats version is in git history.)
import { ModuleStory } from "@/src/components/module-story"
import { facilityExpenseStory } from "@/src/lib/module-stories/facility-expense-automation-erp"

export default function Page() {
  return <ModuleStory story={facilityExpenseStory} />
}