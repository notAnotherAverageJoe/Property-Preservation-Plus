import React from "react";
import DOMPurify from "dompurify";

const withSanitization = (WrappedComponent) => {
  return (props) => {
    // Sanitize relevant props
    const sanitizedProps = Object.keys(props).reduce((acc, key) => {
      if (typeof props[key] === "string") {
        acc[key] = DOMPurify.sanitize(props[key]);
      } else {
        acc[key] = props[key]; // Keep non-string props unchanged
      }
      return acc;
    }, {});

    // Render the wrapped component with sanitized props
    return <WrappedComponent {...sanitizedProps} />;
  };
};

export default withSanitization;
