import { Component } from "react";
import ErrorMessage from "../ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex flex-col justify-center">
          <ErrorMessage />;
          <a
            href="/"
            style={{
              display: "block",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "24px",
              marginTop: "10px",
            }}
          >
            Back to main page
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
