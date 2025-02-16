"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-2 size-10 animate-bounce rounded-full hover:opacity-90 sm:bottom-4 sm:right-4 sm:animate-none"
          aria-label="Go to top"
        >
          <ChevronUp className="size-5 shrink-0" />
        </Button>
      )}
    </>
  );
};

export default BackToTopButton;
