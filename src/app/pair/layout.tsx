import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Pair Matching - An App for that",
};

export default function PairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
