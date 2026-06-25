/**
 * Product API Service
 */

import { env } from "@/lib/env";
import type {
  BreadcrumbResponse,
  CategoryBySlugResponse,
  CategoryChildrenResponse,
  HeroBannersResponse,
  MenuResponse,
  ProductDetailResponse,
  ProductQueryParams,
  ProductsResponse,
  RootCategoriesResponse,
} from "@/types/api/product";
import { fetchPublicWithFallback, handleApiResponse } from "./client";

// In-memory cache for menu
let menuCache: MenuResponse | null = null;
let menuPromise: Promise<MenuResponse> | null = null;

export const productService = {
  /**
   * Get all products with pagination and filters
   */
  getProducts: async (params?: ProductQueryParams): Promise<ProductsResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.per_page) {
      queryParams.append("per_page", params.per_page.toString());
    }
    if (params?.category) {
      queryParams.append("category", params.category);
    }
    if (params?.category_id) {
      queryParams.append("category_id", params.category_id.toString());
    }
    if (params?.sub_category) {
      queryParams.append("sub_category", params.sub_category.toString());
    }
    if (params?.child_sub_category_id) {
      queryParams.append("child_sub_category_id", params.child_sub_category_id.toString());
    }
    if (params?.sort) {
      queryParams.append("sort", params.sort);
    }
    if (params?.min_price) {
      queryParams.append("min_price", params.min_price.toString());
    }
    if (params?.max_price) {
      queryParams.append("max_price", params.max_price.toString());
    }
    if (params?.search) {
      queryParams.append("search", params.search);
    }

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const endpoint = `/api/products${queryString}`;

    const response = await fetchPublicWithFallback(endpoint, env.apiBaseUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return handleApiResponse<ProductsResponse>(response);
  },

  /**
   * Get single product by ID or slug
   */
  getProduct: async (idOrSlug: string | number): Promise<ProductDetailResponse> => {
    const response = await fetchPublicWithFallback(`/api/products/${idOrSlug}`, env.apiBaseUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return handleApiResponse<ProductDetailResponse>(response);
  },

  /**
   * Get hero banners
   */
  getHeroBanners: async (): Promise<HeroBannersResponse> => {
    const response = await fetchPublicWithFallback("/api/hero-banners", env.apiBaseUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    return handleApiResponse<HeroBannersResponse>(response);
  },

  /**
   * Get complete category tree (all levels)
   * Use this for initial full menu load
   */
  getMenu: async (forceRefresh = false): Promise<MenuResponse> => {
    // Return cached data if available and not forcing refresh
    if (menuCache && !forceRefresh) {
      return menuCache;
    }

    // specific check: if a request is already in flight, return that promise
    if (menuPromise && !forceRefresh) {
      return menuPromise;
    }

    // Create new fetch promise
    menuPromise = (async () => {
      try {
        const response = await fetchPublicWithFallback(
          `/api/v1/categories/tree`, // Removed refresh=true hardcode
          env.apiBaseUrl,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            // Removed cache: 'no-store' to allow browser caching if applicable
            next: { revalidate: 3600 }, // Hint for Next.js cache
          }
        );

        const data = await handleApiResponse<MenuResponse>(response);
        menuCache = data; // Update cache on success
        return data;
      } catch (error) {
        menuPromise = null; // Reset promise on error so retry is possible
        throw error;
      }
    })();

    return menuPromise;
  },

  /**
   * Get root categories only (for lazy loading optimization)
   * Use this for initial page load, then lazy load children on hover/click
   */
  getRootCategories: async (): Promise<RootCategoriesResponse> => {
    const response = await fetchPublicWithFallback("/api/v1/categories", env.apiBaseUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    return handleApiResponse(response);
  },

  /**
   * Get children of a specific category (lazy loading)
   * Use this when user hovers/clicks on a category to load its subcategories
   */
  getCategoryChildren: async (categoryId: number): Promise<CategoryChildrenResponse> => {
    const response = await fetchPublicWithFallback(
      `/api/v1/categories/${categoryId}/children`,
      env.apiBaseUrl,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    return handleApiResponse(response);
  },

  /**
   * Get category details by slug (for category pages)
   * Use this for routing and displaying category pages with SEO data
   */
  getCategoryBySlug: async (slug: string): Promise<CategoryBySlugResponse> => {
    const response = await fetchPublicWithFallback(
      `/api/v1/categories/slug/${slug}`,
      env.apiBaseUrl,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    return handleApiResponse(response);
  },

  /**
   * Get breadcrumb path for a category
   * Use this for breadcrumb navigation
   */
  getCategoryBreadcrumb: async (categoryId: number): Promise<BreadcrumbResponse> => {
    const response = await fetchPublicWithFallback(
      `/api/v1/categories/${categoryId}/breadcrumb`,
      env.apiBaseUrl,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    return handleApiResponse(response);
  },

  /**
   * Get trending products
   */
  getTrendingProducts: async (): Promise<ProductsResponse> => {
    const response = await fetchPublicWithFallback("/api/products/trending", env.apiBaseUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return handleApiResponse<ProductsResponse>(response);
  },

  /**
   * Get bestseller products
   */
  getBestsellers: async (): Promise<ProductsResponse> => {
    const response = await fetchPublicWithFallback("/api/products/bestsellers", env.apiBaseUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return handleApiResponse<ProductsResponse>(response);
  },

  /**
   * Get similar products for a given product
   */
  getSimilarProducts: async (productId: string | number): Promise<ProductsResponse> => {
    const response = await fetchPublicWithFallback(
      `/api/products/${productId}/similar`,
      env.apiBaseUrl,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    return handleApiResponse<ProductsResponse>(response);
  },

  /**
   * Get multiple products by their IDs
   */
  getProductsByIds: async (productIds: number[]): Promise<ProductsResponse> => {
    try {
      // Fetch multiple products by their IDs
      const promises = productIds.map((id) =>
        fetchPublicWithFallback(`/api/products/${id}`, env.apiBaseUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })
      );

      const responses = await Promise.all(promises);
      const dataPromises = responses.map((r) => handleApiResponse<ProductDetailResponse>(r));
      const results = await Promise.all(dataPromises);

      // Filter successful responses and extract product data
      const products = results
        .filter((result) => result.success && result.data)
        .map((result) => result.data)
        .filter((p): p is NonNullable<typeof p> => p !== undefined);

      return {
        success: true,
        message: "Products retrieved successfully",
        data: {
          products: products,
          pagination: {
            current_page: 1,
            last_page: 1,
            per_page: products.length,
            total: products.length,
            from: 1,
            to: products.length,
            has_more: false,
          },
        },
      };
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unable to fetch products. Please check your internet connection."
      );
    }
  },

  /**
   * Get product reviews
   */
  getProductReviews: async (productId: string | number) => {
    const response = await fetchPublicWithFallback(
      `/api/products/${productId}/reviews`,
      env.apiBaseUrl,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    return handleApiResponse(response);
  },
};
