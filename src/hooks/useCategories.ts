// hooks/useCategories.ts
import { useMemo } from "react";
import { useGetAllCategoriesByAreaNameQuery } from "../redux/Features/Categories/ReelCategory/categoriesApi";
import type { TCategories } from "../types/categories.interface";

interface UseCategoriesOptions {
    areaName: string;
}

// hooks/useCategories.ts
export const useCategories = (options: UseCategoriesOptions) => {
    const { areaName } = options;

    const { data, isLoading } = useGetAllCategoriesByAreaNameQuery(areaName, {
        skip: !areaName,
    });

    const categories = useMemo(() => {
        if (!data?.data) return ["All"];
        return ["All", ...data.data.map((item: TCategories) => item?.category)];
    }, [data]);

    return {
        categories,
        isLoading,
    };
};