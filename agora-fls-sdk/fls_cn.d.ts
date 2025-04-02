import { ErrorData } from 'hls.js';
import { HlsConfig } from 'hls.js';
import { IRemoteAudioTrack } from '@agora-js/media';
import { IRemoteDataChannel } from '@agora-js/media';
import { IRemoteVideoTrack } from '@agora-js/media';
import { RemoteAudioTrackStats as RtcAudioStats } from '@agora-js/media';
import { RemoteVideoTrackStats as RtcVideoStats } from '@agora-js/media';
import { UID } from '@agora-js/shared';

/**
 * 关闭日志上传。
 *
 * 日志上传默认是关闭状态，如果你调用了开启日志上传（{@link enableLogUpload})，可以通过本方法停止上传日志。
 * @category Logger
 */
export declare function disableLogUpload(): void;

/**
 * 开启日志上传。开启后 SDK 的日志会上传到声网的服务器。
 *
 * 日志上传功能默认为关闭状态，如果你需要开启此功能，请确保在所有方法之前调用本方法。
 *
 * > 如果没有成功加入频道，则服务器上无法查看日志信息。
 * @category Logger
 */
export declare function enableLogUpload(): void;

/**
 * 启用新网络配置
 */
export declare function enableNewNetworkConfig(): void;

/**
 * `EventEmitter` 类提供了定义、触发和处理事件的方式。
 */
declare class EventEmitter<E extends string | number> {
    private _events;
    /**
     * 指定一个事件名，获取当前所有监听这个事件的回调函数。
     *
     * @param event - 事件名称。
     */
    getListeners(event: E): Function[];
    /**
     * 监听一个指定的事件，当事件触发时会调用传入的回调函数。
     *
     * @param event - 指定事件的名称。
     * @param listener - 传入的回调函数。
     */
    on(event: E, listener: Function): void;
    /**
     * 监听一个指定的事件，当事件触发时会调用传入的回调函数。
     *
     * 当监听后事件第一次触发时，该监听和回调函数就会被立刻移除，也就是只监听一次指定事件。
     *
     * @param event - 指定事件的名称。
     * @param listener - 传入的回调函数。
     */
    once(event: E, listener: Function): void;
    /**
     * 取消一个指定事件的监听。
     *
     * @param event - 指定事件的名称。
     * @param listener - 监听事件时传入的回调函数。
     */
    off(event: E, listener?: Function): void;
    /**
     * 指定一个事件，取消其所有的监听。
     *
     * @param event - 指定事件的名称，如果没有指定事件，则取消所有事件的所有监听。
     */
    removeAllListeners(event?: E): void;
    private _indexOfListener;
}

/**
 * 获取指定配置
 *
 * @param key - 配置名称
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
 * 播放器配置
 * @public
 */
