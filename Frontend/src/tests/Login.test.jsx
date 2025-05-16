// _tests_/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../src/Pages/Login';

// Mock fetch and localStorage
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
  Storage.prototype.setItem = jest.fn();
});

describe('Login Page - Unit & Integration', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  test('successful login sets token and redirects', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { token: { token: 'test123' } } })
    });

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() =>
      expect(screen.getByText(/Successful login/i)).toBeInTheDocument()
    );
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test123');
  });

  test('failed login shows error message', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' })
    });

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'wrong@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrongpass' }
    });
    fireEvent.click(screen.getByText('Login'));

    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});

describe('Login Page - Security', () => {
  test('handles fetch failure gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByText('Login'));

    expect(
      await screen.findByText(/Error connecting to server/i)
    ).toBeInTheDocument();
  });
});

describe('Login Page - Performance', () => {
  test('responds in less than 2 seconds', async () => {
    const start = performance.now();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { token: { token: '123' } } })
    });
    render(<Login />);
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => screen.getByText(/Successful login/i));
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(2000);
  });
});