import React from "react";

const Container = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      css={{
        maxWidth: "calc(var(--max-width) + 1rem)",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "1rem",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