export declare interface IPlayerOptions {
    /**
     * 播放器播放链接
     * - RTC: `rte://{appid}/{channel}?token={token}&uid={uid}&streamid={streamid}`
     * - HLS: `rte://{appid}/{appname}/{steamname}?token={token}&uid={uid}`
     * appid: 你的声网项目的 [App ID](https://doc.shengwang.cn/basics/glossary#app-id)。
     * channel 标识通话的频道名称，长度在 64 字节以内的字符串。以下为支持的字符集范围（共 89 个字符）:
     *  - 26 个小写字母 a-z。
     *  - 26 个大写字母 A-Z。
     *  - 10 个数字 0-9。
     *  - 空格。
     *  - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","。
     * token 用于鉴权的 token。
     *  - 如果你的项目没有开启 token 鉴权，这里填 `null`。
     *  - 安全要求不高: 你可以使用控制台生成的临时 token，详见[获取 RTC 临时 Token](http://doc.shengwang.cn/doc/rtc/javascript/get-started/enable-service)。
     *  - 安全要求高：传入从你的服务端获得的正式 token，详见[使用 Token 鉴权](http://doc.shengwang.cn/doc/rtc/javascript/basic-features/token-authentication)。
     * uid 标识用户的 ID。整数或字符串，ASCII 字符，需保证唯一性。如果不指定或设为 `null`，服务器会自动分配一个整数型 uid 并在 Promise 中返回。
     *  - 如果使用整数作为用户 ID，需为 32 位无符号整数。建议设置范围：0 到 (2<sup>32</sup>-1)。
     *  - 如果使用字符串作为用户 ID，长度不超过 255 个字符。
     * streamid 标识主播的 ID。整数或字符串，ASCII 字符，需保证唯一性。如果不指定或设为 `null`，播放器会自动拉取频道内的第一个主播流。
     * {appname}/{steamname} 用于 hls 模式下
     *
     */
    url: string;
    /**
     * 播放器容器
     * - 可以是一个 HTML 元素的 ID
     * - 也可以是一个 HTMLVideoElement 对象
     */
    el: string | HTMLVideoElement;
    /**
     * 视频宽度
     */
    width?: number;
    /**
     * 视频高度
     */
    height?: number;
    /**
     * 视频填充方式
     * - `cover`: 填充整个容器，可能会裁剪视频
     * - `contain`: 保持视频比例，可能会留有空白
     * - `fill`: 填充整个容器，可能会拉伸视频
     */
    objectFit?: "cover" | "contain" | "fill";
    /**
     * 视频宽高比
     * - 例如: `16:9`, `4:3`, `1:1`
     */
    aspectRatio?: string;
    /**
     * 是否自动切换 MediaSource, 默认为 true
     */
    autoSwitchHLS?: boolean;
    /**
     * 默认使用HLS, 默认为 false
     */
    defaultUseHLS?: boolean;
    /**
     * HLS 配置
     */
    hlsConfig?: HlsConfig;
    /**
     * 是否自动播放，默认为 false
     */
    autoplay?: boolean;
    /**
     * 是否渲染，开启镜像
     */
    mirror?: boolean;
    /**
     * 超时记录
     */
    timeout?: number;
}

export declare function isHlsSupported(): boolean;

export declare function isRtcSupported(): boolean;

