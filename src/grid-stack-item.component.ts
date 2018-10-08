import {
    Component, Input, Output, OnInit, ComponentRef, ElementRef, ViewChild, EventEmitter,
    OnDestroy, AfterViewInit, ViewContainerRef, Renderer2
} from '@angular/core';
import { GridStackItem } from './grid-stack-item.model';
declare var jQuery: any;
declare var _: any;

@Component({
    selector: 'grid-stack-item',
    template: `<div class='grid-stack-item-content'>
              <div #contentPlaceholder *ngIf='contentTemplate'></div>
              <ng-content *ngIf='!contentTemplate'></ng-content>
            </div>`
})
export class GridStackItemComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('contentPlaceholder', { read: ViewContainerRef }) contentPlaceholder: ViewContainerRef;
    @Input() contentTemplate: string;
    @Input() option: GridStackItem;
    @Output() onGridConfigurationChanged = new EventEmitter<GridStackItem>();

    contentComponentRef: ComponentRef<any> = null;
    jGridRef: any = null;
    public jWidgetRef: any = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.jWidgetRef = el.nativeElement;
    }
    get nativeElement(): HTMLElement {
        return this.el.nativeElement;
    }
    ngOnInit() {
        this.RenderWidget(null);
    }

    UpdateWidget(item: GridStackItem) {
        console.log('GridStackItem RenderWidget', item);
    }
    RenderWidget(item: GridStackItem) {
        console.log('GridStackItem RenderWidget', item);
        let renderer = this.renderer;
        if (!_.isNil(item)) {
            this.option = item;
        }
        if (!_.isNil(this.option.marginWidth)) {
            this.renderer.setAttribute(this.nativeElement, 'style', 'margin-left:' + this.option.marginWidth + ';');
        }
        if (!_.isNil(this.option.x)) {
            this.renderer.setAttribute(this.nativeElement, 'data-gs-x', String(this.option.x));
        }
        if (!_.isNil(this.option.y )) {
            this.renderer.setAttribute(this.nativeElement, 'data-gs-y', String(this.option.y));
        }
        if (!_.isNil(this.option.width)) {
            this.renderer.setAttribute(this.nativeElement, 'data-gs-width', String(this.option.width));
        }
        if (!_.isNil(this.option.height)) {
            this.renderer.setAttribute(this.nativeElement, 'data-gs-height', String(this.option.height));
        }
        if (!_.isNil(this.option.minWidth)) {
            renderer.setAttribute(this.nativeElement, 'data-gs-min-width', String(this.option.minWidth));
        }
        if (!_.isNil(this.option.autoPosition)) {
            renderer.setAttribute(this.nativeElement, 'data-gs-auto-position', this.option.autoPosition ? 'yes' : null);
        }

        if (this.option.noResize != null && this.option.noResize == true) {
            renderer.setAttribute(this.nativeElement, 'data-gs-no-resize', 'yes');
        }

    }

    update(x: number, y: number, width: number, height: number): void {
        console.log('GridStackItem update', x, y, width, height);
        if (x === this.option.x && y === this.option.y && width === this.option.width && height === this.option.height) {
            return;
        }
        if (this.option != null) {
            this.option.x = x;
            this.option.y = y;
            this.option.width = width;
            this.option.height = height;

            const optionNew = GridStackItem.Clone(this.option);
            this.onGridConfigurationChanged.emit(optionNew);
        }
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
        console.log('GridStackItem destroy');
        if (this.contentComponentRef !== null) {
            this.contentComponentRef.destroy();
        }
    }
}
