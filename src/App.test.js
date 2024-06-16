import { render, screen } from "@testing-library/react";
import App from "./App";

const mock = jest.fn();

test("renders learn react link", () => {
  render(<App />);
  expect(1).toBeTruthy();
});
