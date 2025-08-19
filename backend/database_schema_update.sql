-- Script para actualizar la base de datos existente
-- Solo agrega las tablas y campos que faltan

USE cv_reception;

-- Agregar campos faltantes a la tabla vacantes existente
ALTER TABLE vacantes 
ADD COLUMN empresa_id INT AFTER id,
ADD COLUMN ubicacion VARCHAR(255) AFTER descripcion,
ADD COLUMN categoria VARCHAR(100) AFTER ubicacion,
ADD COLUMN tipo_contrato VARCHAR(100) AFTER categoria,
ADD COLUMN experiencia VARCHAR(100) AFTER tipo_contrato,
ADD COLUMN salario DECIMAL(10,2) AFTER experiencia,
ADD COLUMN beneficios JSON AFTER salario,
ADD COLUMN requisitos JSON AFTER beneficios,
ADD COLUMN responsabilidades JSON AFTER requisitos,
ADD COLUMN fecha_cierre DATE AFTER fecha_publicacion,
ADD COLUMN estado ENUM('activa', 'cerrada', 'pausada') DEFAULT 'activa' AFTER fecha_cierre;

-- Crear tabla de empresas (nueva)
CREATE TABLE IF NOT EXISTS empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  ubicacion VARCHAR(255),
  sitio_web VARCHAR(255),
  logo_url VARCHAR(500),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de vacantes favoritas (nueva)
CREATE TABLE IF NOT EXISTS vacantes_favoritas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vacante_id INT NOT NULL,
  correo VARCHAR(255) NOT NULL,
  fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vacante_id) REFERENCES vacantes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorito (vacante_id, correo)
);

-- Agregar campos faltantes a la tabla postulaciones existente
ALTER TABLE postulaciones 
ADD COLUMN fecha_postulacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER correo,
ADD COLUMN estado ENUM('pendiente', 'revisada', 'aceptada', 'rechazada') DEFAULT 'pendiente' AFTER fecha_postulacion,
ADD COLUMN comentarios TEXT AFTER estado;

-- Agregar foreign key para empresa_id en vacantes
ALTER TABLE vacantes 
ADD CONSTRAINT fk_vacantes_empresa 
FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE SET NULL;

-- Insertar algunas empresas de ejemplo
INSERT INTO empresas (nombre, descripcion, ubicacion, sitio_web) VALUES
('TechCorp', 'Empresa líder en desarrollo de software', 'Bogotá', 'https://techcorp.com'),
('DesignLab', 'Estudio de diseño UX/UI creativo', 'Medellín', 'https://designlab.com'),
('MarketingPro', 'Agencia de marketing digital', 'Cali', 'https://marketingpro.com'),
('ProjectCorp', 'Consultoría en gestión de proyectos', 'Barranquilla', 'https://projectcorp.com'),
('BackendTech', 'Especialistas en desarrollo backend', 'Remoto', 'https://backendtech.com'),
('TalentHub', 'Plataforma de reclutamiento IT', 'Bogotá', 'https://talenthub.com');

-- Actualizar las vacantes existentes con datos de ejemplo
UPDATE vacantes SET 
  empresa_id = 1,
  ubicacion = 'Bogotá',
  categoria = 'Desarrollo',
  tipo_contrato = 'Tiempo Completo',
  experiencia = '3-5 años',
  salario = 3500000,
  beneficios = '["Seguro médico", "Capacitación", "Horario flexible"]',
  requisitos = '["JavaScript", "React", "Experiencia en desarrollo web"]',
  responsabilidades = '["Desarrollar interfaces", "Mantener código", "Colaborar con equipo"]',
  estado = 'activa'
WHERE id = 1;

-- Si no hay vacantes, insertar algunas de ejemplo
INSERT INTO vacantes (titulo, descripcion, empresa_id, ubicacion, categoria, tipo_contrato, experiencia, salario, beneficios, requisitos, responsabilidades, fecha_publicacion, estado) 
SELECT 'Desarrollador Frontend Senior', 'Buscamos un desarrollador frontend con experiencia en React, Vue.js y tecnologías modernas.', 1, 'Bogotá', 'Desarrollo', 'Tiempo Completo', '6-10 años', 4000000, '["Seguro médico", "Capacitación", "Horario flexible", "Trabajo remoto"]', '["React, Vue.js, JavaScript", "Experiencia en proyectos grandes", "Inglés intermedio"]', '["Desarrollar interfaces de usuario", "Mentorear desarrolladores junior", "Colaborar con UX/UI"]', CURDATE(), 'activa'
WHERE NOT EXISTS (SELECT 1 FROM vacantes WHERE titulo = 'Desarrollador Frontend Senior');

INSERT INTO vacantes (titulo, descripcion, empresa_id, ubicacion, categoria, tipo_contrato, experiencia, salario, beneficios, requisitos, responsabilidades, fecha_publicacion, estado) 
SELECT 'Diseñador UX/UI', 'Diseñador creativo para crear experiencias de usuario excepcionales.', 2, 'Medellín', 'Diseño', 'Tiempo Completo', '3-5 años', 3000000, '["Seguro médico", "Capacitación", "Horario flexible"]', '["Figma, Adobe Creative Suite", "Portfolio sólido", "Experiencia en investigación de usuarios"]', '["Diseñar interfaces", "Realizar investigación de usuarios", "Prototipar soluciones"]', CURDATE(), 'activa'
WHERE NOT EXISTS (SELECT 1 FROM vacantes WHERE titulo = 'Diseñador UX/UI');

INSERT INTO vacantes (titulo, descripcion, empresa_id, ubicacion, categoria, tipo_contrato, experiencia, salario, beneficios, requisitos, responsabilidades, fecha_publicacion, estado) 
SELECT 'Analista de Marketing Digital', 'Analista para optimizar campañas digitales y mejorar ROI.', 3, 'Cali', 'Marketing', 'Tiempo Completo', '3-5 años', 2500000, '["Seguro médico", "Bonos por resultados", "Capacitación"]', '["Google Analytics", "Facebook Ads", "Experiencia en análisis de datos"]', '["Analizar campañas", "Optimizar presupuestos", "Generar reportes"]', CURDATE(), 'activa'
WHERE NOT EXISTS (SELECT 1 FROM vacantes WHERE titulo = 'Analista de Marketing Digital');

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_vacantes_categoria ON vacantes(categoria);
CREATE INDEX idx_vacantes_ubicacion ON vacantes(ubicacion);
CREATE INDEX idx_vacantes_estado ON vacantes(estado);
CREATE INDEX idx_vacantes_fecha ON vacantes(fecha_publicacion);
CREATE INDEX idx_postulaciones_correo ON postulaciones(correo);
CREATE INDEX idx_postulaciones_vacante ON postulaciones(vacante_id);
CREATE INDEX idx_favoritos_correo ON vacantes_favoritas(correo);

-- Verificar la estructura final
SELECT 'Base de datos actualizada exitosamente' as mensaje;
