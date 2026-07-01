export default function TextArea({
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
      <textarea
        id={id}
        className={`min-h-32 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 ${inputClassName}`}
        {...props}
      />
    </div>
  );
}
