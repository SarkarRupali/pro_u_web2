declare module '@vimeo/player' {
  class VimeoPlayer {
    constructor(element: HTMLIFrameElement | string, options?: object);
    play(): Promise<void>;
    pause(): Promise<void>;
    unload(): void;
    ready(): Promise<void>;
    on(eventName: string, callback: (data: any) => void): void;
    // Add more methods and properties as needed
  }

  export default VimeoPlayer;
}