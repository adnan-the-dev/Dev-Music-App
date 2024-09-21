export function getApi() {
  // let api = import.meta.env.VITE_REACT_APP_BASE_URL
  let api = import.meta.env.VITE_REACT_APP_BASE_URL;

  // let dynamic = process.env.REACT_APP_DYNAMIC_IP || false;
  let dynamic = false;
  if (!dynamic) return api;
  let current = window.location.href;
  return (
    current.split(":")[0] +
    ":" +
    current.split(":")[1] +
    ":" +
    api.split(":")[2]
  );
}
