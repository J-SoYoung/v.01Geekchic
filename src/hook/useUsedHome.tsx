import { useQuery } from "@tanstack/react-query";
import { usedItemLists, usedItemSearch } from "../api/firebase";
import { UsedItemType } from "../types/usedType";

export const useLoadUsedItem = () => {
  return useQuery<UsedItemType[], Error>({
    queryKey: ["usedItems"],
    queryFn: () => usedItemLists(),
    retry: 3, // 쿼리옵션-> 요청 3번 재시도
    retryDelay: 1000, // 쿼리옵션-> 재시도 사이의 지연 시간
  });
};

export const useSearchUsedItem = (searchQuery: string) => {
  return useQuery<UsedItemType[], Error>({
    queryKey: ["searchUsedItems", searchQuery],
    queryFn: () => usedItemSearch(searchQuery),
    enabled: !!searchQuery, // query가 빈 문자열일 때는 쿼리를 실행하지 않음
  });
};
