"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional custom fallback UI. Receives the error and a reset handler. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
  /** Short label used in the default fallback (e.g. "3D Globe", "Price Ticker"). */
  label?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Generic error boundary used to isolate failures in WebGL/3D scenes and
 * other client components so a single crashing widget (e.g. the globe
 * failing to initialize WebGL) doesn't take down the whole dashboard.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.label ? `:${this.props.label}` : ""}]`, error, info);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (error) {
      if (this.props.fallback) {
        return this.props.fallback(error, this.reset);
      }
      return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-500/30 bg-red-950/20 p-6 text-center text-sm text-red-200">
          <p className="font-medium">
            {this.props.label ? `${this.props.label} failed to load.` : "Something went wrong."}
          </p>
          <p className="max-w-xs text-xs text-red-300/80">{error.message}</p>
          <button
            onClick={this.reset}
            className="rounded-md border border-red-400/40 px-3 py-1 text-xs font-medium text-red-100 transition hover:bg-red-500/20"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
