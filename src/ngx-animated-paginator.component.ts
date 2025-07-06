import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  forwardRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'animated-paginator-web-component';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ngx-animated-paginator',
  template: `\n    <animated-paginator></animated-paginator>\n  `,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxAnimatedPaginatorComponent),
      multi: true
    }
  ]
})
export class NgxAnimatedPaginatorComponent implements AfterViewInit, OnChanges, ControlValueAccessor {
  @Input() pages = 3;
  @Input() initialPage = 0;
  @Input() pageColors: string | string[] = ['#4285F4', '#FDBB2D', '#9A40D3'];
  @Input() orientation: Orientation = 'horizontal';

  @Output() pageChanged = new EventEmitter<number>();

  private paginatorEl: any;

  // CVA callbacks
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.paginatorEl = this.host.nativeElement.querySelector('animated-paginator');

    if (!this.paginatorEl) {
      return;
    }

    // Apply initial values
    this.applyAttributes();

    // Listen to underlying custom event
    this.paginatorEl.addEventListener('page-changed', (evt: CustomEvent) => {
      const newPage = (evt.detail || {}).newPage;
      if (typeof newPage === 'number') {
        this.pageChanged.emit(newPage);
        this.onChange(newPage);
      }
      this.onTouched();
    });
  }

  ngOnChanges(_changes: SimpleChanges): void {
    // Update attributes if already initialised
    this.applyAttributes();
  }

  // -------------------------------------
  // ControlValueAccessor implementation
  // -------------------------------------
  writeValue(value: number): void {
    if (this.paginatorEl && typeof value === 'number') {
      this.paginatorEl.page = value;
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.paginatorEl) {
      this.paginatorEl.style.pointerEvents = isDisabled ? 'none' : '';
      this.paginatorEl.style.opacity = isDisabled ? '0.5' : '';
    }
  }

  // -------------------------------------
  // Internal helpers
  // -------------------------------------
  private applyAttributes(): void {
    if (!this.paginatorEl) {
      return;
    }

    this.paginatorEl.setAttribute('pages', `${this.pages}`);
    this.paginatorEl.setAttribute('initial-page', `${this.initialPage}`);
    if (Array.isArray(this.pageColors)) {
      this.paginatorEl.setAttribute('page-colors', this.pageColors.join(','));
    } else if (this.pageColors) {
      this.paginatorEl.setAttribute('page-colors', this.pageColors);
    }
    this.paginatorEl.setAttribute('orientation', this.orientation);
  }
} 