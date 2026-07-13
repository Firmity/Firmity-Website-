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
  "[&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_strong]:font-semibold [&_strong]:text-[#1a202c] " +
  "[&_hr]:my-8 [&_hr]:border-[#e2e8f0] [&_code]:bg-[#f1f5f9] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px]";
