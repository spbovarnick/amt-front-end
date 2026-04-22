const toggleFilterParam = (
  sp,
  key,
  rawValue,
) => {
  const value = String(rawValue);
  const params = new URLSearchParams(sp);
  const existing = params.getAll(key);

  params.delete(key);
  params.delete("page");

  if (!existing.includes(value)) {
    [...existing, value].forEach(v => params.append(key, v));
  } else {
    existing
      .filter(v => v !== value)
      .forEach(v => params.append(key, v));
  }

  return params.toString();
}

export default toggleFilterParam