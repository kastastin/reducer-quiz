import useError from "../hooks/useError";

export default function Error() {
  const error = useError();

  return (
    <div className="error">
      <div>
        <span>💥</span>
        <span> {error || "There was an error"}</span>
      </div>
    </div>
  );
}
