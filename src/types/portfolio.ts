export interface PortfolioProject {
  image: string;
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  link?: string;
  github?: string;
}

export interface CircularGalleryProps {
  items?: PortfolioProject[];
  scrollSpeed?: number;
  scrollEase?: number;
  bend?: number;
  children: (project: PortfolioProject) => React.ReactNode;
}