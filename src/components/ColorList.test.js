import React from 'react';
import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

const colors = [
    {
        color: "aliceblue",
        code: {
            hex: "#f0f8ff",
        },
        id: 1,
    }
]

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]}/>)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={colors}/>)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { rerender } = render(<ColorList colors={colors} editing={true}/>)

    const editMenu = screen.queryByTestId('editMenu')
    expect(editMenu).toBeInTheDocument();

    rerender(<ColorList colors={colors} editing={false}/>)

    expect(editMenu).not.toBeInTheDocument();
});
