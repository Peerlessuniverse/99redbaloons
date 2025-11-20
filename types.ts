export interface BalloonData {
  id: number;
  text: string;
  landingX: number; // The horizontal percentage/pixel offset where it hits the ceiling
  duration: number; // Seconds
  rotate: number; // Degrees
  delay: number; // Animation delay
  colorVar: string; // Slight red variation
}

export interface NavItem {
  label: string;
  href: string;
}