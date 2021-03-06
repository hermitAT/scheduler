import React from "react";
import Application from "components/Application";

import { render, cleanup, queryByAltText, queryByText, getByText, getByAltText, getByPlaceholderText, getAllByTestId, fireEvent, prettyDOM, waitForElement } from "@testing-library/react";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // logic from this test is used in all remaining tests -> use getBy queries to find specific parts of the app and fireEvents
    // OR change inputs, and set expectations for the next component to appear after an event is fired.
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
  
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // reverse logic from the test for adding a new appointment, with coverage for the Confirm component added
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
 
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Deletion is permanent. Are you sure you want to proceed?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // logic used to ensure ALL expected outcomes are hit, most notably the updating spots
    // updating spots is the expectation that is different adding a new appoint., since they both use same dispatch
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    expect(getByPlaceholderText(appointment, /enter student name/i)).toHaveValue("Archie Cohen");
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Adam Thorne" }
    });
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Adam Thorne"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    // increase testing coverage, using axios mock to send error to server
    // same testing logic as a successful add, but add coverage to lines specific to the Error component
    axios.put.mockRejectedValueOnce();

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

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Could not save appointment."));

    fireEvent.click(getByAltText(appointment, "Close"));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // apply similar testing structure as a successful deletion, but interact with the error window and test all lines
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
 
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Deletion is permanent. Are you sure you want to proceed?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Cancel"));
    // ^^ increase test coverage by firing an event to test if the 'cancel' button works...

    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Deletion is permanent. Are you sure you want to proceed?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Could not delete appointment."));

    fireEvent.click(getByAltText(appointment, "Close"));
  });
});