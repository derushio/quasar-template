export default interface QQBottomSheetOptions {
    /**
     * CSS Class name to apply to the Dialog's QCard
     */
    class?: string | any[] | any;
    /**
     * CSS style to apply to the Dialog's QCard
     */
    style?: string | any[] | any;
    /**
     * Title
     */
    title?: string;
    /**
     * Message
     */
    message?: string;
    /**
     * Array of Objects, each Object defining an action
     */
    actions?: Array<QQBottomSheetAction | {}>;
    /**
     * Display actions as a grid instead of as a list
     */
    grid?: boolean;
    /**
     * Apply dark mode
     */
    dark?: boolean;
    /**
     * Put Bottom Sheet into seamless mode; Does not use a backdrop
     * so user is able to interact with the rest of the page too
     */
    seamless?: boolean;
    /**
     * User cannot dismiss Bottom Sheet if clicking outside of it or hitting ESC key
     */
    persistent?: boolean;
}

export interface QQBottomSheetAction {
    label: string;
    img?: string;
    id: string;
}
