
// redering <Application /> so we need React.createElement
import React from "react";

// import helper functions from the react-testing-library
// render allows us to render components
import { render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText} from "@testing-library/react";

import { fireEvent } from "@testing-library/react/dist";


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

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  // debug();
});

})