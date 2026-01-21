import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <AlertTriangle size={40} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Ops! Algo deu errado.</h1>
          <p className="text-slate-400 mb-6 max-w-md">
            Encontramos um erro inesperado. Tente recarregar a página.
          </p>
          
          <div className="bg-slate-800 p-4 rounded-lg mb-6 max-w-md w-full overflow-hidden text-left">
            <p className="font-mono text-xs text-red-400 break-words">
              {this.state.error?.message || 'Erro desconhecido'}
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center bg-primary hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
          >
            <RefreshCw size={20} className="mr-2" />
            Recarregar Aplicação
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;