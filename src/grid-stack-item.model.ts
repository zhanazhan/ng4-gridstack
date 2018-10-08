
export class GridStackItem {
    x: number = 0;
    y: number = 0;
    height: number = 1;
    width: number = 1;
    maxHeight?: number;
    minHeight?: number = 1;
    maxWidth?: number;
    minWidth?: number = 1;
    noResize?: boolean = false;
    noMove?: boolean = false;
    autoPosition?: boolean = false;
    marginWidth?: string = '10px';
    locked?: boolean = false;
    el?: any;
    customId?: string;
    id?: string;
    type?: string;
    static Clone(widget: GridStackItem) {
        const result = new GridStackItem();

        result.autoPosition = widget.autoPosition;
        result.id = widget.id;
        result.type = widget.type;
        result.customId = widget.customId;
        result.el = widget.el;
        result.height = widget.height;
        result.locked = widget.locked;
        result.maxHeight = widget.maxHeight;
        result.maxWidth = widget.maxWidth;
        result.minHeight = widget.minHeight;
        result.minWidth = widget.minWidth;
        result.noMove = widget.noMove;
        result.noResize = widget.noResize;
        result.width = widget.width;
        result.x = widget.x;
        result.y = widget.y;

        return result;
    }
}
