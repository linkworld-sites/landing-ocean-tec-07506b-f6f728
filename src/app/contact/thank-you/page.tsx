import type { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Enquiry Received — OCEAN TEC",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
