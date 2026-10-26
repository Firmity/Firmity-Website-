import { permanentRedirect } from "next/navigation"

// The previous Privacy Policy lived at this URL. /privacy is the single, current
// policy, so anyone (or any search engine) arriving here is sent there with a 308.
export default function LegacyPrivacyPolicyRedirect() {
  permanentRedirect("/privacy")
}
