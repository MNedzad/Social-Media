
import React, { useEffect } from "react";


function ErrorToast(toast) 
{
  
  toast({
    title: 'Network Error',
    description: "The Server Has Refused the Connection.",
    status: 'error',
    duration: 9000,
    isClosable: true,
  })
    
 
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

