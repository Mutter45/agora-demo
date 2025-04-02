import { ErrorData } from 'hls.js';
import { HlsConfig } from 'hls.js';
import { IRemoteAudioTrack } from '@agora-js/media';
import { IRemoteDataChannel } from '@agora-js/media';
import { IRemoteVideoTrack } from '@agora-js/media';
import { RemoteAudioTrackStats as RtcAudioStats } from '@agora-js/media';
import { RemoteVideoTrackStats as RtcVideoStats } from '@agora-js/media';
import { UID } from '@agora-js/shared';

/**
 * Disables log upload.
 *
 * The log-upload function is disabled by default. If you have called {@link enableLogUpload}, then call this method when you need to stop uploading the log.
 * @category Logger
 */
export declare function disableLogUpload(): void;

/**
 * Enables log upload.
 *
 * Call this method to enable log upload to Agora’s server.
 *
 * The log-upload function is disabled by default. To enable this function, you must call this method before calling all the other methods.
 *
 * > If a user fails to join the channel, the log information (for that user) is unavailable on Agora's server.
 * @category Logger
 */
export declare function enableLogUpload(): void;

/**
 * Enable the new network configuration.
 * @category Network
 */
export declare function enableNewNetworkConfig(): void;

/**
 * The `EventEmitter` class provides a way to define, emit, and handle events.
 */
declare class EventEmitter<E extends string | number> {
    private _events;
    /**
     * Gets all the listeners for a specified event.
     *
     * @param event The event name.
     */
    getListeners(event: E): Function[];
    /**
     * Listens for a specified event.
     *
     * When the specified event happens, the SDK triggers the callback that you pass.
     * @param event The event name.
     * @param listener The callback to trigger.
     */
    on(event: E, listener: Function): void;
    /**
     * Listens for a specified event once.
     *
     * When the specified event happens, the SDK triggers the callback that you pass and then removes the listener.
     * @param event The event name.
     * @param listener The callback to trigger.
     */
    once(event: E, listener: Function): void;
    /**
     * Removes the listener for a specified event.
     *
     * @param event The event name.
     * @param listener The callback that corresponds to the event listener.
     */
    off(event: E, listener?: Function): void;
    /**
     * Removes all listeners for a specified event.
     *
     * @param event The event name. If left empty, all listeners for all events are removed.
     */
    removeAllListeners(event?: E): void;
    private _indexOfListener;
}

/**
 * Get the value of the specified configuration.
 * @param key - The name of the configuration.
 */
export declare function getParameter(key: keyof typeof VARIABLE_PARAMS): string | number | boolean;

export declare interface IPlayerError {
    source: MediaSource_2;
    error: ErrorData | Error | IPlayerErrorMeta;
}

export declare interface IPlayerErrorMeta {
    code: PlayerErrorCode;
    message?: string;
}

/**
 * The options of player
 */
export declare interface IPlayerOptions {
    url: string;
    el: string | HTMLVideoElement;
    width?: number;
    height?: number;
    objectFit?: "cover" | "contain" | "fill";
    aspectRatio?: string;
    autoSwitchHLS?: boolean;
    defaultUseHLS?: boolean;
    hlsConfig?: HlsConfig;
    autoplay?: boolean;
    mirror?: boolean;
    timeout?: number;
}

export declare function isHlsSupported(): boolean;

export declare function isRtcSupported(): boolean;

export declare class LivePlayer extends EventEmitter<PlayerEvent> {
    static isHlsSupported: typeof isHlsSupported;
    static isRtcSupported: typeof isRtcSupported;
    private source;
    /**
     * the element of player
     */
    element: HTMLVideoElement;
    private options;
    private urlInfo;
    private autoSwitchHLS;
    private isMirror;
    private volume;
    private timeout?;
    private timeoutTrigger?;
    private playDefer;
    private pauseDefer;
    private retryDefer;
    private switchUrlDefer;
    private switchSourceDefer;
    private _playState;
    private _userIntent;
    private exceptionManager;
    private exceptionTimer?;
    private lastTimeUpdate;
    get codec(): {
        video: "H264" | "H265" | "VP8" | "VP9" | "AV1X" | "AV1" | undefined;
        audio: "opus" | "aac" | "PCMU" | "PCMA" | "G722" | undefined;
    };
    set playState(state: MediaPlayState);
    /**
     * the state of player
     */
    get playState(): MediaPlayState;
    /**
     * Whether the player is playing
     */
    get isPlaying(): boolean;
    /**
     * Whether the player is paused
     **/
    get isPaused(): boolean;
    /**
     * Whether the player is stopped
     **/
    get isStopped(): boolean;
    constructor(options: IPlayerOptions);
    private bindMediaEvents;
    private bindVideoEvents;
    private unbindVideoEvents;
    private handleVideoEvents;
    private unbindMediaEvents;
    private bindEvents;
    private unbindEvents;
    /**
     * Play
     */
    play(): Promise<boolean | undefined>;
    /**
     * Pause
     * @param stop - Whether to stop
     **/
    pause(stop?: boolean): Promise<void>;
    /**
     * Retry
     **/
    retry(): Promise<void>;
    /**
     * Switch the play url
     * @param url - The play url
     * */
    switchURL(url: string): Promise<void>;
    /**
     * Switch the play source
     * @param source - The play source
     * */
    switchMediaSource(source: MediaSource_2): Promise<void>;
    /**
     * Mirror
     * @param mirror - Whether to mirror
     * */
    mirror(mirror?: boolean): void;
    /**
     * Destroy
     * */
    destroy(): Promise<void>;
    /**
     * Set volume
     * @param volume - The volume
     * */
    setVolume(volume: number): void;
    /**
     * Get volume
     * */
    getVolume(): number;
    /**
     * Get network quality
     * */
    getNetworkQuality(): 0 | 1 | 3 | 5 | 6 | 2 | 4;
    private startMonitorException;
    private stopMonitorException;
    /**
     * Get statistics
     * @returns Statistics
     * - audio: Audio statistics
     * - video: Video statistics
     * */
    getStats(): {
        audio: RtcAudioStats;
        video: RtcVideoStats;
    } | undefined;
    private replaceNewVideoElement;
    private setupTimeoutTrigger;
    private clearTimeoutTrigger;
}

