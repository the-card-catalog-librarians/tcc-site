This document is a collection of notes and best practices for this website

## Librarians In The News

### Audio Player
If the default embed code for a podcast is modern and good-looking, just use that iframe and tag the md file with the podcast field (use the share url for the podcast). If the embed is really ugly (like old jquery stuff), extract the mp3 url and pass it to the tracks field instead. Example:

```yml
tracks: [{id: "1", url: "https://traffic.libsyn.com/secure/force-cdn/highwinds/colsoncenter/TP_-_Colson_Fellow_Starts_Library.mp3", title: "A Better Kind of Library"}]
```
That will render a ts-based audio player with nice defaults.