import React from 'react';
import { toast } from 'react-toastify';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        toast.error('An unexpected error occurred. Please try again later.');
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1>Something went wrong.</h1>
                    <p>Please try refreshing the page or contact support if the issue persists.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;