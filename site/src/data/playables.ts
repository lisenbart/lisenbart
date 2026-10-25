export type PlayableItem = {
  id: string;
  /** Visible game name on the card */
  game: string;
  file: string;
  cover: string;
};

/** Order matches the client brief. Covers are stills extracted from each playable. */
export const gamesPlayables: readonly PlayableItem[] = [
  {
    id: "bb-blitzy-runway",
    game: "Bingo Blitz",
    file: "/playables/BB_BlitzyRunway.html",
    cover: "/images/playables/thumbs/BB_BlitzyRunway.jpg",
  },
  {
    id: "sgh-snoopy",
    game: "Solitaire Grand Harvest",
    file: "/playables/SGH_Snoopy_Moloco.html",
    cover: "/images/playables/thumbs/SGH_Snoopy_Moloco.jpg",
  },
  {
    id: "bf-merge-fiends",
    game: "Best Fiends",
    file: "/playables/BF_MergeFiends.html",
    cover: "/images/playables/thumbs/BF_MergeFiends.jpg",
  },
  {
    id: "sm-balinko",
    game: "Slotomania",
    file: "/playables/SM_Balinko.html",
    cover: "/images/playables/thumbs/SM_Balinko.jpg",
  },
  {
    id: "rdr",
    game: "Redecor",
    file: "/playables/RDR.html",
    cover: "/images/playables/thumbs/RDR.jpg",
  },
  {
    id: "wsop-all-in",
    game: "WSOP Poker",
    file: "/playables/WSOP_AllIn.html",
    cover: "/images/playables/thumbs/WSOP_AllIn.jpg",
  },
  {
    id: "bb-gameplay-6x2",
    game: "Bingo Blitz",
    file: "/playables/BB_Gameplay_6x2.html",
    cover: "/images/playables/thumbs/BB_Gameplay_6x2.jpg",
  },
  {
    id: "bb-choose-your-room",
    game: "Bingo Blitz",
    file: "/playables/BB_ChooseYourRoom.html",
    cover: "/images/playables/thumbs/BB_ChooseYourRoom.jpg",
  },
  {
    id: "bb-race",
    game: "Bingo Blitz",
    file: "/playables/BB_Race.html",
    cover: "/images/playables/thumbs/BB_Race.jpg",
  },
  {
    id: "bf-defeat-slug",
    game: "Best Fiends",
    file: "/playables/BF_DefeatSlug.html",
    cover: "/images/playables/thumbs/BF_DefeatSlug.jpg",
  },
  {
    id: "bf-simplified",
    game: "Best Fiends",
    file: "/playables/BF_SimplifiedGamePlay_Moloco.html",
    cover: "/images/playables/thumbs/BF_SimplifiedGamePlay_Moloco.jpg",
  },
  {
    id: "hof-triple-magma",
    game: "House of Fun",
    file: "/playables/HOF_TripleMagma_Moloco.html",
    cover: "/images/playables/thumbs/HOF_TripleMagma_Moloco.jpg",
  },
  {
    id: "hof-bank-of-jackpot",
    game: "House of Fun",
    file: "/playables/HOF_BankOfJackpot.html",
    cover: "/images/playables/thumbs/HOF_BankOfJackpot.jpg",
  },
  {
    id: "sgh-hungry-carrie",
    game: "Solitaire Grand Harvest",
    file: "/playables/SGH_HungryCarrie_Moloco.html",
    cover: "/images/playables/thumbs/SGH_HungryCarrie_Moloco.jpg",
  },
] as const;
