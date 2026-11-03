import type { ModuleStoryContent } from "./types"

export const employeeStory: ModuleStoryContent = {
  path: "/employee-management-automation",
  h1: "Staff attendance and leave management for facility workforces",
  lede: [
    "Firmity keeps one employee record for each person on your facility staff, and records their attendance, leave and compensatory offs against it, property by property. Month-end stops being a reconciliation exercise.",
    "The same records sit beside payroll in the same system.",
  ],
  sections: [
    {
      heading: "Why facility workforces are hard to keep straight",
      paragraphs: [
        "Facility teams work across sites and shifts. Attendance lives in a register at each site, leave is agreed over WhatsApp, and the statutory numbers are in a folder at head office. By the end of the month somebody has to reconcile all of it by hand.",
      ],
    },
    {
      heading: "One record per person",
      paragraphs: [
        "The employee master holds the employee code, branch, client and property, employment type, department, designation and reporting manager. It also holds contact details, address, PAN and Aadhaar details, bank details, work history and uploaded documents. Records can be active or inactive.",
        "You can search active and inactive employees by name, employee code, phone number, Aadhaar, PAN, UAN, PF number, ESI number, bank account number or property ID, and transfer an employee between properties.",
      ],
    },
    {
      heading: "Attendance",
      paragraphs: [
        "Attendance is shown as a monthly calendar with a daily status for each person: present, absent or on leave. It records check-in and check-out times and working hours, and you can mark holidays and pick the month, year and attendance type. Records can be pending, approved or rejected.",
        "You can search employee-wise attendance and export the daily attendance to CSV. Location records hold latitude and longitude, a location name and a visit type for each employee, and you can create, edit and delete them.",
      ],
    },
    {
      heading: "Leave and compensatory offs",
      paragraphs: [
        "The leave master holds your leave types, such as casual leave, sick leave, earned leave and compensatory off, and you can add or change them. Leave is allocated per employee by financial year, and balances are kept for each type.",
        "Leave requests carry the dates, type and reason. A manager approves or rejects them, with rejection remarks, and Firmity records who processed the request and when. A leave dashboard shows casual, sick and earned leave remaining for every employee and downloads to Excel. Compensatory off balances are kept per employee.",
      ],
    },
    {
      heading: "Where it connects",
      paragraphs: [
        "Attendance feeds the executive dashboard, which splits staff into present, absent and on leave for the period you choose. The payroll module is part of the same system, and you can create the users who need access from the same place.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I find an employee by their PF, ESI or UAN number?",
      a: "Yes. Search covers name, code, phone, Aadhaar, PAN, UAN, PF number, ESI number, bank account number and property ID.",
    },
    {
      q: "Which leave types are supported?",
      a: "Casual leave, sick leave, earned leave and compensatory off are set up, and you can create and edit leave types in the leave master.",
    },
    {
      q: "Can attendance be exported?",
      a: "Yes. Daily attendance exports, including to CSV, and the leave dashboard downloads to Excel.",
    },
    {
      q: "Can an employee move between properties?",
      a: "Yes. Employee transfer is supported, and employee details can be viewed by branch, client and property.",
    },
    {
      q: "Are leave requests approved in the system?",
      a: "Yes. A request is approved or rejected with remarks, and the record shows who processed it and when.",
    },
  ],
  related: [
    { href: "/payroll-automation-erp", label: "Payroll", why: "sits in the same system as these attendance and leave records." },
    { href: "/visitor-management-automation", label: "Visitor management", why: "uses the same employee records as hosts." },
    { href: "/facility-task-automation", label: "Facility task automation", why: "assigns work to the people recorded here." },
  ],
}
