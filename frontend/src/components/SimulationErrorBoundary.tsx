import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Simulation Error Boundary
// ─────────────────────────────────────────────────────────
interface Props {
  children: ReactNode;
  onNavigate?: (page: string) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class SimulationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[SimulationErrorBoundary] Caught error:', error);
    console.error('[SimulationErrorBoundary] Component stack:', errorInfo.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleBack = () => {
    if (this.props.onNavigate) {
      this.props.onNavigate('modules');
    } else {
      window.location.href = '/modules';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
          <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border border-slate-200 p-10 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-amber-500" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              Something went wrong
            </h2>
            <p className="text-slate-500 font-medium mb-8">
              Your progress has been saved. You can resume from where you left off.
            </p>

            {/* Error detail */}
            {this.state.error && (
              <div className="mb-6 bg-slate-50 rounded-xl p-4 text-left overflow-auto max-h-32">
                <p className="text-xs font-mono text-rose-600 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-blue-600 transition-all shadow-lg active:scale-[0.97]"
              >
                <RefreshCw className="w-4 h-4" />
                Resume Simulation
              </button>
              <button
                onClick={this.handleBack}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 font-black rounded-xl hover:bg-slate-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Modules
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SimulationErrorBoundary;
