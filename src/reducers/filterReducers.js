export const filterReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {

        case "PRODUCT_LIST":
            return { ...state, productList: payload.products }

        case "SORT_BY":
            return { ...state, sortBy: payload.sortBy }

        case "RATINGS":
            return { ...state, ratings: payload.ratings }

        case "BEST_SELLER_ONLY":
            return { ...state, bestSellerOnly: payload.bestSellerOnly }

        case "ONLY_IN_STOCK":
            return { ...state, onlyInStock: payload.onlyInStock }

        case "NOT_IN_STOCK":
            return { ...state, notInStock: payload.notInStock }

        case "CLEAR_FILTER":
            return {
                ...state,
                onlyInStock: false,
                notInStock: false,
                bestSellerOnly: false,
                sortBy: 'nameAsc',
                ratings: null
            }

        default:
            throw new Error("No Case Found!");
    }
}