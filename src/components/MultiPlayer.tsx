import { type Track } from "@/lib/playback-engine";
import {
    AudioPlayer,
    AudioPlayerControlBar,
    AudioPlayerControlGroup,
    AudioPlayerPlay,
    AudioPlayerSeekBar,
    AudioPlayerSkipBack,
    AudioPlayerSkipForward,
    AudioPlayerTimeDisplay,
    AudioPlayerVolume,
    AudioTrackList,
} from "./player";


export function MultiPlayer({ tracks, title }: { tracks: Track[], title: string }) {
    return (
        <AudioPlayer tracks={tracks}>
            <div className="">
                <h2>{title}</h2>
                <AudioTrackList actions="play-pause" className="p-4" />
            </div>
        </AudioPlayer>
    );
}
export function Player({ tracks }: { tracks: Track[] }) {
    return (
        <div className="pt-4">
            <AudioPlayer tracks={tracks}>
                <AudioPlayerControlBar variant="stacked">
                    <AudioPlayerControlGroup>
                        <AudioPlayerTimeDisplay />
                        <AudioPlayerSeekBar />
                        <AudioPlayerTimeDisplay remaining />
                    </AudioPlayerControlGroup>
                    <AudioPlayerControlGroup>
                        <AudioPlayerControlGroup className="justify-between md:justify-start">
                            <AudioPlayerSkipBack />
                            <AudioPlayerPlay />
                            <AudioPlayerSkipForward />
                        </AudioPlayerControlGroup>
                        <AudioPlayerVolume />
                    </AudioPlayerControlGroup>
                </AudioPlayerControlBar>
            </AudioPlayer>
        </div>
    );
}