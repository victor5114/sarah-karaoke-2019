interface IRange {
  maxWidth?: number;
  minWidth?: number;
}

export interface IBreakpoints {
  [key: string]: IRange;
}

export const defaultBreakpoints = {
  'col-6': { maxWidth: 600 },
  'col-4': { minWidth: 600, maxWidth: 820 },
  'col-3': { minWidth: 820, maxWidth: 1175 },
  'col-2': { minWidth: 1175 },
};

export function inRange(width: number, range: IRange): boolean {
  const min = range.minWidth || 0;
  const max = range.maxWidth || Infinity;
  return width >= min && width <= max;
}

export function widthChanged(elem: HTMLElement) {
  return elem.offsetWidth.toString() !== elem.dataset.width;
}

export function heightChanged(elem: HTMLElement) {
  return elem.offsetHeight.toString() !== elem.dataset.height;
}
