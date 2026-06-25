"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface ShowCategoriesButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ShowCategoriesButton = ({ isOpen, onClick }: ShowCategoriesButtonProps) => {
  const t = useTranslations("navigation");

  return (
    <Button
      variant="ghost"
      className="show-categories-button hidden md:flex items-center gap-2 hover:bg-transparent hover:text-primary"
      onClick={onClick}
    >
      <div
        className={cn(
          "h-5 w-5 bg-yellow-600 transition-opacity duration-200",
          isOpen && "opacity-60"
        )}
        style={{
          WebkitMaskImage: "url('/images/icons/icon-menu.png')",
          maskImage: "url('/images/icons/icon-menu.png')",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
        aria-hidden="true"
      />
      <span className="text-sm font-medium">{t("allCategories")}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 text-yellow-600 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </Button>
  );
};
