import type { ModuleStoryContent } from "./types"

export const visitorStory: ModuleStoryContent = {
  path: "/visitor-management-automation",
  h1: "Visitor management system for gates, offices and campuses",
  lede: [
    "A visitor scans a QR code at the gate, or the guard registers them on a phone. They choose a department and a host, and the host approves or rejects by email and SMS. Entry is only granted after approval, and the visit is kept with a photograph.",
    "It replaces the paper register, and works for one property or several.",
  ],
  sections: [
    {
      heading: "What a paper register can't do",
      paragraphs: [
        "A gate register records a handwritten name and a phone number that nobody checks. The host is reached by a phone call, if at all. There's no photograph, the writing is hard to read, and finding who visited last month means turning pages.",
      ],
    },
    {
      heading: "A visit, step by step",
      steps: [
        "The visitor arrives at the gate and scans the QR code for that property and gate, or the guard registers them manually.",
        "They choose a department, and Firmity lists the employees mapped to it. They pick the person they are visiting.",
        "They enter their first and last name, mobile number, address, purpose of the meeting and anything they are carrying.",
        "The guard takes the visitor's photograph on their mobile device and submits the request.",
        "The designated host or admin gets an email and an SMS and approves or rejects the request.",
        "If the request is rejected, or the approval request expires, entry is denied. If it's approved, the guard verifies the visitor and lets them in.",
        "The visitor is checked out by the guard, or by scanning the QR code again. The visit is archived for later search.",
      ],
    },
    {
      heading: "The guard's own screen",
      paragraphs: [
        "Guards log in securely. From there they can register a visitor by hand, take the photograph, look up previous visitors, see today's visitors, and check people out manually or by QR. Visitor history is available to them too.",
      ],
    },
    {
      heading: "Departments and hosts",
      paragraphs: [
        "The department master lets you create, edit, delete, activate and deactivate departments for each property and map department heads and employees to them. That mapping is what produces the list of people a visitor can choose from. Each department can carry a branch head's name, mobile number and email.",
      ],
    },
    {
      heading: "Many gates, many properties",
      paragraphs: [
        "QR codes are unique to every property, location and gate. Each property keeps its own visitor records, guard logins and department master, while administration stays central across locations.",
      ],
    },
    {
      heading: "Finding a visit later",
      paragraphs: [
        "The visitor dashboard lists each visit with its ID, name, purpose, in-time, out-time and status. You can search by visitor name, mobile number, department, contact person, status and date range. Opening a visit shows the photograph, address, purpose, items carried, host, status, in and out times and whether the meeting is over. Meeting time is tracked, and records export to Excel.",
        "Photographs are saved encrypted, guards authenticate, and notifications go out in real time.",
      ],
    },
  ],
  faqs: [
    {
      q: "What if the host doesn't respond?",
      a: "Approval requests that expire are invalidated and entry is denied, in the same way as a rejection.",
    },
    {
      q: "What if a visitor can't scan the QR code?",
      a: "The guard can register them manually from the guard portal, including the photograph.",
    },
    {
      q: "Can we run several gates or properties?",
      a: "Yes. Each property and gate has its own QR code, guard logins, visitor records and departments, with central administration.",
    },
    {
      q: "Is there a visitor photograph?",
      a: "Yes. It is taken on the guard's mobile device and stored encrypted with the visit.",
    },
    {
      q: "Can we export visitor records?",
      a: "Yes. Records can be searched by name, mobile, department, host, status and date range, and exported to Excel.",
    },
  ],
  related: [
    { href: "/complaint-helpdesk-automation", label: "Complaints and helpdesk", why: "use the same scan-a-QR approach for problems that people report." },
    { href: "/employee-management-automation", label: "Staff attendance", why: "keeps the employee records that hosts come from." },
    { href: "/facility-task-automation", label: "Facility task automation", why: "schedules the rounds your security team does." },
  ],
}
