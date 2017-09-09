import * as React from "react";
import { withRouter } from "react-router-dom";
import debounce from "debounce";

interface DefaultProps {
  scrollCaptureDebounce: number;
  scrollSyncDebounce: number;
  scrollSyncAttemptLimit: number;
}

interface Props {
  onLocationChange: void;
  location: Location;
  children: React.ReactDOM;
  history: History;
}

class ScrollManager extends React.Component<DefaultProps & Props, {}> {
  public static defaultProps = {
    scrollCaptureDebounce: 50,
    scrollSyncDebounce: 100,
    scrollSyncAttemptLimit: 5
  };

  public scrollSyncData: {
    x: number;
    y: number;
    attemptsRemaining: number;
  };

  public debouncedScroll: EventListenerObject;
  public debouncedScrollSync: (x: number, y: number) => void;
  public scrollSyncPending: boolean;

  constructor(props: DefaultProps & Props) {
    super(props);

    this.scrollSyncData = {
      x: 0,
      y: 0,
      attemptsRemaining: props.scrollSyncAttemptLimit
    };

    const scrollCapture = () => {
      requestAnimationFrame(() => {
        const { pageXOffset: x, pageYOffset: y } = window;

        // use browser history instead of router history
        // to avoid infinite history.replace loop
        const { pathname } = this.props.location;
        const historyState = window.history.state || {};
        const { state = {} } = historyState;
        if (
          !(state as any).scroll ||
          (state as any).scroll.x !== x ||
          (state as any).scroll.y !== y
        ) {
          window.history.replaceState(
            {
              ...historyState,
              state: { ...state, scroll: { x, y } }
            },
            "",
            pathname
          );
        }
      });
    };

    const _scrollSync = () => {
      requestAnimationFrame(() => {
        const { x, y, attemptsRemaining } = this.scrollSyncData;
        if (attemptsRemaining < 1) {
          return;
        }

        const { pageXOffset, pageYOffset } = window;
        if (
          y < window.document.body.scrollHeight &&
          (x !== pageXOffset || y !== pageYOffset)
        ) {
          window.scrollTo(x, y);
          this.scrollSyncData.attemptsRemaining = attemptsRemaining - 1;
          _scrollSync();
        }
      });
    };

    const scrollSync = (x = 0, y = 0) => {
      this.scrollSyncData = {
        x,
        y,
        attemptsRemaining: this.props.scrollSyncAttemptLimit
      };
      _scrollSync();
    };

    this.debouncedScroll = debounce(scrollCapture, props.scrollCaptureDebounce);
    this.debouncedScrollSync = debounce(scrollSync, props.scrollSyncDebounce);
  }

  public componentWillMount() {
    const { location, onLocationChange } = this.props;
    if (onLocationChange) {
      onLocationChange(location);
    }
  }

  public componentDidMount() {
    this.onPop(this.props);
    window.addEventListener("scroll", this.debouncedScroll, { passive: true });
  }

  public componentWillUnmount() {
    this.scrollSyncPending = false;
    window.removeEventListener("scroll", this.debouncedScroll, {
      passive: true
    });
  }

  public componentWillReceiveProps(nextProps: DefaultProps & Props) {
    switch (nextProps.history.action) {
      case "PUSH":
      case "REPLACE":
        this.onPush();
        break;
      case "POP":
        this.onPop(nextProps);
        break;
      default:
        console.warn(`Unrecognized "${nextProps.history.action}"`);
    }
    if (nextProps.onLocationChange) {
      nextProps.onLocationChange(nextProps.location);
    }
  }

  public onPush() {
    this.debouncedScrollSync(0, 0);
  }

  public onPop({ location: { state = {} } }) {
    // attempt location restore
    const { x = 0, y = 0 } = (state as any).scroll || {};
    this.debouncedScrollSync(x, y);
  }

  public render() {
    return this.props.children;
  }
}

export default withRouter(ScrollManager);
