export function dart(functionName, codeBody, inputs) {
  return `
    ${codeBody}
    void main() {
      final solution = Solution();
      final result = solution.${functionName}(${inputs});
      print(result);
    }`
}
