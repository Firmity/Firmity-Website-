import type { ModuleStoryContent } from "./types"

// NOTE FOR EDITORS: the client feature listing names the Payroll module but does not
// describe how it calculates or reports. This page therefore says what the
// surrounding records hold and points to a demo for the rest. When the payroll
// feature list is supplied (salary structure, statutory components, payslips,
// bank files), expand the sections below with those exact claims.

export const payrollStory: ModuleStoryContent = {
  path: "/payroll-automation-erp",
  h1: "Payroll management for facility teams, next to attendance and leave",
  lede: [
    "Payroll is only as reliable as the records under it: who worked which days, who was on leave, which statutory numbers belong to whom, and where the salary goes. Firmity's payroll module sits in the same system as the employee master, attendance and leave records, so those records are not kept somewhere else.",
  ],
  sections: [
    {
      heading: "Where payroll usually goes wrong",
      paragraphs: [
        "In most facility teams the hard part of payroll isn't the arithmetic. It's gathering the inputs. Attendance sits in site registers, leave in messages, and PF, ESI and bank details in different files, and someone has to bring them together before a single salary can be worked out.",
      ],
    },
    {
      heading: "What Firmity already holds for each employee",
      paragraphs: [
        "Each employee has one record with their code, branch, client and property, employment type, department and designation. It holds PAN and Aadhaar details, UAN, PF and ESI numbers, and bank account details, and you can search by any of those numbers.",
        "Attendance is recorded as a monthly calendar with present, absent and leave status, check-in and check-out times, working hours and an approved or rejected state. Leave balances are kept by financial year for casual, sick and earned leave, with compensatory off tracked separately.",
      ],
    },
    {
      heading: "Where payroll sits",
      paragraphs: [
        "Payroll management is part of the same facility management module as the employee, attendance, leave and expense records, with reports alongside. How a salary is built, and which statutory components apply, depends on how your establishment pays its people, so we show that on your own structure in a demo rather than describe it generically here.",
      ],
    },
    {
      heading: "Questions worth asking any payroll software",
      paragraphs: [
        "Whichever product you choose, ask whether it reads attendance and leave directly or asks you to re-enter them. Ask whether PF, ESI and UAN numbers are searchable against each employee, so a deduction can be checked against a person. Ask what you can export for your bank and your auditor, and who can see salary data. Those four answers tell you more than a feature list.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does Firmity keep PF, ESI and UAN numbers?",
      a: "Yes. They are part of the employee record and you can search employees by UAN, PF number and ESI number. For how payroll uses them in your setup, book a demo and we'll show it on your structure.",
    },
    {
      q: "Is payroll in the same system as attendance?",
      a: "Yes. Employee records, attendance, leave and payroll management are in the same Firmity system.",
    },
    {
      q: "Where are bank details stored?",
      a: "Bank details are held on the employee record, and employees can be found by bank account number.",
    },
    {
      q: "Can we see how payroll would work for our staff before committing?",
      a: "That is what the demo is for. Tell us how many sites and what kinds of staff you have and we'll go through it with that in mind.",
    },
  ],
  related: [
    { href: "/employee-management-automation", label: "Staff attendance and leave", why: "holds the attendance, leave and employee records payroll depends on." },
    { href: "/facility-expense-automation-erp", label: "Facility expenses", why: "records the rest of what the facility spends." },
  ],
}
