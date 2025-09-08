import Link from "next/link";
import { Container } from "reactstrap";

export default function Home() {
  return (
    <Container fluid="md">
      <h1>An App for that</h1>

      <ul>
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
    </Container>
  );
}
