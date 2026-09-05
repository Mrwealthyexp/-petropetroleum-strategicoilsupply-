"use client";
import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props { children: ReactNode; fallback?: ReactNode; onReset?: () => void; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("ErrorBoundary:", error, errorInfo); }
  handleReset = () => { this.setState({ hasError: false, error: null }); this.props.onReset?.(); };
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-[#0a0a0a] border border-[#ff6b00]/20 rounded-lg">
          <AlertTriangle className="w-16 h-16 text-[#ff6b00] mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Component Error</h2>
          <p className="text-gray-400 text-center mb-6">{this.state.error?.message || "Unexpected error"}</p>
          <button onClick={this.handleReset} className="flex items-center gap-2 px-4 py-2 bg-[#ff6b00] text-black font-semibold rounded hover:bg-[#ff8533]"><RefreshCw className="w-4 h-4" />Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}
