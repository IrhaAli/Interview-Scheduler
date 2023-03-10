import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, prettyDOM } from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";
import reducer from "../../reducers/application";

afterEach(cleanup);

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  
  fireEvent.click(getByAltText(appointment, "Add"));
  
  
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));
  
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  fireEvent.click(getByText(appointment, "Confirm"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument()

  await waitForElement(() => getAllByTestId(container, "appointment"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "3 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Lydia Miller-Jones")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Irha Ali" }
  });

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Irha Ali"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "3 spots remaining")).toBeInTheDocument();
})

it("shows the delete error when failing to delete an existing appointment", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Irha Ali"));


  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Irha Ali")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  axios.delete.mockRejectedValueOnce();

  fireEvent.click(getByText(appointment, "Confirm"));

  await waitForElement(() => getByText(appointment, "Error"))

  expect(getByText(appointment, "Error")).toBeInTheDocument();

});

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Irha Ali"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Irha Ali")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Pablo Escobar" }
  });

  fireEvent.click(getByText(appointment, "Save"));

  axios.delete.mockRejectedValueOnce();

  await waitForElement(() => getByText(appointment, "Error"))

  expect(getByText(appointment, "Error")).toBeInTheDocument()
})

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});