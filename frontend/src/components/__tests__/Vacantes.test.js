import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Vacantes from '../Vacantes';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock de axios
const mockAxios = {
  get: jest.fn(),
  post: jest.fn(),
};
jest.mock('axios', () => ({
  create: () => mockAxios,
  get: jest.fn(),
  post: jest.fn(),
}));

describe('Vacantes Component', () => {
  const mockVacantes = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend',
      descripcion: 'Desarrollo de aplicaciones web con React',
      empresa: 'TechCorp',
      ubicacion: 'Bogotá',
      categoria: 'Desarrollo',
      tipo_contrato: 'Tiempo Completo',
      experiencia: '3-5 años',
      salario: '4000000',
      fecha_publicacion: '2024-12-01',
      beneficios: ['Seguro médico', 'Horario flexible'],
      requisitos: ['React', 'JavaScript', 'CSS'],
      responsabilidades: ['Desarrollar interfaces', 'Optimizar rendimiento']
    },
    {
      id: 2,
      titulo: 'Diseñador UX/UI',
      descripcion: 'Diseño de experiencias de usuario',
      empresa: 'DesignStudio',
      ubicacion: 'Medellín',
      categoria: 'Diseño',
      tipo_contrato: 'Freelance',
      experiencia: '1-3 años',
      salario: '2500000',
      fecha_publicacion: '2024-11-30',
      beneficios: ['Trabajo remoto', 'Proyectos variados'],
      requisitos: ['Figma', 'Adobe XD', 'Investigación'],
      responsabilidades: ['Crear wireframes', 'Prototipar']
    }
  ];

  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    mockAxios.get.mockClear();
    mockAxios.post.mockClear();
  });

  test('renders vacantes header correctly', () => {
    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    expect(screen.getByText('Vacantes Disponibles')).toBeInTheDocument();
    expect(screen.getByText('Encuentra tu próxima oportunidad laboral')).toBeInTheDocument();
    expect(screen.getByText('← Volver al Inicio')).toBeInTheDocument();
  });

  test('renders search bar and filters', () => {
    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Buscar vacantes...')).toBeInTheDocument();
    expect(screen.getByText('Filtros Avanzados')).toBeInTheDocument();
    expect(screen.getByText('Limpiar Filtros')).toBeInTheDocument();
  });

  test('search functionality works correctly', async () => {
    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Buscar vacantes...');
    
    // Simular búsqueda
    fireEvent.change(searchInput, { target: { value: 'Desarrollador' } });

    await waitFor(() => {
      expect(searchInput.value).toBe('Desarrollador');
    });
  });

  test('filter dropdowns are present', () => {
    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    // Verificar que los filtros están presentes
    expect(screen.getByText('Categoría')).toBeInTheDocument();
    expect(screen.getByText('Ubicación')).toBeInTheDocument();
    expect(screen.getByText('Tipo de Contrato')).toBeInTheDocument();
    expect(screen.getByText('Experiencia')).toBeInTheDocument();
  });

  test('sort controls are displayed', () => {
    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    expect(screen.getByText('Ordenar por:')).toBeInTheDocument();
    expect(screen.getByText('Fecha')).toBeInTheDocument();
    expect(screen.getByText('Salario')).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Empresa')).toBeInTheDocument();
  });

  test('clear filters button resets all filters', async () => {
    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    const clearButton = screen.getByText('Limpiar Filtros');
    const searchInput = screen.getByPlaceholderText('Buscar vacantes...');

    // Llenar búsqueda
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Limpiar filtros
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(searchInput.value).toBe('');
    });
  });

  test('pagination controls are present', () => {
    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    expect(screen.getByText('Elementos por página:')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  test('vacante cards display correctly', async () => {
    // Mock de la respuesta de la API
    mockAxios.get.mockResolvedValueOnce({ data: mockVacantes });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    // Esperar a que se carguen las vacantes
    await waitFor(() => {
      expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
      expect(screen.getByText('Diseñador UX/UI')).toBeInTheDocument();
    });
  });

  test('vacante card shows correct information', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockVacantes });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    await waitFor(() => {
      // Verificar información de la primera vacante
      expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
      expect(screen.getByText('TechCorp')).toBeInTheDocument();
      expect(screen.getByText('Bogotá')).toBeInTheDocument();
      expect(screen.getByText('Tiempo Completo')).toBeInTheDocument();
      expect(screen.getByText('3-5 años')).toBeInTheDocument();
    });
  });

  test('favorite functionality works', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockVacantes });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    await waitFor(() => {
      const favoriteButtons = screen.getAllByText('🤍');
      expect(favoriteButtons.length).toBeGreaterThan(0);
    });

    // Hacer clic en favorito
    const firstFavoriteButton = screen.getAllByText('🤍')[0];
    fireEvent.click(firstFavoriteButton);

    // Verificar que se guardó en localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites.length).toBe(1);
  });

  test('apply button is present in vacante cards', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockVacantes });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    await waitFor(() => {
      const applyButtons = screen.getAllByText('📋 Aplicar');
      expect(applyButtons.length).toBeGreaterThan(0);
    });
  });

  test('view details button opens modal', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockVacantes });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    await waitFor(() => {
      const viewDetailsButtons = screen.getAllByText('👁️ Ver Detalles');
      expect(viewDetailsButtons.length).toBeGreaterThan(0);
    });

    // Hacer clic en ver detalles
    const firstViewButton = screen.getAllByText('👁️ Ver Detalles')[0];
    fireEvent.click(firstViewButton);

    // Verificar que se abre el modal
    await waitFor(() => {
      expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
    });
  });

  test('modal displays complete vacante information', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockVacantes });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    await waitFor(() => {
      const viewDetailsButton = screen.getAllByText('👁️ Ver Detalles')[0];
      fireEvent.click(viewDetailsButton);
    });

    // Verificar información completa en el modal
    await waitFor(() => {
      expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
      expect(screen.getByText('TechCorp')).toBeInTheDocument();
      expect(screen.getByText('Bogotá')).toBeInTheDocument();
      expect(screen.getByText('Desarrollo')).toBeInTheDocument();
      expect(screen.getByText('Tiempo Completo')).toBeInTheDocument();
      expect(screen.getByText('3-5 años')).toBeInTheDocument();
      expect(screen.getByText('$4,000,000')).toBeInTheDocument();
    });
  });

  test('modal close button works', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockVacantes });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    await waitFor(() => {
      const viewDetailsButton = screen.getAllByText('👁️ Ver Detalles')[0];
      fireEvent.click(viewDetailsButton);
    });

    // Verificar que el modal está abierto
    await waitFor(() => {
      expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
    });

    // Cerrar modal
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    // Verificar que el modal se cerró
    await waitFor(() => {
      expect(screen.queryByText('Desarrollador Frontend')).not.toBeInTheDocument();
    });
  });

  test('loading state is displayed', () => {
    // Mock de respuesta lenta
    mockAxios.get.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    // Verificar que se muestra el loading
    expect(screen.getByText('Cargando vacantes...')).toBeInTheDocument();
  });

  test('no results message is displayed when no vacantes', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No se encontraron vacantes que coincidan con los criterios de búsqueda.')).toBeInTheDocument();
    });
  });

  test('results info shows correct count', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockVacantes });

    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Mostrando 2 de 2 vacantes/)).toBeInTheDocument();
    });
  });

  test('back to home button navigates correctly', () => {
    render(
      <BrowserRouter>
        <Vacantes />
      </BrowserRouter>
    );

    const backButton = screen.getByText('← Volver al Inicio');
    expect(backButton).toHaveAttribute('href', '/home');
  });
});
