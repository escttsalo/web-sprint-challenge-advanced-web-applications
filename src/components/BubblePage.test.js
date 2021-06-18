import React from 'react';
import { render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';

test("Renders without errors", ()=> {
    render (<BubblePage />);
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
    render(<BubblePage/>)

    waitFor(() => {
        const colorTitle = screen.queryByText(/colors/i);
        const firstColor = screen.queryByText(/aliceblue/i);
    
        expect(colorTitle).toBeInTheDocument();
        expect(firstColor).toBeInTheDocument();
    })
});