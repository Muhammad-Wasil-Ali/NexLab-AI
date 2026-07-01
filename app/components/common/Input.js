export default function Input({
  label,
  id,
  className = "",
  inputClassName = "",
  ...props
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label ? (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={`h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 ${inputClassName}`}
        {...props}
      />
    </div>
  );
}
