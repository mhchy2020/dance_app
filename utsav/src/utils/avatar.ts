import { Style, Avatar } from "@dicebear/core";
import adventurer from "@dicebear/styles/adventurer.json" with { type: "json" };
import clay from "@dicebear/styles/clay.json" with { type: "json" };
import { useMemo } from "react";

export function avatar() {
  const claySeeds = [
    "Alice",
    "Bob",
    "Charlie",
    "Daniel",
    "Ethan",
    "Feliz",
    "Gunther",
    "Helly",
  ];

  const adventureSeeds = [
    "India",
    "Jackson",
    "Kent",
    "Linda",
    "Max",
    "Neptune",
    "Orange",
    "Patrick",
    ];
    
    const avatarSize = 70;

  const clayStyle = new Style(clay);
  const adventureStyle = new Style(adventurer);

  //   const clayAvatars = claySeeds.map((seed) => {
  //     return new Avatar(clayStyle, {
  //       seed,
  //       size: 80,
  //     }).toString();
  //   });

  //   const adventureAvatar = adventureSeeds.map((seed) => {
  //     return new Avatar(adventureStyle, {
  //       seed,
  //       size: 80,
  //     }).toString();
  //   });

  const clayAvatars = useMemo(
    () =>
      claySeeds.map((seed) => {
        return new Avatar(clayStyle, {
          seed,
          size: avatarSize,
          borderRadius: 20,
        }).toString();
      }),
    [claySeeds],
  );

  const adventureAvatar = useMemo(
    () =>
      adventureSeeds.map((seed) => {
        return new Avatar(adventureStyle, {
          seed,
          size: avatarSize,
        }).toString();
      }),
    [adventureSeeds],
  );

  const avatars = [...clayAvatars, ...adventureAvatar];

  return avatars;
}
