const channelNames = [
    "exitApp",
    "minimizeWindow",
    "selectDirectory",
    "relaunchApp",
    "runCommand",
] as const;
export type ChannelName = typeof channelNames[number];
