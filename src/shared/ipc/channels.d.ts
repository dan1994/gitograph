const channelNames = [
    "exitApp",
    "minimizeWindow",
    "selectDirectory",
    "runCommand",
] as const;
export type ChannelName = typeof channelNames[number];
