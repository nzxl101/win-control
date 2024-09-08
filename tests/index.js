const spawn = require("child_process").spawn;
const { Window, WindowStates, SWP, AncestorFlags, HWND } = require("../src/js/index");
const printWindowInfo = (window) => {
    try {
        return {
            HWND: window.getHwnd(),
            Title: window.getTitle(),
            Visible: window.isVisible(),
            IsMinimized: window.isMinimized(),
            CoveredByAnotherWindow: window.isCoveredByAnotherWindow(),
            ProcessId: window.getPid(),
            ProcessInfo: window.getProcessInfo(),
            ClassName: window.getClassName(),
            Exists: window.exists(),
            Parent: window.getParent(),
            Ancestor: window.getAncestor(AncestorFlags.ROOTOWNER),
            Dimensions: window.getDimensions(),
        };
    } catch (err) {
        return undefined;
    }
};

(async () => {
    const getCurrentWindow = Window.getForeground();
    if (!getCurrentWindow) {
        throw new Error("getForeground(): FAILED");
    } else {
        console.log("getForeground(): OK");
    }

    let currentWindowInfo = printWindowInfo(getCurrentWindow);

    const getWindowByPid = Window.getByPid(currentWindowInfo.ProcessId);
    if (!getWindowByPid) {
        throw new Error("getByPid(): FAILED");
    } else {
        console.log("getByPid(): OK");
    }

    const getWindowByClassName = Window.getByClassName(currentWindowInfo.ClassName);
    if (!getWindowByClassName) {
        throw new Error("getByClassName(): FAILED");
    } else {
        console.log("getByClassName(): OK");
    }

    const getWindowByTitle = Window.getByTitle(currentWindowInfo.Title);
    if (!getWindowByTitle) {
        throw new Error("getByTitle(): FAILED");
    } else {
        console.log("getByTitle(): OK");
    }

    const spawnProcess = spawn("notepad.exe", [], { detached: true });
    await new Promise((p) => setTimeout(p, 500));

    const getProcessByTitle = Window.getByTitle("Untitled - Notepad");
    if (!getProcessByTitle) {
        throw new Error("Notepad process not found");
    }

    let minimizeProcess = getProcessByTitle.setShowStatus(WindowStates.FORCEMINIMIZE);
    if (!minimizeProcess) {
        throw new Error("setShowStatus(): FAILED");
    } else {
        console.log("setShowStatus(): OK");
    }
    await new Promise((p) => setTimeout(p, 500));

    let maximizeProcess = getProcessByTitle.setShowStatus(WindowStates.SHOWMAXIMIZED);
    if (!maximizeProcess) {
        throw new Error("setShowStatus(): FAILED");
    } else {
        console.log("setShowStatus(): OK");
    }
    await new Promise((p) => setTimeout(p, 500));

    let showProcess = getProcessByTitle.setShowStatus(WindowStates.SHOWNORMAL);
    if (!showProcess) {
        throw new Error("setShowStatus(): FAILED");
    } else {
        console.log("setShowStatus(): OK");
    }
    await new Promise((p) => setTimeout(p, 500));

    let moveProcess = getProcessByTitle.moveRelative(0, 100, 0, 0);
    if (!moveProcess) {
        throw new Error("moveRelative(): FAILED");
    } else {
        console.log("moveRelative(): OK");
    }
    await new Promise((p) => setTimeout(p, 500));

    let setPositionProcess = getProcessByTitle.setPosition(HWND.TOP, 0, 0, 50, 50, SWP.SHOWWINDOW);
    if (!setPositionProcess) {
        throw new Error("setPosition(): FAILED");
    } else {
        console.log("setPosition(): OK");
    }
    await new Promise((p) => setTimeout(p, 500));

    const spawnProcess2 = spawn("notepad.exe", [], { detached: true });
    await new Promise((p) => setTimeout(p, 500));

    let setForegroundProcess = getProcessByTitle.setForeground();
    if (!setForegroundProcess) {
        throw new Error("setForeground(): FAILED");
    } else {
        console.log("setForeground(): OK");
    }
    await new Promise((p) => setTimeout(p, 500));

    let closeProcess = getProcessByTitle.close();
    if (!closeProcess) {
        throw new Error("close(): FAILED");
    } else {
        console.log("close(): OK");
    }
    await new Promise((p) => setTimeout(p, 500));

    process.exit(0);
})();
