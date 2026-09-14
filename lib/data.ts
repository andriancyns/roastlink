/**
 * Mock data for the RoastLink landing page.
 *
 * All values below are illustrative sample data, not real on-chain records.
 * Hashes, block numbers, prices, and names are invented for demo purposes.
 */

export type SupplyStep = {
  /** Short stage label shown on the timeline node */
  id: "petani" | "roaster" | "distributor" | "kedai";
  label: string;
  /** One-line caption under the node */
  caption: string;
  /** Region / location shown in the hover detail */
  location: string;
  /** Human-readable date */
  date: string;
  /** UNIX-ish timestamp string (mono) */
  timestamp: string;
  /** Mock transaction hash */
  txHash: string;
  /** Mock block number */
  block: number;
  /** Short detail line about what happened at this stage */
  detail: string;
};

/** The four-stage horizontal supply-chain timeline (Petani -> Kedai Anda). */
export const SUPPLY_STEPS: SupplyStep[] = [
  {
    id: "petani",
    label: "Petani",
    caption: "Panen ceri merah, Aceh Gayo",
    location: "Takengon, Aceh Tengah",
    date: "12 Mei 2026",
    timestamp: "1747003200",
    txHash: "0x7af3c1d2..b9e14",
    block: 18_402_771,
    detail: "Ceri kopi dipetik tangan pada kematangan 22° Brix.",
  },
  {
    id: "roaster",
    label: "Roaster",
    caption: "Roasting profile medium",
    location: "Bandung, Jawa Barat",
    date: "03 Jun 2026",
    timestamp: "1748976000",
    txHash: "0x2e884a1c..f10d2",
    block: 18_451_902,
    detail: "Roasting 14 menit, first crack pada menit ke-9.",
  },
  {
    id: "distributor",
    label: "Distributor",
    caption: "Dikirim dingin, terverifikasi",
    location: "Jakarta, DKI Jakarta",
    date: "18 Jun 2026",
    timestamp: "1750238400",
    txHash: "0x91b2d7ef..3a8c5",
    block: 18_498_113,
    detail: "140 kg biji roasted, suhu kontainer 16°C.",
  },
  {
    id: "kedai",
    label: "Kedai Anda",
    caption: "Diseduh untuk cangkir ini",
    location: "Surabaya, Jawa Timur",
    date: "11 Jul 2026",
    timestamp: "1752211200",
    txHash: "0x4c6a0b93..e7721",
    block: 18_544_980,
    detail: "Espresso single origin, ekstraksi 28 detik.",
  },
];

/** Stats shown in the farmer-transparency section (mock). */
export const FARMER_STATS = {
  /** Percentage income increase for farmers on RoastLink vs conventional chain */
  incomeIncrease: 47,
  /** Share of retail price reaching the farmer, RoastLink route (%) */
  farmerShareRoastlink: 38,
  /** Share of retail price reaching the farmer, conventional route (%) */
  farmerShareConventional: 12,
  /** Mock average price paid to farmer, RoastLink route (IDR per kg green bean) */
  pricePerKgRoastlink: 62_500,
  /** Mock average price, conventional route */
  pricePerKgConventional: 42_000,
  /** Number of partner farmers (mock) */
  partnerFarmers: 1_284,
  /** Partner cooperatives (mock) */
  cooperatives: 26,
};

/** A short brand-line used in the footer / nav. */
export const BRAND = {
  name: "RoastLink",
  tagline: "Jejak kopi yang bisa diverifikasi, dari petani hingga cangkir.",
};

export const NAV_LINKS = [
  { label: "Jejak Rantai", href: "#jejak" },
  { label: "Transparansi Petani", href: "#petani" },
  { label: "Cara Kerja", href: "#cara-kerja" },
];
