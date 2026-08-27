import { Component } from './component.ts';

type ComponentConstructor = new (props?: any) => Component;
type RouterChangeListener = (path: string, params: Record<string, any>) => void;

interface RouterRule {
  path: string;
  regex: RegExp;
  paramNames: string[] | null;
  pageClass: ComponentConstructor;
}

class HashRouter {
  private routes: RouterRule[] = [];
  private rootElement: HTMLElement;
  private listeners: RouterChangeListener[] = [];

  private currPage: Component | null = null;

  constructor(rootElementId: string) {
    const element = document.getElementById(rootElementId);
    if (!element) {
      throw new Error(`Контейнер с id "${rootElementId}" не найден в DOM!`);
    }

    this.rootElement = element;

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[data-link]');

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (!href) return;

        e.preventDefault();

        const cleanPath = href.replace(/^#/, '');
        this.navigate(cleanPath);
      }
    });
  }

  public addRoute(path: string, pageClass: ComponentConstructor): void {
    const paramNames: string[] = [];
    const regexStr = path.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name);
      return `([^/]+)`;
    });
    const regex = new RegExp(`^${regexStr}$`);
    this.routes.push({ path, regex, paramNames, pageClass });
  }

  private getHashPath(): string {
    const hash = window.location.hash.slice(1);
    if (!hash) return '/';
    return hash.startsWith('/') ? hash : '/' + hash;
  }

  private matchRoute(
    path: string,
  ): { route: RouterRule; params: Record<string, any> } | null {
    for (const route of this.routes) {
      const match = path.match(route.regex);
      if (match) {
        const params: Record<string, any> = {};
        route.paramNames?.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        return { route, params };
      }
    }
    return null;
  }

  private resolvePageClass(path: string): {
    PageClass: ComponentConstructor;
    params: Record<string, any>;
  } {
    const matched = this.matchRoute(path);

    if (matched) {
      return { PageClass: matched.route.pageClass, params: matched.params };
    }

    const notFound = this.routes.find((r) => r.path === '/404');
    if (notFound) {
      return { PageClass: notFound.pageClass, params: {} };
    }

    throw new Error(
      `Не найден pageClass для маршрута "${path}" и не зарегистрирован /404`,
    );
  }

  private renderPage(
    PageClass: ComponentConstructor,
    params: Record<string, any>,
  ): void {
    if (this.currPage) {
      this.currPage.unmount();
      this.currPage = null;
    }

    this.currPage = new PageClass(params);
    this.currPage.mount(this.rootElement);
  }

  private handleRoute(): void {
    const path = this.getHashPath();
    const { PageClass, params } = this.resolvePageClass(path);

    this.renderPage(PageClass, params);

    this.listeners.forEach((l) => l(path, params));
  }

  public subscribe(listener: RouterChangeListener): () => void {
    this.listeners.push(listener);

    const path = this.getHashPath();
    const matched = this.matchRoute(path);
    listener(path, matched ? matched.params : {});

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public navigate(path: string): void {
    const normalizedPath = path.startsWith('/') ? path : '/' + path;

    if (this.getHashPath() === normalizedPath) return;

    window.location.hash = normalizedPath;
  }
}

export const router = new HashRouter('app');