/**
 * The state of the player
 */
export declare enum MediaPlayState {
    /**
     * pending: The player is loading.
     */
    PENDING = "pending",
    /**
     * playing: The player is playing.
     */
    PLAYING = "playing",
    /**
     * paused: The player is paused.
     */
    PAUSED = "paused",
    /**
     * stopped: The player is stopped.
     */
    STOPPED = "stopped"
}

/**
 * The type of media
 */
declare enum MediaSource_2 {
    HLS = "hls",
    RTC = "rtc"
}
export { MediaSource_2 as MediaSource }

/**
 */
export declare enum PlayerErrorCode {
    TIMEOUT = "TIMEOUT"
}

/**
 * The event of the player
 */
export declare enum PlayerEvent {
    /**
     * rtc-user-state-changed: The state of the remote user in the rtc channel has changed.
     */
    RTC_USER_STATE_CHANGED = "rtc-user-state-changed",
    /**
     * rtc-source-state-changed: The state of the rtc video source has changed
     * */
    RTC_SOURCE_STATE_CHANGED = "rtc-source-state-changed",
    /**
     * rtc-host-changed: The current push user in the rtc channel has changed. The first parameter is the push user after the change, and the second parameter is the push user before the change. Only triggered under the rtc video source, ignore this event if there is no special purpose.
     * */
    RTC_HOST_CHANGED = "rtc-host-changed",
    /**
     * rtc-media-changed: The media source currently played in the rtc channel has changed.
     * */
    RTC_MEDIA_CHANGED = "rtc-media-changed",
    /**
     * rtc-events: rtc related events, used to handle some abnormal event states of rtc {@link RtcEvent}
     * */
    RTC_EVENTS = "rtc-events",
    /**
     * play-state-changed: The state is the player state subjectively recognized by the user.
     * */
    PLAY_STATE_CHANGED = "play-state-changed",
    /**
     * before-media-source-change: The player is ready to switch video sources, corresponding to {@link PlayerEvent.BEFORE_MEDIA_SOURCE_CHANGE}
     * */
    BEFORE_MEDIA_SOURCE_CHANGE = "before-media-source-change",
    /**
     * media-source-changed: After the player successfully switches the video source (such as from RTC to HLS), this event is triggered.
     * */
    MEDIA_SOURCE_CHANGED = "media-source-changed",
    /**
     * autoplay-prevented: The automatic playback failed callback on some specific browsers, and manual playback is required.
     * */
    AUTOPLAY_PREVENTED = "autoplay-prevented",
    /**
     * network-quality: Indicates the quality of the network, 0 | 1 | 2 | 3 | 4 | 5 | 6
     * */
    NETWORK_QUALITY = "network-quality",
    /**
     * video-events: The original events of the video element
     * */
    VIDEO_EVENTS = "video-events",
    /**
     * error: Various errors that occur in the player, excluding the errors that trigger UNRECOVERABLE_ERROR, you can try to call retry to recover.
     *        In RTC mode, refer to the error of agora-rtc-sdk-ng https://api-ref.agora.io/en/voice-sdk/web/4.x/index.html#error-codes
     *        In HLS mode, refer to the error of hls.js
     * */
    ERROR = "error",
    REQUEST_SWITCH_MEDIA_SOURCE = "request-switch-media-source"
}

export { RtcAudioStats }

/**
 * The event of rtc
 */
