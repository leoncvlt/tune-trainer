# `tunetrainer`
Split an audio tune into user-defined sections, to practice / loop individually with customizable playback speed.

## How to use
The app expects to find information on how to organize the different sections of a song in the `comment` field of the track's metadata. Add a line for each part of the song you wish to isolate, with this syntax:
```
[part name]@[start]-[end]
```
Where `[start]` and` [end]` are the start and end time of the part, either in seconds or as a time string: `90.5` and `1:30.5` both resolve to 90 and a half seconds. For example:

```
intro@00:01-00:25
intro riff@00:19-00:25
verse@00:25-00:50.5
verse 1@00:25-00:50.5
verse 2@00:51-01:16
chorus@01:16.5-01:41
solo@01:42-02:06
verse 3@02:07-02:32
ending@02:33-02:55
```

Then pick / drag and drop the file on the file picker in the application's main page, and the different song parts will initialize.