export declare class LivePlayer extends EventEmitter<PlayerEvent> {
    /**
     * 检查 Agora FLS SDK，HLS协议对正在使用的浏览器的适配情况。
     *
     * 该方法必须在创建播放器 {@link LivePlayer} 之前调用。
     *
     * @returns 是否支持当前浏览器。
     * - `true`: 支持。
     * - `false`: 不支持。
     */
    static isHlsSupported: typeof isHlsSupported;
    /**
     * 检查 Agora FLS SDK，RTC协议对正在使用的浏览器的适配情况。
     *
     * 该方法必须在创建播放器 {@link LivePlayer} 之前调用。
     *
     * @returns 是否支持当前浏览器。
     * - `true`: 支持。
     * - `false`: 不支持。
     */
    static isRtcSupported: typeof isRtcSupported;
    private source;
    /**
     * 播放器元素
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
     * 播放器状态
     */
    get playState(): MediaPlayState;
    /**
     * 播放器是否正在播放
     */
    get isPlaying(): boolean;
    /**
     * 播放器是否暂停
     */
    get isPaused(): boolean;
    /**
     * 播放器是否停止
     */
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
     * 播放
     */
    play(): Promise<boolean | undefined>;
    /**
     * 暂停
     * @param stop - 是否停止
     */
    pause(stop?: boolean): Promise<void>;
    /**
     * 重试
     */
    retry(): Promise<void>;
    /**
     * 切换播放链接
     * @param url - 播放链接
     */
    switchURL(url: string): Promise<void>;
    /**
     * 切换播放源
     * @param source - 播放源
     */
    switchMediaSource(source: MediaSource_2): Promise<void>;
    /**
     * 镜像
     * @param mirror - 是否镜像
     */
    mirror(mirror?: boolean): void;
    /**
     * 销毁
     */
    destroy(): Promise<void>;
    /**
     * 设置音量
     * @param volume - 音量
     */
    setVolume(volume: number): void;
    /**
     * 获取音量
     */
    getVolume(): number;
    /**
     * 获取网络质量
     */
    getNetworkQuality(): 0 | 1 | 3 | 5 | 6 | 2 | 4;
    private startMonitorException;
    private stopMonitorException;
    /**
     * 获取统计信息
     * @returns 统计信息
     * - audio: 音频统计信息
     * - video: 视频统计信息
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
 * 播放器状体
 * @public
 */
export declare enum MediaPlayState {
    /** pending: 播放器正在加载 */
    PENDING = "pending",
    /**
     * canplay: 播放器准备就绪，可以播放
     * @en
     * canplay: The player is ready to play.
     */
    /** playing: 播放器正在播放 */
    PLAYING = "playing",
    /** paused: 播放器正在暂停 */
    PAUSED = "paused",
    /** stopped: 播放器被销毁了 */
    STOPPED = "stopped"
}

/**
 * 媒体源类型
 * @public
 */
declare enum MediaSource_2 {
    HLS = "hls",
    RTC = "rtc"
}
export { MediaSource_2 as MediaSource }

/**
 * Player 抛出的错误的 Code
 */
export declare enum PlayerErrorCode {
    /**
     * 播放超时
     */
    TIMEOUT = "TIMEOUT"
}

/**
 * 播放器事件。
 * @public
 */
export declare enum PlayerEvent {
    /** rtc-user-state-changed: rtc 频道内远端用户状态发生改变 */
    RTC_USER_STATE_CHANGED = "rtc-user-state-changed",
    /** rtc-source-state-changed: rtc 视频源状态发生变化 */
    RTC_SOURCE_STATE_CHANGED = "rtc-source-state-changed",
    /** rtc-host-changed: rtc 频道内当前推流用户发生改变。第一个参数为变更后的推流用户，第二个参数为变更前推流用户。仅在 rtc 视频源下触发，如无特殊用途，忽略该事件。 */
    RTC_HOST_CHANGED = "rtc-host-changed",
    /** rtc-media-changed: rtc 频道内当前播放的媒体源发生变化。 */
    RTC_MEDIA_CHANGED = "rtc-media-changed",
    /** rtc-events: rtc 相关事件, 用于处理rtc一些异常事件状态 {@link RtcEvent} */
    RTC_EVENTS = "rtc-events",
    /** play-state-changed: 该状态为用户主观认定的播放器状态 */
    PLAY_STATE_CHANGED = "play-state-changed",
    /** before-media-source-change: 播放器准备切换视频源，对应 {@link PlayerEvent.BEFORE_MEDIA_SOURCE_CHANGE} */
    BEFORE_MEDIA_SOURCE_CHANGE = "before-media-source-change",
    /** media-source-changed：播放器切换视频源（如从 RTC 切换到 HLS）成功后，触发该事件。 */
    MEDIA_SOURCE_CHANGED = "media-source-changed",
    /** autoplay-prevented: 在一些特定浏览器上自动播放失败回调，需要手动触发播放 */
    AUTOPLAY_PREVENTED = "autoplay-prevented",
    /** network-quality: 表示网络的质量， 0 | 1 | 2 | 3 | 4 | 5 | 6*/
    NETWORK_QUALITY = "network-quality",
    /** video-events: 视频元素的原始事件 */
    VIDEO_EVENTS = "video-events",
    /** error: 播放器中出现的各种错误，不包含触发 UNRECOVERABLE_ERROR 的报错，可尝试调用 retry进行恢复。
     *         在 RTC 模式下参考：agora-rtc-sdk-ng的报错 https://api-ref.agora.io/en/voice-sdk/web/4.x/index.html#error-codes
     *         在 HLS 模式下参考：hls.js的报错 https://github.com/video-dev/hls.js/blob/master/docs/API.md#errors
     * */
    ERROR = "error",
    /** request-switch-media-source: 视频源出现不可恢复的错误，一旦触发需要切换视频源。如从 RTC 切换到 HLS */
    REQUEST_SWITCH_MEDIA_SOURCE = "request-switch-media-source"
}

export { RtcAudioStats }

/**
 * rtc 相关事件
 * @public
 */
export declare enum RtcEvent {
    /** 1001: 网络断线 */
    NETWORK_EXCEPTION = 1001,
    /** 1002: 网络断线恢复 */
    NETWORK_EXCEPTION_RECOVERED = 1002,
    /** 1003: 视频解码失败/超时 */
    VIDEO_DECODED_FAILED = 1003,
    /** 1004: 视频解码恢复 */
    VIDEO_DECODED_RECOVERED = 1004,
    /** 1005: 视频卡顿 */
    VIDEO_FROZEN = 1005,
    /** 1006: 视频卡顿恢复 */
    VIDEO_FROZEN_RECOVERED = 1006
}

/**
 * rtc 媒体播放状态
 * @public
 */
export declare enum RtcMediaState {
    /** RTC 媒体处于播放状态. */
    PLAYING = "playing",
    /** RTC 媒体处于暂停状态. */
    PAUSED = "paused",
    /** RTC 媒体处于停止状态. */
    STOPPED = "stopped",
    /** RTC 媒体被重置了. */
    EMPTY = "empty"
}

/**
 * @enum {string} RtcSourceEvent
 * @description Enum representing various RTC source events.
 * @public
 */
export declare enum RtcSourceEvent {
    /** 网络质量变化事件 */
    NETWORK_QUALITY = "network_quality",
    /** 状态变化事件 */
    STATE_CHANGED = "state_changed",
    /** 视频状态变化事件 */
    VIDEO_STATE_CHANGED = "video_state_changed",
    /** 音频状态变化事件 */
    AUDIO_STATE_CHANGED = "audio_state_changed",
    /** 主持人变化事件 */
    HOST_CHANGED = "host_changed",
    /** 用户状态变化事件 */
    USER_STATE_CHANGED = "user_state_changed"
}

/**
 * RTC 源状态.
 * @public
 */
export declare enum RtcSourceState {
    /** RTC 源正在创建. */
    CREATING = "creating",
    /** RTC 源创建好了. */
    CREATED = "created",
    /** RTC 源正在连接. */
    CONNECTING = "connecting",
    /** RTC 源连接好了. */
    CONNECTED = "connected",
    /** RTC 源连接失败. */
    CONNECT_FAILED = "connect-failed",
    /** RTC 源销毁了. */
    DESTROYED = "destroyed"
}

/**
 * Information about a remote user. You can get this through [AgoraRTCClient.remoteUsers]{@link IAgoraRTCClient.remoteUsers}.
 */
export declare interface RtcUser {
    /**
     * The ID of the remote user.
     */
    uid: UID;
    /**
     * The subscribed audio track.
     */
    audioTrack?: IRemoteAudioTrack;
    /**
     * The subscribed video track.
     */
    videoTrack?: IRemoteVideoTrack;
    /**
     * Whether the remote user is sending an audio track.
     * - `true`: The remote user is sending an audio track.
     * - `false`: The remote user is not sending an audio track.
     */
    hasAudio: boolean;
    /**
     * Whether the remote user is sending a video track.
     * - `true`: The remote user is sending an audio track.
     * - `false`: The remote user is not sending an audio track.
     */
    hasVideo: boolean;
    /**
     * @ignore
     */
    dataChannels?: IRemoteDataChannel[];
}

/**
 * rtc 用户状态
 * @public
 */
export declare enum RtcUserState {
    /** RTC 用户加入了频道. */
    JOINED = "joined",
    /** RTC 用户离开了频道. */
    LEFT = "left",
    /** RTC 用户取消了发流. */
    UNPUBLISHED = "unpublished",
    /** RTC 用户发流了. */
    PUBLISHED = "published"
}

export { RtcVideoStats }

/**
 * 设置 SDK 的日志输出级别。
 *
 * 选择一个级别，你就可以看到在该级别及该级别以上所有级别的日志信息。
 * @param level - SDK 日志输出级别。按照输出日志最全到最少排列：
 * - 0: DEBUG。输出所有的 SDK 日志。
 * - 1: INFO。输出 INFO、WARNING 和 ERROR 级别的日志。
 * - 2: WARNING。输出 WARNING 和 ERROR 级别的日志。
 * - 3: ERROR。输出 ERROR 级别的日志。
 * - 4: NONE。不输出日志。
 *
 * 例如，如果你输入代码 `AgoraRTC.setLogLevel(1);`，就可以看到 INFO，WARNING 和 ERROR 级别的日志信息。
 * @category Logger
 */
export declare function setLogLevel(level: number): void;

/**
 * 新增指定配置  {@link VARIABLE_PARAMS}
 *
 * @param key - 配置名称, 联系 Agora 服务人员获取
 * @param value - 配置值
 */
export declare function setParameter(key: keyof typeof VARIABLE_PARAMS, value: any): void;

/**
 * 新增RTC指定配置
 *
 * @param key - RTC配置名称
 * @param value - 配置值
 */
export declare function setRTCParameter(key: string, value: any): void;

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
