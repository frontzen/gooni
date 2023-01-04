/**
 * it filters properties with value other than null, undefined or empty string
 */
export function OmitNilValues(obj: Record<string, any>) {
  const res: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value != null && value !== '') res[key] = value;
  }
  return res;
}
