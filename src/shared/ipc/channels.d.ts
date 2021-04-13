const channelNames = ["exitApp", "minimizeWindow", "selectDirectory"] as const;
export type ChannelName = typeof channelNames[number];
