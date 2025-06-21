export const reasons = [
  "Good vibes, questionable memes always.",
  "Stress-baking is a legit skill.",
  "Brain cells optional. Vibes mandatory.",
  "No egos, just collective delusion.",
  "Bad ideas, welcome. Great ideas, mandatory.",
  "Our energy? Main character.",
  "Every day is a soft launch.",
  "Not everyone gets it. But your audience will.",
  "The only thing we ghost is bad design.",
  "No brief? No problem. We'll manifest it.",
  "Feedback fuels us. So does iced coffee.",
  "We design. We deliver. We overshare memes.",
  "Strategy? Served with a side of sarcasm.",
  "We turn \"???\" into \"!!!\"",
  "Office hours are a myth. Creativity isn't.",
  "Just here to cause creative chaos (on purpose).",
  "We don't do boring. Ever.",
  "Vibes curated. Campaigns handcrafted.",
  "Professional overthinkers, passionate doers.",
  "Your audience scrolls. We make them stop.",
  "Results are real. So are the breakdowns.",
  "Our KPIs? Kinda Perfect Ideas.",
  "We build brands that flirt with your feed.",
  "Creating the stuff you double tap without thinking.",
  "Aesthetic? Check. Analytics? Also check.",
  "We believe in first drafts and fourth coffees.",
  "Chaos with context. That's the formula.",
  "Quirky? Yes. Strategic? Absolutely.",
  "Where \"just vibes\" becomes brand strategy.",
  "Meme dealers. Market disruptors. Moodboard magicians.",
  "Giving you 110%, 12 slides, and 43 file names.",
  "Powered by passion and last-minute panic.",
  "If you're not weird, we'll fix that."
];

export const getRandomReason = (): string => {
  const randomIndex = Math.floor(Math.random() * reasons.length);
  return reasons[randomIndex];
}; 