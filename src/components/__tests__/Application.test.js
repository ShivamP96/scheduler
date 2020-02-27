
// redering <Application /> so we need React.createElement
import React from "react";

// import helper functions from the react-testing-library
// render allows us to render components
import { render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, waitForElementToBeRemoved, getAllByText} from "@testing-library/react";

import { fireEvent } from "@testing-library/react/dist";
import axios from "axios";


// import the component that we are testing
import Application from "components/Application";

afterEach(cleanup);

// a test renders a react component
 describe("Application", () => {
   it("defaults to Monday and changes the schedule when a new day is selected", async () => {

     const { getByText } = render(<Application />);

     await waitForElement(() => getByText("Monday"))
     
       
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument(); 
 }) 

 it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

   const { container, debug } = render(<Application />);

   await waitForElement(() => getByText(container, "Archie Cohen"));

   //  console.log(prettyDOM(container))
   const appointments = getAllByTestId(container, "appointment");

  //  console.log(prettyDOM(appointments));
   const appointment = getAllByTestId(container, "appointment")[0];

   
   fireEvent.click(getByAltText(appointment, "Add"));
   
   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
     target: {value: "Lydia Miller-Jones"}
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));
    // console.log(prettyDOM(appointment))
    expect(getByText(appointment, "Saving......")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    // console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
 })

 it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const {container, debug} = render(<Application />)
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"))
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
  // 4. Check that the confirmation message is shown.
  fireEvent.click(queryByAltText(appointment, "Delete"));
  // 5. Click the "Confirm" button on the confirmation.
  expect(getByText(appointment, "Warning, this action is permanent - click cancel to go back")).toBeInTheDocument();

  fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting....")).toBeInTheDocument();
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"))
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
// console.log(prettyDOM(day));
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  // debug();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
// 1. render the application
const { container } = render(<Application />);

// 2. wait until the text "archie cohen" is displayed
await waitForElement(() => getByText(container, "Archie Cohen"))
const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

// 3. click the "edit" button on the booked appointment
fireEvent.click(queryByAltText(appointment, "Edit"));
expect(
  getByPlaceholderText(appointment, /enter student name/i)
).toBeInTheDocument();

// 4. enter the name: Bob in to the input with the placeholder "Enter Student Name and select the interviewer"
fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  target: { value: "Lydia Miller-Jones" }
});
fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
fireEvent.click(getByText(appointment, "Save"));

// 5. expect saving to show up
expect(getByText(appointment, "Saving......")).toBeInTheDocument();
await waitForElementToBeRemoved(() => getByText(appointment, "Saving......"));

expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
//6. check that daylistitem with monday has only one spot left

const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))

// console.log("DAY",prettyDOM(day))
expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

  //1.Render the application
  const { container } = render(<Application />);
  //2.Wait until the text "Archie Cohen" is displayed
  await waitForElement(() => getByText(container, "Archie Cohen"));
  //3.Click the "Add" button on the first empty appointment
  const appointment = getAllByTestId(container, "appointment")[0];
  fireEvent.click(getByAltText(appointment, "Add"));
  //4.Enter the name "Bob" into the input with the placeholder "Enter Student Name".
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Bob" }
  });
  //5.Click the first interviewer in the list.
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  //6.Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving......")).toBeInTheDocument();
  //7. wait till saving is removed
  await waitForElementToBeRemoved(() => getByText(appointment, "Saving......"));
  expect(getByText(appointment, "Error in Saving")).toBeInTheDocument();
  fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();

});

it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();

  // 1. Render the application
  const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment
  const appointment = getAllByTestId(
    container,"appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

  fireEvent.click(queryByAltText(appointment, "Delete"));
  // 4. check that warning message is there
  expect(
    getByText(appointment, "Warning, this action is permanent - click cancel to go back")
  ).toBeInTheDocument();
  // 5. Click the "Confirm" button on that confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check 
  expect(getByText(appointment, "Deleting....")).toBeInTheDocument();
  // 7. Wait until the element deleting.... is displayed
  await waitForElementToBeRemoved(() => getByText(appointment, "Deleting...."));
  //8.check that the element is displayed
  expect(getByText(appointment, "Error in Delete")).toBeInTheDocument();
  // 9. click close button 
  fireEvent.click(getByAltText(appointment, "Close"));
  expect(queryByText(appointment, "Archie Cohen")).toBeInTheDocument();
});




})