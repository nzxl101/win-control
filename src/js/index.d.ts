declare module "win-control" {
    type WindowStates = Readonly<{
        HIDE: 0;
        SHOWNORMAL: 1;
        SHOWMINIMIZED: 2;
        MAXIMIZE: 3;
        SHOWMAXIMIZED: 3;
        SHOWNOACTIVATE: 4;
        SHOW: 5;
        MINIMIZE: 6;
        SHOWMINNOACTIVE: 7;
        SHOWNA: 8;
        RESTORE: 9;
        SHOWDEFAULT: 10;
        FORCEMINIMIZE: 11;
    }>;

    type AncestorFlags = Readonly<{
        PARENT: 1;
        ROOT: 2;
        ROOTOWNER: 3;
    }>;

    type HWND = Readonly<{
        NOTOPMOST: -2;
        TOPMOST: -1;
        TOP: 0;
        BOTTOM: 1;
    }>;

    type SWP = Readonly<{
        NOSIZE: 0x0001;
        NOMOVE: 0x0002;
        NOZORDER: 0x0004;
        NOREDRAW: 0x0008;
        NOACTIVATE: 0x0010;
        DRAWFRAME: 0x0020;
        FRAMECHANGED: 0x0020;
        SHOWWINDOW: 0x0040;
        HIDEWINDOW: 0x0080;
        NOCOPYBITS: 0x0100;
        NOOWNERZORDER: 0x0200;
        NOREPOSITION: 0x0200;
        NOSENDCHANGING: 0x0400;
        DEFERERASE: 0x2000;
        ASYNCWINDOWPOS: 0x4000;
    }>;

    export class Window {
        constructor(hwnd: number);
        getParent(): Window | undefined;
        getAncestor(kindOfAncestor: AncestorFlags): Window | undefined;
        getProcessInfo(): ProcessInfo;
        getPid(): number;
        getClassName(): string;
        getTitle(): string;
        exists(): boolean;
        isVisible(): boolean;
        isMinimized(): boolean;
        isCoveredByAnotherWindow(): boolean;
        getDimensions(): Dimensions;
        getHwnd(): number;
        moveRelative(dx: number, dy: number, dw: number, dh: number): void;
        setShowStatus(state: WindowStates): boolean;
        setPosition(hwndInsertAfter: number | HWND, x: number, y: number, cx: number, cy: number, uFlags: SWP): boolean;
        setForeground(): void;
        close(): void;

        static getByPid(pid: number): Window | undefined;
        static getForeground(): Window;
        static getByClassName(className: string): Window | undefined;
        static getByTitle(title: string): Window | undefined;
    }

    interface ProcessInfo {
        windowText: string;
        pid: number;
        path: string;
    }

    interface Dimensions {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }
}
