import { widthChanged, heightChanged } from './screenUtility';

export default class HTMLElementStore {
  public static getStore() {
    if (!HTMLElementStore.instance) {
      HTMLElementStore.instance = new HTMLElementStore(new Map());
    }
    return HTMLElementStore.instance;
  }
  private static instance: HTMLElementStore;

  private constructor(public elemToWatch: Map<HTMLElement, HTMLElement>) {
    this.initEvents();
    this.elemToWatch = elemToWatch;
  }

  public setElement(element: HTMLElement) {
    this.elemToWatch.set(element, element);
  }

  public deleteElement(element: HTMLElement) {
    this.elemToWatch.delete(element);
  }

  private initEvents() {
    window.onresize = this.onResize.bind(this);
  }

  private onResize(): void {
    for (const elem of this.elemToWatch.values()) {
      if (widthChanged(elem)) {
        elem.dataset.width = `${elem.offsetWidth}`;
      } else if (heightChanged(elem)) {
        elem.dataset.height = `${elem.offsetHeight}`;
      }
    }
  }
}
