# ngx-animated-paginator

Angular wrapper for [`animated-paginator-web-component`](https://www.npmjs.com/package/animated-paginator-web-component) that plugs seamlessly into **template-driven** and **reactive** forms via `ControlValueAccessor`.

![demo gif](https://raw.githubusercontent.com/eladbh-stanley/animated-paginator-assets/main/demo.gif)

---

## ✨ Features

* Wraps the custom element in an Angular component – no need for `CUSTOM_ELEMENTS_SCHEMA` in consuming apps.
* Works all the way back to **Angular 8** (Ivy disabled for maximum compatibility).
* Full form-control support: `ngModel`, `formControl`, `formControlName`, etc.
* Inputs/outputs mapped to the underlying web-component attributes and events.

---

## 📦 Installation

```bash
npm i ngx-animated-paginator animated-paginator-web-component
```

Both packages are peer-dependent on `@angular/* >= 8.0.0`. Your application already ships those.

---

## 🔌 Usage

1. **Import the module** once in your feature/root module:

```ts
import { NgxAnimatedPaginatorModule } from 'ngx-animated-paginator';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAnimatedPaginatorModule
  ]
})
export class AppModule {}
```

2. **Template examples**

### Two-way binding (template driven)

```html
<ngx-animated-paginator
  [(ngModel)]="currentPage"
  [pages]="5"
  [pageColors]="['#e91e63','#03a9f4','#8bc34a','#ff9800','#9c27b0']"
></ngx-animated-paginator>
<p>Current page: {{ currentPage }}</p>
```

### Reactive form control

```ts
this.pageControl = new FormControl(0);
```

```html
<form [formGroup]="form">
  <ngx-animated-paginator formControlName="page"></ngx-animated-paginator>
</form>
```

---

## 🛠️ API

| Input          | Type                      | Default | Description                                   |
|----------------|---------------------------|---------|-----------------------------------------------|
| `pages`        | `number`                  | `3`     | Total number of pages.                        |
| `initialPage`  | `number`                  | `0`     | Page index selected on init.                  |
| `pageColors`   | `string \| string[]`      | –       | Comma-separated list or array of hex colours. |
| `orientation`  | `'horizontal' \| 'vertical'` | `horizontal` | Layout direction.                        |

### Outputs

| Output           | Payload | Description                              |
|------------------|---------|------------------------------------------|
| `pageChanged`    | `number`| Emits the new page when user navigates.  |

The component also implements `ControlValueAccessor`, so the **value** is the current page (zero-based).

---

## 🚀 Building the library locally

```bash
npm install
npx ng-packagr -p ng-package.json
```
Compiled artefacts land in `dist/`.

---

## 🔑 Releasing

```bash
./deploy.sh <new-version>
```
* bumps `package.json` version
* rebuilds with ng-packagr
* publishes to npm (using your logged-in credentials)
* pushes git tag & commit

Ensure `npm whoami` shows the owner of **ngx-animated-paginator**.

---

## 📝 License

[MIT](./LICENSE) © 2025 Elad Ben-Haim 