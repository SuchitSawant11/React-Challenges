/** Stub: Complete Challenge 12 (Error and Loading UX) per README. */
interface ErrorDisplayProps {
  error: unknown,
  onRetry?: () => void
}
export default function ErrorDisplay(props: ErrorDisplayProps) {
  const errorMessage = props.error instanceof Error? props.error.message : "Something went wrong while loading the data."

  return <div data-testid="error-display">
    <p>Error: {errorMessage}</p>

    {props.onRetry && (
      <button data-testid="retry-btn" onClick={props.onRetry}>Retry</button>
    )}
  </div>
}
