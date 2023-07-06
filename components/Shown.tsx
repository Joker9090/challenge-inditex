import React from "react";

export const Shown = ({ delay = 0, children, extraClass = "" }: { delay?: number, extraClass?: string, children: JSX.Element | JSX.Element[] }) => {
  const [animationStart, setAnimationStart] = React.useState(false)
  React.useEffect(() => {
    setTimeout(() => {
      setAnimationStart(true)
    }, delay)
  }, [])
  return (
    <div className={`Shown ${extraClass} ${animationStart ? "shown-start" : ""}`}>
      {children}
    </div>
  )
}