// Prose-first module page. Content lives in src/lib/module-stories/visitor-management-automation.ts and the layout
// in src/components/module-story.tsx. Metadata and JSON-LD come from this folder's layout.tsx.
// (The previous card-and-stats version is in git history.)
import { ModuleStory } from "@/src/components/module-story"
import { visitorStory } from "@/src/lib/module-stories/visitor-management-automation"

export default function Page() {
  return <ModuleStory story={visitorStory} />
}