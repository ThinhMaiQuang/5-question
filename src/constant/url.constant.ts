export class URLConstants {
  public static readonly baseURL: string = "https://opentdb.com";
  public static readonly CATEGORY: string = `${URLConstants.baseURL}/api_category.php`;
  public static readonly SEARCH_QUESTION = (
    category: string,
    difficulty: string,
    amount: number = 5,
    type: string = "multiple"
  ): string =>
    `${URLConstants.baseURL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
}
