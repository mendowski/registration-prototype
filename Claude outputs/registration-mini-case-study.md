HEALTH CARE · REGISTRATION · MINI CASE STUDY

# Cutting Teladoc Health sign-up in half

Signing up for Teladoc Health took about 31 questions, plus 20 more about medical history, before someone could even create an account. I created the templates, designs and patterns for a shorter flow, and worked with product and design to define it. The goal was a north star for registration that connects people quickly to the services their coverage offers, or to their options if they don't have coverage.

> **[IMAGE: Before/after]** The original 9-screen flow next to the new 6-screen flow.

| **~31 → ~15** | **+15%** | **9 → 6** | **0** |
|---|---|---|---|
| questions to enroll (not counting 20 medical history questions) | completed registrations | screens | accessibility bugs, built 100% on Anvil |

**Role:** Lead Product Designer, Pulse/Anvil design system · **Timeline:** 2025 · **Partners:** Product and design · **Platforms:** All Teladoc Health platforms · **Built with:** Anvil design system · **[Try the before and after prototype](/registration-prototype/index.html#before/1)**

---

## The problem

- **Too many questions up front.** People had to answer about 31 questions before they had an account, plus 20 about their medical history.
- **The wrong things in the way.** Flows that still mattered, like requesting a visit with a provider, sat inside sign-up and pulled people away from creating an account.
- **Nothing saved.** Progress wasn't saved, and people dropped off when they reached the medical profile. If they left, they had to start over.

---

## Key decisions

### 1. Create the account first

**Why:** Starting with the account lets us save progress as people go, so if they drop off, they can pick up where they left off. It also makes everything after it more personal, and gives new members a warmer welcome. Offering more than one way to sign up makes it easier to get in.

To get there, we moved or removed fields that didn't need to be in sign-up: address, security questions, preferred language and preferred phone number.

> **[IMAGE]** "Create your account" with the live password requirements.

### 2. Check coverage right away

**Why:** The goal was to connect people with the services their coverage includes, as fast as possible. The coverage check has two main paths: coverage found, which shows what their plan covers, and no coverage found. Each one branches into more paths depending on the member's situation, so the prototype shows the main flow.

> **[IMAGE]** "Here's what your plan covers," next to the no-coverage path.

### 3. Ask the rest only when it helps

**Why:** The remaining questions now come after people can see their value, in a "Complete account setup" step: address, sex assigned at birth and phone number. This step helps us understand their needs and is the first step in finding all of their coverage.

> **[IMAGE]** The "Complete account setup" screen.

### 4. Build it entirely on Anvil

**Why:** Using only design system components and tokens kept the flow consistent across platforms and accessible by default. The prototype itself is built live with Anvil components, so the fields really work.

---

## Outcomes

- **About half the questions:** from ~31 to ~15 to enroll.
- **15% more completed registrations.** Members could finish sign-up without dropping off, and if they left and came back, their progress was saved.
- **9 screens down to 6.**
- **Zero accessibility bugs,** using Anvil components 100%.

---

> **[CALLOUT: same style as "By the numbers"]**
>
> TRY IT
>
> ### Click through before and after
>
> The prototype shows the original 9-screen flow as screenshots, and the redesigned 6-screen flow built live with Anvil components, tokens and illustrations. Switch between **Before** and **After** at the top, and tap each screen's main button to move forward. In the redesign, the fields work, so try typing a password to see the requirements update.
>
> [Open the prototype](/registration-prototype/index.html#before/1)
