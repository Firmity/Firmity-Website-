// Content shape for the eight module pages (task, assets, complaints, inventory,
// visitors, employees, payroll, expenses). Each page is plain prose: headings,
// paragraphs, one real sequence (<ol>) where the product has one, and one real
// table where the data is tabular. No icons, no card grids, no stock imagery.
//
// Accuracy rule: every product claim must be traceable to the client's feature
// listing (Firmity_Features_Listing_Comprehensive_Client.docx). Where the product
// has a limit, say so — it is more believable than silence. Never add a customer,
// statistic or capability that the listing does not state.

export interface StoryTable {
  /** Short sentence introducing the table (rendered above it). */
  intro?: string
  head: string[]
  rows: string[][]
}

export interface StorySection {
  heading: string
  paragraphs?: string[]
  /** A real sequence in the product; rendered as a numbered list. */
  steps?: string[]
  /** Paragraphs shown after the steps/table. */
  after?: string[]
  table?: StoryTable
}

export interface StoryFaq {
  q: string
  a: string
}

export interface StoryLink {
  href: string
  label: string
  /** One short clause on why the pages belong together. */
  why: string
}

export interface ModuleStoryContent {
  /** Route this content belongs to, e.g. "/facility-task-automation". */
  path: string
  h1: string
  /** The opening 1-2 paragraphs. */
  lede: string[]
  sections: StorySection[]
  faqs: StoryFaq[]
  related: StoryLink[]
}

export const sectionId = (heading: string): string =>
  heading
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
