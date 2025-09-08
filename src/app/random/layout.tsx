import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Most Bestest Life Decisions Maker - An App for that",
};

export default function QrcodeLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
