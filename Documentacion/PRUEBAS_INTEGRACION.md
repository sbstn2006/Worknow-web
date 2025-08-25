 PRUEBAS DE INTEGRACIÓN - WORKNOW CV RECEPTION APP

 Objetivo
Implementar pruebas de integración que verifiquen la comunicación entre frontend, backend y base de datos.

 Configuración de Pruebas de Integración

 1. Instalar Dependencias
```bash
cd frontend
npm install --save-dev @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

 2. Configurar Jest para Pruebas de Integración
Crear `frontend/jest.integration.config.js`:
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: [
    '<rootDir>/src/__tests__/integration/**/*.test.js'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js'
  ],
  coverageDirectory: 'coverage/integration',
  testTimeout: 10000
};
```

  Estructura de Pruebas de Integración

 Directorio: `frontend/src/__tests__/integration/`

 1. `auth-flow.test.js` - Flujo Completo de Autenticación
```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../../Login';
import Register from '../../Register';

// Mock de axios para simular respuestas del backnd
jest.mock('axios');

describe('Flujo de Autenticación - Pruebas de Integración', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Usuario puede registrarse y luego iniciar sesión', async () => {
    // Mock de registro exitoso
    axios.post.mockResolvedValueOnce({
      data: { message: 'Usuario registrado exitosamente' }
    });

    // Mock de lgin exitoso
    axios.post.mockResolvedValueOnce({
      data: { 
        success: true, 
        user: { correo: 'test@example.com' } 
      }
    });

    // Renderizar formulario de registro
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Llenar formulario de registro
    fireEvent.change(screen.getByLabelText(/correo/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
      target: { value: 'password123' }
    });

    // Enviar registro
    fireEvent.click(screen.getByText(/registrarse/i));

    // Verificar que se llamó a la API de registro
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/usuarios/registrar'),
        expect.objectContaining({
          correo: 'test@example.com',
          contrasena: 'password123'
        })
      );
    });

    // Ahora probar login
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Llenar formulario de login
    fireEvent.change(screen.getByLabelText(/correo/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' }
    });

    // Enviar login
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    // Verificar que se llamó a la API de login
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/usuarios/login'),
        expect.objectContaining({
          correo: 'test@example.com',
          contrasena: 'password123'
        })
      );
    });
  });
});
```

 2. `cv-upload-flow.test.js` - Flujo Completo de Subida de CV
```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import UploadForm from '../../UploadForm';
import MiHojaDeVida from '../../MiHojaDeVida';

jest.mock('axios');

describe('Flujo de Subida de CV - Pruebas de Integración', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Usuario puede subir CV y verlo en su perfil', async () => {
    // Mock de subida exitosa
    axios.post.mockResolvedValueOnce({
      data: { 
        message: 'CV subido exitosamente',
        cv: {
          id: 1,
          nombre_completo: 'Juan Pérez',
          correo: 'juan@example.com'
        }
      }
    });

    // Mock de obtención de CV
    axios.get.mockResolvedValueOnce({
      data: {
        id: 1,
        nombre_completo: 'Juan Pérez',
        correo: 'juan@example.com',
        telefono: '123456789',
        archivo: 'cv_juan.pdf'
      }
    });

    // Renderizar formulario de subida
    render(
      <BrowserRouter>
        <UploadForm />
      </BrowserRouter>
    );

    // Llenar formulario
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Juan Pérez' }
    });
    fireEvent.change(screen.getByLabelText(/correo/i), {
      target: { value: 'juan@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/teléfono/i), {
      target: { value: '123456789' }
    });

    // Simular archivo
    const file = new File(['cv content'], 'cv_juan.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/archivo/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Enviar formulario
    fireEvent.click(screen.getByText(/enviar/i));

    // Verificar que se llamó a la API de subida
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/hojas-de-vida'),
        expect.any(FormData)
      );
    });

    // Verificar que se guardó en localStorage
    expect(localStorage.getItem('correo')).toBe('juan@example.com');

    // Ahora verificar que aparece en Mi Perfil
    render(
      <BrowserRouter>
        <MiHojaDeVida />
      </BrowserRouter>
    );

    // Verificar que se llamó a la API para obtener CV
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/api/hojas-de-vida/juan@example.com')
      );
    });

    // Verificar que se muestra la información del CV
    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
      expect(screen.getByText('juan@example.com')).toBeInTheDocument();
    });
  });
});
```

 3. `vacancies-flow.test.js` - Flujo Completo de Vacantes
```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Vacantes from '../../Vacantes';

jest.mock('axios');

describe('Flujo de Vacantes - Pruebas de Integración', () => {
  const mockVacantes = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend',
      empresa: 'TechCorp',
      ubicacion: 'Madrid',
      categoria: 'Desarrollo',
      tipo_contrato: 'Tiempo completo',
      salario: '30000-40000',
      descripcion: 'Desarrollo de aplicaciones React'
    }
  ];

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Usuario puede buscar, filtrar y aplicar a vacantes', async () => {
    // Mock de obtención de vacantes
    axios.get.mockResolvedValueOnce({
      data: mockVacantes
    });

    // Mock de búsqueda
    axios.get.mockResolvedValueOnce({
      data: mockVacantes.filter(v => v.titulo.includes('Frontend'))
    });

    // Mock de aplicación
    axios.post.mockResolvedValueOnce({
      data: { message: 'Postulación enviada exitosamente' }
    });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    // Verificar que se cargan las vacantes
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/api/vacantes')
      );
    });

    // Verificar que se muestra la vacante
    await waitFor(() => {
      expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
    });

    // Probar búsqueda
    const searchInput = screen.getByPlaceholderText(/buscar vacantes/i);
    fireEvent.change(searchInput, { target: { value: 'Frontend' } });

    // Verificar que se llama a la API de búsqueda
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/api/vacantes/buscar/Frontend')
      );
    });

    // Probar filtros
    const categoryFilter = screen.getByLabelText(/categoría/i);
    fireEvent.change(categoryFilter, { target: { value: 'Desarrollo' } });

    // Verificar que se aplican los filtros
    await waitFor(() => {
      expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
    });

    // Probar aplicación
    const applyButton = screen.getByText(/postular/i);
    fireEvent.click(applyButton);

    // Verificar que se llama a la API de aplicación
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/postulaciones'),
        expect.objectContaining({
          vacante_id: 1,
          correo: expect.any(String)
        })
      );
    });
  });
});
```




