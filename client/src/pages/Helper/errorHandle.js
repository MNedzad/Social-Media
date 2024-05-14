
import React from "react";



function ErrorToast(toast) {
  const Toast = toast({
    title: 'Error.',
    description: "Something went wrong.",
    status: 'error',
    duration: 9000,
    isClosable: true,
  })
  return  Toast
}

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError()
  {
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    // You can  log error messages to an error reporting service here
    console.log(errorInfo);
  }
  
  render() {
    console.log(this.state.hasError);
    if (this.state.hasError) {
      // Error path
      return ErrorToast(this.props.Toast);  
    }
    // Normally, just render children
    return this.props.children;
  }  
}

