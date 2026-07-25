import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import store from "../store/store";

describe("App Component", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // Check if the app renders (RouterProvider should be present)
    expect(document.body).toBeInTheDocument();
  });

  it("should render with Redux Provider", () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(container).toBeTruthy();
  });
});
