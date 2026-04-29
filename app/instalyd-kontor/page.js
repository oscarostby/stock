import { cookies } from "next/headers";
import {
  formatOfficeUsername,
  officeCookieName,
  readOfficeSessionValue,
} from "./auth";
import { OfficeDashboard } from "./office-dashboard";
import { deleteExpiredArchivedContactRequests, listContactRequests } from "../lib/contact-requests";
import { contact } from "../data";
import { SiteEffects } from "../site-effects";

export const metadata = {
  title: "Instalyd-kontor",
  description: "Internt kontrollpanel for foresporsler og kunder.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  },
};

export default async function InstalydOfficePage() {
  const cookieStore = await cookies();
  const sessionUser = readOfficeSessionValue(cookieStore.get(officeCookieName)?.value);
  const displayUser = sessionUser ? formatOfficeUsername(sessionUser) : "Ansatt";
  await deleteExpiredArchivedContactRequests();
  const { data: requests, error, supportsScheduling } = await listContactRequests();

  return (
    <>
      <SiteEffects />
      <OfficeDashboard
        contact={contact}
        displayUser={displayUser}
        error={error}
        initialRequests={requests}
        supportsScheduling={supportsScheduling}
      />
    </>
  );
}
