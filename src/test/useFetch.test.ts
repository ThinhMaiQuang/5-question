import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "../hooks/useFetch";

describe("useFetch Hook", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with initial data", () => {
    const { result } = renderHook(() => useFetch("", { data: "initial" }));

    expect(result.current.fetchedData).toEqual({ data: "initial" });
    expect(result.current.isFetching).toBe(true);
  });

  it("should fetch data successfully", async () => {
    const mockData = { results: ["test1", "test2"] };
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const { result } = renderHook(() =>
      useFetch("https://api.test.com/data", null),
    );

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(result.current.fetchedData).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors", async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() =>
      useFetch("https://api.test.com/data", null),
    );

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch.");
    expect(result.current.fetchedData).toBeNull();
  });

  it("should allow manual fetch with onSuccess callback", async () => {
    const mockData = { value: "manual fetch" };
    const onSuccess = vi.fn();

    (global.fetch as any).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch("", null));

    await result.current.fetchData("https://api.test.com/manual", onSuccess);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData);
    });

    expect(result.current.fetchedData).toEqual(mockData);
  });

  it("should update URL and refetch", async () => {
    const mockData1 = { id: 1 };
    const mockData2 = { id: 2 };

    (global.fetch as any)
      .mockResolvedValueOnce({ json: async () => mockData1 })
      .mockResolvedValueOnce({ json: async () => mockData2 });

    const { result } = renderHook(() =>
      useFetch("https://api.test.com/data1", null),
    );

    await waitFor(() => {
      expect(result.current.fetchedData).toEqual(mockData1);
    });

    result.current.setUrl("https://api.test.com/data2");

    await waitFor(() => {
      expect(result.current.fetchedData).toEqual(mockData2);
    });
  });

  it("should not fetch when URL is empty", () => {
    const { result } = renderHook(() => useFetch("", null));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.isFetching).toBe(true);
  });

  it("should allow manual data update", () => {
    const { result } = renderHook(() => useFetch("", { initial: "data" }));

    result.current.setFetchedData({ updated: "data" });

    waitFor(() => {
      expect(result.current.fetchedData).toEqual({ updated: "data" });
    });
  });
});
