/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

// Updated interface to match PortfolioGallery.tsx
interface PortfolioProject {
  image: string;
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  link?: string;
  github?: string;
}

interface CircularGalleryProps {
  items?: PortfolioProject[];
  scrollSpeed?: number;
  scrollEase?: number;
  bend?: number;
  children: (project: PortfolioProject) => React.ReactNode;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
    direction: "right" | "left" | null;
  };
  items: PortfolioProject[];
  screen: ScreenSize;
  viewport: Viewport;
  carousel: HTMLDivElement | null = null;
  itemElements: HTMLElement[] = [];
  raf: number = 0;
  boundOnResize: () => void;
  boundOnWheel: (e: Event) => void;
  boundOnTouchDown: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp: () => void;
  isDown: boolean = false;
  start: number = 0;
  onCheckDebounce: (...args: any[]) => void;
  bend: number;
  itemWidth: number = 340; // Account for card width + margin
  totalWidth: number = 0;
  renderItem: (project: PortfolioProject) => React.ReactNode;
  reactRoots: any[] = [];

  constructor(
    container: HTMLElement,
    { items = [], scrollSpeed = 2, scrollEase = 0.08, bend = 5, children }: CircularGalleryProps,
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, direction: null };
    this.items = items;
    this.bend = bend;
    this.renderItem = children;
    this.screen = {
      width: container.clientWidth,
      height: container.clientHeight,
    };
    this.viewport = {
      width: container.clientWidth,
      height: container.clientHeight,
    };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.createCarousel();
    this.addEventListeners();
    this.update();
  }

  createCarousel() {
    this.carousel = document.createElement("div");
    this.carousel.style.cssText = `
      display: flex;
      position: relative;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transform-style: preserve-3d;
      perspective: 1200px;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    `;
    this.container.appendChild(this.carousel);

    const tripleItems = [...this.items, ...this.items, ...this.items];
    this.totalWidth = this.items.length * this.itemWidth;

    tripleItems.forEach((project, index) => {
      const itemContainer = document.createElement("div");
      itemContainer.style.cssText = `
        position: absolute;
        width: 320px;
        display: flex;
        align-items: center;
        justify-content: center;
        will-change: transform, opacity;
        pointer-events: auto;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      `;
      itemContainer.setAttribute("data-index", index.toString());

      const reactContainer = document.createElement("div");
      itemContainer.appendChild(reactContainer);

      const root = createRoot(reactContainer);
      root.render(this.renderItem(project) as React.ReactElement);
      this.reactRoots.push(root);

      this.carousel!.appendChild(itemContainer);
      this.itemElements.push(itemContainer);
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    // Prevent text selection during drag
    e.preventDefault();
    
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
    
    // Add temporary styles to prevent text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    (document.body.style as any).mozUserSelect = 'none';
    (document.body.style as any).msUserSelect = 'none';
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    
    // Prevent default behavior to stop text selection
    e.preventDefault();
    
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.8);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
    
    // Restore text selection
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    (document.body.style as any).mozUserSelect = '';
    (document.body.style as any).msUserSelect = '';
  }

  onWheel(e: Event) {
    // Only prevent default - don't stop propagation
    e.preventDefault();
    
    const wheelEvent = e as WheelEvent;
    const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;
    this.scroll.target += delta > 0 ? this.scrollSpeed * 20 : -this.scrollSpeed * 20;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.itemElements.length) return;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / this.itemWidth);
    const itemOffset = this.itemWidth * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -itemOffset : itemOffset;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.viewport = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    this.scroll.direction = this.scroll.current > this.scroll.last ? "right" : "left";

    if (this.carousel && this.itemElements.length) {
      this.itemElements.forEach((element, index) => {
        const baseIndex = index % this.items.length;
        const cycle = Math.floor(index / this.items.length);
        let x = (baseIndex * this.itemWidth) - (this.scroll.current % this.totalWidth) + (cycle * this.totalWidth);

        // Improved infinite loop logic
        const viewportCenter = this.viewport.width / 2;
        const itemHalfWidth = this.itemWidth / 2;
        
        // Adjust position for seamless looping
        while (x - itemHalfWidth > viewportCenter + this.itemWidth) {
          x -= this.totalWidth;
        }
        while (x + itemHalfWidth < -viewportCenter - this.itemWidth) {
          x += this.totalWidth;
        }

        const H = this.viewport.width / 2;
        let yPos = 0;
        let rotationY = 0;
        let rotationZ = 0;
        let rotationX = 0;

        if (this.bend !== 0) {
          const B_abs = Math.abs(this.bend);
          const R = Math.max(H, (H * H + B_abs * B_abs) / (2 * B_abs));
          const normalizedX = x / H;
          const effectiveX = Math.min(Math.abs(x), H * 1.2);

          const theta = Math.asin(Math.min(effectiveX / R, 1));
          const arc = R * (1 - Math.cos(theta));

          if (this.bend > 0) {
            yPos = -arc * 0.9;
            rotationY = -Math.sign(x) * theta * (180 / Math.PI) * 0.5;
            rotationZ = Math.sign(x) * Math.min(Math.abs(normalizedX), 1) * 6;
            rotationX = Math.min(Math.abs(normalizedX), 1) * 4;
          } else {
            yPos = arc * 0.9;
            rotationY = Math.sign(x) * theta * (180 / Math.PI) * 0.5;
            rotationZ = -Math.sign(x) * Math.min(Math.abs(normalizedX), 1) * 6;
            rotationX = -Math.min(Math.abs(normalizedX), 1) * 4;
          }
        }

        const distanceFromCenter = Math.abs(x);
        const maxVisibleDistance = this.viewport.width / 2 + this.itemWidth;
        const normalizedDistance = Math.min(distanceFromCenter / maxVisibleDistance, 1);

        const scale = Math.max(0.5, 1 - (normalizedDistance * 0.4));
        const opacity = Math.max(0.2, 1 - (normalizedDistance * 0.6));
        const translateZ = -normalizedDistance * 150;

        element.style.transform = `
          translate3d(${x}px, ${yPos}px, ${translateZ}px)
          rotateX(${rotationX}deg)
          rotateY(${rotationY}deg)
          rotateZ(${rotationZ}deg)
          scale(${scale})
        `;
        element.style.opacity = opacity.toString();
        element.style.zIndex = Math.round(1000 - distanceFromCenter * 10).toString();

        const blurAmount = Math.min(normalizedDistance * 1.5, 1.5);
        element.style.filter = `blur(${blurAmount}px)`;

        // More generous visibility check to prevent cards from disappearing
        const isVisible = distanceFromCenter <= maxVisibleDistance * 2;
        element.style.visibility = isVisible ? 'visible' : 'hidden';
      });
    }

    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    window.addEventListener("resize", this.boundOnResize);
    
    // Add wheel events to the carousel container instead of window
    // This prevents interfering with page scrolling
    if (this.carousel) {
      this.carousel.addEventListener("wheel", this.boundOnWheel, { passive: false });
    }
    
    // Mouse events for drag functionality
    this.container.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    
    // Touch events for mobile
    this.container.addEventListener("touchstart", this.boundOnTouchDown, { passive: false });
    window.addEventListener("touchmove", this.boundOnTouchMove, { passive: false });
    window.addEventListener("touchend", this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    
    // Remove wheel event from carousel
    if (this.carousel) {
      this.carousel.removeEventListener("wheel", this.boundOnWheel);
    }
    
    // Remove mouse events
    this.container.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    
    // Remove touch events
    this.container.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);

    // Restore text selection when component is destroyed
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    (document.body.style as any).mozUserSelect = '';
    (document.body.style as any).msUserSelect = '';

    this.reactRoots.forEach(root => {
      try {
        root.unmount();
      } catch (e) {
        console.warn('Error unmounting React root:', e);
      }
    });
    this.reactRoots = [];

    if (this.carousel && this.carousel.parentNode) {
      this.carousel.parentNode.removeChild(this.carousel);
    }
  }
}

function CircularGallery({
  items = [],
  scrollSpeed = 2,
  scrollEase = 0.08,
  bend = 5,
  children,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items,
      scrollSpeed,
      scrollEase,
      bend,
      children,
    });
    return () => {
      app.destroy();
    };
  }, [items, scrollSpeed, scrollEase, bend, children]);

  return (
    <div
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      ref={containerRef}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
    />
  );
}

export default CircularGallery;