export declare enum RtcEvent {
    /**
     * 1001: Network disconnection
     * */
    NETWORK_EXCEPTION = 1001,
    /**
     * 1002: Network disconnection recovered
     * */
    NETWORK_EXCEPTION_RECOVERED = 1002,
    /**
     * 1003: Video decoding failed/timeout
     * */
    VIDEO_DECODED_FAILED = 1003,
    /**
     * 1004: Video decoding recovered
     * */
    VIDEO_DECODED_RECOVERED = 1004,
    /**
     * 1005: Video frozen
     * */
    VIDEO_FROZEN = 1005,
    /**
     * 1006: Video frozen recovered
     * */
    VIDEO_FROZEN_RECOVERED = 1006
}

/**
 * The state of rtc media
 */
export declare enum RtcMediaState {
    /**
     * The RTC media is playing.
     */
    PLAYING = "playing",
    /**
     * The RTC media is paused.
     */
    PAUSED = "paused",
    /**
     * The RTC media is stopped.
     */
    STOPPED = "stopped",
    /**
     * The RTC media is empty.
     */
    EMPTY = "empty"
}

/**
 * Enum representing various RTC source events.
 */
export declare enum RtcSourceEvent {
    /**
     * Event for network quality changes.
     */
    NETWORK_QUALITY = "network_quality",
    /**
     * Event for state changes.
     */
    STATE_CHANGED = "state_changed",
    /**
     * Event for video state changes.
     */
    VIDEO_STATE_CHANGED = "video_state_changed",
    /**
     * Event for audio state changes.
     */
    AUDIO_STATE_CHANGED = "audio_state_changed",
    /**
     * Event for host changes.
     */
    HOST_CHANGED = "host_changed",
    /**
     * Event for user state changes.
     */
    USER_STATE_CHANGED = "user_state_changed"
}

/**
 * The state of the RTC source.
 */
export declare enum RtcSourceState {
    /**
     * The RTC source is being created.
     */
    CREATING = "creating",
    /**
     * The RTC source has been created.
     */
    CREATED = "created",
    /**
     * The RTC source is connecting.
     */
    CONNECTING = "connecting",
    /**
     * The RTC source is connected.
     */
    CONNECTED = "connected",
    /**
     * The RTC source connection failed.
     */
    CONNECT_FAILED = "connect-failed",
    /**
     * The RTC source has been destroyed.
     */
    DESTROYED = "destroyed"
}

export declare interface RtcUser {
    uid: UID;
    audioTrack?: IRemoteAudioTrack;
    videoTrack?: IRemoteVideoTrack;
    hasAudio: boolean;
    hasVideo: boolean;
    dataChannels?: IRemoteDataChannel[];
}

/**
 * The state of rtc user
 */
export declare enum RtcUserState {
    /**
     * The RTC user has joined.
     */
    JOINED = "joined",
    /**
     * The RTC user has left.
     */
    LEFT = "left",
    /**
     * The RTC user has unpublished.
     */
    UNPUBLISHED = "unpublished",
    /**
     * The RTC user has published.
     */
    PUBLISHED = "published"
}

export { RtcVideoStats }

/**
 * Sets the output log level of the SDK.
 *
 * Choose a level to see the logs preceding that level. The log level follows the sequence of NONE, ERROR, WARNING, INFO, and DEBUG.
 *
 * For example, if you set the log level as `AgoraRTC.setLogLevel(1);`, then you can see logs in levels INFO, ERROR, and WARNING.
 * @param level The output log level.
 * - 0: DEBUG. Output all API logs.
 * - 1: INFO. Output logs of the INFO, WARNING and ERROR level.
 * - 2: WARNING. Output logs of the WARNING and ERROR level.
 * - 3: ERROR. Output logs of the ERROR level.
 * - 4: NONE. Do not output any log.
 * @category Logger
 */
export declare function setLogLevel(level: number): void;

/**
 * Set the value of the specified configuration. {@link VARIABLE_PARAMS}
 * @param key - The name of the configuration. Contact Agora service personnel for details.
 * @param value - The value of the configuration.
 */
export declare function setParameter(key: keyof typeof VARIABLE_PARAMS, value: any): void;

/**
 * Set the value of the specified rtc configuration.
 * @param key - The name of the rtc configuration.
 * @param value - The value of the configuration.
 */
export declare function setRTCParameter(key: string, value: any): void;

/**
 * @private
 * The list of configurable parameters. {@link setParameter}
 */
declare const VARIABLE_PARAMS: {
    CDN_DOMAIN: string;
    CDN_BACKUP_DOMAIN: string;
    ENABLE_RTC_H264_CHECK: boolean;
    NETWORK_POINTS: number;
    VIDEO_DECODE_POINTS: number;
    VIDEO_FROZEN_POINTS: number;
    VIDEO_FROZEN_THRESHOLD: number;
    VIDEO_FROZEN_RECOVERED_THRESHOLD: number;
};

export { }
