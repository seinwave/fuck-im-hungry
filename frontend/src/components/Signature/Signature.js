import React from "react";

class Signature extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className="">
          A nonsense project by{" "}
          <a className="mainlink" href="https://mattseidholz.com">
            Matt Seidholz
          </a>
        </p>
      </div>
    );
  }
}

export default Signature;
