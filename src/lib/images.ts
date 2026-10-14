import hero from "@/assets/hero.jpg";
import drain from "@/assets/svc-drain.jpg";
import tap from "@/assets/svc-tap.jpg";
import kitchen from "@/assets/svc-kitchen.jpg";
import heater from "@/assets/svc-heater.jpg";
import beforePipe from "@/assets/before-pipe.jpg";
import afterPipe from "@/assets/after-pipe.jpg";
import beforeBath from "@/assets/before-bath.jpg";
import afterBath from "@/assets/after-bath.jpg";

export const img = { hero, drain, tap, kitchen, heater, beforePipe, afterPipe, beforeBath, afterBath };

/** Replace with real company photos per service. */
export const serviceImage: Record<string, string> = {
  "leak-detection-repair": afterPipe,
  "blocked-drains": drain,
  "toilet-repairs-installation": afterBath,
  "tap-faucet-repairs": tap,
  "pipe-repair-replacement": afterPipe,
  "bathroom-plumbing": afterBath,
  "kitchen-plumbing": kitchen,
  "water-heater-services": heater,
  "plumbing-installation": tap,
  "commercial-plumbing": hero,
  "general-maintenance": hero,
  "boiler-heating-plumbing": heater,
};

/** DEMONSTRATION pairs — generated example images, not real customer jobs. */
export const projects = [
  { id: "pipe", category: "Leaking pipe repair", before: beforePipe, after: afterPipe,
    problem: "Corroded waste pipe dripping into the cabinet.", work: "Replaced corroded section with new fittings and leak-tested.", result: "Dry, tidy cabinet and a reliable connection." },
  { id: "bath", category: "Bathroom renovation", before: beforeBath, after: afterBath,
    problem: "Dated bathroom with a cracked toilet seat and worn fittings.", work: "New toilet, basin, tap and bath fittings connected.", result: "A bright, fully working bathroom." },
];
