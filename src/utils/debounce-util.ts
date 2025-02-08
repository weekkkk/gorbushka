export function debounce<T extends (...args: Parameters<T>) => Promise<void>>(
  fn: T,
  delay?: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId); // Очистить предыдущий таймер
    timeoutId = setTimeout(() => {
      fn(...args); // Вызов функции с переданными аргументами
    }, delay);
  };
}
