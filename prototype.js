/* Registration prototype
   Before: screenshots from /before with a clickable hotspot on each primary button.
   After:  screens built live with Anvil components (window.Anvil), loaded from
           https://mendowski.github.io/anvil-design-system/ */

(function () {
  "use strict";
  var h = React.createElement;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  var A = window.Anvil;

  if (!A) {
    document.getElementById("app").innerHTML =
      '<p style="padding:24px;font-family:sans-serif">The Anvil design system didn’t load. Check your connection and refresh.</p>';
    return;
  }

  /* ------------------------------------------------------------------
     BEFORE flow
     Each screen: image file, title, image size (w, h) and the primary
     button's box in image pixels [left, top, right, bottom].
     The back chevron sits in the same place on screens 2-8.
     ------------------------------------------------------------------ */
  var BACK = [50, 80, 150, 180];
  var BEFORE = [
    { file: "000-old-teladoc.png", title: "Let’s get started",            w: 790, h: 2372, cta: [42, 1836, 757, 1947], back: false },
    { file: "001-old-teladoc.png", title: "Here’s your coverage",         w: 780, h: 1624, cta: [32, 844, 717, 955] },
    { file: "002-old-teladoc.png", title: "Add your coverage",            w: 780, h: 1624, cta: [32, 964, 747, 1075] },
    { file: "003-old-teladoc.png", title: "Add account details",          w: 780, h: 5640, cta: [32, 5168, 747, 5278] },
    { file: "004-old-teladoc.png", title: "You have options",             w: 780, h: 2908, cta: [43, 1668, 737, 1763] },
    { file: "005-old-teladoc.png", title: "Getting to know you",          w: 780, h: 2744, cta: [32, 2288, 747, 2383] },
    { file: "006-old-teladoc.png", title: "What’s your registration code?", w: 780, h: 1624, cta: [32, 900, 747, 995] },
    { file: "007-old-teladoc.png", title: "Are you ready to get care?",   w: 780, h: 1708, cta: [32, 764, 747, 859] },
    { file: "009-old-teladoc.png", title: "Home",                         w: 780, h: 9222, cta: null, back: false }
  ];

  /* ------------------------------------------------------------------
     Small building blocks
     ------------------------------------------------------------------ */
  function StatusBar() {
    return h("div", { className: "status", "aria-hidden": "true" },
      h("span", null, "9:41"),
      h("svg", { width: 72, height: 14, viewBox: "0 0 72 14", fill: "currentColor" },
        // signal
        h("rect", { x: 0, y: 9, width: 3, height: 4, rx: 1 }),
        h("rect", { x: 5, y: 6.5, width: 3, height: 6.5, rx: 1 }),
        h("rect", { x: 10, y: 4, width: 3, height: 9, rx: 1 }),
        h("rect", { x: 15, y: 1, width: 3, height: 12, rx: 1 }),
        // wifi
        h("path", { d: "M30 3.2a10 10 0 0 1 13 0l-1.4 1.5a8 8 0 0 0-10.2 0zM32.4 5.9a6.4 6.4 0 0 1 8.2 0l-1.4 1.5a4.4 4.4 0 0 0-5.4 0zM34.8 8.6a2.8 2.8 0 0 1 3.4 0L36.5 10.4z" }),
        // battery
        h("rect", { x: 46.5, y: 1.5, width: 22, height: 11, rx: 3.5, fill: "none", stroke: "currentColor", opacity: .4 }),
        h("rect", { x: 48.5, y: 3.5, width: 18, height: 7, rx: 2 }),
        h("rect", { x: 69.5, y: 5, width: 1.6, height: 4, rx: .8, opacity: .4 })));
  }

  function TopBar(props) {
    return h("div", { className: "as-top" },
      props.onBack ? h(A.IconButton, { icon: "arrow-left", label: "Back", onClick: props.onBack }) : null);
  }

  function Required() {
    return h("p", { className: "body-small-default req" }, "*Required");
  }

  // Select, built from Anvil's field and input styles (Anvil has no Select component yet).
  var selectId = 0;
  function Select(props) {
    var idRef = useRef("sel-" + (++selectId));
    var st = useState(props.defaultValue || "");
    var value = st[0], setValue = st[1];
    var control = h("div", { className: "anvil-input select" + (value ? "" : " is-placeholder") },
      h("select", {
        id: idRef.current, className: "anvil-input__native", value: value,
        "aria-label": props.label ? undefined : props.ariaLabel,
        onChange: function (e) { setValue(e.target.value); }
      },
        h("option", { value: "", disabled: true }, props.placeholder || "Select"),
        props.options.map(function (o) { return h("option", { key: o, value: o }, o); })),
      h("span", { className: "anvil-input__icon" }, h(A.Icon, { name: "caret-down" })));
    if (!props.label) return control;
    return h("div", { className: "anvil-field" },
      h("div", { className: "anvil-field__labels" },
        h("label", { className: "anvil-field__label", htmlFor: idRef.current }, props.label),
        props.helper ? h("span", { className: "anvil-field__helper" }, props.helper) : null),
      control);
  }

  function Foot(props) {
    return h("div", { className: "as-foot" + (props.sticky ? " as-foot--sticky" : "") }, props.children);
  }

  function Primary(props) {
    return h(A.Button, { variant: "primary", className: "full", onClick: props.onClick }, props.children);
  }

  function Link(props) {
    return h("a", { href: "#", onClick: function (e) { e.preventDefault(); } }, props.children);
  }

  // Card spot image: the Card draws the circle, so pass only the artwork URL.
  // The circle color comes from a spot-* class (see prototype.css).
  function cardSpot(name) {
    return { type: "spot", src: A.Illustration.url("spot", name), alt: "" };
  }

  /* ------------------------------------------------------------------
     AFTER screens
     ------------------------------------------------------------------ */
  var STATES = ["Alabama", "Alaska", "Arizona", "California", "Colorado", "Connecticut", "Florida", "Georgia", "Illinois", "Massachusetts", "New York", "Texas", "Washington"];

  function CreateAccount(p) {
    return h("div", { className: "as-body" },
      h("h1", { className: "heading-title as-title", style: { marginTop: 40 } }, "Create your account"),
      h("div", { className: "form", style: { marginTop: 24 } },
        h("div", null, h(Required), h(A.TextInput, { label: "Email*", type: "email", autoComplete: "email", inputMode: "email" })),
        h(A.PasswordInput, { label: "Password*", mode: "create", defaultValue: "Sunshine2026", excludeWords: ["maya"] }),
        h(A.Checkbox, null,
          "By continuing you agree to ", h(Link, null, "Teladoc’s Notice of Privacy Practices"), ", ",
          h(Link, null, "Terms of Service"), " and ",
          h(Link, null, "Notice of Nondiscrimination and Language Assistance"), ".*")),
      h(Foot, null,
        h("p", { className: "body-default center" }, "Already have an account? ", h(Link, null, "Sign in")),
        h(Primary, { onClick: p.next }, "Next")));
  }

  function VerifyEmail(p) {
    return h(React.Fragment, null,
      h(TopBar, { onBack: p.back }),
      h("div", { className: "as-body" },
        h("h1", { className: "heading-title as-title" }, "Verify your email"),
        h("p", { className: "body-default as-lede" }, "Activate your account by entering the six-digit code we sent to ", h("strong", null, "maya390@gmail.com"), "."),
        h(Required),
        h(A.TextInput, { label: "Verification code*", inputMode: "numeric", autoComplete: "one-time-code" }),
        h("p", { className: "body-default", style: { marginTop: 16 } }, "Didn’t receive a code? ", h(A.Button, { variant: "tertiary" }, "Send again")),
        h(Foot, null,
          h("p", { className: "body-default center" }, "Need help? Call us at ", h("a", { href: "tel:8008352362" }, "800-835-2362"), "."),
          h(Primary, { onClick: p.next }, "Verify"))));
  }

  function AboutYou(p) {
    return h(React.Fragment, null,
      h(TopBar, { onBack: p.back }),
      h("div", { className: "as-body" },
        h("h1", { className: "heading-title as-title" }, "Tell us about yourself"),
        h("p", { className: "body-default as-lede" }, "This information helps us find your coverage."),
        h(Required),
        h("div", { className: "form" },
          h(A.TextInput, { label: "Legal first name*", autoComplete: "given-name" }),
          h(A.TextInput, { label: "Legal last name*", autoComplete: "family-name" }),
          h(A.TextInput, { label: "Date of birth*", helper: "MM/DD/YYYY", inputMode: "numeric", autoComplete: "bday" }),
          h(Select, { label: "Country*", defaultValue: "United States of America", options: ["United States of America", "Canada", "Mexico"] }),
          h(A.TextInput, { label: "ZIP code*", helper: "01234 or 01234-6789", inputMode: "numeric", autoComplete: "postal-code" }),
          h(A.Checkbox, { label: "(Optional) I received a Teladoc Health code." })),
        h(Foot, null, h(Primary, { onClick: p.next }, "Next"))));
  }

  function PlanCard(name, title, body, needsQualifying, bg) {
    return h(A.Card, {
      key: title, header: title, headerAs: "h3",
      className: bg ? "spot-" + bg : undefined,
      image: cardSpot(name)
    },
      h("p", { className: "body-default" }, body),
      needsQualifying ? h("span", { className: "tag" }, "Qualification required") : null);
  }

  function PlanCovers(p) {
    return h(React.Fragment, null,
      h(TopBar, { onBack: p.back }),
      h("div", { className: "as-body" },
        h("h1", { className: "heading-title as-title" }, "Here’s what your plan covers"),
        h("p", { className: "body-default as-lede" }, "These are covered by ", h("strong", null, "Aetna"), ".", h("br"), h(Link, null, "Not the right coverage?")),
        h("h2", { className: "heading-heading-2 section-title" }, "Condition Management"),
        h("div", { className: "stack" },
          PlanCard("diabetes-management", "Diabetes Management", "Get a blood sugar meter, unlimited strips and lancets, tips based on your trends and 24/7 support.", true),
          PlanCard("weight-management-wm2000", "Weight Management", "Get a smart scale, a personal coach and tools for tracking food and activity.", true),
          PlanCard("hypertension-management-htn", "Hypertension Management", "Get a blood pressure monitor, tips based on your trends and detailed health reports.", true)),
        h("h2", { className: "heading-heading-2 section-title" }, "More care options"),
        h("div", { className: "stack" },
          PlanCard("doctor-1", "Primary Care", "Meet with a primary care provider for health concerns, ongoing support, annual checkups, lab orders and referrals.", false, "aqua"),
          PlanCard("doctor-2", "24/7 Care", "Meet with a care provider as soon as possible for non-emergency needs such as sinus infections and colds.", false, "berry"),
          PlanCard("mental-health", "Mental Health", "Get personalized support for stress, anxiety, depression and more from a therapist or psychiatrist.", false, "green")),
        h(Foot, { sticky: true }, h(Primary, { onClick: p.next }, "Next"))));
  }

  function AccountSetup(p) {
    return h(React.Fragment, null,
      h(TopBar, { onBack: p.back }),
      h("div", { className: "as-body" },
        h("h1", { className: "heading-title as-title" }, "Complete account setup"),
        h("p", { className: "body-default as-lede" }, "Check your info and add anything missing."),
        h(Required),
        h("div", { className: "form" },
          h(A.TextInput, { label: "Address*", defaultValue: "1234 Nowhere Lane", autoComplete: "address-line1" }),
          h(A.TextInput, { label: "Apartment, suite, etc.", defaultValue: "Suite 22", autoComplete: "address-line2" }),
          h("div", { className: "row-2" },
            h(A.TextInput, { label: "City*", defaultValue: "Riverside", autoComplete: "address-level2" }),
            h(Select, { label: "State*", options: STATES })),
          h(A.TextInput, { label: "ZIP code*", helper: "Format: 01234 or 01234-6789", defaultValue: "06830", inputMode: "numeric" }),
          h(Select, { label: "Sex assigned at birth*", options: ["Female", "Male", "Intersex", "Prefer not to say"] }),
          h("div", { className: "anvil-field" },
            h("div", { className: "anvil-field__labels" },
              h("label", { className: "anvil-field__label", htmlFor: "mobile" }, "Mobile number*")),
            h("div", { className: "phone-row" },
              h(Select, { ariaLabel: "Country code", defaultValue: "🇺🇸 +1", options: ["🇺🇸 +1", "🇨🇦 +1", "🇲🇽 +52"] }),
              h("div", { className: "anvil-input" },
                h("input", { id: "mobile", className: "anvil-input__native", type: "tel", inputMode: "tel", autoComplete: "tel-national" })))),
          h(A.Checkbox, { label: "(Optional) I agree to receive marketing calls and texts from Teladoc Health using an autodialer or prerecorded/artificial voice at the number I’ve provided. Consent is not required for services. I can reply STOP to opt out anytime. Message and data rates may apply." })),
        h(Foot, null, h(Primary, { onClick: p.next }, "Complete account setup"))));
  }

  function Task(name, label, bg) {
    return h("button", { key: label, className: "task", type: "button" },
      h(A.Illustration, { name: name, background: bg || "purple-subdued", size: 64, alt: "" }),
      h("span", null, label),
      h(A.Icon, { name: "arrow-right", size: 16 }));
  }

  function Home() {
    var tabs = [
      { icon: "home", label: "Home", current: true },
      { icon: "programs", label: "Programs" },
      { icon: "health-info", label: "Health info" },
      { icon: "chat", label: "Messages" },
      { icon: "profile", label: "Account" }
    ];
    return h(React.Fragment, null,
      h("div", { className: "home-top" },
        h(A.IconButton, { icon: "profile", label: "Profile" }),
        h(A.IconButton, { icon: "mail", label: "Messages", badge: 2 }),
        h("span", { className: "spacer" }),
        h(A.Button, { variant: "primary" }, "Get care")),
      h("div", { className: "as-body", style: { paddingTop: 8 } },
        h("div", { className: "home-sec" },
          h("h2", { className: "heading-heading-2" }, "Next steps"),
          h(A.Button, { variant: "tertiary" }, "View all")),
        h("div", { className: "stack", style: { gap: 12 } },
          Task("nutrition", "Schedule a nutrition visit", "green-subdued"),
          Task("doctor-1", "Schedule a primary care visit"),
          Task("cardio-and-strength", "Exercise for 30 minutes")),
        h("div", { className: "home-sec" }, h("h2", { className: "heading-heading-2" }, "Care options")),
        h("div", { className: "stack" },
          h(A.Card, {
            eyebrow: "Formerly Livongo", header: "Condition Management", headerAs: "h3",
            image: cardSpot("condition-management"),
            footer: h(A.Button, { variant: "secondary" }, "Explore programs")
          },
            h("p", { className: "body-default" }, "Personalized programs including:"),
            h("ul", { className: "bullets body-default" },
              h("li", null, "Help managing diabetes, blood pressure and weight"),
              h("li", null, "Connected devices that sync your readings"),
              h("li", null, "One-on-one coaching"))),
          h(A.Card, {
            header: "Primary Care", headerAs: "h3",
            className: "spot-aqua",
            image: cardSpot("primary-care"),
            footer: h(A.Button, { variant: "secondary" }, "Schedule a visit")
          }, h("p", { className: "body-default" }, "Your provider: Dr. April Gonzalez. Video or phone visits, usually within a few days.")))),
      h("nav", { className: "tabbar", "aria-label": "App" },
        tabs.map(function (t) {
          return h("a", { key: t.label, href: "#", "aria-current": t.current ? "page" : undefined, onClick: function (e) { e.preventDefault(); } },
            h(A.Icon, { name: t.icon, size: 24, variant: t.current ? "active" : "default" }),
            t.label);
        })));
  }

  var AFTER = [
    { title: "Create your account", render: CreateAccount },
    { title: "Verify your email", render: VerifyEmail },
    { title: "Tell us about yourself", render: AboutYou },
    { title: "Here’s what your plan covers", render: PlanCovers },
    { title: "Complete account setup", render: AccountSetup },
    { title: "Home", render: Home }
  ];

  /* ------------------------------------------------------------------
     Screens in the phone
     ------------------------------------------------------------------ */
  function pct(v, total) { return (v / total * 100) + "%"; }

  function BeforeScreen(props) {
    var s = props.screen;
    var rv = useState(false), reveal = rv[0], setReveal = rv[1];
    useEffect(function () {
      if (!reveal) return;
      var t = setTimeout(function () { setReveal(false); }, 1000);
      return function () { clearTimeout(t); };
    }, [reveal]);

    function box(b) {
      return { left: pct(b[0], s.w), top: pct(b[1], s.h), width: pct(b[2] - b[0], s.w), height: pct(b[3] - b[1], s.h) };
    }
    return h("div", {
      className: "shot" + (reveal ? " reveal" : ""),
      onClick: function (e) { if (!e.target.closest(".hotspot")) setReveal(true); }
    },
      h("img", { src: "before/" + s.file, alt: "Old design: " + s.title, width: s.w, height: s.h, draggable: false }),
      s.cta ? h("button", { className: "hotspot", style: box(s.cta), "aria-label": "Next screen", onClick: props.next }) : null,
      s.back !== false && props.back ? h("button", { className: "hotspot", style: box(BACK), "aria-label": "Previous screen", onClick: props.back }) : null);
  }

  function AfterScreen(props) {
    return h("div", { className: "as" }, h(StatusBar), h(props.screen.render, { next: props.next, back: props.back }));
  }

  /* ------------------------------------------------------------------
     Page
     ------------------------------------------------------------------ */
  function readHash() {
    var m = /^#(before|after)(?:\/(\d+))?$/.exec(location.hash);
    if (!m) return null;
    return { mode: m[1], index: Math.max(0, (parseInt(m[2] || "1", 10) || 1) - 1) };
  }


  /* ------------------------------------------------------------------
     Mini case study, shown under the prototype
     ------------------------------------------------------------------ */
  var STATS = [
    { n: "~31 → ~15", l: "questions to enroll, not counting 20 medical history questions" },
    { n: "+15%", l: "completed registrations" },
    { n: "9 → 6", l: "screens" },
    { n: "0", l: "accessibility bugs, built 100% on Anvil" }
  ];
  var DECISIONS = [
    { t: "Create the account first",
      p: ["Starting with the account lets us save progress as people go, so if they drop off, they can pick up where they left off. It also makes everything after it more personal, and gives new members a warmer welcome. Offering more than one way to sign up makes it easier to get in.",
          "To get there, we moved or removed fields that didn’t need to be in sign-up: address, security questions, preferred language and preferred phone number."],
      screen: 1 },
    { t: "Check coverage right away",
      p: ["The goal was to connect people with the services their coverage includes, as fast as possible. The coverage check has two main paths: coverage found, which shows what their plan covers, and no coverage found. Each one branches into more paths depending on the member’s situation, so the prototype shows the main flow."],
      screen: 4 },
    { t: "Ask the rest only when it helps",
      p: ["The remaining questions now come after people can see their value, in a “Complete account setup” step: address, sex assigned at birth and phone number. This step helps us understand their needs and is the first step in finding all of their coverage."],
      screen: 5 },
    { t: "Build it entirely on Anvil",
      p: ["Using only design system components and tokens kept the flow consistent across platforms and accessible by default. This prototype is built the same way, live with Anvil components, so the fields really work."],
      screen: null }
  ];

  function CaseStudy(props) {
    return h("article", { className: "case", "aria-labelledby": "case-title" },
      h("header", { className: "case-head" },
        h("p", { className: "heading-eyebrow case-eyebrow" }, "Mini case study"),
        h("h2", { id: "case-title", className: "heading-heading-1 case-h" }, "Cutting sign-up in half"),
        h("p", { className: "body-default case-lede" },
          "Signing up took about 31 questions, plus 20 more about medical history, before someone could even create an account. I created the templates, designs and patterns for a shorter flow, and worked with product and design to define it. The goal was a north star for registration that connects people quickly to the services their coverage offers, or to their options if they don’t have coverage."),
        h("p", { className: "body-small-default case-meta" },
          h("strong", null, "Role: "), "Lead Product Designer, Pulse/Anvil design system · ",
          h("strong", null, "Timeline: "), "2025 · ",
          h("strong", null, "Partners: "), "Product and design · ",
          h("strong", null, "Built with: "), "Anvil design system")),

      h("ul", { className: "case-stats" },
        STATS.map(function (s, n) {
          return h("li", { key: n, className: "case-stat" },
            h("span", { className: "case-num" }, s.n),
            h("span", { className: "body-small-default case-label" }, s.l));
        })),

      h("section", { className: "case-sec" },
        h("h3", { className: "heading-heading-2 case-h" }, "The problem"),
        h("ul", { className: "case-list body-default" },
          h("li", null, h("strong", null, "Too many questions up front. "), "People had to answer about 31 questions before they had an account, plus 20 about their medical history."),
          h("li", null, h("strong", null, "The wrong things in the way. "), "Flows that still mattered, like requesting a visit with a provider, sat inside sign-up and pulled people away from creating an account."),
          h("li", null, h("strong", null, "Nothing saved. "), "Progress wasn’t saved, and people dropped off when they reached the medical profile. If they left, they had to start over."))),

      h("section", { className: "case-sec" },
        h("h3", { className: "heading-heading-2 case-h" }, "Key decisions"),
        h("ol", { className: "case-decisions" },
          DECISIONS.map(function (d, n) {
            return h("li", { key: n, className: "case-decision" },
              h("h4", { className: "heading-heading-3 case-h" }, (n + 1) + ". " + d.t),
              d.p.map(function (t, k) { return h("p", { key: k, className: "body-default" }, t); }),
              d.screen ? h("p", { className: "body-small-default" },
                h("a", { href: "#after/" + d.screen, onClick: props.onShow }, "See it in the prototype ↑")) : null);
          }))),

      h("section", { className: "case-callout" },
        h("p", { className: "heading-eyebrow case-eyebrow" }, "By the numbers"),
        h("h3", { className: "case-callout-h" }, "+15% completed registrations"),
        h("p", { className: "body-default" }, "Members could finish sign-up without dropping off, and if they left and came back, their progress was saved. Sign-up went from about 31 questions to about 15, and from 9 screens to 6, with zero accessibility bugs.")));
  }

  function App() {
    var start = readHash() || { mode: "before", index: 0 };
    var ms = useState(start.mode), mode = ms[0], setMode = ms[1];
    var ps = useState({ before: start.mode === "before" ? start.index : 0, after: start.mode === "after" ? start.index : 0 });
    var pos = ps[0], setPos = ps[1];
    var screenRef = useRef(null);

    var flow = mode === "before" ? BEFORE : AFTER;
    var i = Math.min(pos[mode], flow.length - 1);
    var last = i === flow.length - 1;

    function go(n) {
      n = Math.max(0, Math.min(flow.length - 1, n));
      var next = Object.assign({}, pos); next[mode] = n; setPos(next);
    }
    function switchTo(m) { setMode(m); }

    // Keep the URL in sync so you can link straight to a screen, e.g. #after/3
    useEffect(function () {
      var hash = "#" + mode + "/" + (i + 1);
      if (location.hash !== hash) history.replaceState(null, "", hash);
      if (screenRef.current) screenRef.current.scrollTop = 0;
    }, [mode, i]);

    useEffect(function () {
      function onHash() { var r = readHash(); if (r) { setMode(r.mode); setPos(function (p) { var n = Object.assign({}, p); n[r.mode] = r.index; return n; }); } }
      function onKey(e) {
        if (e.target.closest && e.target.closest("input, select, textarea")) return;
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }
      window.addEventListener("hashchange", onHash);
      window.addEventListener("keydown", onKey);
      return function () { window.removeEventListener("hashchange", onHash); window.removeEventListener("keydown", onKey); };
    });

    var screenProps = { next: last ? null : function () { go(i + 1); }, back: i > 0 ? function () { go(i - 1); } : null };
    var screen = mode === "before"
      ? h(BeforeScreen, Object.assign({ key: "b" + i, screen: flow[i] }, screenProps))
      : h(AfterScreen, Object.assign({ key: "a" + i, screen: flow[i] }, screenProps));

    return h("main", { className: "page" },
      h("header", { className: "intro" },
        h("p", { className: "heading-eyebrow" }, "Teladoc Health · Registration · Mini case study"),
        h("h1", { className: "heading-title" }, "Registration, before and after Anvil"),
        h("p", { className: "body-default" }, "Click through the original sign-up flow, then switch to the redesign built with the Anvil design system. Tap each screen’s main button to move forward. The story behind it is below.")),

      h("div", { className: "stage" },
        h("section", { className: "panel panel--left", "aria-label": "Version" },
          h("div", { className: "switch", role: "group", "aria-label": "Version" },
            h("button", { type: "button", "aria-pressed": mode === "before", onClick: function () { switchTo("before"); } }, "Before", h("small", null, "Original")),
            h("button", { type: "button", "aria-pressed": mode === "after", onClick: function () { switchTo("after"); } }, "After", h("small", null, "Anvil"))),
          h("p", { className: "body-small-default about" }, mode === "before"
            ? "The original flow: " + BEFORE.length + " screens, shown as screenshots. Click anywhere to see where to tap."
            : "The redesign: " + AFTER.length + " screens, built live with Anvil components, tokens and illustrations. The fields work, so try typing a password.")),

        h("div", { className: "device" },
          h("div", { className: "phone" },
            h("div", { className: "screen", ref: screenRef, tabIndex: -1 }, screen)),
          h("div", { className: "nav-row" },
            h(A.Button, { variant: "tertiary", icon: "left", iconName: "arrow-left", disabled: i === 0, onClick: function () { go(i - 1); } }, "Previous"),
            h("span", { className: "counter", "aria-live": "polite" }, (i + 1) + " of " + flow.length),
            last
              ? h(A.Button, { variant: "tertiary", icon: "right", iconName: "reload", onClick: function () { go(0); } }, "Start over")
              : h(A.Button, { variant: "tertiary", icon: "right", iconName: "arrow-right", onClick: function () { go(i + 1); } }, "Next"))),

        h("nav", { className: "panel panel--right", "aria-label": "Screens" },
          h("div", null,
            h("p", { className: "heading-sections panel-label" }, mode === "before" ? "Original screens" : "Redesigned screens"),
            h("ol", { className: "steps" },
              flow.map(function (s, n) {
                return h("li", { key: n },
                  h("button", { type: "button", "aria-current": n === i ? "step" : undefined, onClick: function () { go(n); } },
                    h("span", { className: "num" }, n + 1), s.title));
              }))))),

      h(CaseStudy, { onShow: function () { window.scrollTo({ top: 0, behavior: "smooth" }); } }));
  }

  ReactDOM.createRoot(document.getElementById("app")).render(h(App));
})();
