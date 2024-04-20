export function useAPI() {
  const {
    public: { apiUrl, generateUrl, commonUrl },
  } = useRuntimeConfig()
  return { apiUrl, generateUrl, commonUrl }
}
