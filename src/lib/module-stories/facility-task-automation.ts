import type { ModuleStoryContent } from "./types"

export const facilityTaskStory: ModuleStoryContent = {
  path: "/facility-task-automation",
  h1: "Facility task management: checklists that leave evidence",
  lede: [
    "Your team already walks the rounds: fire extinguishers, pump rooms, washrooms, DG sets. Firmity turns those rounds into scheduled tasks with checklists. A worker scans a QR code where the task happens, answers on a phone, and the answers, photos, place and time are saved on the spot.",
    "Nothing gets typed up at the end of the shift, and when an auditor asks about last March, the record is there.",
  ],
  sections: [
    {
      heading: "What goes wrong with paper rounds",
      paragraphs: [
        "On paper, a round is a tick sheet on a clipboard. You usually find out a round was skipped when something fails, or when someone asks for the sheet. A tick doesn't say who stood where or when. A \"No\" scribbled in the margin rarely turns into a repair.",
        "The fix isn't a longer form. It's a record that is made at the location, by a named person, and can be found again.",
      ],
    },
    {
      heading: "How a task runs",
      steps: [
        "The facility manager sets up the task: its category, checklist, how often it repeats, the shift, the location and the worker.",
        "The task is generated on schedule and shows in the planner and in the worker's portal.",
        "The worker or supervisor scans the QR code at the location, or opens the task from the portal. The QR is tied to a location, and the system checks the task is being done where it should be.",
        "The checklist opens with the task name, location and linked assets. The worker answers each item. Items marked mandatory must be answered before the task can be submitted.",
        "On submission Firmity records who did it, the date, the time, the location, the checklist and its answers.",
        "The next occurrence of a recurring task is generated automatically. If a task isn't finished inside its window it becomes overdue and the facility manager is notified.",
      ],
    },
    {
      heading: "When something is wrong",
      paragraphs: [
        "A checklist item can ask for more than a tick. Take \"Fire extinguisher available?\" If the answer is No, the worker writes a remark and photographs the spot. That finding is saved with the checklist as evidence.",
        "Failed items are moved into an Actionable list so the facility manager can see what needs follow-up. One thing to know: a failed item does not create a separate task or helpdesk complaint by itself. It waits in Actionable for someone to decide what happens next.",
      ],
    },
    {
      heading: "Checklists you can shape",
      paragraphs: [
        "Facility managers build the checklist templates and can change them later. Each item can take a Yes/No answer, a remark or a photo, and any item can be made mandatory. Tasks sit in categories and sub-categories, and different categories can have different checklists.",
        "Schedules can run once a day, twice a day, weekly, monthly or on another frequency you set, each with a start and due date, start and end time, a reminder, and an optional shift. If a checklist needs correcting, only the wrong items are corrected, not the whole sheet.",
      ],
    },
    {
      heading: "Who does what",
      table: {
        head: ["Role", "What they do with tasks"],
        rows: [
          ["Facility manager", "Creates checklists and schedules, assigns tasks to individual workers, reassigns when needed, and works through the Actionable items."],
          ["Supervisor", "Executes tasks and keeps a timestamped remarks thread with the facility manager, with attachments. Supervisors do not assign tasks on their own."],
          ["Worker", "Opens the task by QR scan or from the portal, completes the checklist with remarks and photos. Workers do not see the facility manager's remarks."],
        ],
      },
    },
    {
      heading: "Tied to the asset",
      paragraphs: [
        "A task can be linked to one or more assets. When the worker opens it, the asset details appear in the task: ID, brand, last service, next service, photo and QR. Task history then sits alongside the asset's service history.",
      ],
    },
    {
      heading: "What you can see and take to an audit",
      paragraphs: [
        "The task dashboard counts total, completed, actionable, pending, on-hold and overdue tasks. There is a calendar planner for recurring and scheduled work, and tasks can be searched, filtered and exported.",
        "Every execution is kept: the task, the checklist, the worker, the place, the date and time, the answers, the remarks and the photographs. Reports export to Excel and PDF.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do workers have to scan a QR code?",
      a: "No. They can scan the code at the location or open their assigned task from the portal. Scanning a QR for a task that is already done shows it as completed.",
    },
    {
      q: "What happens when a checklist item fails?",
      a: "The worker adds a remark and, where it applies, a photograph. The item moves to Actionable for the facility manager. It does not automatically create a new task or complaint.",
    },
    {
      q: "Can tasks repeat on their own?",
      a: "Yes. Set a frequency such as daily, twice a day, weekly or monthly, and Firmity generates the next occurrence when the current one is done. Unfinished tasks turn overdue and the facility manager is notified.",
    },
    {
      q: "Does it check that the task was done at the right place?",
      a: "The QR code is tied to a location, and the system validates that the task is performed at the designated location.",
    },
    {
      q: "Can we export records for audits?",
      a: "Yes. Task and checklist reports export to Excel and PDF, and the history of each execution, including photographs and remarks, is retained.",
    },
  ],
  related: [
    { href: "/assets-spares-automation", label: "Assets and spares", why: "gives each task its asset, service dates and history." },
    { href: "/complaint-helpdesk-automation", label: "Complaints and helpdesk", why: "handles problems that people report rather than rounds that you schedule." },
    { href: "/employee-management-automation", label: "Staff attendance", why: "records who is on shift when the tasks are assigned." },
  ],
}
