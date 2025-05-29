export const expansions = [
  {
    code: "a1",
    name: "Genetic Apex",
    packs: ["Pikachu", "Charizard", "Mewtwo"],
  },
  { code: "a1a", name: "Mythical Island", packs: ["Mythical Island"] },
  { code: "a2", name: "Space-Time Smackdown", packs: ["Dialga", "Palkia"] },
  { code: "a2a", name: "Triumphant Light", packs: ["Triumphant Light"] },
  { code: "a2b", name: "Shining Revelry", packs: ["Shining Revelry"] },
  { code: "a3", name: "Celestial Guardians", packs: ["Solgaleo", "Lunala"] },
  { code: "promo", name: "Promo", packs: ["Promo-A"] },
];

export function typeColor(type) {
  let color;
  switch (type) {
    case "grass":
      color = "green";
      break;
    default:
      color = "black";
      break;
  }
  return color;
}

export function badgeColor(packName) {
  let color;
  switch (packName) {
    case "Pikachu":
      color = "yellow-7";
      break;
    case "Charizard":
      color = "red";
      break;
    case "Mewtwo":
      color = "purple";
      break;
    case "Mythical Island":
      color = "teal";
      break;
    case "Dialga":
      color = "blue";
      break;
    case "Palkia":
      color = "pink-6";
      break;
    case "Promo-A":
      color = "cyan";
      break;
    case "Triumphant Light":
      color = "orange";
      break;
    case "Shining Revelry":
      color = "green";
      break;
    case "Solgaleo":
      color = "amber";
      break;
    case "Lunala":
      color = "deep-purple";
      break;
    default:
      color = "white";
  }
  return color;
}

export function expansionName(expansionCode) {
  const expansion = expansions.find(
    (expInfo) => expInfo.code === expansionCode
  );
  return expansion ? expansion.name : expansionCode;
}
