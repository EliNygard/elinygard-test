import { useCallback, useMemo, useState } from "react";

export function useSortByString(list, selector) {
  const [order, setOrder] = useState("none");

  const handleSortChange = useCallback((event) => {
    const value = event.target.value;
    if (value === "asc" || value === "desc" || value === "none") {
      setOrder(value);
    }
  }, []);

  const sortedList = useMemo(() => {
    if (!Array.isArray(list)) return [];
    if (order === "none") return list;

    const copyList = [...list];
    copyList.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "", "en"));
    if (order === "desc") copyList.reverse();
    return copyList;
  }, [list, order]);

  return { order, setOrder, sortedList, handleSortChange}
}
