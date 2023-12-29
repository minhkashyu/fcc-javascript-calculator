import React from "react"

export default function Footer(props: any) {
  const multiColorTextStyles = {
    backgroundImage:
      "linear-gradient(to left, violet, indigo, green, blue, orange, red)",
    WebkitBackgroundClip: "text",
    MozBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  }

  return (
    <div>
      <p className="text-center fw-bold mt-3">
        <span className="fst-italic" style={multiColorTextStyles}>
          Developed by{" "}
        </span>
        Minh Ta
      </p>
    </div>
  )
}
