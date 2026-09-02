import Link from "next/link"

// Floating WhatsApp CTA — rendered only on public/marketing pages, gated in
// marketing-widgets.tsx (not the root layout directly), so it never shows up
// on survey-taking, admin, or staff screens.
//
// Number + default message are env-driven (see .env: NEXT_PUBLIC_WHATSAPP_NUMBER /
// NEXT_PUBLIC_WHATSAPP_MESSAGE) so marketing/support can change them without a
// code change or redeploy — same pattern as NEXT_PUBLIC_DEMO_BOOKING_URL etc.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919990897703"
const WHATSAPP_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? "Hi, I'd like to connect with Firmity Facility Automation."

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    // Rail wrapper: full-width, uses the SAME max-w-7xl + padding scale as the
    // navbar/footer containers (px-6 sm:px-10 lg:px-16), then flex-justify-end
    // to sit the button flush with that container's right content edge — so it
    // stays aligned with the Book Demo button/footer text at any viewport
    // width, instead of a raw `right-5` (which only lines up by coincidence at
    // one specific window width). Outer div is pointer-events-none so it
    // doesn't block clicks on the page beneath the empty rail space; the
    // button re-enables pointer-events on itself.
    <div className="fixed inset-x-0 bottom-5 z-40 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-end">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Firmity on WhatsApp"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_32px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-[1.06] hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)]"
        >
          <svg viewBox="0 0 32 32" className="h-6 w-6 fill-white" aria-hidden="true">
            <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.607 1.902 6.47L4 29l7.72-1.865A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.77 9.77 0 0 1-4.98-1.362l-.357-.212-4.583 1.107 1.127-4.464-.233-.368A9.78 9.78 0 0 1 5.182 15c0-5.968 4.854-10.818 10.822-10.818S26.826 9.032 26.826 15 21.972 24.818 16.004 24.818Zm5.978-7.34c-.328-.164-1.94-.957-2.24-1.066-.3-.109-.518-.164-.737.164-.218.328-.845 1.066-1.036 1.285-.19.219-.382.246-.71.082-.328-.164-1.385-.51-2.639-1.626-.976-.87-1.635-1.945-1.826-2.273-.19-.328-.02-.505.144-.669.148-.147.328-.383.492-.574.164-.192.219-.328.328-.547.11-.219.055-.41-.027-.574-.082-.164-.737-1.775-1.01-2.43-.266-.64-.537-.553-.737-.564l-.628-.011c-.219 0-.574.082-.874.41s-1.147 1.121-1.147 2.734 1.174 3.171 1.338 3.39c.164.219 2.31 3.53 5.6 4.949.783.338 1.394.54 1.87.691.786.25 1.502.215 2.068.13.631-.094 1.94-.792 2.213-1.557.273-.766.273-1.421.191-1.557-.082-.137-.3-.219-.628-.383Z" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
