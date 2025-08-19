import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Register() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await axios.post('http://localhost:3001/api/register', { correo, contrasena });
      alert('Registro exitoso. Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar. El correo ya podría estar en uso.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-icon">🚀</div>
            <h1 className="worknow-title">WorkNow</h1>
          </div>
          <p className="login-subtitle">Únete a nuestra comunidad laboral</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-icon">
              <span className="icon">📧</span>
            </div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <span className="icon">🔒</span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="login-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="input-group">
            <div className="input-icon">
              <span className="icon">✅</span>
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              required
              className="login-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creando cuenta...
              </>
            ) : (
              <>
                <span className="button-icon">✨</span>
                Crear Cuenta
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="register-text">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="register-link">
              Inicia sesión aquí
            </Link>
          </p>
          
          <div className="social-login">
            <p className="social-text">O regístrate con</p>
            <div className="social-buttons">
              <button className="social-btn google">
                <span className="social-icon">🔍</span>
                Google
              </button>
              <button className="social-btn linkedin">
                <span className="social-icon">💼</span>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
