// Import packages
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

// Import pages
import Signin from '../ui/pages/Signin/Signin';

describe('Signin component', () => {
  test('calls the onSignIn function when Sign In button is clicked', async () => {
    const history = createMemoryHistory();

    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    // Mock the Axios request
    jest.mock('axios', () => ({
      post: jest.fn(() =>
        Promise.resolve({
          data: {
            message: 'Sign in successful',
          },
        })
      ),
    }));

    // Find the email input field and enter a value
    const emailInput = screen.getByPlaceholderText('Your Email Address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Find the password input field and enter a value
    const passwordInput = screen.getByPlaceholderText('Your Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Find the Sign In button and click it
    const signinButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(signinButton);

    // Expect that the onSignIn function is called
    await waitFor(() => {
      expect(history.location.pathname).toBe('/'); // Replace '/' with the expected redirected path
    });
  });
});
