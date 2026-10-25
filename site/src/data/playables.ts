export type PlayableItem = {
  id: string;
  /** Visible game name on the card */
  game: string;
  file: string;
  cover: string;
};

/** Order matches the client brief — first 6 shown, rest behind View more. */
export const gamesPlayables: readonly PlayableItem[] = [
  {
    id: "bb-blitzy-runway",
    game: "Bingo Blitz",
    file: "/playables/BB_BlitzyRunway.html",
    cover: "/images/playables/bb.png",
  },
  {
    id: "sgh-snoopy",
    game: "Solitaire Grand Harvest",
    file: "/playables/SGH_Snoopy_Moloco.html",
    cover: "/images/playables/sgh.jpeg",
  },
  {
    id: "bf-merge-fiends",
    game: "Best Fiends",
    file: "/playables/BF_MergeFiends.html",
    cover: "/images/playables/bf.jpeg",
  },
  {
    id: "sm-balinko",
    game: "Slotomania",
    file: "/playables/SM_Balinko.html",
    cover: "/images/playables/sm.jpeg",
  },
  {
    id: "rdr",
    game: "Redecor",
    file: "/playables/RDR.html",
    cover: "/images/playables/rdr.jpeg",
  },
  {
    id: "wsop-all-in",
    game: "WSOP Poker",
    file: "/playables/WSOP_AllIn.html",
    cover: "/images/playables/wsop.webp",
  },
  {
    id: "bb-gameplay-6x2",
    game: "Bingo Blitz",
    file: "/playables/BB_Gameplay_6x2.html",
    cover: "/images/playables/bb.png",
  },
  {
    id: "bb-choose-your-room",
    game: "Bingo Blitz",
    file: "/playables/BB_ChooseYourRoom.html",
    cover: "/images/playables/bb.png",
  },
  {
    id: "bb-race",
    game: "Bingo Blitz",
    file: "/playables/BB_Race.html",
    cover: "/images/playables/bb.png",
  },
  {
    id: "bf-defeat-slug",
    game: "Best Fiends",
    file: "/playables/BF_DefeatSlug.html",
    cover: "/images/playables/bf.jpeg",
  },
  {
    id: "bf-simplified",
    game: "Best Fiends",
    file: "/playables/BF_SimplifiedGamePlay_Moloco.html",
    cover: "/images/playables/bf.jpeg",
  },
  {
    id: "hof-triple-magma",
    game: "House of Fun",
    file: "/playables/HOF_TripleMagma_Moloco.html",
    cover: "/images/playables/hof.jpeg",
  },
  {
    id: "hof-bank-of-jackpot",
    game: "House of Fun",
    file: "/playables/HOF_BankOfJackpot.html",
    cover: "/images/playables/hof.jpeg",
  },
  {
    id: "sgh-hungry-carrie",
    game: "Solitaire Grand Harvest",
    file: "/playables/SGH_HungryCarrie_Moloco.html",
    cover: "/images/playables/sgh.jpeg",
  },
] as const;

export const PLAYABLES_PREVIEW_COUNT = 6;
