import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahjong Seat Wind Picker - An App for that",
};

export default function SeatWindPickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
