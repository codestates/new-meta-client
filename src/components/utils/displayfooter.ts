export function removeFooter(): void {
  const footer = document.querySelector(".footer");
  footer?.classList.add("display-none");
}

export function addFooter(): void {
  const footer = document.querySelector(".footer");
  footer?.classList.remove("display-none");
}
