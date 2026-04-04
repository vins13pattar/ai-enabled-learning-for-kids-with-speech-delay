export type AgeBracket = "2-3" | "3-4" | "4-5" | "5-7";
export type OnboardingProfile = {
  completedAt: string;
  ageBracket: AgeBracket;
  languagesAtHome: string;
  therapyStatus: "none" | "waitlist" | "active" | "other";
  focusAreas: string;
  consentAccepted: boolean;
};

const KEY = "speech-practice-onboarding-v1";

export function loadOnboarding(): OnboardingProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OnboardingProfile;
  } catch {
    return null;
  }
}

export function saveOnboarding(profile: OnboardingProfile) {
  window.localStorage.setItem(KEY, JSON.stringify(profile));
}
