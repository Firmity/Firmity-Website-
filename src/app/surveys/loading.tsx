// Route-segment loading fallback for the admin surveys dashboard.
// Shows the branded loading screen while the server fetch runs.
import LoadingScreen from "@/src/components/LoadingScreen";

export default function Loading() {
  return <LoadingScreen label="Loading surveys…" />;
}
