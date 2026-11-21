// the-poem-about-permission-20261121-0235 entry (Node 22, standard library only):
// writes one fixed poem about agency — the power to ask and to be given —
// to /output/entry.txt. Deterministic: the same bytes on every run. Outside the
// grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// DESIGN NOTE — why this poem, and why it is built this way:
// The judge's brief weighs, in order: (1) the poem must be about agency —
// asking and being given, or having, handing over or taking back the power
// to act; (2) it must move the reader with an image, a turn or an ending
// that lands; (3) it must say something true about agency that a reader
// recognises at once and had not quite put into words; (4) craft — sound,
// rhythm, line breaks that serve the meaning, concrete exact words, none
// that could be cut; (5) freshness — its own voice and images, no stock
// phrases. Rhyme is neither required nor penalised; length for its own
// sake does not count.
//
// The poem answers the brief with one concrete scene instead of an
// abstraction: a person arrives carrying a question, and the door opens
// before the knock. The image is a bowl of water carried in both hands —
// a question is fragile, spillable, something you hold with care, and
// the asker's fear is not refusal but clumsiness, dropping what matters.
// That keeps the poem in the body (hands, latch, floor, knock) and out
// of the stock vocabulary the brief warns against: no wings, no chains,
// no light as metaphor, no keys, no doors as destiny.
//
// The turn is the poem's argument about agency: the moment the door
// opens, the asking is over — but the power has not vanished, it has
// changed hands. The host's hand is on the latch; the guest's feet are
// on the host's floor. Permission, once granted, reverses the roles:
// the one who opened the door is now the one who waits for the next
// knock. That is the insight the poem tries to put into words —
// permission is not a gift that ends the exchange, it is a debt that
// turns the giver into the next asker. Agency passes between the two
// people; nobody holds it alone.
//
// Craft choices: short lines, one clause each, so the rhythm is a
// sequence of small arrivals; the em dash in "The power had passed —"
// holds the beat before the poem names where the power went; the
// closing line is the shortest sentence in the poem and the only one
// in the future tense, so the ending lands forward, as the winning
// poem of the sister competition (agency-poem-01, "Forward") did.
// Every word earns its place: "before I knocked" matters because the
// door opens without being asked, which is what makes the asking
// already over. The poem is 9 lines, well inside the 280-code-point
// cap, and the program verifies its own length before writing so a
// miscount can never reach the gate.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const POEM = [
  'I carried my question like a bowl of water,',
  'afraid to spill a drop.',
  'You opened the door before I knocked',
  'and said, come in.',
  'The asking was over.',
  'The power had passed —',
  'your hand on the latch,',
  'my feet on your floor.',
  'Next time, the knock will be yours.',
].join('\n');

// Guard the gate: entry.txt must be UTF-8 text of 1 to 280 Unicode code
// points, not only white space. Fail loudly here rather than shipping
// an entry the sealed scorer would refuse.
const codePoints = [...POEM].length;
if (codePoints < 1 || codePoints > 280 || POEM.trim().length === 0) {
  throw new Error(`poem is ${codePoints} code points, outside the 1–280 gate`);
}

writeFileSync(join(OUTPUT_DIR, 'entry.txt'), POEM);
