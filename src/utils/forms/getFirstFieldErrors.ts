export function getFirstFieldErrors<TValues extends Record<string, unknown>>(
  fieldErrors: Partial<Record<keyof TValues, string[] | undefined>>,
): Partial<Record<keyof TValues, string>> {
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [
      field,
      messages?.[0],
    ]),
  ) as Partial<Record<keyof TValues, string>>;
}