import AddSocialMediaCommand from "./commands/AddSocialMedia/AddSocialMedia";
import UpdateTimeCooldownCommand from "./commands/UpdateTimeCooldown/UpdateTimeCooldown";
import Command from "./common/models/Command";

export const Commands: Command[] = [
  UpdateTimeCooldownCommand,
  AddSocialMediaCommand,
];
