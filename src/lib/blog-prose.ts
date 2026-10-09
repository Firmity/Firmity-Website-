// Shared article typography, applied to BOTH the CMS editor and the public
// /blog/<slug> render so what the marketer writes is exactly what ships.
// Tailwind arbitrary-variant string (no @tailwindcss/typography dependency).
export const BLOG_PROSE =
  "[&_h2]:font-serif [&_h2]:text-[1.6rem] [&_h2]:font-light [&_h2]:text-[#111d35] [&_h2]:mt-9 [&_h2]:mb-3 " +
  "[&_h3]:font-semibold [&_h3]:text-[1.1rem] [&_h3]:text-[#111d35] [&_h3]:mt-6 [&_h3]:mb-2 " +
  "[&_p]:text-[15px] [&_p]:leading-[1.85] [&_p]:text-[#2d3748] [&_p]:mb-4 " +
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 " +
  "[&_li]:mb-1.5 [&_li]:text-[15px] [&_li]:text-[#2d3748] [&_li]:leading-[1.8] " +
  "[&_a]:text-[#2b6cb0] [&_a]:underline hover:[&_a]:text-[#1a56a0] " +
  "[&_blockquote]:border-l-2 [&_blockquote]:border-[#2b6cb0] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#4a5568] [&_blockquote]:my-5 " +
  "[&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_img]:h-auto [&_strong]:font-semibold [&_strong]:text-[#1a202c] " +
  "[&_table]:block [&_table]:overflow-x-auto [&_table]:my-6 [&_table]:text-[14px] [&_table]:border-collapse [&_caption]:sr-only " +
  "[&_th]:text-left [&_th]:bg-[#f4f7fb] [&_th]:text-[#114dac] [&_th]:font-semibold [&_th]:p-3 [&_td]:p-3 [&_td]:align-top [&_td]:text-[#2d3748] [&_tr]:border-t [&_tr]:border-[#e2e8f0] " +
  "[&_th]:border [&_th]:border-[#e2e8f0] [&_td]:border [&_td]:border-[#e2e8f0] [&_td_p]:m-0 [&_th_p]:m-0 [&_td_p]:text-[14px] [&_th_p]:text-[14px] " +
  "[&_hr]:my-8 [&_hr]:border-[#e2e8f0] [&_code]:bg-[#f1f5f9] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] " +
  // code blocks
  "[&_pre]:bg-[#0f172a] [&_pre]:text-[#e2e8f0] [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-5 [&_pre]:text-[13px] [&_pre]:leading-relaxed " +
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit " +
  // highlight, sub/superscript
  "[&_mark]:rounded [&_mark]:px-0.5 [&_sub]:text-[0.75em] [&_sup]:text-[0.75em] " +
  // checklists
  "[&_ul[data-type=taskList]]:list-none [&_ul[data-type=taskList]]:pl-0 " +
  "[&_li[data-type=taskItem]]:flex [&_li[data-type=taskItem]]:items-start [&_li[data-type=taskItem]]:gap-2 " +
  "[&_li[data-type=taskItem]>label]:mt-1 [&_li[data-type=taskItem]>div]:flex-1 [&_li[data-type=taskItem]_p]:mb-0 " +
  // collapsible sections (published markup is a native <details>)
  "[&_details]:border [&_details]:border-[#e2e8f0] [&_details]:rounded-xl [&_details]:px-4 [&_details]:py-3 [&_details]:my-4 " +
  "[&_summary]:cursor-pointer [&_summary]:font-semibold [&_summary]:text-[#114dac] [&_details_[data-type=detailsContent]]:mt-3 " +
  // embedded video
  "[&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:rounded-xl [&_iframe]:my-6 [&_iframe]:border-0";
