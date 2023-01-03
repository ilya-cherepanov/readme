import { SortOrder } from "./sort-order.enum";


export interface SortingParams {
  sortByPublish?: SortOrder;
  sortByLikes?: SortOrder;
  sortByComments?: SortOrder;
}
