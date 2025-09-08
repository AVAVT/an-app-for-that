import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foursome Scheduler - An App for that",
};

export default function QrcodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
