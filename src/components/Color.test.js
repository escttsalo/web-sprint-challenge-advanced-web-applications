import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const color = {
    color: "aliceblue",
    code: {
        hex: "#f0f8ff",
    },
    id: 1,
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={ {color:'blank', code:{hex: '#ffffff'}, id:1} }/>)
});
  
test("Renders the color passed into component", () => {
    render(<Color color={color}/>)
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const toggleEdit = jest.fn()
    const deleteColor = jest.fn()
    render(<Color color={color} deleteColor={deleteColor} toggleEdit={toggleEdit} />)

    const button = screen.queryByTestId('delete')
    userEvent.click(button)

    expect(toggleEdit).toHaveBeenCalledTimes(1)
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const setEditColor = jest.fn()
    const toggleEdit = jest.fn()
    render(<Color color={color} toggleEdit={toggleEdit} setEditColor={setEditColor}/>)

    const div = screen.getByTestId('color')
    userEvent.click(div)

    expect(toggleEdit).toHaveBeenCalledTimes(1)
    expect(setEditColor).toHaveBeenCalledTimes(1)
});