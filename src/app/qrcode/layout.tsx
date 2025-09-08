import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QRCode Scanner/Creator - An App for that",
};

export default function QrcodeLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
