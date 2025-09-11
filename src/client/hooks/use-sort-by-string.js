import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useSortByString(list, selector) {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderParam = searchParams.get("sort");
  const sortOrder =
    orderParam === "asc" || orderParam === "desc" ? orderParam : "none";

  const handleSortChange = useCallback((event) => {
    const value = event.target.value;
    setSearchParams(
      (prev) => {
        const sp = new URLSearchParams(prev);
        if (value === "none") sp.delete("sort");
        else sp.set("sort", value);
        return sp;
      },
      { replace: true }
    );
  });

  const sortedList = useMemo(() => {
    if (!Array.isArray(list)) return [];
    if (sortOrder === "none") return list;

    const copyList = [...list];
    copyList.sort((a, b) => (a.selector ?? "").localeCompare(b.selector ?? "", "en"));
    if (sortOrder === "desc") copyList.reverse();
    return copyList;
  }, [list, selector, sortOrder]);

  return { searchParams, setSearchParams, sortedList, handleSortChange };
}
