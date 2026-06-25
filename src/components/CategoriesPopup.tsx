"use client";

import { productService } from "@/services/api";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CategoriesPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoriesPopup = ({ isOpen, onClose }: CategoriesPopupProps) => {
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string; slug: string; image: string | null }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await productService.getRootCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isOpen]);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) {
      return "/placeholder.svg";
    }
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${process.env.NEXT_PUBLIC_IMAGE_URL || ""}${imagePath}`;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[1100] location-modal-overlay"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-6xl w-full mx-4 relative z-10 shadow-2xl transform transition-all animate-popup-in border border-gray-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary text-black p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-black/20 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Browse Categories</h2>
              <p className="text-black/80 text-sm mt-1">
                {categories.length} {categories.length === 1 ? "category" : "categories"} available
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:bg-black/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Found</h3>
              <p className="text-gray-600 max-w-md">Categories will appear here when available.</p>
            </div>
          ) : (
            <>
              {/* Category Grid - Card Style matching recent views */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-white"
                    onClick={onClose}
                  >
                    <div className="relative w-full h-48 flex-shrink-0 bg-gray-50 overflow-hidden">
                      <Image
                        src={getImageUrl(category.image)}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-black text-center group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-gray-50 mt-6 -mx-6 -mb-6 rounded-b-2xl">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
