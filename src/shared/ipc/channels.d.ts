const channelNames = [
    "exitApp",
    "minimizeWindow",
    "selectDirectory",
    "relaunchApp",
    "runCommand",
    "watchRepository",
] as const;
export type ChannelName = typeof channelNames[number];
