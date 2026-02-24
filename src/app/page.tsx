import Link from "next/link";

export default function Home() {
  return (
    <article className="container-space py-10">
      <h1 className="mb-6">An App for that</h1>

      <ul className="flex flex-col gap-2 text-lg">
        <li>
          <Link href="./seatwind">Mahjong Seat Wind Picker</Link>
        </li>
        <li>
          <Link href="./pair">Team Pair Matching</Link>
        </li>
        <li>
          <Link href="./foursome">Foursome Round-robin Tournament Scheduler</Link>
        </li>
        <li>
          <Link href="./qrcode">QRCode Scanner/Creator</Link>
        </li>
        <li>
          <Link href="./random">Most Bestest Life Decisions Maker</Link>
        </li>
      </ul>
    </article>
  );
}
