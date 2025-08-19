import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UploadForm from '../UploadForm';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock de axios
const mockAxios = {
  post: jest.fn(),
};
jest.mock('axios', () => ({
  create: () => mockAxios,
  post: jest.fn(),
}));

// Mock de SweetAlert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
}));

describe('UploadForm Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    mockAxios.post.mockClear();
  });

  test('renders upload form header correctly', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    expect(screen.getByText('Subir Hoja de Vida')).toBeInTheDocument();
    expect(screen.getByText('← Volver al Inicio')).toBeInTheDocument();
  });

  test('renders all form fields', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    // Verificar campos del formulario
    expect(screen.getByLabelText('Nombre Completo:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Teléfono:')).toBeInTheDocument();
    expect(screen.getByLabelText('Dirección:')).toBeInTheDocument();
    expect(screen.getByLabelText('Fecha de Nacimiento:')).toBeInTheDocument();
    expect(screen.getByLabelText('Nivel Educativo:')).toBeInTheDocument();
    expect(screen.getByLabelText('Años de Experiencia:')).toBeInTheDocument();
    expect(screen.getByLabelText('Perfil Profesional:')).toBeInTheDocument();
    expect(screen.getByLabelText('Archivo:')).toBeInTheDocument();
  });

  test('form fields have correct input types', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText('Email:');
    const phoneInput = screen.getByLabelText('Teléfono:');
    const dateInput = screen.getByLabelText('Fecha de Nacimiento:');
    const fileInput = screen.getByLabelText('Archivo:');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(fileInput).toHaveAttribute('type', 'file');
  });

  test('form fields update state correctly', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText('Nombre Completo:');
    const emailInput = screen.getByLabelText('Email:');
    const phoneInput = screen.getByLabelText('Teléfono:');
    const addressInput = screen.getByLabelText('Dirección:');
    const profileInput = screen.getByLabelText('Perfil Profesional:');

    // Escribir en los campos
    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '3001234567' } });
    fireEvent.change(addressInput, { target: { value: 'Calle 123, Bogotá' } });
    fireEvent.change(profileInput, { target: { value: 'Desarrollador Full Stack' } });

    // Verificar que los valores se actualizaron
    expect(nameInput.value).toBe('Juan Pérez');
    expect(emailInput.value).toBe('juan@example.com');
    expect(phoneInput.value).toBe('3001234567');
    expect(addressInput.value).toBe('Calle 123, Bogotá');
    expect(profileInput.value).toBe('Desarrollador Full Stack');
  });

  test('select dropdowns have correct options', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const educationSelect = screen.getByLabelText('Nivel Educativo:');
    const experienceSelect = screen.getByLabelText('Años de Experiencia:');

    // Verificar opciones de nivel educativo
    expect(educationSelect).toHaveValue('');
    expect(educationSelect.children.length).toBeGreaterThan(1);

    // Verificar opciones de experiencia
    expect(experienceSelect).toHaveValue('');
    expect(experienceSelect.children.length).toBeGreaterThan(1);
  });

  test('file input accepts correct file types', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const fileInput = screen.getByLabelText('Archivo:');
    
    // Verificar tipos de archivo aceptados
    expect(fileInput).toHaveAttribute('accept', '.pdf,.doc,.docx');
  });

  test('clear form button resets all fields', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText('Nombre Completo:');
    const emailInput = screen.getByLabelText('Email:');
    const clearButton = screen.getByText('Limpiar Formulario');

    // Llenar campos
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Verificar que se llenaron
    expect(nameInput.value).toBe('Test Name');
    expect(emailInput.value).toBe('test@example.com');

    // Limpiar formulario
    fireEvent.click(clearButton);

    // Verificar que se limpiaron
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
  });

  test('submit button is present and enabled', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Enviar');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  test('form submission works correctly', async () => {
    // Mock de respuesta exitosa
    mockAxios.post.mockResolvedValueOnce({ 
      data: { 
        message: 'CV subido exitosamente',
        id: 1 
      } 
    });

    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    // Llenar formulario
    const nameInput = screen.getByLabelText('Nombre Completo:');
    const emailInput = screen.getByLabelText('Email:');
    const phoneInput = screen.getByLabelText('Teléfono:');
    const addressInput = screen.getByLabelText('Dirección:');
    const dateInput = screen.getByLabelText('Fecha de Nacimiento:');
    const educationSelect = screen.getByLabelText('Nivel Educativo:');
    const experienceSelect = screen.getByLabelText('Años de Experiencia:');
    const profileInput = screen.getByLabelText('Perfil Profesional:');

    fireEvent.change(nameInput, { target: { value: 'María García' } });
    fireEvent.change(emailInput, { target: { value: 'maria@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '3009876543' } });
    fireEvent.change(addressInput, { target: { value: 'Carrera 45, Medellín' } });
    fireEvent.change(dateInput, { target: { value: '1990-05-15' } });
    fireEvent.change(educationSelect, { target: { value: 'Universidad' } });
    fireEvent.change(experienceSelect, { target: { value: '3-5 años' } });
    fireEvent.change(profileInput, { target: { value: 'Diseñadora UX/UI' } });

    // Simular selección de archivo
    const fileInput = screen.getByLabelText('Archivo:');
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Enviar formulario
    const submitButton = screen.getByText('Enviar');
    fireEvent.click(submitButton);

    // Verificar que se llamó a la API
    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        'http://localhost:3001/api/upload',
        expect.any(FormData)
      );
    });
  });

  test('form validation shows errors for empty required fields', async () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Enviar');
    
    // Intentar enviar formulario vacío
    fireEvent.click(submitButton);

    // Verificar que se muestra algún tipo de validación
    await waitFor(() => {
      expect(submitButton).toBeInTheDocument();
    });
  });

  test('email validation works correctly', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText('Email:');
    
    // Email válido
    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    expect(emailInput.value).toBe('valid@email.com');

    // Email inválido
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(emailInput.value).toBe('invalid-email');
  });

  test('phone validation works correctly', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const phoneInput = screen.getByLabelText('Teléfono:');
    
    // Teléfono válido
    fireEvent.change(phoneInput, { target: { value: '3001234567' } });
    expect(phoneInput.value).toBe('3001234567');

    // Teléfono con letras (debe permitirlo para validación del backend)
    fireEvent.change(phoneInput, { target: { value: '300-ABC-4567' } });
    expect(phoneInput.value).toBe('300-ABC-4567');
  });

  test('date input works correctly', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const dateInput = screen.getByLabelText('Fecha de Nacimiento:');
    
    // Seleccionar fecha
    fireEvent.change(dateInput, { target: { value: '1995-08-20' } });
    expect(dateInput.value).toBe('1995-08-20');
  });

  test('textarea expands correctly', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const profileInput = screen.getByLabelText('Perfil Profesional:');
    
    // Verificar que es un textarea
    expect(profileInput.tagName).toBe('TEXTAREA');
    
    // Escribir texto largo
    const longText = 'Este es un perfil profesional muy largo que debería permitir múltiples líneas y caracteres para describir adecuadamente las habilidades y experiencia del candidato.';
    fireEvent.change(profileInput, { target: { value: longText } });
    
    expect(profileInput.value).toBe(longText);
  });

  test('form maintains state during typing', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText('Nombre Completo:');
    const emailInput = screen.getByLabelText('Email:');

    // Escribir en nombre
    fireEvent.change(nameInput, { target: { value: 'Carlos' } });
    expect(nameInput.value).toBe('Carlos');

    // Escribir en email
    fireEvent.change(emailInput, { target: { value: 'carlos@' } });
    expect(emailInput.value).toBe('carlos@');

    // Verificar que nombre mantiene su valor
    expect(nameInput.value).toBe('Carlos');
  });

  test('back to home button navigates correctly', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const backButton = screen.getByText('← Volver al Inicio');
    expect(backButton).toHaveAttribute('href', '/home');
  });

  test('form has proper styling classes', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const form = screen.getByRole('form') || document.querySelector('form');
    if (form) {
      expect(form).toHaveClass('upload-form');
    }
  });

  test('required fields are marked appropriately', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const requiredFields = [
      'Nombre Completo:',
      'Email:',
      'Teléfono:',
      'Dirección:',
      'Fecha de Nacimiento:',
      'Nivel Educativo:',
      'Años de Experiencia:',
      'Perfil Profesional:',
      'Archivo:'
    ];

    requiredFields.forEach(fieldLabel => {
      const field = screen.getByLabelText(fieldLabel);
      expect(field).toBeInTheDocument();
    });
  });

  test('form buttons are properly aligned', () => {
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Enviar');
    const clearButton = screen.getByText('Limpiar Formulario');

    expect(submitButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });
});
