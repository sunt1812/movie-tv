import { useEffect, useRef, useState } from 'react';

export default function useOutSilde() {
  // This ref will be connected to the box
  const toggleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // These variables indicate the click is outside or inside the box
  const [isInside, setIsInside] = useState<boolean>(false);

  useEffect(() => {
    const clickOutslide = (event: MouseEvent) => {
      // type casting for window.onclick event
      // you can extend this union type if your app requires more than just <div>, <input>, <p>, <button>, and headings
      const target = event.target as
        | HTMLDivElement
        | HTMLInputElement
        | HTMLParagraphElement
        | HTMLButtonElement
        | HTMLHeadingElement;

      if (target?.contains(toggleRef.current) && target === toggleRef.current) {
        // toggle
        setIsInside(!isInside);
      } else if (
        // content
        target?.contains(contentRef.current) &&
        target === contentRef.current
      ) {
        setIsInside(true);
      } else {
        // out slide
        setIsInside(false);
      }
    };
    window.addEventListener('click', clickOutslide);
    return () => {
      window.removeEventListener('click', clickOutslide);
    };
  }, [isInside]);
  return { toggleRef, contentRef, isInside };
}
