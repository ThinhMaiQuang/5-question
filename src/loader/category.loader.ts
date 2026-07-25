import { URLConstants } from "../constant/url.constant";
import { defer, json } from "react-router-dom";
import { Category, TriviaCategoryResponse } from "../model/trivia.model";

async function loadCategories(): Promise<Category[]> {
  const response = await fetch(URLConstants.CATEGORY);
  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const result: TriviaCategoryResponse = await response.json();
    return result.trivia_categories;
  }
}

export async function categoriesLoader() {
  return defer({
    categories: await loadCategories(),
  });
}
