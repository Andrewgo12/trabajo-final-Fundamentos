import React from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Card from './Card';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Here you could send error to logging service
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      // Use custom fallback if provided
      if (Fallback) {
        return <Fallback error={this.state.error} retry={this.handleRetry} />;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Card className="card text-center">
              <div className="card-content py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  ¡Oops! Algo salió mal
                </h1>
                
                <p className="text-gray-600 mb-8">
                  Ha ocurrido un error inesperado. No te preocupes, nuestro equipo 
                  ha sido notificado y está trabajando para solucionarlo.
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={this.handleRetry}
                    className="w-full btn btn-primary"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Intentar de Nuevo
                  </Button>
                  
                  <Link to="/" className="block">
                    <Button
                      variant="outline"
                      className="w-full btn btn-outline"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Ir al Inicio
                    </Button>
                  </Link>
                  
                  <Link to="/contact" className="block">
                    <Button
                      variant="ghost"
                      className="w-full btn btn-ghost"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reportar Problema
                    </Button>
                  </Link>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-8 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      Detalles del Error (Solo en Desarrollo)
                    </summary>
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg text-xs font-mono text-gray-700 overflow-auto max-h-40">
                      <div className="mb-2">
                        <strong>Error:</strong> {this.state.error.toString()}
                      </div>
                      <div>
                        <strong>Stack Trace:</strong>
                        <pre className="whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    </div>
                  </details>
                )}
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para usar con componentes funcionales
export const useErrorHandler = () => {
  return (error, errorInfo) => {
    console.error('Error caught:', error, errorInfo);
    // Aquí podrías enviar el error a un servicio de logging
  };
};

// Componente de error más simple para casos específicos
export const ErrorMessage = ({ 
  title = "Error", 
  message = "Ha ocurrido un error inesperado", 
  onRetry,
  showRetry = true 
}) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <AlertTriangle className="w-8 h-8 text-red-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{message}</p>
    {showRetry && onRetry && (
      <Button onClick={onRetry} variant="outline" className="btn btn-outline">
        <RefreshCw className="w-4 h-4 mr-2" />
        Intentar de Nuevo
      </Button>
    )}
  </div>
);

// Componente para errores de red
export const NetworkError = ({ onRetry }) => (
  <ErrorMessage
    title="Error de Conexión"
    message="No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta de nuevo."
    onRetry={onRetry}
  />
);

// Componente para errores 404
export const NotFoundError = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Página No Encontrada
      </h1>
      <p className="text-gray-600 mb-8">
        La página que buscas no existe o ha sido movida.
      </p>
      <div className="space-y-4">
        <Link to="/">
          <Button className="btn btn-primary">
            <Home className="w-4 h-4 mr-2" />
            Ir al Inicio
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" className="btn btn-outline">
            Ver Productos
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

// 404 Not Found Component
export const NotFoundError = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full text-center">
      <Card className="card">
        <div className="card-content p-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Página No Encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            La página que buscas no existe o ha sido movida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="btn btn-primary">
                <Home className="w-4 h-4 mr-2" />
                Ir al Inicio
              </Button>
            </Link>

            <Link to="/products">
              <Button variant="outline" className="btn btn-outline">
                Ver Productos
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default ErrorBoundary;
