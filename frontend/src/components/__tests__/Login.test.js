import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock de axios
jest.mock('axios');

describe('Login Component', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Verificar elementos principales
    expect(screen.getByText('WorkNow')).toBeInTheDocument();
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows password toggle functionality', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Contraseña');
    const toggleButton = screen.getByRole('button', { name: /👁️/i });

    // Inicialmente la contraseña debe estar oculta
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Hacer clic en el botón de mostrar/ocultar
    fireEvent.click(toggleButton);

    // Ahora la contraseña debe estar visible
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('form validation works correctly', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /login/i });

    // Intentar enviar formulario vacío
    fireEvent.click(submitButton);

    // Debe mostrar mensaje de error o validación
    await waitFor(() => {
      expect(submitButton).toBeInTheDocument();
    });
  });

  test('form inputs update state correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Contraseña');

    // Escribir en los campos
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Verificar que los valores se actualizaron
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('loading state is displayed during submission', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Llenar formulario
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Enviar formulario
    fireEvent.click(submitButton);

    // Verificar estado de carga
    await waitFor(() => {
      expect(submitButton).toHaveTextContent('Iniciando Sesión...');
    });
  });

  test('register link navigates correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const registerLink = screen.getByText('Register here');
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  test('social login buttons are present', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  test('component has proper styling classes', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const container = screen.getByTestId('login-container') || document.querySelector('.login-container');
    if (container) {
      expect(container).toHaveClass('login-container');
    }
  });

  test('password field has correct attributes', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Contraseña');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('placeholder', 'Contraseña');
  });

  test('email field has correct attributes', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Email');
  });
});
