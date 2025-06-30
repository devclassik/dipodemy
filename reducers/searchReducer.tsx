interface Category {
  id: number;
  name: string;
  image: string;
  status: boolean;
}

interface CategoryState {
  data: Category[];
  page: number;
  loading: boolean;
  hasMore: boolean;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Category[]; hasMore: boolean }
  | { type: "NEXT_PAGE" }
  | { type: "RESET" };

export const initialState: CategoryState = {
  data: [],
  page: 1,
  loading: false,
  hasMore: true,
};

export const categoryReducer = (
  state: CategoryState,
  action: Action
): CategoryState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };

    case "FETCH_SUCCESS": {
      // Merge existing + new items, remove duplicates by ID
      const merged = [...state.data, ...action.payload];
      const unique = Array.from(
        new Map(merged.map((item) => [item.id, item])).values()
      );

      return {
        ...state,
        loading: false,
        data: unique,
        hasMore: action.hasMore,
      };
    }

    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };

    case "RESET":
      return { ...initialState };

    default:
      return state;
  }
};
