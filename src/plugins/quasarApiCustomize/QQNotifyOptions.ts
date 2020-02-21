type QQNotifyOptions =
    | {
          /**
           * Color name for component from the Quasar Color Palette
           */
          color?: string;
          /**
           * Color name for component from the Quasar Color Palette
           */
          textColor?: string;
          /**
           * The content of your message
           */
          message: string;
          /**
           * Render message as HTML; This can lead to XSS attacks, so make sure that you sanitize the message first
           */
          html?: boolean;
          /**
           * Icon name following Quasar convention; make sure you have the
           * icon library installed unless you are using 'img:' prefix
           */
          icon?: string;
          /**
           * URL to an avatar/image; Suggestion: use statics folder
           */
          avatar?: string;
          /**
           * Window side/corner to stick to
           */
          position?: string;
          /**
           * Add CSS class(es) to the notification for easier customization
           */
          classes?: string;
          /**
           * Amount of time to display (in milliseconds)
           */
          timeout?: number;
          /**
           * Notification actions (buttons); If a 'handler' is specified or not,
           * clicking/tapping on the button will also close the notification; Also check 'closeBtn' convenience prop
           */
          actions?: any[];
          /**
           * Function to call when notification gets dismissed
           */
          onDismiss?: () => any;
          /**
           * Convenience way to add a dismiss button with a specific label, without using the 'actions' convoluted prop
           */
          closeBtn?: string;
          /**
           * Put notification into multi-line mode; If this prop isn't used
           * and more than one 'action' is specified then notification goes into multi-line mode by default
           */
          multiLine?: boolean;
          /**
           * Ignore the default configuration (set by setDefaults()) for this instance only
           */
          ignoreDefaults?: boolean;
      }
    | string;

export default QQNotifyOptions;
