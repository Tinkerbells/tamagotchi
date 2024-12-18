export const useDismissModal = () => {
  const dismiss = () =>
    (document.querySelector('[data-state="open"]') as HTMLDivElement).click()
  return {
    dismiss,
  }
}
