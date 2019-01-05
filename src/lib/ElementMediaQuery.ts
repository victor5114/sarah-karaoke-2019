import { IBreakpoints, inRange, widthChanged } from './screenUtility';
import HTMLElementStore from './HTMLElementStore';

export default class ElementMediaQuery {
  private element: HTMLElement;
  private breakpoints: IBreakpoints;
  private store: HTMLElementStore = HTMLElementStore.getStore();
  private observer: MutationObserver;

  constructor(element: HTMLElement, breakpoints: IBreakpoints) {
    this.element = element;
    this.breakpoints = breakpoints;
    this.element.dataset.width = this.element.offsetWidth.toString();
    this.element.dataset.height = this.element.offsetHeight.toString();
    this.updateSize();

    const onWidthChange = new Event('onWidthChange');
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (widthChanged(element)) {
          element.dataset.width = `${element.offsetWidth}`;
          element.dataset.height = `${element.offsetHeight}`;
        }

        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'data-width' ||
            mutation.attributeName === 'data-height')
        ) {
          this.updateSize();
          element.dispatchEvent(onWidthChange);
        }
      });
    });

    this.observer.observe(element, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: false,
    });
  }

  get HTMLElement() {
    return this.element;
  }

  public updateSize(): void {
    let rangeFlag = 0;
    for (const size in this.breakpoints) {
      if (inRange(this.element.offsetWidth as number, this.breakpoints[size])) {
        this.element.dataset.size = size;
        rangeFlag = 1;
      }
    }

    if (!rangeFlag) {
      this.element.dataset.size = '';
    }
  }

  public register() {
    this.store.setElement(this.element);
  }

  public unregister() {
    this.observer.disconnect();
    this.store.deleteElement(this.element);
  }
}
