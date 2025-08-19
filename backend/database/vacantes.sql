-- Script para crear las tablas del sistema de vacantes
-- Ejecutar este script en tu base de datos MySQL

-- Tabla de empresas
CREATE TABLE IF NOT EXISTS empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  ubicacion VARCHAR(255),
  sitio_web VARCHAR(255),
  logo_url VARCHAR(500),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de vacantes
CREATE TABLE IF NOT EXISTS vacantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  empresa_id INT,
  ubicacion VARCHAR(255),
  categoria VARCHAR(100),
  tipo_contrato VARCHAR(100),
  experiencia VARCHAR(100),
  salario DECIMAL(10,2),
  beneficios JSON,
  requisitos JSON,
  responsabilidades JSON,
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_cierre DATE,
  estado ENUM('activa', 'cerrada', 'pausada') DEFAULT 'activa',
  FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE SET NULL
);

-- Tabla de postulaciones
CREATE TABLE IF NOT EXISTS postulaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vacante_id INT NOT NULL,
  correo VARCHAR(255) NOT NULL,
  fecha_postulacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('pendiente', 'revisada', 'aceptada', 'rechazada') DEFAULT 'pendiente',
  comentarios TEXT,
  FOREIGN KEY (vacante_id) REFERENCES vacantes(id) ON DELETE CASCADE
);

-- Tabla de favoritos de vacantes
CREATE TABLE IF NOT EXISTS vacantes_favoritas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vacante_id INT NOT NULL,
  correo VARCHAR(255) NOT NULL,
  fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vacante_id) REFERENCES vacantes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorito (vacante_id, correo)
);

-- Insertar algunas empresas de ejemplo
INSERT INTO empresas (nombre, descripcion, ubicacion, sitio_web) VALUES
('TechCorp', 'Empresa líder en desarrollo de software', 'Bogotá', 'https://techcorp.com'),
('DesignLab', 'Estudio de diseño UX/UI creativo', 'Medellín', 'https://designlab.com'),
('MarketingPro', 'Agencia de marketing digital', 'Cali', 'https://marketingpro.com'),
('ProjectCorp', 'Consultoría en gestión de proyectos', 'Barranquilla', 'https://projectcorp.com'),
('BackendTech', 'Especialistas en desarrollo backend', 'Remoto', 'https://backendtech.com'),
('TalentHub', 'Plataforma de reclutamiento IT', 'Bogotá', 'https://talenthub.com');

-- Insertar algunas vacantes de ejemplo
INSERT INTO vacantes (titulo, descripcion, empresa_id, ubicacion, categoria, tipo_contrato, experiencia, salario, beneficios, requisitos, responsabilidades) VALUES
('Desarrollador Frontend Senior', 'Buscamos un desarrollador frontend con experiencia en React, Vue.js y tecnologías modernas.', 1, 'Bogotá', 'Desarrollo', 'Tiempo Completo', '6-10 años', 4000000, '["Seguro médico", "Capacitación", "Horario flexible", "Trabajo remoto"]', '["React, Vue.js, JavaScript", "Experiencia en proyectos grandes", "Inglés intermedio"]', '["Desarrollar interfaces de usuario", "Mentorear desarrolladores junior", "Colaborar con UX/UI"]'),
('Diseñador UX/UI', 'Diseñador creativo para crear experiencias de usuario excepcionales.', 2, 'Medellín', 'Diseño', 'Tiempo Completo', '3-5 años', 3000000, '["Seguro médico", "Capacitación", "Horario flexible"]', '["Figma, Adobe Creative Suite", "Portfolio sólido", "Experiencia en investigación de usuarios"]', '["Diseñar interfaces", "Realizar investigación de usuarios", "Prototipar soluciones"]'),
('Analista de Marketing Digital', 'Analista para optimizar campañas digitales y mejorar ROI.', 3, 'Cali', 'Marketing', 'Tiempo Completo', '3-5 años', 2500000, '["Seguro médico", "Bonos por resultados", "Capacitación"]', '["Google Analytics", "Facebook Ads", "Experiencia en análisis de datos"]', '["Analizar campañas", "Optimizar presupuestos", "Generar reportes"]'),
('Project Manager', 'Gestor de proyectos para coordinar equipos de desarrollo.', 4, 'Barranquilla', 'Administración', 'Tiempo Completo', '6-10 años', 5000000, '["Seguro médico", "Capacitación", "Horario flexible", "Bonos por proyectos"]', '["PMP certificado", "Experiencia en metodologías ágiles", "Liderazgo de equipos"]', '["Gestionar proyectos", "Coordinar equipos", "Reportar a stakeholders"]'),
('Desarrollador Backend', 'Desarrollador backend para construir APIs robustas y escalables.', 5, 'Remoto', 'Desarrollo', 'Tiempo Completo', '3-5 años', 3500000, '["Seguro médico", "Trabajo remoto", "Capacitación", "Horario flexible"]', '["Node.js, Python, Java", "Bases de datos SQL/NoSQL", "Experiencia en APIs"]', '["Desarrollar APIs", "Optimizar bases de datos", "Implementar seguridad"]'),
('Recruiter IT', 'Reclutador especializado en perfiles tecnológicos.', 6, 'Bogotá', 'Recursos Humanos', 'Tiempo Completo', '1-2 años', 2000000, '["Seguro médico", "Comisiones", "Capacitación"]', '["Experiencia en reclutamiento", "Conocimiento del sector IT", "Buenas habilidades de comunicación"]', '["Sourcer candidatos", "Conducir entrevistas", "Gestionar procesos de selección"]');

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_vacantes_categoria ON vacantes(categoria);
CREATE INDEX idx_vacantes_ubicacion ON vacantes(ubicacion);
CREATE INDEX idx_vacantes_estado ON vacantes(estado);
CREATE INDEX idx_vacantes_fecha ON vacantes(fecha_publicacion);
CREATE INDEX idx_postulaciones_correo ON postulaciones(correo);
CREATE INDEX idx_postulaciones_vacante ON postulaciones(vacante_id);
CREATE INDEX idx_favoritos_correo ON vacantes_favoritas(correo);
