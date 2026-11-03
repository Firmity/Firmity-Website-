import type { ModuleStoryContent } from "./types"

export const complaintHelpdeskStory: ModuleStoryContent = {
  path: "/complaint-helpdesk-automation",
  h1: "Complaint management software with SLA tracking for facility teams",
  lede: [
    "Anyone can raise a complaint by scanning the QR code where the problem is. Firmity routes it to the right group, runs it against an SLA, escalates it if the SLA is breached, and won't let it be marked resolved without a remark and a photograph.",
    "The person who raised it can check progress with a tracking ID, without logging in to anything.",
  ],
  sections: [
    {
      heading: "Why complaints go missing",
      paragraphs: [
        "Complaints arrive as phone calls, WhatsApp messages and entries in a register at reception. Each one has a different owner and none has a clock. Complaints don't disappear. They just stop having one person responsible by a particular time.",
      ],
    },
    {
      heading: "Raising a complaint takes a scan",
      paragraphs: [
        "Each QR code is tied to a location or area. When an employee or guest scans it, the location is filled in automatically. They describe the problem, attach a photograph, and choose a category and priority.",
        "A mobile number is optional. If they give one, they receive a unique tracking ID by SMS and can follow the status of the complaint without a login. Complaints can also be raised through a URL-based portal, not only by QR.",
      ],
    },
    {
      heading: "Who gets it",
      paragraphs: [
        "Complaint categories are mapped to job categories and responder groups, and a group can have several responders. When a complaint comes in, the workflow picks the group from the category and priority. The facility manager or a supervisor then assigns it to an individual worker in that group, and the facility manager can reassign it whenever needed.",
        "Assignment doesn't take a responder's location, shift or availability into account. The facility manager makes that call.",
      ],
    },
    {
      heading: "The life of a ticket",
      steps: [
        "Open: the complaint is registered and waiting for action.",
        "In progress: the assigned worker is working on it.",
        "On hold: work is paused, and the SLA timer pauses with it.",
        "Resolved: the facility manager has verified the finished work.",
        "Closed: the supervisor closes the resolved ticket.",
      ],
      after: [
        "A ticket can be reopened if the problem comes back. Tickets do not close by themselves after some period.",
      ],
    },
    {
      heading: "Resolved means proven",
      paragraphs: [
        "Before a complaint can be resolved, the worker must enter a resolution remark and add a photograph of the completed work. This applies to every category. Management gets documented evidence of what was done before the ticket is resolved and closed.",
        "Firmity does not ask workers to record the time they spent on a complaint.",
      ],
    },
    {
      heading: "SLAs and escalation",
      paragraphs: [
        "SLAs are set by complaint category and priority, with both a response SLA and a resolution SLA. Time is counted against the working hours you have configured for each property, and it stops while a ticket is on hold.",
        "If an SLA is breached, the ticket is escalated automatically along the hierarchy you have set up, including multiple levels. Escalation starts after the breach, not as the deadline approaches.",
      ],
    },
    {
      heading: "Who is told what",
      table: {
        intro: "SMS and in-app notifications go out on these events.",
        head: ["When this happens", "These people are notified"],
        rows: [
          ["Complaint raised", "Facility manager"],
          ["Ticket assigned", "Supervisor"],
          ["Ticket resolved", "Facility manager"],
          ["Ticket closed", "Facility manager and supervisor"],
          ["SLA breached", "The relevant escalation recipients"],
          ["Ticket escalated", "The relevant escalation recipients"],
        ],
      },
    },
    {
      heading: "What management sees",
      paragraphs: [
        "Every ticket keeps a comment thread. Each entry records who wrote it and when, next to the status, priority and assignment changes, so there is one trail for the whole complaint. Complaints can also be transferred.",
        "The helpdesk dashboard shows total, open, resolved, closed, overdue, escalated and reopened complaints, complaints by category and by location, turn-around time and SLA performance.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does the person raising a complaint need an account?",
      a: "No. They scan a QR code or use the portal link. If they enter a mobile number they get a tracking ID by SMS and can check the status without logging in.",
    },
    {
      q: "Can we change who a complaint is assigned to?",
      a: "Yes. The facility manager can reassign a ticket at any time, and complaints can be transferred.",
    },
    {
      q: "Do tickets close automatically?",
      a: "No. A supervisor closes a ticket after the facility manager has marked it resolved, and a ticket can be reopened if the issue recurs.",
    },
    {
      q: "Does the system warn us before an SLA is breached?",
      a: "Escalation is triggered once an SLA has been breached. It does not escalate merely because a deadline is approaching.",
    },
    {
      q: "How many QR codes do we need?",
      a: "Each QR code is mapped to one location or area, so put one wherever you want people to be able to raise complaints.",
    },
  ],
  related: [
    { href: "/facility-task-automation", label: "Facility task automation", why: "covers the scheduled rounds, where complaints cover what people report." },
    { href: "/assets-spares-automation", label: "Assets and spares", why: "keeps the service history of the equipment that complaints are about." },
    { href: "/visitor-management-automation", label: "Visitor management", why: "uses the same QR approach at the gate." },
  ],
}
