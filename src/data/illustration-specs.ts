/**
 * 14 种插画风格完整绘制规范（来源：mengto/skills · agent-skills/illustration，MIT License）
 * 原始方法论文档逐字打包，ia_generate 按选定风格返回对应规范。
 */
export const ILLUSTRATION_SPECS: Record<string, string> = {
  'flat': `---
name: illustration-flat
description: Draws flat vector illustrations as SVG cards (480x360): slim, long-limbed people acting out one design or coding moment with one hero prop. Identified by no outlines on big shapes, thin white fold strokes as the only shading, navy only for hair, sneakers and a few hairlines, small heads (about 1:7) with big hands and white sneakers, and sparse floating confetti with no ground line, in lavender, indigo, sunshine yellow, coral and mint. Covers the measured palette, stroke numbers, character construction (tapered limbs, separated fingers, thumb side), poses, props, composition and a tested parts kit. Use when asked for flat illustrations, flat vector people, outline-free or no-outline characters, modern or corporate flat art, empty states, onboarding screens, 404 or error pages, coming-soon pages, blog headers, feature spots or marketing cards.
---

# Illustration: Flat

Flat, unshaded colour shapes on white: one slim person in a dynamic pose working on, fighting with or presenting one hero prop, with a ring of tiny confetti around them. It suits product moments (errors, empty states, launches, onboarding) where a figure should feel lively but light.

Boundary: if hair, trousers and shoes should be solid black masses with a ground line, use \`illustration-flat-with-black\`. If every shape needs a thin ink outline, use \`illustration-outlined-cartoon\` (big heads) or \`illustration-line-interior\` (white fills, rooms). For a single object with no person, use \`illustration-teal-spot\`.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence
Big shapes carry no outline at all: form is described only by thin white fold strokes laid on flat fills, plus a handful of navy hairlines, so the figure reads as cut paper with chalk creases.

## Palette
Measured from the three examples. No gradients, no opacity, no filters, no textures, no shadows.

| Role | Hex | Where it goes |
|---|---|---|
| Card background | \`#FFFFFF\` (none drawn) | The page's white card shows through. Don't draw a background rect. |
| Navy | \`#011B5C\` | Hair, sneaker outline and heel tab, hairline contours, laptops, motion marks, burst ticks, prop outlines |
| Lavender | \`#9E91E1\` | Sweaters, browser title bars, decor |
| Indigo-violet | \`#6A6CEB\` | Trousers, tags, screens |
| Sunshine yellow | \`#FEC600\` | Tops, hero props (chain, desk), decor dots |
| Skin | \`#FD9999\` | The one skin tone: face, neck, forearms, hands |
| Coral pink | \`#FF7F91\` | Socks, trousers, decor rings and squiggles, UI pills, window dots |
| Mint | \`#93D7D5\` | Tees, ladders, image placeholders, decor triangles |
| White | \`#FFFFFF\` | Sneakers, fold strokes, keylines, window bodies |
| Pale lavender | \`#CDC6EF\` | Smoke, clouds, soft secondary masses |
| Palest lavender | \`#E4E0F7\` | Front puffs over pale-lavender smoke |
| Tape yellow | \`#FFE58A\` | Masking tape, pale highlight props (one-off) |
| Warning red | \`#FF6378\` | One alert prop per card at most (one-off) |

- Each garment is one palette colour. Top and trousers always differ (lavender over indigo, mint over indigo, yellow over coral). Socks contrast with the trousers (coral under indigo, lavender under coral).
- The hero prop takes a colour the clothes don't use, so figure and prop separate without outlines.
- Never navy clothing, never navy skin details beyond the listed features, never a second skin tone in one card.

## Line and fill
Numbers at 480 wide. Every stroke has \`stroke-linecap="round" stroke-linejoin="round"\`.

| Element | Treatment |
|---|---|
| Body, clothes, limbs, hair, props | Filled shapes, no stroke |
| Fold strokes on clothes | White, 1.4; 2 to 4 per garment (hem, elbow, knee, waist); 10 to 25 px long, gently curved |
| Folds on sleeve hems, cuffs, smoke | White, 1.2 to 1.3 |
| Hair highlight | A bob gets one white 1.1 curve on the crown; the quiff gets a navy 2.4 flick instead; the bun gets none |
| Navy contours | 1.2 to 1.4: the near arm crossing the torso, a crotch or knee crease, the collar line (1.2) |
| Sneakers | White fill, navy 1.17 outline (at shoe scale 1.12 to 1.2), navy heel tab, sole line, two lace ticks |
| Finger separations | Navy 0.77 to 0.85, three short lines between four fingers |
| Face | Eye dot r 1.35 to 1.4; brow 1.05 to 1.1; mouth 1.05; ear curve 0.8 |
| Light props (windows, tags) | White fill, navy 1 to 1.2 outline, coloured title bar |
| Confetti | 1.4 strokes, or filled with no stroke |
| Motion arcs, burst ticks | Navy 1.3 to 1.4 |

- **Fattening a shape** (a cuff, a laptop lid): stroke it in its own fill colour, 1.6 to 3 wide, instead of redrawing it bigger.
- **Separating two overlapping shapes of one colour:** a white keyline. Draw the front piece once stroked white and 3 px wider, then again in its colour. The chain links use white 11 under yellow 8; the ladder rails use white 3 under mint.
- **Shading:** none. Depth comes from overlap order, white folds and the occasional navy contour.

## Characters
- **Proportions:** 205 to 235 px tall standing (57 to 65% of card height). The head is 28 wide and 35 tall, crown to chin: 1:6.5 to 1:7. Legs are long (hip to heel about 50% of height). Hands and feet run large: a hand is about the face's length, a sneaker is 46 px long (1.3 head lengths).
- **Head:** a profile or 3/4 profile facing the action. The nose is a bump in the face silhouette, not a separate mark. Eye: one navy dot. Brow: one short arc above it. Mouth: a short smile arc, a filled navy oval for shock, or a flat tick. Ear: a skin ellipse 2.5 x 3.5 with a navy 0.8 inner curve. No blush, no nose line, no pupils or eye whites.
- **Hair:** solid navy shapes: a short quiff (with a navy 2.4 flick), a bob with a blunt fringe (one white 1.1 highlight), a bun as a circle r 6. Glasses: a navy 1.0 ring r 3.6 and an arm to the ear.
- **Neck:** a slim skin quad from the collar to under the jaw, behind the chin, with a navy 1.2 collar arc.
- **Torso:** a smooth blob about 85 tall and 40 wide, leaning 12 to 30 degrees from the pelvis (30 for a hard push), sometimes arched; white hem fold plus two body folds.
- **Arms:** cuff, then a tapered forearm (9 px below the elbow to 5.6 to 6.2 px at the wrist), then a wrist narrower than the palm. Sleeves: a short tee sleeve 17 px long with a white hem fold, a 3/4 sleeve with a flared cuff and a white cuff fold, or a long sleeve to the wrist.
- **Hands in this style:** skin palm shape plus four fingers drawn as round-capped skin strokes 3.45 wide (lengths 9.0, 10.2, 9.4, 7.4: the middle is longest, the little finger shortest), a thumb stroke 3.6 to 3.7 angled out about 45 degrees, and three navy 0.8 separation lines. Fists: four finger bumps wrapping the bar with navy 0.8 knuckle ticks, the thumb crossing over with a navy 0.9 crease. Put the thumb on the side the handedness table in \`references/craft.md\` gives (the kit's \`openHand\` takes \`hand\` and \`side\` and does it for you). Palms pressed onto anything flat in the picture plane (a poster, a wall, a big UI knob) show their BACK to the viewer.
- **Legs:** tapered tubes, hip 29 to 32, knee 22 to 23.5, hem 19 to 20.5; a coloured sock band 10 px tall between hem and shoe. Knees bend; one leg usually carries the weight.
- **Feet:** white low-top sneakers, toe toward the direction of travel. A lifted heel (tiptoe) or lifted toe (weight rocking back) gives the pose life.
- **Poses that work:** kneeling with one knee up while pulling; recoiling with arms up and the torso arched back; stepping up on tiptoe to press something onto a wall; lunging into a push, front knee bent, back leg straight on tiptoe. Twist the torso against the action. Never front-facing and symmetric.

## Decor and props
- **Confetti, 6 or 7 per card:** a filled mint triangle (14 wide), an outline lavender triangle (12), an outline coral ring r 5, a filled yellow dot r 3.6, a filled lavender square 8, an outline mint square 11 to 13, a coral squiggle of four waves (24 wide). One of each kind at most; scatter them round the group's outer edge, 20 px or more from any figure part.
- **Expression marks:** paired navy motion arcs \`))\` beside a moving limb or head; 2 to 4 short navy burst ticks for surprise or a snap; small coloured shards (triangles 4 to 6 px) flying off a break.
- **Props:** browser windows (white body, navy 1.2 outline, rx 5, title bar 14 tall with pink, yellow and white dots), laptops (navy lid, indigo screen, white and pink code lines 2 wide), chip tags with 10 px bold text, a yellow desk, a mint step ladder, lavender smoke billows. Keep text to one short word or code (\`404\`, \`0x0F\`, \`SOON\`).
- **Never:** ground lines, cast shadows, plants, backgrounds or rooms, logos, more than one hero prop.

## Composition
- No background rect. Nothing touches the card edge: the drawing spans about x 70 to 430 and y 44 to 318.
- Figure plus hero prop make one group, about 75% of the card width and 70% of its height. The figure is on one side, the prop on the other, and their contact point (hands on the chain, palms on the poster) is the focal point near the centre.
- **No ground line.** Every shoe, table leg and ladder foot ends on one implicit floor at y 312 to 330.
- Density is sparse: one figure, one prop, 6 or 7 confetti, at most two expression marks.
- Fit the margins with one group transform round the whole drawing: \`<g transform="translate(240 181) scale(0.93) translate(-243 -183)">\` (0.93 to 0.94), or a plain \`translate(-12 5)\` when it already fits.

## Techniques
The examples were generated, not hand-typed: a script places tapered tubes, smooth blobs and stock parts (sneaker, hand, fist, head) and writes the SVG. \`scripts/flat-kit.mjs\` is that parts library, ported to dependency-free Node. Its sneaker, open hand, torso, head and arm output is byte-identical to the shipped cards.

\`\`\`js
// card.mjs, next to a copy of flat-kit.mjs
import fs from 'node:fs';
import * as K from './flat-kit.mjs';
const { PAL } = K, B = [], FY = 282;                  // FY: the floor the shoes stand on
B.push(K.decor([['tri', 386, 70, PAL.mint], ['ring', 408, 150, PAL.pink], ['dot', 184, 46, PAL.yel],
  ['sq', 64, 318, PAL.lav], ['squig', 398, 236, PAL.pink], ['sqO', 196, 270, PAL.mint]]));
const W = K.frame([342, 176], -23);                   // pelvis at (342,176), torso leaning 23 deg
B.push(K.arm(W([10, -74]), [292, 150], [257, 156], { sleeve: 'cuffed', top: PAL.yel }));     // far arm first
B.push(K.openHand([257, 156], 182, { hand: 'R', side: 'back', spread: 4, narrow: false }));  // faces left: far = RIGHT hand
const tip = { a: -26, s: 1.12 }, t = K.shoePt([0, 0], tip, [-40, 0]);   // tiptoe: put the TOE on the floor
const heel = [345 - t[0], FY - t[1]];
B.push(K.leg({ hip: W([4, 3]), knee: [355, 220], heel, ...tip, trouser: PAL.pink, sock: PAL.lav, hipW: 31, kneeW: 22, hemW: 19, hipCap: true }));
B.push(K.leg({ hip: W([-5, 3]), knee: [320, 222], heel: [340, FY], s: 1.12, trouser: PAL.pink, sock: PAL.lav, hipW: 32, kneeW: 22.5, hemW: 19.5, hipCap: true }));
B.push(K.torso(W, { top: PAL.yel }));
const hc = W([-2, -105.5]);                           // head centre; tilt -37 = looking up at the hand
B.push(K.neck(W([-4.6, -79.5]), W([4.6, -80.5]), hc, -37), K.head(hc, -37, { hair: 'bob' }));
B.push(K.arm(W([-9, -72]), [273, 122], [250, 101], { sleeve: 'cuffed', top: PAL.yel }));   // near arm last
B.push(K.openHand([250, 101], K.ang([273, 122], [250, 101]) - 12, { hand: 'L', side: 'back', spread: 4, narrow: false }));
fs.writeFileSync(new URL('./card.svg', import.meta.url), K.card(B, { label: 'Title, Flat style', fit: [240, 181, 0.93] }));   // next to card.mjs
\`\`\`

Draw order: decor, hero prop (or its back half), far arm and hand, far leg, near leg, seat and crease, torso, neck, head, near arm, near hand, then anything that wraps in front (fist fronts, tape).

- **Facing right:** the parts face left by default. Pass \`flip: true\` to \`torso\`, \`head\`, \`neck\` and every \`leg\` (toe right), and swap the shoulders: near \`W([9, -72])\`, far \`W([-10, -74])\`. With \`flip\`, a positive shoe angle is the tiptoe.
- **Stride or lunge:** two leg tubes leave a white notch under the hem. Add a seat blob in the trouser colour, \`K.P(K.smooth([W([-15, -6]), W([15, -6]), K.lerp(hipF, kneeF, 0.3), W([0, 14]), K.lerp(hipN, kneeN, 0.3)]), trouser)\`, then a navy 1.3 crease along the near thigh's inner edge.
- **Trouser folds:** \`leg()\` draws none. Add one white \`fold\` at each knee bend and one along a shin or thigh.
- **Arm over a same-colour torso:** a navy 1.3 contour 7 px off the upper arm's centreline on the torso side, from 30% of the way to the elbow, round the elbow: \`const n = K.perp(K.norm(K.sub(el, sh)))\`, points \`K.add(K.lerp(sh, el, t), K.mul(n, 7.2))\`.
- **Margins:** \`card(B, { fit: [cx, cy, s], move: [dx, dy] })\` scales about a point, then shifts. Other parts: \`tube([[x,y,w],...])\` for any tapered shape, \`fold(pts)\` and \`contour(pts)\` for white and navy lines, \`fist(c, a)\` returning \`{back, front}\` to sandwich a bar, \`windowOpen(...)\`, \`motion(p)\`, \`ticks(c, angles)\`, \`smooth(pts)\`, \`shoePt(...)\` to put a tiptoe's toe on the floor.

\`node scripts/flat-kit.mjs --demo $W/parts.svg\` writes a labelled sheet of every part (prints \`wrote <path>\`): the seven confetti kinds, the three heads, open hands in all four handedness cases, a fist round a bar, short and cuffed arms, a planted and a tiptoe leg, a tube with folds, motion arcs and ticks.

White keyline, hand-written (from the chain card):
\`\`\`svg
<path d="M146 222.6 V246.6 A10 10 0 0 0 166 246.6 V222.6 A10 10 0 0 0 146 222.6 Z" fill="none" stroke="#FFFFFF" stroke-width="11"/>
<path d="M146 222.6 V246.6 A10 10 0 0 0 166 246.6 V222.6 A10 10 0 0 0 146 222.6 Z" fill="none" stroke="#FEC600" stroke-width="8"/>
\`\`\`

## Failure modes
- **Fists pasted onto sleeves.** The judges' main complaint on the first card: no forearm, no wrist. Build cuff, tapered forearm, wrist, then the hand (\`arm()\` then \`openHand()\`/\`fist()\` at the same wrist point).
- **Boxy Π trousers.** Straight parallel legs read as stiff. Taper hip 30 to knee 22.5 to hem 20 and bend the knee.
- **Front-facing symmetric pose.** A redraw that faced the viewer squarely dropped from 7 to 6.5. Use profile or 3/4, lean the torso 12 to 30 degrees, twist it against the action.
- **Limp pulling or pushing.** Lean away from a pull, bend the elbows, brace a knee; lean into a push with the heel lifted.
- **Stripe mitten hands.** Fingers drawn as parallel bars on a box. Use separate round-capped strokes of different lengths and a 45-degree thumb.
- **Thumbs on the wrong side.** A designer rejected a whole pass for this. Decide left/right and palm/back for every hand and pass them to \`openHand\`; mirror \`fist\` from the table, then run the thumb proof in craft.md.
- **Outlines creeping in.** A navy stroke round a sleeve or leg turns it into a different style. Only the listed hairlines are navy.
- **Same-colour parts merging into one blob.** Two pink legs or two yellow links overlapping. Separate them with a white keyline or one navy 1.3 contour.
- **A drawn floor or shadow.** This style has none; align the feet on one y instead.
- **Big cartoon heads.** A 45 px head on a 230 px body reads as a different set. Keep 35 px.
- **Confetti crowding the figure** or more than 7 pieces. Keep 20 px clear and one of each kind; check the feet, where a square ended up under a shoe in testing.
- **A white notch at the crotch** in a stride. Add the seat blob and crease (Techniques).
- **A navy slab.** A big navy prop (a dark-mode track, a laptop) outweighs the figure. Keep navy props under about 1/6 of the card area and break them with white or lavender detail.

## Examples
- \`broken-link.svg\` (Broken Link): a kneeling woman with a bun and glasses pulls a snapped yellow chain; shows two fists gripping a bar (back/front sandwich), a white-keyline chain, the arm-over-torso navy contour, a long sleeve, a tiptoe back foot.
- \`fatal-error.svg\` (Fatal Error): a man in a mint tee recoils from a warning triangle bursting out of a laptop on a yellow desk; shows short sleeves, two open hands with correct thumbs, an open-mouth shocked face, smoke billows, burst ticks and motion arcs.
- \`coming-soon.svg\` (Coming Soon): a woman in a yellow top on a mint step ladder presses a browser-window poster to the wall, with a SOON tag; shows 3/4 cuffed sleeves, palms pressed flat, a tiptoe leg, the bob haircut, a white-keyline ladder, masking tape.

## Workflow
Run from this skill folder. \`render.mjs\` needs \`playwright-core\` (or \`playwright\`) installed here, in the current folder or globally, plus a Chromium.

1. **Brief.** Name the subject and the one action that shows it (who does what to which prop). Write down the joke or gesture that must read at 480 px.
2. **Pose and hero.** Pick the hero prop and its colour, and a pose with a lean and one weight-bearing leg. Decide the facing; then write down LEFT/RIGHT and PALM/BACK for every hand (craft.md table).
3. **Set up:** \`W=/tmp/flat-card; mkdir -p $W; cp scripts/flat-kit.mjs $W/\`, then write \`$W/card.mjs\` from the Techniques skeleton. Use an id prefix (\`dm-\`) if you add any ids.
4. **Block** the figure with \`frame\`, \`torso\`, \`leg\`, \`arm\` at the right proportions (Characters), the prop and the floor y. Render and check proportions before details.
5. **Draw** hands, head, hair, folds, contours, the prop's detail, then 6 or 7 confetti and up to two expression marks.
6. **Render:** \`node $W/card.mjs && node scripts/render.mjs $W/card.svg $W/card.png\` (card.mjs writes card.svg next to itself).
7. **Sheet:** \`node scripts/render.mjs --sheet $W/sheet.png examples/*.svg $W/card.svg\`. Ask "same hand, same set?"
8. **Zoom** every hand, the face and both feet at 8x: \`node scripts/render.mjs $W/card.svg $W/hand.png --zoom x,y,w,h --scale 8\`. Thumb proof: in a copy of card.mjs that writes \`proof.svg\`, call \`K.setProof(true)\` before drawing (thumbs red, index fingers blue), render each hand at 8x, check it against your notes, delete the copy.
9. **Critique** on the five criteria in \`references/craft.md\` and the Verify list below; fix; repeat. Expect three or four rounds.
10. **Lint:** \`node scripts/lint.mjs $W/card.svg --palette style.json\` (add \`--prefix dm-\` if you used ids). Fix every ERROR; every WARN colour must be a deliberate one-off.

## Verify
- [ ] No shape larger than a finger has a stroke, except white props with a navy 1 to 1.2 outline.
- [ ] Fold strokes are white, 1.2 to 1.4, round-capped; 2 to 4 per garment.
- [ ] Navy appears only on hair, sneakers, face features, finger and knuckle lines, the listed contours, laptop parts and marks.
- [ ] Only palette hexes, one skin tone, no gradient, opacity or filter.
- [ ] The figure is 205 to 235 px tall with a 35 px head; legs taper; the torso leans.
- [ ] Every hand traces back through a wrist and forearm to a sleeve; fingers differ in length; thumbs match the table.
- [ ] White sneakers with navy outline, sock bands under the hems, all feet on one implicit floor; no ground line or shadow.
- [ ] Top, trousers, socks and hero prop are four different colours.
- [ ] Overlapping same-colour parts are split by a white keyline or a navy contour.
- [ ] 6 or 7 confetti, one of each kind, 20 px clear of the figure; at most two expression marks.
- [ ] Nothing inside 40 px of the card edge; the contact point between figure and prop sits near the centre.
- [ ] The subject reads at 1x without the title.
`,
  'bold-pop': `---
name: illustration-bold-pop
description: Draws hand-authored SVG spot illustrations in a bold pop-geometric style for design and coding scenes. Identifying traits: a thick navy outline on every shape, solid navy extrusions that always step down-right, saturated flat fills (hot pink, lemon, aqua, violet, mint, lime) textured with navy hatching and dots, and a dense overlapping cluster of chunky props (browser windows, pinwheel tiles, iso cubes, lightning bolts) around one slim cartoon character. Covers palette, line weights, extrusion and union-outline techniques, a JS helper for the repeated marks, characters and hands, composition and a render-and-critique loop. Use when someone asks for bold pop, pop geometric, retro pop, memphis-style, navy-outline, chunky outlined or loud colourful illustrations, or for empty states, onboarding, 404 or error pages, blog headers, feature spots and marketing cards in that look.
---

# Illustration: Bold pop

A loud, graphic spot style: every shape outlined in one navy, pushed forward by a solid navy extrusion, filled with saturated flat colour and textured with hatching, dots, grids and stripes. One slim, simply drawn character works inside a tight cluster of props that overlap each other. It suits playful product moments: errors, launches, security, builds, onboarding.

Boundary: for thin near-black outlines, big heads and no extrusions use \`illustration-outlined-cartoon\`; for a single hero object with a hard drop shadow and no people use \`illustration-teal-spot\`; for true 30° isometric scenes on a platform use \`illustration-isometric-mono\`. If the brief says "flat, no outlines", this is the wrong skill (\`illustration-flat\`).

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in \`examples/\` are this style's shipped cards.

## The look in one sentence
Every shape wears the same thick navy outline and sits on a solid navy extrusion stepped down-right, so the whole cluster reads as chunky pop-art blocks stacked toward the viewer.

## Palette

Measured from the three examples. The card has no background rect: it stays transparent on the page's white card.

| Role | Hex | Where it goes |
|---|---|---|
| Navy (ink) | \`#1f1c4d\` | every outline, every extrusion, iso shadow faces, hatching, dots, eyes, mouths, curly hair |
| White | \`#ffffff\` | window bodies, pinwheel facets, sneakers, teeth, washers, inner holes, white stripes on tees |
| Hot pink | \`#ff5fa8\` | hero blocks, buttons, cones, hair, tee stripes, tongue, progress stripes |
| Lemon | \`#ffe36e\` | bolts, hard hats, padlocks, caution boards, highlighted code lines, smileys, ponytail |
| Orange | \`#ffb547\` | crane steel, keys, arrows, flames, shoe uppers |
| Cream | \`#fff4d8\` | dotted footers, gutters, cube tops, pinwheel facets, shoe soles, code digit tiles |
| Violet | \`#8f5cff\` | title bars, phones, tees, leggings, pinwheel blade |
| Periwinkle | \`#7d7ff7\` | title bars, wireframe text lines, sleeves, grid pattern lines |
| Mint | \`#34e2c4\` | overalls, shields, pinwheel blade, traffic dots |
| Lime | \`#b9f14d\` | tees, plates, gears, landscape hills, confirm buttons |
| Aqua | \`#4fe3ec\` | title bars, giant arrow bands, hairbands, cab glass |
| Sky | \`#5bb8f7\` | wrenches, jeans, image placeholders, iso cube left faces |
| Skin light | \`#ffd0b0\` | faces, arms, hands |
| Skin shade | \`#f4a385\` | the shadowed half of a fist only |
| Skin deep | \`#c68660\` | an alternative skin tone (face, arms, hands) |
| Blush | \`#ff9cc8\` | one cheek circle per face |

- Flat fills only. No gradients, no blur, no filters, no grey, no pure black. The one opacity in the set is a white glasses lens at \`fill-opacity="0.55"\`.
- Neighbouring faces never share a hue family: aqua never touches mint, orange never touches lemon on the same object, two pinks never abut. Put white, cream or navy between them.
- About 35–40% of the non-navy fills are white or cream. Saturated colour is for objects; the large calm areas are white with wireframe detail.

## Line and fill

Numbers are author units; the card group scales by 0.78 (one card uses 0.8), so multiply by 0.78 for px at 480 wide.

| Element | Author width | At 480 px |
|---|---|---|
| Outline of every shape | 3.0 | 2.34 |
| Inner parts (window dots, pills, hook, nut, small plates) | 2.2–2.6 | 1.7–2.0 |
| Wireframe text pills | 1.8–2.0 | 1.4–1.6 |
| \`#\`, \`//\` marks | 1.8 | 1.4 |
| Hair strands, folds, hems, finger contours, laces | 1.3–1.6 | 1.0–1.25 |
| Hatch pattern lines | 1.25 at 5 spacing | 0.98 at 3.9 |

- Caps and joins round everywhere (\`stroke-linecap="round" stroke-linejoin="round"\`). One outline colour: navy.
- Outlines are strokes on filled paths. Draw order per object: extrusion → fill → pattern → outline.
- Limbs, hands and any blob made of overlapping parts use a **union outline**: the whole shape filled navy with a navy stroke of 2 × 3.0, then the fill on top. The overlaps vanish and one 3.0 outline wraps the union.
- Cables, handles, braces and hooks are **tubes**: a navy stroke \`w + 6\` wide under a colour stroke \`w\` wide.
- Shading is never a tone step. It is one of: hatching on the shadow band (the right 20–30% of an object; on a figure facing right, the back (left) band of the tee and the whole far leg); a solid navy face (the right face of an iso cube); or the extrusion itself. Light always comes from the top-left.
- Texture vocabulary, all navy on a flat fill: \`hatch\` 45° lines, \`dots\` (r 1.15 on a 7 grid, on cream), \`dots2\` (r 0.75 on 4.6, on clothes and key heads), \`grid\` (periwinkle 1.2 lines on 9, empty slots), \`stripe\` (navy 7 on 14 at 45°, caution boards on lemon), \`pstripe\` (pink progress fill), \`check\` (4.5 checker bands). Every large fill except white window bodies carries one texture or one inner detail.

## Characters

- One per card, slim and simple, 140–180 author units tall standing (39–51% of the card height); a seated figure's head top sits at 40–45% from the top of the card. Head (face only) about 37 × 42: the figure is 3.5–4 heads tall, hat or hair included.
- Head in 3/4 view facing right, into the scene. Build it with \`p.head()\` in \`scripts/pop.mjs\`: oval face, C-shaped ear with a 1.3 inner curl at the back, two navy oval eyes (near 1.6 × 2.2, far 1.4 × 2.1, set high at the face's midline), short straight brows at 1.9, one blush circle r 2.6 on the near cheek, and an open grin (navy mouth, white teeth band, pink tongue). No nose: the face silhouette carries it. Variants: a flat focused mouth with the tongue poking out of the corner, or a one-stroke smile.
- Hair is a flat saturated shape (pink bob, lemon ponytail) with two 1.5 navy strand lines, or navy curls made of r 5.4 arcs with three white 1.4 highlight ticks. Accessories in the palette: hairband, hard hat with a hatched right side and an orange ridge, round glasses.
- Every head sits on a neck block (\`p.neck()\`), and the neck sits in a collar. *Fault prevented:* a judge-flagged missing neck.
- Torso: a tapered tee filled with a colour plus \`dots2\` or white horizontal stripes (4 high every 9), its back band hatched through a clip path, with a 1.5 hem fold line. Raglan seams or straps are 1.6 lines.
- Limbs are union capsules: upper arm r 4.5–4.9 → elbow 4.0–4.4 → wrist 2.7–3.0; thigh 8.2–8.6 → knee 6.6–7.2 → ankle 4.8–6.0. A short sleeve is a second capsule over the upper half of the arm with a 1.5 hem line. Hatch the far leg.
- Hands follow \`references/craft.md\` (construction, size, handedness, thumb proof). In this style: one union outline at 2.4–3.0, finger separations as 1.3–1.7 navy contour lines inside the shape (never gaps), fingers grouped, the thumb a separate outlined shape on top. A gripping fist has three short knuckle notches along the curled fingers and its thumb coming over the opposite face; the shaded half of a light-skinned fist is \`#f4a385\`. \`p.fist()\`, \`p.openHand()\` and \`p.looseFist()\` build these; scale them so a fist is about 60% of the face height.
- Feet: side-view sneakers (\`p.sneaker()\`): a cream sole slab, a white, orange or pink upper, a pink side stripe, a toe-cap line and two lace ticks. Cuffs are short tubes in a contrasting colour at the ankle. Draw each leg first and its sneaker on top, far leg and shoe before near leg and shoe; a leg drawn after its shoe swallows the upper. To lift a heel, wrap the sneaker in \`rotate(18 x+22 318)\` (about its toe contact).
- Poses that work: leaning back against a pull with both knees bent; standing beside a big prop, leaning back to steady it, rear heel lifted; running with the torso pitched 20° forward, arms pumping, rear heel up; sitting on an iso cube with the knees 10–16 units above the hips, one hand braced flat on the seat behind her, a foot tapping heel-up with two tick marks.
- Solve elbows and knees with \`p.ik(S, H, l1, l2, bend)\` so every hand traces back to a shoulder. \`bend\` (+1 / −1) flips the joint to the other side of the line: print the solved elbow and check it hangs below the shoulder-to-wrist line. An elbow solved upward reads as a dislocated arm.

## Decor and props

- Hero: almost always a browser window (white body, coloured title bar with three traffic dots and a url pill, a dotted cream footer or gutter, wireframe text pills and one picture block inside). The subject's own object (crane, phone, padlock, refresh arrow) overlaps it.
- Secondary props, 3–5 per card, each extruded and outlined: pinwheel tile (8 facets: pink, lemon, mint, violet blades alternating with white and cream-dotted facets), iso cube (cream dotted top, sky hatched left, navy right), lightning bolt (lemon or pink), striped ring, chunky curved arrow, chat bubble with three white dots, key, gear, cursor arrow, smiley circle, cone, padlock, phone, flame.
- Floating marks, 6–9 per card, unextruded: \`#\` hashmarks (2–3), \`//\` slashes (1–2), \`+\` (1–2), a navy dot r 2.4 (1–2), an outline ring r 4 (1–2), one outline cloud. Scatter them in the margins and gaps, at least 8 author units clear of any prop, or well inside a large face as texture (a \`#\` on a cube face or a card corner). Never let one straddle an outline or sit among a window's content.
- Props overlap: tuck a pinwheel behind a window corner, let a bolt cross a window edge, a bubble and key overlap the title bar. Free-floating big props read as stickers.
- Never: drop shadows that are not navy extrusions, gradients, sparkles or 4-point stars (that is the outlined-cartoon vocabulary), ground lines, plants, text longer than a 6-digit code.

## Composition

- No background. The cluster's ink bounding box covers 75–81% of the card width and 66–73% of its height; margins 46–61 px on every side (about 100 px on the 2x render), left and right within 5 px of each other. Ink covers 21–25% of the card: if a card looks thin, add an overlapping prop at a window edge (bubble, badge, clock), not more floating marks.
- Draw in author space on the 480 × 360 grid, then wrap everything in \`translate(240,183) scale(0.78) translate(-240,-169)\` (\`p.card()\` does this). Card position from author position: X = 240 + 0.78 (x − 240), Y = 183 + 0.78 (y − 169).
- The character stands at the left third facing right; the hero window sits centre-right; the subject prop links the two (the wrench on the bolt plate, the phone in both hands, the arrow under the feet).
- Floor-standing things share one implicit floor line (author y ≈ 318): soles, barrier feet, cones, cubes, a phone's base, a padlock. No drawn ground line.
- Density is high but every enclosed gap holds something: a loop or frame with an empty middle reads as sparse.

## Techniques

All four are in \`scripts/pop.mjs\` (ES module, no dependencies). \`node scripts/pop.mjs demo /tmp/pop-demo.svg\` writes a sheet of every mark (put it anywhere outside the skill folder); render it to see the vocabulary.

1. **Extrusion, always down-right.** Copies of the shape filled and stroked navy, stepped 1 unit at a time, drawn before the face:
   \`\`\`svg
   <g fill="#1f1c4d" stroke="#1f1c4d" stroke-width="3" stroke-linejoin="round">
     <g transform="translate(1,1)"><path d="…window…"/></g> … <g transform="translate(8,8)"><path d="…"/></g>
   </g>
   <path d="…window…" fill="#ffffff" stroke="#1f1c4d" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
   \`\`\`
   Depth by size: windows 8, phones and padlocks 7, pinwheels 6, crane parts and panels 4–5, bolts, bubbles, cursors 3–4, hooks and buttons 2.5–3. \`p.ext(d, 8)\` then \`p.P(d, p.WHITE)\`. For a rotated shape pass the same transform: \`p.ext(d, 7, { tf })\`.
2. **Union outline** for limbs and hands: \`p.union([capsule(a, 4.6, b, 4.1), capsule(b, 4.1, c, 2.9)], p.SKIN)\` emits \`<path fill="#1f1c4d" stroke="#1f1c4d" stroke-width="6">\` then the skin fill.
3. **Texture = fill + pattern + outline.** \`p.tex(d, p.CREAM, 'dots')\` emits three paths with the same \`d\`; \`p.defs()\` writes the ten patterns under the card's prefix. For a hatched band inside a shape, clip the hatch to the shape:
   \`\`\`js
   b += p.F(lock, p.YEL) + \`<clipPath id="\${p.prefix}c-lock"><path d="\${lock}"/></clipPath>\`
     + \`<g clip-path="url(#\${p.prefix}c-lock)">\${p.F(p.rr(x + w - 26, y, 26, h, 0), p.url('hatch'))}</g>\` + p.S(lock);
   \`\`\`
4. **Scaled groups keep the outline.** The shipped figures are drawn small and scaled up 1.12–1.22 about their floor point. Set \`p.K = 1/1.2\` while the figure's parts are generated, wrap them in \`translate(x,318) scale(1.2) translate(-x,-318)\`, then reset \`p.K = 1\`, or its outlines go 20% heavier than the props. Put the seat and anything the figure holds in the same group so contacts stay exact.

Minimal generator (save beside the card, fix the import path to wherever this skill lives):
\`\`\`js
import fs from 'node:fs';
import { pop } from './scripts/pop.mjs';
const p = pop('rl-');
let b = '';
const w = p.browser(170, 80, 180, 170, { bar: p.AQUA });
b += w.svg + p.line(185, 130, 70) + p.line(185, 142, 50, p.PINK);
b += p.pinwheel([352, 72], 26, 12) + p.boltMark(440, 110, .8);
fs.writeFileSync('rate-limited.svg', p.card(b, { label: 'Rate Limited' }));
\`\`\`

## Failure modes

- **Extrusion pointing the wrong way.** One prop stepped down-left reads as a mistake against the rest (a crane cab was flagged). Every extrusion steps (+1,+1); never mirror an extruded group with \`scale(-1,1)\`.
- **Missing neck.** A head placed straight on the collar was flagged. Draw \`p.neck()\` after the torso and before the head.
- **A hand with no arm.** A fist on a handle with no forearm behind it was flagged on the first draft. Solve shoulder → elbow → wrist with \`p.ik()\` and draw the arm under the hand.
- **Thumbs on the wrong side.** A designer rejected hands whose thumbs broke left/right handedness. Run the thumb proof from \`references/craft.md\` on every hand; \`p.openHand()\` as drawn is a right hand seen from the back.
- **Mitten or striped hands.** Fingers drawn as parallel stripes or a blob were redrawn on two cards. Group the fingers, vary their length, add knuckle notches, and put the thumb on the opposite face of the grip.
- **Sparse inside a loop.** Hot Reload stayed at 7.5 because the middle of its refresh ring was empty while the pinwheel crowded the runner. Fill enclosed space with props, and keep at least 10 card px between the character's head or hands and the next big prop.
- **Character too small.** A figure below 40% of the card height loses to the props; one card was redrawn 12% larger. Aim for 45–50%.
- **Perched, not sitting.** A first self-test draft laid the forearm and cup over the thigh, and the seated figure read as leaning on the cube. Keep the thigh visible from hip to knee and the knee higher than the hip.
- **Floating props.** A phone hovering beside its owner and a padlock in mid-air were fixed by standing them on the floor line; small props (key, bubble) overlap the window instead of floating alone.
- **Tangent contacts.** A sneaker toe just touching a curved deck reads as floating. Press soles 2–3 units into the surface they stand on.
- **Outlines that drift.** Strokes inside a scaled group thicken or thin. Use \`p.K\` (technique 4) and keep the 3.0 outline everywhere.
- **Empty fills.** A large flat colour block with no texture or inner detail looks unfinished next to the examples. Give it hatch, dots, stripes or wireframe content.

## Examples

- \`page-under-construction.svg\`: "Page Under Construction". A worker leans back hauling a wrench on a nut bolted to the window frame; tower crane with lattice jib, a code block on the hook, caution barrier, cone, iso cube footing. Shows the gripping fists, hard hat, pinwheel, truss holes, \`stripe\` and \`grid\` patterns.
- \`two-factor-auth.svg\`: "Two-Factor Auth". A man with curly hair and glasses holds a phone as tall as his torso with both hands; login window, open padlock with an orbiting pink arrow, key and chat bubble on the window corner. Shows deep skin tone, edge grips, a leaning standing pose and digit tiles.
- \`hot-reload.svg\`: "Hot Reload". A runner with a ponytail rides a giant aqua refresh arrow that loops round a code window, flames off its tail. Shows the running pose, pumping fists, striped tee, sneakers on a curved surface and a curved hatched band.

## Workflow

Run commands from this skill's folder.

1. **Brief.** Name the subject in two to four words and the one action that shows it ("throttled requests pile up at a gate while she waits").
2. **Choose the pose and the hero.** Pick a pose from the Characters list and the prop that carries the joke. Write down, for each hand, LEFT or RIGHT, palm or back, and the finger direction (\`references/craft.md\`, Handedness).
3. **Block.** In a generator using \`scripts/pop.mjs\`, place the window, the subject prop, the figure's joints (feet on y ≈ 318) and 3–5 secondary props as rectangles. Render and check the bounding box and balance before adding detail.
4. **Draw.** Extrusions and faces back to front, then textures, then the figure (legs, torso, neck, head, far arm before the torso, near arm and hands last), then floating marks.
5. **Render:** \`node scripts/render.mjs card.svg card.png\`.
6. **Sheet next to the examples:** \`node scripts/render.mjs --sheet sheet.png examples/*.svg card.svg\`. Ask "same hand, same set?" for outline weight, extrusion depth, texture density and character size.
7. **Zoom** every hand, the face, the feet and each contact (card units): \`node scripts/render.mjs card.svg hand.png --zoom 110,170,40,40 --scale 8\`. For the thumb proof, write a throwaway copy with every hand built with \`{ proof: true }\` (thumb \`#ff0000\`, index \`#0000ff\`), zoom each hand at 8x, check it against your notes, then delete the copy.
8. **Critique** on the five criteria in \`references/craft.md\`, harshly, and write the faults down.
9. **Fix** and repeat 5–8; expect four rounds.
10. **Lint:** \`node scripts/lint.mjs card.svg --prefix rl- --palette style.json\`. Fix every ERROR; each WARN must be a deliberate tint.

## Verify

- [ ] No background rect; the card is transparent.
- [ ] Every filled shape has a navy outline of 3.0 author units (2.3–2.4 px); details 1.3–2.4, nothing thinner than 1.2.
- [ ] Every extrusion is navy and steps down-right; depth matches object size (8 windows … 3 small parts).
- [ ] Only palette colours; no gradient, filter, blur, grey or black.
- [ ] Each large colour fill carries a texture or inner detail; hatch sits on an object's right band, a figure's back band and far leg.
- [ ] The figure is 40–51% of the card height (seated: head top 40–45% down the card) with a neck, 3/4 face to the right, blush, navy eyes.
- [ ] Each hand is a union outline with grouped fingers, contour lines and a thumb on the side the handedness table demands.
- [ ] Every hand connects through a forearm and elbow to a shoulder; legs taper hip to ankle.
- [ ] Soles, cones, cubes and standing props sit on one floor line with 2–3 units of overlap, no tangents.
- [ ] 3–5 extruded props overlap the hero window; no big prop floats alone.
- [ ] 6–9 floating marks (#, //, +, dot, ring, cloud), clear of the figure.
- [ ] Ink bounding box 75–81% wide and 66–73% tall: about 100 px of empty margin on each side of the 2x render, left and right equal.
- [ ] The subject reads at 1x without a caption.
- [ ] \`scripts/lint.mjs\` passes with \`--prefix\` and \`--palette style.json\`.
`,
  'flat-with-black': `---
name: illustration-flat-with-black
description: Draws flat vector spot illustrations of tall, long-legged people doing design and coding things, with solid black as a main colour. Traits: no outlines on coloured fills; black as big solid shapes (hair, trousers, shoes, devices) and as thin detail lines; denim blue, leaf green, sun yellow and tomato red on cream skin; dot eyes, round glasses and blush; big shoes on one thin black ground line; two stars and two plus-sparkles as the only decor. Covers palette, line weights, characters, heads, hands, props, composition and a parts helper for limbs, shoes, heads, hands and paper props. Use when someone asks for flat illustration with black, flat people or character illustration, friendly product or SaaS illustration, or art for empty states, onboarding, 404 and error pages, blog headers, feature spots, marketing cards or app screens in this style.
---

# Illustration: Flat with black

Flat-colour scenes of one or two lanky, expressive people acting out a design or coding moment: running from a pile of messages, hovering over a deploy button, a stand-up at a sticky-note board. Colour areas carry the drawing with no outline; solid black does the heavy lifting as hair, trousers, shoes and devices, and as thin detail lines. It suits product empty states, onboarding, error pages and marketing cards that need a person with some personality.

Boundary: use \`illustration-flat\` for the outline-free style with a navy-and-lavender palette and floating confetti; use \`illustration-outlined-cartoon\` when every shape should carry an inked outline and the heads are big; use \`illustration-line-interior\` for thin indigo outlines on white fills. This skill is the one where black is a fill colour.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence
Flat, outline-free colour shapes in four saturated mid-tones, anchored by large solid black masses (20–40% of all painted area), with black reused as thin 0.75–1.6 detail lines and white reused as thin seams on the black.

## Palette

| Role | Hex | Where it goes |
|---|---|---|
| Card background | \`#ffffff\` | No background rect; the card is white |
| Ink (the black) | \`#15202f\` | Hair, trousers, shoes, phones, laptops, cats, mouths, glasses, every thin dark line, ground line |
| Ink in shadow | \`#26313f\` | The far trouser leg or far shoe when the near one is \`#15202f\`; paws |
| Slate | \`#4b5662\` | Cuff bands on black trousers, laptop deck, far table legs, inner ears of a black cat |
| Skin | \`#fadfb9\` | Every face, neck and hand: one skin tone per figure, never a second skin colour |
| Skin shade | \`#efc9a0\` | Ear inner curve, the hidden side of a hand; lines only or a small shaded wedge |
| Blush | \`#f3ad8f\` | Cheek ellipse rx 3.6 ry 2.2 |
| Nose | \`#e29771\` | One 1.1 stroke at the nose tip |
| Mouth in beard | \`#f0a58c\` | Open mouth inside a black beard (no blush on bearded faces) |
| Denim | \`#65aacb\` | Jeans, beanies, desk tops, mugs, wall clocks, blue star |
| Denim shade | \`#5b9bb6\` | Far jeans leg, the underside of a desk top |
| Denim deep / fold | \`#4a8bab\`, \`#3f7894\` | Knee folds on near / far jeans, beanie ribs |
| Pale denim | \`#97c8df\` | Rolled jeans cuffs, sweat drops |
| Sky | \`#a5d1e1\` | Envelopes, sticky notes, phone screens, underline rules |
| Leaf green | \`#a6cf6e\` | Tees and shirts, envelopes, chat bubbles, done notes |
| Green shade / light | \`#8fbb57\`, \`#c6e1a0\` | Far sleeve and fold lines / hem and collar highlights |
| Sun yellow | \`#f9db74\` | Hoodies, envelopes, notes, yellow star, sparkles, cat eyes, code badges |
| Yellow mid / shade | \`#eec55a\`, \`#d9ab3c\` | Hood and far sleeve / hem band, folds, loafer soles |
| Tomato | \`#e56355\` | Tops, chat bubbles, badges, calendar header, tongues, buttons |
| Tomato shade | \`#c94d42\` | Far sleeve, hem band, the lit-from-above dome underside |
| Coffee | \`#6b4a3a\` | Coffee surface in a mug only |
| Rule grey | \`#d9dde2\` | Hairline dividers on a white board only |

- Use at least three of the four mid-tones (denim, green, yellow, tomato) plus black; the deploy card has no green at all. Give the figure's top one hue, the trousers black or denim, and let the props carry the rest.
- Shades are the same hue one step darker, never grey or a gradient. Never use opacity, gradients, filters, patterns or shadows.
- Don't put tomato shoes next to a tomato hero prop: a red shoe pair pulled the eye off the deploy button in an early round. Black shoes are the default.

## Line and fill
Numbers at 480 wide, before the scene group's 0.94–0.95 scale.

- **Coloured fills have no outline.** The only outlined shapes are white ones that would vanish on the white card: a calendar or board (\`#15202f\` 1.2–1.3), a sneaker sole (1.0), gritted teeth (1.2).
- **Ink detail lines:** finger separations 0.73–0.85; envelope flaps 1.05; brows 1.3–1.6; glasses rims 1.5; closed eyes 1.3; motion, alarm and nod ticks 1.3; speed lines 1.3; ground line 1.2–1.25.
- **White detail lines on black and denim:** trouser side seam 0.9, shoe welt 0.85–0.9, laces 1.0, cat whiskers 0.6.
- **Fold lines in the garment's shade colour:** torso and armpit folds 1.0, knee folds 1.15. Two to four per garment.
- **Bars and legs:** table legs 2–2.6 (near in ink, far in slate), a board stand 2.4, code lines on a dark screen 2.2 in palette colours.
- Every stroke uses \`stroke-linecap="round" stroke-linejoin="round"\`. Write the root as \`<svg ... fill="none">\` and give every path its own fill.
- **Shading:** one flat darker band, never a gradient. Hem bands 3–4 tall in the shade colour; collars and hems in the light colour; the far limb in the shade colour.

## Characters
- **Proportions:** 5.2–5.5 heads tall, head 42–45 units; legs are half the height (hip about 118 above the ground in a 235-tall figure). Thighs 25–32 wide, knees 22–25, ankles 19–22. Upper arm about 30 to the elbow, forearm 25. Upper sleeves 15–21, skin forearms 9–13, wrists about 9.
- **Torso:** draw it by hand as one closed path, never a \`tube()\` (a tube torso reads as a sausage): back hem, up the back, shoulder, neckline, chest, belly, front hem, then a hem curve that bows down 3–5. About 40 wide at the hem, 24 at the neckline. Lay a 4–5 tall hem band in the shade colour over its bottom edge.
- **Neck and collar:** draw the neck tube (width 11–12) before the torso so its base hides under the neckline (or after it, with its bottom edge cut to the neckline curve as in \`s5c-a-neck\`), then the collar (a 2.4 stroke in the shade colour) along the neckline. Drawn after the torso, the collar floats on the neck like a necklace. Keep 8–12 units of neck visible.
- **Hips:** where the legs part, fill the crotch with a small seat patch in the near trouser colour, tucked under the hem (about 30 x 15). A large one shows below the hem as a bulge, worst over a \`#26313f\` far leg.
- **Heads:** 3/4 view, rounded jaw, a single nose bump on the profile edge, no nose drawn on the face. Ear as a skin oval with one \`#efc9a0\` curve. Eyes are ink dots r 1.6–1.8 (far eye slightly smaller and higher), or closed arcs when laughing. Round glasses: near lens r 6–6.3, far lens r 4.6–5 (perspective), a short bridge and a temple arm to the ear. Open mouth is an ink shape with a tomato tongue. Use \`head()\` in \`scripts/parts.mjs\` (hair \`bun\`, \`curly\`, \`short\`, \`beanie\`; optional beard, glasses, earring). Brows \`worried\` sit high and only clear the hairline under \`curly\` or \`beanie\`; under \`bun\` or \`short\` they merge into the fringe, so use \`angry\` (determined), \`up\` or \`soft\`. Extra hair such as a ponytail goes in its own group with the head's transform, drawn before the head.
- **Hair and beards** are solid black masses: buns r 8.5, curly clouds of arcs, beards that swallow the jaw. Black hair is part of the black budget.
- **Hands:** skin silhouettes with no outline. Separate fingers with short ink ticks 0.73–0.85, 2.4–5 long: in from the fingertip gaps on an open hand, across the curled knuckles on a fist. Never full-length lines. The thumb is its own lobe overlapping the palm, closed with one ink crease. Hand length about 25 units (chin to brow). Every hand ends in a cuff band in the sleeve's shade colour, then a narrower skin wrist. Templates in \`scripts/parts.mjs\`, each with its handedness as authored: \`hand('palm')\` left, palm visible; \`hand('point')\` right, back visible; \`hand('fist')\` left, palm side; \`hand('push')\` right, back visible, fingers up (pressing a surface). \`flip: true\` mirrors to the other hand with the same side showing; \`proof: true\` gives the red-thumb, blue-index version of \`push\` and \`fist\`. The mug grip is in \`examples/stand-up.svg\` (\`s5c-a-cup\`), the desk brace in \`examples/friday-deploy.svg\` (\`s5b-hand-far\`). New fingers are easiest as capsules: \`<rect rx="1.75" width="3.5">\` on a palm shape.
- **Shoulders:** a set-in sleeve (\`sleeve()\`) puts a round cap at the shoulder point. Keep the far shoulder point 4 or more units inside the torso outline, or the cap pokes out as a hump.
- **Feet:** big shoes, 52–62 units long (1.2–1.4 heads). Black loafers or sneakers with white welts, or a coloured loafer with a darker sole band. The sole sits exactly on the ground line; a back foot may lift its heel about the ball (\`sneakerMap(..., lift)\` with lift 20–26°; past 26° the laces and stripe distort).
- **Clothes:** tee, hoodie or jumper with a hem band and 2–4 fold lines; jeans or black trousers with one white side seam curving through the knee, a short knee crease and a rolled cuff (\`#97c8df\` on denim, \`#4b5662\` on black).
- **Poses that work:** a running stride with a glance back; a deep lean over a desk with one arm braced; two people turned 3/4 toward each other, one gesturing with an open palm; a lunge pushing a big object, back leg straight with the heel up, front knee bent, elbows slightly bent. Torsos lean 10–35°, one knee always bent.

## Decor and props
- **Fixed decor per card:** exactly two five-point stars (one \`#f9db74\` r 7–7.5, one \`#65aacb\` r 6) and two plus-sparkles (\`#f9db74\`, 1.2 stroke, open centre). Put them in empty corners, at least 20 units from any figure.
- **Effect marks, only when the subject needs them:** sweat drops \`#97c8df\`, three alarm ticks over a head, two jitter ticks by a finger, nod arcs, horizontal speed lines. All ink 1.3 except drops.
- **Prop vocabulary:** envelopes and chat bubbles with slightly bowed edges, a red count badge with a bold white number, a wall clock, a hanging calendar, a desk on stick legs, a big red button, a laptop in black, mugs, a sticky-note board, a black cat with yellow eyes. Props are flat colour with ink detail lines, 30–70 units across.
- **Text:** at most one short word or number, \`ui-sans-serif, system-ui, sans-serif\`, weight 800 (FRI 21, DEPLOY 9.6 with letter-spacing 1.1, a badge number 14).
- **Never:** background blobs, plants for filler, confetti, drop shadows, floor patches, outlines around coloured shapes, gradients.

## Composition
- White card, no background rect. Wrap everything in one group: \`<g id="xx-scene" transform="translate(240 178) scale(0.95) translate(-cx -cy)">\`, where \`(cx, cy)\` is the centre of what you drew.
- After that scale the ink box is 296–307 wide and 255–261 tall: margins left and right 86–92, top 46–50, bottom 52–54. The ground line is the widest element (300–320 units at authoring scale, centred under the group) and sets the side margins. In every example the topmost mark is a sparkle, bubble or wall prop at authoring y 34–52; without one the top margin drifts to 70.
- Ground: one ink line at authoring y 302–308. No floor fill.
- Ink covers 12–16% of the card. One figure plus one hero prop, or two figures plus one shared prop. Wall props (clock, calendar, bubble) float in the upper third, clear of heads by 20 or more; put one in whichever upper quadrant the figure and hero leave empty.
- Focal point: the hand–prop contact (finger over the button, fist pumping, palm toward the board). Put it within 60 units of the card centre.

## Techniques

**1. Limbs are tapered tubes with a crisp knee.** Write a small Node generator for the card that prints the SVG, and build legs, sleeves, forearms and necks with \`scripts/parts.mjs\` (import it by absolute path):

\`\`\`js
import { C, P, S, f, at, tube, kneeTube, cuff, sleeve, sneakerMap, sneakerAnkle, bentSneaker } from '/abs/path/illustration-flat-with-black/scripts/parts.mjs';
const G = 308, ID = 'xx-';                                  // ground y, card id prefix
const nearFn = sneakerMap(100, G, 0.95, 26);                // back foot, heel lifted 26 deg
const leg = [[160, 204], [132, 248], sneakerAnkle(nearFn)]; // hip, knee, ankle
let svg = P(kneeTube(leg, [32, 25, 21]), C.ink, \` id="\${ID}leg-near"\`);
const a = at(leg[0], leg[1], 0.3, -6), b = at(leg[1], leg[2], 0.7, -4.5);       // white side seam through the knee
svg += S(\`M\${f(a[0])} \${f(a[1])}C\${leg[1][0] - 2} \${leg[1][1] - 8} \${leg[1][0] - 4} \${leg[1][1] + 4} \${f(b[0])} \${f(b[1])}\`, 0.9, C.paper);
svg += cuff(leg[1], leg[2], 21, C.grey, \`\${ID}cuff-near\`, 0.74, 1.06);
svg += bentSneaker(nearFn, \`\${ID}shoe-near\`, C.denim);
const arm = [[200, 148], [226, 170], [251, 168]];          // shoulder, elbow, wrist
svg += sleeve(arm[0], arm[1], 18, 15, C.red, \`\${ID}sleeve-near\`);
svg += P(tube([at(arm[1], arm[2], -0.05), arm[2]], [12, 9.5]), C.skin);
svg += cuff(arm[0], arm[1], 15, C.red2, \`\${ID}cuff-arm\`, 0.84, 1.08);
\`\`\`

**2. Depth by the darker sibling, then draw order.** Far arm, far leg and far shoe take the shade colour (\`#8fbb57\`, \`#5b9bb6\`, \`#26313f\`, \`#c94d42\`, \`#eec55a\`). Draw: far arm, far leg, near leg, seat patch, neck, torso, hood or collar, near arm, hand, head. The head goes last unless a near arm crosses the face.

**3. Black carries detail in white.** On black trousers and shoes the seam, welt and laces are white strokes (0.85–1.0). On coloured garments the folds are the garment's own shade colour. Ink lines appear only on skin and light fills.

**4. Paper props with a hand-cut edge.** Envelopes and bubbles bow each side out by 1–1.5 units with \`Q\` curves (\`wob()\`, \`envelope()\`, \`bubble()\` in \`scripts/parts.mjs\`) and tilt ±6–12°. Contact sheet of every part: \`node scripts/parts.mjs sheet parts-sheet.svg && node scripts/render.mjs parts-sheet.svg parts-sheet.png\`.

## Failure modes
- **Outline-only prop.** An envelope drawn as an ink outline on white read as a different style; fill every prop with a palette colour and keep ink for interior lines.
- **Second skin colour on one arm.** A forearm in a different tone read as a glove; use \`#fadfb9\` for all skin and \`#efc9a0\` only for lines and small wedges.
- **Straight stick legs.** Judges marked unbent legs as stiff; every leg has a knee point with a fold line, and at least one knee per figure is visibly bent.
- **Front-facing, symmetric figure.** A face-on bearded figure scored 6.5; turned 3/4 toward the colleague with weight on one leg it scored 8.
- **Thumb on the wrong side.** A whole hand pass was rejected for this; follow the handedness table in references/craft.md and run the thumb proof on every hand you rotate or flip.
- **Fist pasted on a sleeve.** Always draw cuff band, narrower skin wrist, then the hand.
- **Shoes floating or sinking.** The sole bottom must sit on the ground y: a loafer placed at \`y = G - 13 * scale\`, a sneaker built with \`sneakerMap(x, G, ...)\`.
- **Ground line off-centre.** It must be centred under the figure group, or the card reads lopsided.
- **Tomato shoes competing with the hero.** Saturated shoes stole focus from the red button; black shoes anchored the figure and fixed it.
- **Collar floating on the neck.** Drawn after the torso, the collar reads as a necklace; neck first, torso, then collar on the neckline.
- **Hump on the back.** A far shoulder cap placed on the torso edge pokes out; move the shoulder point inside.
- **Bulge between the legs.** An oversized seat patch hangs below the hem; keep it tucked under.
- **Effect mark through the face.** A speed line placed by coordinates crossed the eyes; check every tick, drop and line at 1x and 4x.
- **Empty upper quadrant.** With a tall prop on one side and the figure low on the other, one upper corner goes dead; add a bubble or wall prop there.
- **Too much decor.** More than two stars and two sparkles turns into confetti and drifts toward \`illustration-flat\`.
- **Black too light.** Under about 20% black by area it stops being this style; make hair, trousers, shoes or a device black.

## Examples
- \`examples/messages.svg\`: "Messages". A running stride with a glance back, a fist pumping, a laptop clamped under the arm; a swarm of envelopes, chat bubbles and a dark code-review bubble with a count badge. Shows the running pose and wobbly paper props.
- \`examples/friday-deploy.svg\`: "Friday Deploy". A deep lean over a desk, one hand braced over the edge, one finger hovering over a big red DEPLOY button; gritted teeth, sweat drops, a clock, a FRI calendar and a black cat. Shows the brace grip, pointing hand, heel-lift sneaker and black trousers.
- \`examples/stand-up.svg\`: "Stand-up". Two people turned toward each other at a sticky-note board, both holding mugs, one presenting with an open palm, one nodding. Shows two-figure balance, contrapposto, mug grips, loafers and a beanie and beard head.

## Workflow
Run every command from the skill folder (the folder that holds this file).

1. **Brief.** Name the subject in two words and the one action that shows it. Pick one figure and one hero prop (or two figures and a shared prop). Check the idea isn't a recomposition of any reference you have seen (references/craft.md, Originality).
2. **Pose.** Sketch the skeleton as points: ground y, hips, knees, ankles, shoulders, elbows, wrists, head centre. Lean the torso, bend a knee, decide where the weight sits.
3. **Hands first, on paper.** For every hand write left or right, palm or back, finger direction and thumb side (craft.md, Handedness).
4. **Block.** Write a generator (\`card.mjs\`, anywhere) that imports \`scripts/parts.mjs\` by absolute path and prints the SVG to stdout. Give it a \`PROOF=1\` switch that passes \`proof: true\` to every \`hand()\` call, and colours hand-drawn thumbs \`#ff0000\` and index fingers \`#0000ff\`. Place the black masses first, then the hues, then skin.
5. **Draw** heads with \`head()\`, limbs with \`kneeTube\`/\`tube\`/\`sleeve\`/\`cuff\`, shoes with \`sneakerMap\`+\`bentSneaker\` or \`loafer\`, then props, effect marks, two stars and two sparkles.
6. **Render:** \`node /path/card.mjs > card.svg && node scripts/render.mjs card.svg card.png\`
7. **Sheet with the examples:** \`node scripts/render.mjs --sheet sheet.png examples/*.svg card.svg\`. Ask "same hand, same set?"
8. **Zoom** every hand, the face, the hips and both shoe contacts at 4–8x: \`node scripts/render.mjs card.svg z-hand.png --zoom x,y,w,h --scale 8\`. Thumb proof: \`PROOF=1 node /path/card.mjs > proof.svg && node scripts/render.mjs proof.svg proof.png --zoom x,y,w,h --scale 8\`, check it against step 3, then delete proof.svg.
9. **Measure** margins and black share against the Composition numbers.
10. **Critique** on the five criteria in craft.md, harshly; fix and repeat from step 6. Expect four rounds.
11. **Lint:** \`node scripts/lint.mjs card.svg --prefix xx- --palette style.json\`. Fix every ERROR; each WARN must be a deliberate one-off.

## Verify
- [ ] No coloured shape has an outline; only white shapes carry an ink edge.
- [ ] Black (\`#15202f\` plus \`#26313f\`) covers roughly 20–40% of the painted area, in at least two masses (hair and trousers, or shoes and a device).
- [ ] At least three of the four mid-tones appear; no colour outside style.json except a deliberate one-off.
- [ ] Every figure is 5.2–5.5 heads tall with long legs, at least one bent knee and a torso lean.
- [ ] Every hand has a cuff, a narrower wrist, short finger ticks and a thumb on the correct side (thumb proof done).
- [ ] Shoes are 52–62 units long and their soles touch the ground line exactly (zoom at 8x).
- [ ] Faces have dot or arc eyes, a blush ellipse, a nose tick on the profile edge, an ear with one inner curve.
- [ ] Far limbs are the shade colour and drawn behind the torso; no far shoulder cap pokes out of the back.
- [ ] The neck sits under the neckline and the collar lies on it; no seat patch shows below the hem.
- [ ] Exactly two stars and two sparkles, clear of the figure by 20 units or more.
- [ ] Ground line 1.2–1.25 ink, centred under the group, the widest element.
- [ ] Ink box about 300 x 258 with side margins 86–92 and top margin 46–50, the top set by a sparkle, bubble or wall prop.
- [ ] The subject reads at 1x from the figure's action and one prop, without the caption.
- [ ] Lint passes with the card's id prefix.
`,
  'framed-panel': `---
name: illustration-framed-panel
description: Draws original design-and-coding scenes as SVG cards (480x360) in a framed-panel cartoon style. Identifying traits are a soft pastel card with a periwinkle-violet panel framed in thin navy, outline-only clouds and a pale lavender floor band with dashes inside it; L-shaped corner brackets outside two corners; white speech bubbles, UI cards and bushes that break out over the frame edge; and a semi-real character with a thin navy outline (1.25 px), muted flat fills, navy hair with violet highlights, blush and short paired hatch marks. Covers people working with laptops, screens, UI parts and devices. Use when someone asks for a framed panel, window-frame or picture-frame illustration, pastel violet cartoon, outlined flat character scene, empty-state, onboarding or 404 art, a blog header, a feature spot, a support, about or team page illustration, or a marketing card with a person.
---

# Illustration: Framed panel

A cartoon person at work inside a violet "window", painted on a pastel card. The panel gives the scene a stage, and the UI bubbles and bushes that spill over its edge make it feel lively rather than boxed. Use it for friendly product and team moments: support, live streams, design work, onboarding.

Boundary: for people without a frame on a plain white background with inked outlines and big heads, use \`illustration-outlined-cartoon\`. For flat shapes with no outlines and floating confetti, use \`illustration-flat\`. For a single object with no person, use \`illustration-teal-spot\`.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence

A fixed violet panel with a thin navy frame sits on a pastel card, with outline clouds and a dashed lavender floor inside it, and the scene's white bubbles, UI cards and leaves break out across its edge.

## Palette

Measured from the examples. Every card uses the navy line, the panel set and the bubble set; pick one card pastel.

| Role | Hex | Where it goes |
|---|---|---|
| Card: peach / orchid / sky cyan | \`#F7D8B5\` / \`#DFA5D4\` / \`#A7E0ED\` | full-bleed card, one per card |
| Bracket and outside marks | \`#9C878C\` / \`#A3739B\` / \`#6E9FAD\` | brackets on the matching pastel |
| Navy line | \`#2E2A5C\` | every outline, clouds, hatch marks, eyes, bold UI text |
| Panel | \`#8A80EA\` | panel fill (also a UI accent: slider, swatch) |
| Floor band / floor dashes | \`#D0CCF4\` / \`#8F88D6\` | floor rect y 256–312, its short dashes |
| Contact shadow | \`#B5AEEA\` | flat ellipses under feet, chairs, beanbags |
| Bushes | \`#BACCA6\`, \`#A9C094\` front layer | scalloped bushes on the floor line |
| Hair / hair highlight | \`#433D71\` / \`#7C74C4\` | all hair; highlight strokes; folds on dark fabric |
| Skin (three tones) | \`#EDB0A2\`, \`#F0BFA4\`, \`#D49A80\` | face, neck, hands |
| Blush | \`#E8878A\` at opacity 0.5–0.6 (on \`#D49A80\` skin: \`#C46A5C\` at 0.55) | cheek ellipses, tongue line |
| Mouth | \`#9A3E52\` (\`#8A3A48\` on tan skin) | open smile |
| Tops | mustard \`#EDB24F\` (cuff \`#E0A23E\`), mint \`#95D1B3\` (shade \`#79BC9C\`), orange \`#EE8A6E\` (shade \`#D9735A\`) | sweaters, hoodies, cardigans |
| Trousers | \`#6A63B0\` (folds \`#A29DDA\`), \`#4A4488\` (folds \`#7C74C4\`) | jeans |
| Cream / white | \`#FCF6EA\`, \`#FCFAF3\` / \`#FFFFFF\` | tees, socks, shoe uppers, code windows / bubbles and UI cards |
| Red accent / its shadow | \`#E35D5B\` / \`#B8434A\` | shoe soles, tags, buttons, heart, errors |
| Pale red, pink | \`#E9A3A0\`, \`#F8CCC8\`, \`#F4E0E8\`, \`#F29CA0\` | secondary UI lines, error rows, drop slots, code tokens |
| Green / dark green / pale green | \`#5FA77A\` / \`#3E8E5E\` / \`#CDEBD6\` | check badges, toggles, success rows |
| Mint, sage | \`#8FD0B0\`, \`#6FB585\`, \`#79C2A8\` | icon chips, image placeholders, avatar shirts |
| Yellow, orange | \`#EDB24F\`, \`#F09A5E\` | swatches, earrings, highlighted code |
| UI greys | \`#BDB8D6\` lines, \`#6E6A8E\` / \`#7D79A0\` dark lines, \`#C9C5DE\` raised-shadow, \`#CFCBE0\` line numbers | text placeholders inside bubbles |
| Devices | \`#C9C7DA\` body, \`#9F9CB8\` / \`#B7B5CC\` / \`#A9A7C0\` edges, \`#DCDAE8\` keyboard, \`#A9A6C2\` keys, \`#3A3570\` screen, \`#524C98\` active line, \`#6E68AA\`, \`#E8E6F8\`, \`#BDB8F0\` code on dark | laptops, monitors |
| Furniture | \`#C9C5E8\` + \`#A9A4D8\` seams, \`#B9B4DE\`, \`#D8D3F0\` grid, desk \`#F6E7D2\` top / \`#E3B98E\` edge, \`#FFF4D6\` lamp glow | chairs, drawers, boards, desks |
| One-off prop tint | e.g. plum \`#B2679E\` (the Support beanbag) | one large prop per card may take its own muted tint; lint will WARN on it |
| Avatars | \`#FBE3CC\` background, \`#F1B9A2\` skin, \`#D9774E\` ginger hair | small faces inside bubbles |

- No gradients, filters or patterns. Opacity only on blush ellipses (0.5–0.6) and on glasses lenses (\`fill-opacity\` 0.18).
- Never put the panel violet behind a violet top or violet trousers without a navy outline between them; the figure has to separate from the panel by value (mustard, mint, orange, cream all do).
- The card pastel never appears inside the panel, and the panel violet never fills the card.

## Line and fill

- One outline colour, navy \`#2E2A5C\`, always a stroke over a flat fill, round caps and joins.
- Widths at 480 wide: panel outline **1.35**; body, clothes, furniture, bubbles **1.25**; hands, shoes, bushes, neck **1.05–1.15**; clouds and floor line **1.2**; fold curves **0.9–1.1**; hatch pairs and inner ear **0.85–0.9**; finger separations **0.75–0.8**; corner brackets **1.25** in the bracket colour.
- Texture is drawn, never filtered: pairs of short parallel slashes (each 3–4 long, the second 1 right and 5 lower, slanting up-right, navy 0.9) scattered 2–4 pairs per garment; a few longer fold curves; on dark trousers and hair, folds and highlights in the lighter tint (\`#A29DDA\`, \`#7C74C4\`) at 1.0–1.2.
- Shading is a flat darker tone with no outline, laid inside a shape along one side (\`#D9735A\` panels inside an \`#EE8A6E\` hoodie; \`#79BC9C\` cuffs on a mint sweater).
- Raised UI parts (buttons, toggles, tags, chips) have a darker copy 3 px straight below (\`#B8434A\` under red, \`#3E8E5E\` under green, \`#C9C5DE\` under white).
- Every white bubble and card gets one short inner corner tick (\`Q\` curve, 1.0) 5–7 px inside a top corner: the "sketchy" hand.
- Text: \`ui-sans-serif, system-ui, sans-serif\`, weight 700–800, 10–16 px, navy or white. At most three words per card ("Fixed it!", "+1", "LIVE", "Aa").

## Characters

- **One figure per card**, seated or kneeling: the panel interior is 266 tall and every example figure spans 195–215 px from hair top to floor. A standing adult (about 5.5 heads) does not fit; crouch, sit, kneel or crop at a desk.
- **Head:** use \`face()\` from \`scripts/panel-kit.mjs\`; it is the same face in all three examples. 3/4 view, 36 wide and 46 tall (brow to chin), chin at (232, 166.5) before your transform. Near eye a navy ellipse rx 1.8 ry 2.1 with an upper-lid arc and a lash flick to the outside; far eye smaller (rx 1.5 ry 1.9); arched brows 1.2; a single hook nose on the far side of the face; an open smile filled \`#9A3E52\` with a pink tongue line; blush ellipse 7.6 × 4.2 under the near eye and a small one at the far cheek edge; ear with one inner curve; a gold earring.
- **Placing the head:** wrap face, neck and hair in one \`<g transform="translate(dx dy) rotate(a 232 166)">\`; tilt 4–8° into the action. Mirror with \`scale(-1 1)\` to look left. Never scale the head: the line weight would change.
- **Hair:** navy-violet \`#433D71\` masses with 1.25 outline: a back mass drawn before the face and a fringe or cap after it. Add 3–5 highlight strokes \`#7C74C4\` (1.1–1.2) following the hair direction and 1–2 navy inner strokes (0.9–1.0). The examples show a bob with a side fringe, a high bun with a scrunchie, and a curly crop.
- **Body:** torso 60–70 wide, soft trapezoid, sleeves as separate shapes overlapping the torso. Necklines and hems drawn as a second line 3–4 px inside (ribbed hem: a line plus short vertical ticks every 6–7 px). Cardigans have 2 buttons (r 1.5); hoodies have cream drawstrings (1.6) with tiny rectangular tips.
- **Hands:** about 22–26 px long, a little shorter than the face. Built as cuff band (the sleeve's shade tone, 5–6 wide, one centre line at 0.8) → forearm in skin → wrist → palm → fingers separated by short inner curves at 0.75–1.0, knuckle bumps on the outline. Thumbs are a separate small shape. Templates: \`typeHand()\` (flat or typing, back of hand), \`pointHand()\` + \`pointCuff()\` (index extended, others curled, thumb across), \`gripHand()\` (a right fist round a handle, back to the viewer, thumb over the top on the business end) and \`kneeHand()\` (the far arm of a right-facing seated figure, hand palm-down over a knee). Before placing any of them, decide left or right, palm or back, finger direction, and check the thumb side with the table in \`references/craft.md\`; mirror the template with \`scale(1 -1)\` when the table says the thumb belongs on the other edge.
- **Legs and feet:** jeans taper from hip to ankle with a knee bend; when both legs overlap, give the far leg the darker jean \`#4A4488\` (folds \`#7C74C4\`) behind a \`#6A63B0\` near leg; hems as a single line; a sock or bare ankle 2–3 px; white sneakers with a 3-px red sole (\`sneaker()\`), a toes-tucked shoe for kneeling (\`tuckedShoe()\`). Shoes always touch the floor band or a footrest, with a contact ellipse under them.
- **Poses that work:** cross-legged on a beanbag leaning into a laptop (the body rotated −5° about the hips), kneeling on one knee while pressing a button into a board, seated on a chair pointing at a monitor while looking back at the viewer. Each has a lean, a twist or a bent knee.

## Decor and props

- **Inside the panel:** 2 cloud doodles (a big one ~50 wide and a mid one ~44 wide, each with a 3-px dash to its right), optionally a small one (~17 wide), plus 2–4 tiny single-arc ticks (~9 wide), all outline only, in the sky area and never behind the head; one wall prop at most (a code window, a ring light, a grid board).
- **Floor:** the band from y 256 to 312 with a navy line at 256 and 6–7 dashes (10–26 long, some followed by a 4-px dash after a 5-px gap) near its top corners and bottom edge.
- **Bushes:** 1–2, standing on the floor line at a bottom corner; at least one crosses the panel's side edge.
- **Breakouts:** exactly 2 white UI pieces (speech bubble, UI card, type specimen) that cross the frame: one upper-left across the left edge (x about 62–166, y 58–134), one on the right across the right edge (x about 336–436, y 150–250). Optional third: a small red tag across the top-left corner. Each holds an icon or avatar plus 2–4 text lines; no paragraphs.
- **Outside the panel:** the two corner brackets (top-right and bottom-left, fixed coordinates) and 2–3 parenthesis marks: a double arc beside one side, a single arc beside the other, in the bracket colour. 0–2 navy sparkle ticks (three short radiating strokes, \`ticks()\`) beside a breakout.
- **Never:** confetti, stars, gradients, drop shadows, a second figure, a frame in any colour other than navy, decor in the card margins beyond the brackets and marks.

## Composition

- Card: square full-bleed rect, no \`rx\`. Panel: \`x 110 y 46 w 262 h 266\` (55 % of the width, 74 % of the height), fill \`#8A80EA\`, navy outline 1.35, identical in every card.
- Draw order: card → brackets and marks → panel fill → clouds → wall props → floor band, line, dashes → props wholly inside the panel → **panel outline** → bushes that cross the edge → furniture and figure → breakout bubbles and cards → sparkle ticks. Anything that crosses the frame is drawn after the outline so it sits on top of it.
- The figure's centre line sits at x 205–235, slightly left of the panel centre (241), facing the prop on the right; the head is in the upper half of the panel with 30–60 px of sky above the hair.
- Weight: the left breakout high, the right breakout at mid height, the bushes low at the corners, so the three non-figure masses form a loose diagonal.
- Breakouts cross the frame by 40–65 px (measured: 44–64 in the examples). A card that only clips the edge by 10–20 px reads as misplaced, not as breaking out.
- The lower half needs one furniture mass 120–200 px wide (beanbag, desk, component board, or a seat plus a side table). A figure on a thin stool alone leaves a violet hole under the right breakout.
- Margins: everything stays inside x 40–450 and y 30–325.

## Techniques

\`scripts/panel-kit.mjs\` holds every repeated part, lifted from the examples (no dependencies, deterministic). Generate the frame, then hand-draw the figure and props in between. \`node scripts/panel-kit.mjs demo "$WORK/kit.svg"\` draws every part on one card so you can see them before using them.

1. **The frame.** \`scaffold({ prefix, bg, label, clouds, wall, inside, front })\` returns the whole card with the layers in the order above. \`cloud(x, y, 'big'|'mid'|'small'|'tick')\` and \`bush(x, 'big'|'mid'|'small', { mirror })\` place the doodles; \`floorShadow(cx, cy, rx)\` puts a contact ellipse on the floor.
   \`\`\`sh
   node scripts/panel-kit.mjs scaffold "$WORK/card.svg" --bg orchid --prefix xx- --label "Card Name"
   \`\`\`
2. **Breakouts.** \`bubble({ x, y, w, h, tail: 'down'|'left'|'right', at })\` draws a white speech bubble (radius 8, 11-px tail) with its corner tick; wrap it in a \`<g stroke="#2E2A5C" stroke-width="1.25">\`. \`raised(x, y, w, h, rx, face, under)\` and \`textLine(x, y, len, colour)\` fill it.
3. **Head and shoes.** \`face({ skin, blush, blushOpacity, mouth, earring, smile })\` and \`neck(skin)\` in template coordinates; \`sneaker(x, y, { mirror })\`, \`tuckedShoe(bx, by)\`.
4. **Texture.** \`hatch(x, y)\` returns a pair of slashes: \`<path d="\${hatch(186, 214)} \${hatch(214, 196)}" stroke="#2E2A5C" stroke-width="0.9" fill="none" stroke-linecap="round"/>\`.
5. **Holding things.** Draw the held object first, then \`gripHand()\` over it, so the curled fingers and thumb overlap the handle; rotate the fist so its fingers follow the forearm, and tilt the handle up to 45° off the thumb axis for wrist bend. To show a lens or screen magnifying what is behind it, redraw that content inside a \`clipPath\` of the lens, scaled 1.6 about the lens centre, then a white \`fill-opacity\` 0.18 glass and two short white glare strokes; give the rim a light metal \`#C9C7DA\`.
6. **Moving traced paths.** \`xf(d, { ox, oy, tx, ty, s, sx, sy })\` moves, scales or mirrors path data while keeping stroke widths exact; use it instead of \`transform="scale()"\` on anything outlined.

## Failure modes

- **Typing hand without a thumb.** Both judges marked the Support card's first typing hand for it. Every hand shows its thumb or is turned so the thumb is plainly hidden behind the palm; check with the thumb proof.
- **Thumbs on the wrong side.** A designer rejected a whole pass of hands across the set for this. Write down left/right, palm/back and finger direction for each hand before drawing it.
- **Upright on a soft seat.** "She sits upright, with no sink into the beanbag": lean the torso 5° into the work, drop the hips below the cushion's rim and dent the cushion outline around them.
- **Too clean a line.** Judges found the line "cleaner and more even than the pack's sketchy line". Mix widths (0.75–1.35 as listed), add the bubble corner ticks, hatch pairs and short tick marks at seams.
- **UI kit instead of doodles.** Breakouts that are full mini-interfaces read as a UI kit. Keep each to an icon, an avatar or a big glyph plus 2–4 placeholder lines.
- **Too many bubbles.** Live Coding's early drafts stacked a heart bubble and a "+1" bubble on the left; the shipped card (scored 9) merges them into one "+1 ♥" bubble and balances the bottom corners with a bush on each side.
- **A lone prop clutters the floor.** A PC tower beside the desk was cut from Live Coding; keep the floor to the furniture the figure uses plus bushes.
- **Simplified crossed legs.** The Support card's crossed legs and socks were called simplified: draw the far foot tucked under the near knee, the near shin crossing in front, a visible sock band and the sole of the near foot.
- **Figure merges with the panel.** Violet clothes on the violet panel lose the silhouette; dress the figure in mustard, mint, orange or cream, and keep dark trousers below the floor line where the band is pale.
- **Floating feet.** Shoes need a \`#B5AEEA\` contact ellipse and must sit on y 295–304 in the floor band, or visibly on a footrest.
- **A foot reaching for the stool ring.** On a stool whose footring sits about 35 px under the seat, the knees are too far forward for a foot to reach it; a tucked far leg drawn there plugged its shin into the shoe's toe. Plant both feet: the far shin drops from under the near thigh, its shoe tucked behind the near shoe with the sole about 3 px higher. Draw a footring as a true ellipse (two cubic halves, not two quadratics that meet in points), with the back half drawn before the post and the front half after it.
- **A dark lens reads as a frying pan.** The self-test's first magnifier had a hair-navy rim and grey glass; a light \`#C9C7DA\` rim and a magnified view of the card under it made it read at once.
- **Glyphs that turn into digits.** Open hook quote marks at 10 px read as "66" (self-test); draw quotes as two filled teardrops and check every small glyph at 1x.
- **A handle pasted over the fist.** Drawn after the hand, a handle sits on top of the fingers and the grip reads as a sticker; the handle goes first, the fingers and thumb over it.

## Examples

- \`examples/support.svg\`: Support (peach). Cross-legged on a plum beanbag, typing on a laptop on her lap, leaning in; a user's question bubble breaks out left, a "Fixed it!" reply breaks out right, a code window with a bug row and a fixed row hangs on the panel wall. Shows the typing hand, crossed legs, beanbag compression, kicked-off sneakers.
- \`examples/design-system.svg\`: Design System (orchid). Kneeling on one knee, pressing a red button into its dashed slot on a grid board of components (swatches, toggles, slider, avatar chip); a selected component card with handles and a cursor breaks out top-left, an "Aa" type card breaks out right. Shows kneeling legs, a toes-tucked shoe, a two-handed push, raised UI parts.
- \`examples/live-coding.svg\`: Live Coding (sky cyan). Seated at a desk on a swivel chair, pointing at code on a monitor while grinning at the viewer; a mic on a boom arm, a ring light, a mug; a red LIVE tag crosses the top-left corner, a "+1 ♥" chat bubble breaks out left, a code snippet bubble breaks out right. Shows the pointing hand, a mirrored head with glasses, a hoodie with strings, desk drawers.

## Workflow

Run commands from this skill's folder. \`WORK\` is your own work folder (any path); the card is \`$WORK/card.svg\` with id prefix \`xx-\`.

1. **Brief.** Name the subject and write one line each: the figure's action (verb + object), the pose (sit, kneel, crouch), the wall prop, the two breakouts and what each says, the card pastel.
2. **Pose and hands first.** Sketch the figure as boxes on paper or in comments: hip point, knee, feet on the floor band, the shoulder line and where each hand lands. For every hand write down left or right, palm or back, finger direction and the thumb side from \`references/craft.md\`.
3. **Scaffold:** \`mkdir -p "$WORK" && cp scripts/panel-kit.mjs "$WORK/" && node scripts/panel-kit.mjs scaffold "$WORK/card.svg" --bg peach --prefix xx- --label "Card Name"\`. For anything beyond the empty frame, write a small generator in \`$WORK\` that imports \`./panel-kit.mjs\` and calls \`scaffold({ ..., front })\` with your figure.
4. **Block** the furniture, torso, legs and head (via \`face()\`), render, and check the silhouette and the lean at 1x before any detail.
5. **Draw** clothes, hands, hair, props and breakouts; then add folds, hatch pairs, corner ticks.
6. **Render** (headless, 2x): \`node scripts/render.mjs "$WORK/card.svg" "$WORK/card.png"\`
7. **Sheet next to the examples:** \`node scripts/render.mjs --sheet "$WORK/sheet.png" examples/*.svg "$WORK/card.svg"\`. Ask "same hand, same set?": frame, line weight, how much breaks out, the face.
8. **Zoom** every hand, the face, the feet and every contact at 5–8x, re-rendered from vector: \`node scripts/render.mjs "$WORK/card.svg" "$WORK/hand.png" --zoom x,y,w,h --scale 8\`. Do the thumb proof from \`references/craft.md\` on a throwaway copy.
9. **Critique** against the five criteria in \`references/craft.md\`, fix, and repeat. Expect four or more rounds.
10. **Lint:** \`node scripts/lint.mjs "$WORK/card.svg" --prefix xx- --palette style.json\`. Fix every ERROR; each WARN must be a deliberate tint.

## Verify

- [ ] Card is one full-bleed pastel rect (peach, orchid or sky cyan) with no \`rx\`.
- [ ] Panel at exactly \`110, 46, 262 × 266\`, fill \`#8A80EA\`, navy outline 1.35, drawn after the inside props and before the breakouts.
- [ ] Corner brackets at top-right and bottom-left in the card's bracket colour, plus a double and a single parenthesis mark outside the sides.
- [ ] Two outline clouds with their tail dashes and 2–4 tiny arc ticks inside the panel; nothing filled in the sky.
- [ ] Floor band y 256–312 with its navy line and 6–7 dashes; every foot and chair leg on it with a contact ellipse.
- [ ] Exactly two white breakouts crossing the left and right frame edges, each with a corner tick; at least one bush crossing a side edge.
- [ ] All outlines navy \`#2E2A5C\`; widths in the listed bands (no stroke over 1.35 except deliberate UI bars).
- [ ] The face is the shared template (eye sizes, lash flick, hook nose, blush), placed by translate and rotate only.
- [ ] Every hand has a cuff band, a wrist narrower than the palm, separated fingers and a thumb on the side the handedness table gives.
- [ ] The pose has a lean, twist or bent knee; the seat or floor visibly takes the weight.
- [ ] 2–4 hatch pairs per garment, hair highlight strokes, at least one flat shade panel or darker cuff.
- [ ] Text is three words or fewer, 700–800 weight, navy or white.
- [ ] \`lint.mjs --palette style.json\` passes; any WARN is a tint you chose on purpose.
`,
  'grainy-gouache': `---
name: illustration-grainy-gouache
description: Draws original cosy animal scenes as hand-authored SVG cards (480x360) in a grainy gouache, risograph-like style. Identifying traits are flat shapes with no outlines on a hot-pink card; soft 3-4 stop gradient shading on every rounded form, darker toward edges and base; a fine dark multiply grain that gathers at each shape's edges; a chalky purple-pink shadow pooled under the group; and big glossy eyes with cream star highlights, framed by grained autumn leaves and sparse cream sparkles. It covers design and coding moments with one cute animal at a laptop, monitor, desk, window, mug or book stack. Use when someone asks for grainy, gouache, riso, risograph, textured, cosy, cozy, autumn, hygge, storybook or children's-book style animal art, or for an empty state, onboarding step, 404 page, blog header, feature spot or marketing card with a warm handmade feel.
---

# Illustration: Grainy gouache

A warm editorial style: one cute animal doing a design or coding thing, painted in flat, outline-free shapes that are softly shaded and dusted with fine dark grain, on a saturated hot-pink card with cream sparkles and falling autumn leaves. Use it where a product wants warmth and charm: empty states, onboarding, seasonal blog headers, "we're working on it" pages.

Boundary: for clean flat vector with no texture and no animals, use \`illustration-flat\`. For a hand-inked critter with hatching and googly eyes on white, use \`illustration-ink-sketch\`. For people with inked outlines, use \`illustration-outlined-cartoon\`. This style has no human cards; if a brief needs a person, use one of those instead.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence

Outline-free shapes, each filled with a soft light-to-dark gradient and then speckled with a fine dark grain that thickens toward the shape's edges and into its shadows, sitting on hot pink #FF81BE with a chalky purple pool beneath.

Remove the edge-gathered grain and it becomes plain flat vector; change the pink and it stops belonging to the set.

## Palette

Measured from the examples. Every large form uses a ramp, never one flat colour. \`style.json\` lists every legitimate value.

| Role | Hex | Where it goes |
|---|---|---|
| Card background | \`#FF81BE\` | full-bleed rect, every card, including night and rain scenes |
| Cream | \`#FDD5A8\` | sparkles, bursts, dots, steam, code text, rain, pompom, fur ticks |
| Cream light | \`#FFF3E2\` | tiny glints on drops and pompoms only |
| Pool shadow / core | \`#B95A93\` / \`#A04A80\` | chalky floor pool; core at opacity 0.8 under the heaviest object |
| Blush | \`#FF7FB0\` | cheek ellipses at opacity 0.6 |
| Vermilion | \`#FF4816\` | flat accents: editor dot, bookmark, commit node |
| Vermilion ramp | \`#FF5A24\` \`#F2440F\` \`#F0420E\` \`#B02B08\` \`#9C2306\` | mugs, plant pots, fox fur (radial \`#FF5A26\`→\`#FB4714\`→\`#D9380C\`→\`#9C2406\`) |
| Coral | \`#FF6A3A\` | code accent, mug rim, sticky note |
| Knit | \`#EE430F\`+\`#C2320A\`, dark \`#D2360B\`+\`#A42807\`, rib \`#E03A0C\`+\`#A8290A\` | sweater, sleeves, beanie, cuffs |
| Ochre / gold | \`#E7A13A\` / \`#D88A1E\` | code keywords, sticky notes, band borders / gilt rules, fringe, owl toes |
| Ochre ramp | \`#E38C1E\` \`#C96E05\` \`#9E5004\` | window frames, book covers |
| Wood top | \`#F0A23C\`→\`#D98418\`, edge \`#F6B860\`, contact \`#7A3A04\` @0.38 | desk tops, sills |
| Maroon ramp | \`#8A220A\` \`#701001\` \`#4A0901\`, deep \`#5A0E02\` \`#3A0601\` | books, desk and sill fronts, round window frames, aprons |
| End shade | \`#1A0402\` | gradient overlay at 0.4-0.5 on both ends of boxes and spines |
| Screen | \`#8A2632\`→\`#621626\`→\`#3A0A14\` | screens; night sky \`#3A1424\`→\`#1C0910\`; rain pane \`#22090F\`→\`#4E1420\` |
| Near-black | \`#191113\` bezel, ramp \`#3A2E31\`→\`#0D0809\`, edge \`#6A5A5F\` | laptops, monitors, lamps, paws, ear tips |
| Face ink | \`#0D0809\` pupils/nose, \`#120A0B\` \`#1A0E0F\` lines, \`#F7D6A6\` eye ring | faces |
| Cream fur | \`#FFE6C4\`→\`#FCD9AE\`→\`#F0BF88\` | muzzles, chests, tail tips (radial) |
| Ivy | \`#16592C\` \`#0F4A23\` \\| \`#0C3F1D\` \`#082F15\`, veins \`#06150A\` | ivy leaves, vines |
| Olive | \`#7A7318\` \`#6A6416\` \\| \`#524810\` \`#3C350C\`, veins \`#1C1804\`; mug \`#5E5712\` | olive leaves, plant, mugs |
| Olive accent | \`#A8B030\` code green, \`#8A9416\` editor dot, \`#545C01\` scarf | small accents only |
| Oak | \`#E08A1C\` \`#D47A0C\` \\| \`#C96E05\` \`#A85A05\`, veins \`#3A1404\` | oak leaves |
| Fur, amber | \`#E59240\`→\`#CF7426\`→\`#A9531A\`→\`#7A3510\`; limbs \`#B85E1E\`→\`#5E280C\`; paws \`#6A3418\`→\`#32150A\` | brown animals |
| Fur, owl | \`#F0962E\`→\`#DC7A14\`→\`#B85A08\`→\`#8A3E04\`; wing \`#7E2A06\`→\`#461402\` | orange animals |

Never: an outline around a shape; blue, teal, purple or grey anywhere except the pool; pure white except the lamp-light cone; any background but \`#FF81BE\`; a large shape in one flat colour; glows or rim lights. Cream decor never sits on cream fur, and a vermilion head never sits on pink alone: put it in front of a dark plane.

## Line and fill

At 480 wide:
- **Shapes are fills, never stroked.** Separate shapes with a value or hue step plus the grain edge. A stroke around a mug or a head is the first sign of a different style.
- **Thin dark detail lines only**, round caps, never \`#000\`: leaf veins 0.6-0.7, leaf stems 0.9, whiskers 0.75-0.8 (\`#1A0E0F\` or \`#3A1A0C\`), mouth and lid line 1.05-1.3 (\`#120A0B\`), finger creases 0.7 (\`#1A0A04\`), feather lines 0.9-1.1.
- **Cream lines:** steam 1.15-1.35, burst rays 1.3, scarf braces 1.1, rain 1.0 at stroke-opacity 0.22-0.5, ear-fur ticks 1.1.
- **Code on screens:** stroke 2.2-2.6, round caps, rows 7-8.4 apart, 2-3 segments per row in ochre, cream, coral, olive-green.
- **Gradients:** radial for round forms (cx 0.42-0.46, cy 0.30-0.34, r 0.72-0.78; stops light 0, mid 0.5, shade 0.82, edge 1). Vertical linear for slabs (light top, dark base). Horizontal 5-stop for cylinders (dark 0, mid 0.22, highlight 0.45, mid 0.75, darkest 1).
- **Overlays** add depth without new colours: \`gEnds\` across a box, \`gBase\` (\`#5A0E02\` 0→0.5) at a cylinder's foot, a crown band (\`#7A3510\` @0.3) clipped to the top of a head, a radial "sweat" (\`#5A0E02\` 0→0.55 at the rim) over a torso, sleeve gradients (dark maroon 0.55 outside → \`#FF8A50\` 0.12-0.22 inside).
- **Cast shadows inside the figure:** the sleeve path filled \`#4A0901\`, blurred 2.4 (\`soft\`), offset 3.5 px, clipped to the torso, opacity 0.85.
- **Grain:** wrap every solid shape group in \`filter="url(#p-grain)"\`; big light planes (window frames, desk tops) use \`grainL\`. Faces' details, code, cream decor, whiskers and veins stay crisp: draw them outside the grain group, after it.
- **Patterns** (userSpaceOnUse): knit 7x6 chevron, rib 3.2x10 stripes, Fair-Isle band 12x11 (maroon, cream drop, ochre dots), scarf 22x19, feather chevron 8x7.

## Characters

Animals only: fox, otter and owl in the examples. A new card brings one new or repeated animal (rabbit, hedgehog, bear cub, raccoon, cat, badger all suit).

- **Proportions:** head as wide as the torso or wider (84-92 px); head height 0.8-1.0 x torso height (shoulder to seat); head top to seat 110-150 px, plus 30-40 if the legs reach the floor. Short limbs, no visible neck: the chin overlaps the shoulders by 8-10 px. Measure it in the SVG: a 0.6 head-to-torso ratio looks lanky next to the set.
- **Head:** one smooth closed path in a radial fur gradient; a darker crown band clipped to the top; a cream muzzle (\`gCream\`) with a darker copy 1.6 px lower at 0.55 opacity as its shadow; ears with a darker inner shape (\`#C2300A\` or \`#5A2408\`); fox ear tips black via a clipPath. Tilt the head group 5-9 degrees toward what the animal looks at.
- **Eyes (the signature):** cream ring \`#F7D6A6\` r 10-12, pupil \`#0D0809\` at 0.81 r shifted 0.22 r toward the look direction, a cream 4-point star (scale 0.52-0.78) on the look side above centre, a cream dot r 1.35-1.6 below on the other side. Centres 29-37 px apart, so the eyes nearly touch. A sleepy variant clips a fur-coloured lid over the top with a 1.3 lid line and a short flick at the outer corner.
- **Nose and mouth:** a rounded inverted triangle 10-17 px wide in \`#0D0809\`, a \`#6A5A5C\` shine ellipse, then a 1.05 "w" mouth hanging from it. Muzzle dots \`#7A4A30\` r 0.9 on otters.
- **Whiskers:** two per side, 0.75-0.8, 28-75 px long, fanning slightly. **Blush:** \`#FF7FB0\` @0.6, rx 4.4-6.6, ry 2.6-3.4, under each outer eye corner.
- **Paws are this style's hands.** Gripping (the otter's mug): a fur forearm tube 12 → 9.5 wide leaves a rib cuff 17 → 15.5; a dark paw (\`#6A3418\`→\`#32150A\`) has a palm block about 9 x 15, three finger tubes 4.6 → 4.2 wide and 5.8-6.8 long laid ACROSS the front of the mug 4.7 apart, a thumb tube 5.6 → 4 arching over from the side, and 0.7 creases between finger rows. Resting: the toe-notched paw (19 px wide, \`gBlack\`) flat on the surface. Perching: three toe tubes 4.6 → 3.8 per foot wrapping the bar, each ending in a 1.3 dark claw hook that curls under. The thumb tube follows \`references/craft.md\` handedness. Paws take the animal's own fur ramp (or the dark paw ramp); a cream paw on a cream object (a paper rocket, a cream mug) disappears.
- **Clothing:** knit sweater (torso \`pKnitD\`, sleeves \`pKnit\`, rib collar, cuffs and hem), optional Fair-Isle band with 1.3 ochre borders; scarf with a 7-8 px gold fringe; beanie (knit dome, rib brim, cream pompom r 8.6 with a \`#FFF0DC\` glint). Folds are shading overlays, not lines.
- **Sitting:** the hips overlap the ledge top by 4-6 px; leg tubes (19 → 13) drop in front of the ledge face to webbed feet (pad plus four \`#3E1A0A\` toe ellipses rx 2.35 ry 3.3) turned out 8-20 degrees; a tail tube (17 → 4.6) curls out behind. On a low seat (a pouf, a stool) the thighs come toward the viewer as one lap shape no wider than the hips, with two knee bulges; the shins (30 → 25) drop in front of the seat face and the feet plant on the floor with \`#7A3A04\` contact ellipses.
- **Poses that work:** curled on a laptop deck with paws forward (fox); sitting on a sill holding a mug in both paws (otter); perched on a lamp arm, head tilted to the screen (owl); sitting on a pouf with one paw raised holding a small prop overhead and the other paw on a laptop's keys (the self-test's rabbit).

## Decor and props

- **Background decor:** 2 cream bursts (8 rays, scale 0.75-0.9, one rotated 12-14 degrees), 6-7 cream 4-point stars (scale 0.55-0.95), 18-21 cream dots r 1.0-1.4. Only in the margins, at least 8 px from the scene.
- **Leaves:** 7-8 per card, three kinds (ivy, oak, olive), scale 0.55-1.4, grained, in 2-3 loose clusters at x < 80 and x > 400, plus at most one stray near the top. Each leaf is split down the vein into a light and a dark half.
- **Props:** laptop (bezel \`#191113\` rx 4-8, maroon screen with code, three editor dots r 1.5-1.9), monitor on a black stand (a 7 px monospace \`02:14\` is the only text ever used), mug (vermilion, olive or cream cylinder, 2-3 cream steam squiggles, a cream motif such as a crescent or ring-and-bar), book stack (maroon, ivy, ochre; gilt rules 1.6 wide; dotted borders r 0.9 every 7 px), window (arched ochre or round maroon frame; rain, moon and stars only inside the pane), desk (ochre top, maroon front, brass pulls), desk lamp (black tube arm, speckled light cone), potted plant (vermilion pot, 5 fanned olive leaves, an ivy vine), sticky notes (ochre or coral, folded corner).
- **Per card:** one hero animal plus 3-5 props. Never people, UI-kit panels, logos, icons, blue sky, or more than a few characters of text.

## Composition

- **Card:** \`<rect width="480" height="360" fill="#FF81BE"/>\`, then decor, then leaves, then the scene group.
- **Scene size:** 330-360 px wide (70-75% of the card) and 250-290 px tall, horizontal centre within 10 px of x 240. The floor pool's lower edge sits at y 310-330 and runs 10-20 px past the furniture on each side.
- **Focal point:** the animal's face, in the upper-middle (y 100-190), in front of a dark plane (screen, window pane, round window or a chalkboard in the night-sky ramp) so the orange reads.
- **Ground:** no floor line; the chalky pool is the ground. Objects on a desk or sill get \`#7A3A04\` @0.38 contact ellipses (ry 1.7-2) and the edge gets a \`#F6B860\` 0.9 highlight line.
- **Group transform:** draw the scene, then centre it with one wrapper: \`translate(0 -20)\` or \`translate(0 10)\`, or \`translate(240 178) scale(1.07) translate(-240 -178)\`. Never scale the decor or leaves with it.
- **Density:** medium. Every quadrant has decor; the scene keeps clear pink around it.

## Techniques

\`scripts/gouache.mjs\` prints the shared defs with your prefix and has the repeated builders. Run from the skill folder:

\`\`\`bash
node scripts/gouache.mjs defs wk-          # filters, leaves, sparkles, common ramps, knit patterns
node scripts/gouache.mjs --demo /tmp/g.svg # a test card using every builder
\`\`\`

\`\`\`js
import fs from 'node:fs';
import * as G from '/abs/path/to/illustration-grainy-gouache/scripts/gouache.mjs'; // relative to THIS file, not the cwd
const p = 'wk-';
const extraDefs = '';   // your fur ramps, clothing gradients and clipPaths
const body = [
  G.background(p, { seed: 3 }),                                  // pink + bursts, stars, dots
  G.leaves(p, [['ivy', 40, 112, -20, 1.15], ['oak', 436, 60, 22, 0.95]]),
  G.shadow(p, 70, 410, 312, { core: [90, 330] }),                 // chalky pool
  G.grained(p, \`<path d="\${G.tube([[201, 260], [200, 271], [198, 281]], [19, 16, 13])}" fill="url(#\${p}gMaroon)"/>\`),
  G.eye(p, 197, 143, 10.8, [1, 0.3]),                             // glossy eye, looking right
].join('\\n');
fs.writeFileSync('card.svg', G.card(p, G.defs(p) + extraDefs, body, 'Title, Grainy gouache style'));
\`\`\`

\`G.defs(p)\` defines these ids (all prefixed): filters \`grain\`, \`grainL\`, \`chalk\`, \`speck\`, \`soft\`; symbols \`ivy\`, \`oak\`, \`olv\`, \`star\`, \`burst\`, \`drop\`; gradients \`gBlack\`, \`gMaroon\`, \`gOchre\`, \`gTop\` (wood top), \`gEnds\`, \`gBase\`, \`gScreen\`, \`gDeck\`, \`gCream\`, \`gVerm\`, \`gOliveCyl\`, \`gCreamCyl\`, \`gCone\`, plus the leaf ramps; patterns \`pKnit\`, \`pKnitD\`, \`pRib\`. Put the animal's fur ramps, clothing gradients and any clipPaths in your own \`extraDefs\` string. Builders: \`background\`, \`leaves\`, \`shadow\`, \`grained(p, svg, 'grain' | 'grainL')\`, \`tube\`, \`smooth\`, \`eye\`, \`blush\`, \`use\`, \`card\`.

**1. The edge grain.** Fractal noise (base frequency 2.1) becomes dark brown-violet specks; the mask \`2.0 x alpha - 1.8 x blur(alpha, 3.2)\` is a band just inside each edge; a second term weights it by how dark the fill is; the specks multiply onto the shape. \`grainFilter()\` in the helper holds it. Change \`dens\` (1.0-1.08) for density, never \`baseFrequency\`.

**2. A shaded form.** Base gradient, then overlays in the same clip, then grain on the group:

\`\`\`xml
<g filter="url(#wk-grain)">
  <path d="M74 288 L314 288 C318.5 293 319 309 314 314 L74 314 C69.5 309 69.5 293 74 288 Z" fill="url(#wk-gMaroon)"/>
  <path d="M74 288 L314 288 C318.5 293 319 309 314 314 L74 314 C69.5 309 69.5 293 74 288 Z" fill="url(#wk-gEnds)"/>
</g>
<path d="M174 299.5 L204 299.5 M174 303 L196 303" stroke="#701001" stroke-width="1.2" stroke-linecap="round"/>
\`\`\`

**3. Limbs and tails** are \`G.tube(points, widths)\`: filled tapered tubes along a smooth centre-line with round caps (\`cap0\`/\`cap1: false\` where a limb enters a sleeve).

**4. The pool shadow** is two blobs through the \`chalk\` filter (displaced, mottled alpha): \`#B95A93\`, then a \`#A04A80\` core at 0.8.

## Failure modes

- **The set breaks when the background changes.** Night Shift and Rainy Refactor were first drawn on indigo and teal; judges scored both 7. Back on \`#FF81BE\` they scored 8.5 and 9. Put night, rain and weather inside windows and screens only.
- **Grain reads as dirty TV static.** The first draft used uniform grain over everything. Gather it at edges and into dark tones (the filter above); use \`grainL\` on big light planes; keep cream fur, faces' details and decor crisp.
- **Glows look digital.** Radial glow and rim-light gradients were removed from the night scene. Light is a white cone at 0.5 opacity through the \`speck\` filter, plus a speckled pool.
- **The hero disappears.** Orange fur on hot pink has little contrast. Stage the head over a dark screen, pane or frame.
- **Mitten paws.** A dark blob for a paw reads as a glove. Build palm + finger tubes + thumb tube + 0.7 creases, with the fingers in front of the object and the thumb closing over it.
- **The lap reads as a skirt.** In the self-test a lap shape wider than the hips, with thin shins set inside it, read as a green tutu. Keep the lap within the hip width and make the shins nearly as wide as the knees.
- **Floating animal.** A sitter that stops at the ledge edge hovers. Overlap the hips 4-6 px onto the surface, hang the feet in front of the face, and put the pool shadow under the whole group.
- **An outline creeps in.** A 1 px stroke around a prop turns it into a different style. Use a value step.
- **Clutter.** More than 8 leaves or decor inside the scene box crowds the card. Keep leaves in the margins.
- **Text.** Wordmarks or labels break the painterly read. At most a 7 px monospace clock on a screen.

## Examples

- \`examples/cozy-commit.svg\` (Cozy Commit): a fox curled on an open laptop on a book stack, scarf with a \`{ }\` pattern, cocoa mug. Shows a lying pose, resting paws, sleepy lidded eyes, the scarf pattern, book shading with \`gEnds\`, a commit graph on screen.
- \`examples/rainy-refactor.svg\` (Rainy Refactor): an otter in a knit sweater on a rainy window sill, holding a tea mug in both paws. Shows the gripping paw build, knit/rib/Fair-Isle patterns, sleeve cast shadows, a seated pose with feet over the ledge, rain clipped to the pane, a diff on a small laptop.
- \`examples/night-shift.svg\` (Night Shift): an owl in a beanie perched on a desk-lamp arm, watching a monitor at 02:14. Shows perching toes, a feather-tier wing, the speckled lamp cone, a round night window, sticky notes, a desk with legs and contact shadows.

## Workflow

Run commands from the skill folder (the one holding this file). Pick a prefix such as \`wk-\`.

1. **Brief:** name the subject in 3 words and the one action that shows it ("rabbit ships a side project": pressing deploy, a tiny rocket sticker). Pick the animal and one dark backdrop for its head.
2. **Pose and hero:** choose one of the working poses or a close variant; decide every paw's job (grip, rest, perch) and, for each gripping paw, left or right and where the thumb goes (\`references/craft.md\`).
3. **Block:** write a generator (\`gen.mjs\` in your own work folder) that imports \`scripts/gouache.mjs\` by absolute path (an ES import resolves against the generator file, not the cwd); place the furniture, pool shadow and the animal's big shapes with flat colours first; render.
4. **Draw:** replace flat fills with ramps and overlays, add patterns, the face, paws, props; add decor and leaves last, in the margins.
5. **Render:** \`node scripts/render.mjs card.svg card.png\`.
6. **Sheet:** \`node scripts/render.mjs --sheet sheet.png examples/*.svg card.svg\`. Ask "same hand, same set?"
7. **Zoom:** \`node scripts/render.mjs card.svg z-face.png --zoom x,y,w,h --scale 8\` on the face, every paw, the feet and each contact (hips on ledge, mug on surface).
8. **Critique** on the five criteria in \`references/craft.md\`, harshly; fix; re-render. Expect 4 rounds.
9. **Lint:** \`node scripts/lint.mjs card.svg --prefix wk- --palette style.json\`. Fix every ERROR; each WARN must be a deliberate fur or tint ramp.

## Verify

- [ ] Background is one full-bleed \`#FF81BE\` rect with no \`rx\`.
- [ ] No shape has a stroke outline; the only strokes are detail lines at 0.6-1.3, cream decor lines and code lines.
- [ ] Every large shape has a gradient and sits inside a \`grain\` or \`grainL\` group; at 8x the specks thicken at its edges.
- [ ] Face details, whiskers, code and cream decor are crisp (outside the grain groups).
- [ ] Eyes: cream ring, offset pupil, star highlight on the look side, small dot opposite, both pupils looking the same way.
- [ ] Blush at 0.6, whiskers present on mammals, nose with a shine.
- [ ] Each paw is built from finger or toe tubes, and every thumb sits on the side its handedness requires.
- [ ] The animal's head sits in front of a dark plane.
- [ ] A chalky \`#B95A93\` pool sits under the whole group; nothing floats; contacts overlap by a few px.
- [ ] 7-8 leaves, 2 bursts, 6-7 stars, 18-21 dots, all in the margins, none touching the scene or the card edge.
- [ ] Scene 330-360 px wide, centred on x 240 within 10 px, pool bottom at y 310-330.
- [ ] No text beyond a tiny monospace screen label; no blue, grey or pure white outside the lamp cone.
- [ ] Head at least as wide as the torso, head height at least 0.8 x torso height (measure the paths).
- [ ] Every id starts with the prefix; lint passes.
`,
  'halftone-line': `---
name: illustration-halftone-line
description: Draws hand-authored SVG spot illustrations in a halftone line style for design and coding scenes. Identifying traits are a confident black line with a slight hand wobble and contours left open, grey tones made only of fine halftone dots clipped to shapes, a few solid black masses (hair, leaves, a bag, a black tee), warm off-white paper and no colour at all. Covers the two-ink palette, line weights, the open-contour and stipple techniques, a seeded compiler that turns tone tags into dot fills, rubbery long-limbed characters and expressive hands, doodles, floor pools and a render-and-critique loop. Use when someone asks for halftone, stipple, dotted, risograph-like, newsprint, black-and-white, monochrome line, editorial line or zine-style illustrations, or for empty states, onboarding, 404 pages, blog headers, feature spots and marketing cards in that look.
---

# Illustration: Halftone line

An editorial black-and-white style: one black ink on warm paper, figures drawn with a confident, slightly wobbly line that stops short instead of closing, and every grey made of printed-looking dots. It suits calm, human product moments: collaboration, reviews, commutes, focus time.

Boundary: for a single continuous line with off-register colour patches use \`illustration-one-line\`; for thick brush outlines with a second flat ink use \`illustration-two-colour-brush\`; for thin indigo interiors with sparse colour accents use \`illustration-line-interior\`. If the brief wants any colour, this is the wrong skill.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in \`examples/\` are this style's shipped cards.

## The look in one sentence
Black line and black dots on warm paper, nothing else: every grey is a field of jittered halftone dots whose size tracks the tone, and the line around it is left open.

## Palette

| Role | Hex | Where it goes |
|---|---|---|
| Paper | \`#f4f1ea\` | the full-bleed card rect, and the fill of every shape that must hide what is behind it |
| Ink | \`#111111\` (written \`#111\`) | every line, every halftone dot, every solid black mass |

- Two colours, no exceptions: no greys, no opacity, no gradients, no colour accents. A grey comes only from dots.
- Paper-coloured strokes (\`stroke="#f4f1ea"\`, 1.2–1.5) are drawn inside solid black shapes for hair highlights, leaf veins, trouser creases and bag seams.
- Most of the card is open paper: measured ink cover (lines, dots and blacks together) is 12–14% of the card.

## Line and fill

Widths at 480 wide. The art group carries \`stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"\`; parts override it.

| Element | Width |
|---|---|
| Figures, hands' outer contour, furniture, shoes' outline | 2.0 (1.9–2.1) |
| Screens' inner frame, window glass, plants, small props | 1.6–1.7 |
| Finger and thumb creases, folds, cuffs, hems, hood seams | 1.3–1.6 |
| Keyboard keys, nail ticks, text lines on paper props | 1.1–1.3 |
| Squiggles, braces, radiating ticks | 2.0–2.3 |

- **Open contours.** An outline is a separate open path, not the fill's stroke. Leave 1–3 gaps of 4–14 units per object, mostly at corners and where one line would meet another, and stop lines 2–6 units short of the line they would hit. Example from the shipped train window: \`M366 74 H410 C420 74 428 82 428 92 V138 M426 160 C424 168 418 174 410 174 H318 M300 174 H166 …\` (two gaps on one frame).
- **Paper fills hide, they do not outline.** Each shape that overlaps something behind it gets a paper fill with \`stroke="none"\`, drawn before its dots and its open outline.
- **Hand wobble.** One filter on the whole art group, nowhere else: a low-frequency warp of 2.3 plus a fine edge roughening of 0.8. \`scripts/halftone.mjs\` writes it (\`<filter id="xx-wob">\`); give each card its own \`--seed\`.
- **Tones are dots.** A jittered grid at pitch 2.58 with dot area proportional to tone: \`flat 0.19\` (light, dot r ≈ 0.6) for clothes, cushions, light props and the outer floor pool; \`flat 0.36–0.38\` (mid, r ≈ 0.85) for hair blobs, shadow sides, the far limb, the core of a floor pool. Graded tones (\`lin\`, \`rad\`) shade rounded forms from 0.08 to 0.36.
- **Solid black** for 3–5 masses per card: hair, a plant's leaves, a bag, a black tee or trousers, a laptop's or monitor's dark edge, shoe soles, a check mark.

## Characters

- Rubbery and long-limbed. Head with hair 40–44 px tall; a standing figure is 230–250 px (5.5–6 heads, 65–70% of the card height); a seated figure's head top sits about 70 px from the top of the card.
- Heads in profile or near-profile. Build each in a local frame \`<g transform="translate(cx cy) rotate(a)">\`: a paper face shape with a pointed nose wedge, an open outline from the brow over the nose and chin to the jaw, the back hidden under the hair. From the shipped critic's head: face \`M-16 18 C-26 0 -20 -24 4 -26 C20 -26 23 -10 22 -1 L31 9 Q29 11.5 23 12 C24 18 23 24 17 28 C11 32 0 31 -8 24 Z\`. \`\${H.head(x, y, rot, dir, hair, { back, eye, smile })}\` draws exactly this head, facing right (\`dir\` 1) or left (−1); its local face spans about −26…31 by −26…32, so \`(x, y)\` is roughly the middle of the face. For a face turned left, a negative \`rot\` tips it down.
- Face marks: an eye dot \`r 1.8–1.9\` (or a closed-eye arc for calm), a short brow arc at 1.6–1.7, a small smile arc at 1.7–1.8, an ear as a C with an inner curl at 1.6, round glasses as one outline lens in profile with an arm to the ear (\`H.hair.glasses()\`). No blush, no pupils, no lashes.
- Hair: a solid black blob with one 1.3 paper highlight stroke, or a dotted blob (0.38 plus an outline with two 1.3 strand lines); buns are black circles, ponytails black teardrops, beanies dotted with a ribbed paper band. Presets from the shipped cards, in the head's frame: \`H.hair.curly(t)\` (dotted crop with a front curl; \`'flat 0.3'\` reads as grey), \`H.hair.bun()\`, \`H.hair.ponytail()\`, \`H.hair.long\` (pass \`.back\` as the head's \`back\` option and \`.front\` as its hair) and \`H.hair.glasses()\`. Hair needs a broken silhouette (a bun, a tail, curls or a fringe notch): a smooth cap with a straight hairline reads as a helmet.
- Necks are a paper quad with one or two 1.5 lines. Shoulders slope; torsos are soft sacks, not boxes.
- Clothing: light dots on the near sleeve and body, mid dots on the shadow side and the far limb, or a solid black garment with paper crease lines. Ribbed hems and cuffs are rows of 1.3 ticks. \`\${H.limb([[x,y] shoulder, elbow, wrist], [halfWidths], tone)}\` builds a sleeve or trouser leg as the toned-shape triple with open ends (tone \`'flat 0.19'\`, \`''\` for bare skin, \`'black'\` for a solid garment); two black legs need a 1.4 paper crease line between them.
- Hands are large and expressive, about 0.8 of the head height from wrist to fingertip. Follow \`references/craft.md\` for construction and handedness. In this style each finger and the thumb is its own paper-filled shape; the outer contour is an open line at 2.0; creases and nail ticks are 1.2–1.6; fingers fan with small gaps; a cuff line crosses the wrist. \`\${H.hand(x, y, rot, sc, thumb)}\` in \`scripts/halftone.mjs\` draws the typing or resting hand used on the shipped cards: wrist at \`(x, y)\`, fingers along local +x bending onto a surface toward +y, the index on the −y edge and the thumb beside it when \`thumb\` is true. For fingers pointing left, mirror it: \`<g transform="translate(x y) scale(-1 1)">\${H.hand(0, 0, rot, sc, false)}</g>\`. Pointing and gripping hands are drawn by hand in the same manner (back of hand, an extended index, curled fingers as stacked loops with 1.3 creases, the thumb as its own shape).
- Feet: simple sneakers with a paper upper, a black sole slab and 1.3–1.6 lace ticks (\`\${H.shoe(x, y, dir, sc)}\`, sc ≈ 0.6, \`(x, y)\` = heel bottom, the ankle lands at \`x + 8·dir\`, \`y − 14\`), resting on the floor stroke. Set a figure's two heels at least 26 apart: two shoes overlapping by more than a toe read as one double shoe.
- Poses that work: leaning over a table with one knee bent and one arm braced behind the back; seated with a laptop on a raised thigh, back against a partition; perched on a stool typing with the far leg tucked; standing in contrapposto, chin resting on one hand, the other holding a cup at the hip; two people seated either side of a small table, the explainer leaning in and pointing. Never bolt upright with both arms hanging. To lean a finished torso, wrap torso, neck and head in \`rotate(−8 hipX hipY)\` and re-aim the arm's shoulder point to match.

## Decor and props

- Doodles, 2–4 per card, floating in open paper in the upper third: a curly squiggle with three loops (2.3), three radiating ticks above a head for a thought or surprise (1.8–2.0), curly braces \`{ }\` (2.0), a solid black check mark, a chat bubble with three black dots (r 3.2), a document or image card with lines.
- Props are line drawings with paper fills: desks and tables with open legs, stools, benches, a drafting table, monitors and laptops (one dark edge solid black), screens carrying \`</>\`, text lines at 1.3–1.7 and a cursor, mugs and takeaway cups (dotted body or a black band), a plant with solid black leaves and paper veins, a black tote.
- Floor: never a full line. Short strokes at 1.9–2.0 only under what stands there, plus a dotted pool under every foot, leg or base: a light ellipse (0.19, ry 5.6) with a darker core (0.36, 58% of the width, ry 3.4). \`\${H.pool(cx, cy, rx)}\` writes both.
- Never: colour, grey fills, outlined closed boxes everywhere, drop shadows, sparkles, hatching (tone is dots, not lines), text other than \`</>\` and code glyphs.

## Composition

- Paper rect first, before \`<defs>\`: \`<rect id="xx-paper" width="480" height="360" fill="#f4f1ea"/>\`, square, no \`rx\`.
- Ink bounding box 78–82% of the card width and 73–80% of its height; margins 37–55 px (75–110 px on the 2x render).
- Draw at 1:1 inside \`<g id="xx-frame" transform="translate(dx dy)">\` with a small nudge to centre (the shipped cards use ±4), or draw large and scale the frame by 0.86 as the first card does. Keep the 2.0 line after any scale.
- One or two figures interacting with one piece of furniture or one device; the focal point is the hands on that object. Doodles go in the open paper above, never on top of a figure.
- Balance the solid blacks: spread 3–5 black masses so no side of the card is all grey dots.
- The floor sits at y 305–322; everything that stands touches it through a pool.

## Techniques

1. **Write a source, compile it.** Author \`card.src.svg\` with \`@P@\` for the id prefix, \`<!--DEFS-->\` inside \`<defs>\`, \`<stip>\` tags for tones and \`\${…}\` expressions, then:
   \`node scripts/halftone.mjs card.src.svg card.svg --prefix oh- --seed 41\`
   It writes the wobble filter, one clip path per stipple, the dots, and fails if any id lacks the prefix. \`node scripts/halftone.mjs demo /tmp/halftone-demo.svg\` writes the tone swatches (put it anywhere outside the skill folder). Every \`\${…}\` is JavaScript (nested braces and object arguments are fine) with the built-in helpers \`H.pool\`, \`H.E\`, \`H.shoe\`, \`H.hand\`, \`H.limb\`, \`H.head\` and \`H.hair.*\`; a \`<gen>…</gen>\` block at the top of the source holds your own helpers, such as a pointing hand you reuse.
   \`\`\`svg
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360">
   <rect id="@P@paper" width="480" height="360" fill="#f4f1ea"/>
   <defs><!--DEFS--></defs>
   <g id="@P@frame" transform="translate(0 0)">
   <g id="@P@art" filter="url(#@P@wob)" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
     \${H.pool(120, 307, 24)}
     <path d="M40 307.6 H150" stroke-width="2"/>
     …
   </g></g></svg>
   \`\`\`
2. **The toned-shape triple.** Same \`d\` three times: paper fill, dots, open outline.
   \`\`\`svg
   <path d="M98 190 C94 214 … Z" fill="#f4f1ea" stroke="none"/>
   <stip d="M98 190 C94 214 … Z" t="flat 0.19"/>
   <path d="M98 190 C94 214 90 236 88 252 C86 268 82 284 79 299 M96 300 C98 284 102 268 104 254"/>
   \`\`\`
   A second, smaller \`<stip … t="flat 0.36"/>\` laid over part of the shape makes its shadow side. The first shipped card used flat 60-unit dot tiles instead (\`fill="url(#@P@dl)"\` light, \`url(#@P@dm)\` mid); the compiler adds a tile when a source references it. Prefer \`<stip>\`: it grades and stays crisp. Tone terms: \`flat t\`, \`lin x1 y1 t1 x2 y2 t2\`, \`rad cx cy r t0 t1\`, \`noise a scale\` (multiplies). \`<stip>\` paths take M L H V C S Q T Z, not arcs: use \`\${H.E(cx, cy, rx, ry)}\` for ellipses.
3. **Solid black with paper detail.** \`<path d="…hair…" fill="#111"/>\` then \`<path d="…" stroke="#f4f1ea" stroke-width="1.3"/>\` for one highlight or crease.
4. **Doodle squiggle** (2.3, three loops): \`<path d="M60 268 C53 259 60 248 67 253 C74 258 65 265 63 256 C61 245 74 236 81 243 C88 250 75 257 75 246 C75 233 91 224 96 234" stroke-width="2.3"/>\`.

## Failure modes

- **Dots too coarse.** Train Ride stayed at 7 because its trousers used tone 0.52: the dots merged into blotches. Keep dotted areas at 0.38 or lighter; anything darker is solid black.
- **Stiff standing figure, mitten hands.** Design Critique scored 6 with an upright figure and blob hands. Give standing figures contrapposto and a task for each hand; build every finger as its own outlined shape.
- **Echoing the reference set.** Design Critique's first layout was rejected by two judges as too close to a reference image the style was studied from. Stage each scene around furniture and a real action of your own, and never borrow a reference image's layout (\`references/craft.md\`, Originality).
- **Thumbs on the wrong side.** All three shipped cards needed handedness fixes. Write down left or right, palm or back and finger direction for each hand, then run the thumb proof (\`references/craft.md\`).
- **Closed, even outlines.** A fully closed outline at one weight reads as clip art. Open 1–3 gaps per object and vary 2.0 / 1.6 / 1.3 by role.
- **Grey wash instead of dots.** A dot pattern that is too fine (pitch under 2.2 or r under 0.4) reads as flat grey at 1x. Keep pitch 2.58.
- **Stray grey.** Any \`#888\`, \`opacity\` or blurred shadow breaks the two-ink rule; lint with \`--palette\` catches the colours.
- **Floating feet and furniture.** Every foot, leg and base needs its floor stroke and a dotted pool under it.
- **Helmet hair.** In the self-test, two smooth hair caps with straight hairlines read as a beanie and a helmet at 1x. A bun, a ponytail, curls or a fringe notch fixed both; use the \`H.hair\` presets.
- **One double shoe.** Feet set 14 apart overlapped into a single long shoe. Keep a figure's heels at least 26 apart, the far foot pulled back.
- **Doodles on the figures.** Squiggles or ticks that overlap a head or hand read as mistakes. Keep 10 px of paper around each doodle.

## Examples

- \`pair-programming.svg\`: "Pair Programming". A man in a dotted beanie types at a desk monitor while a woman with a black ponytail leans in and points at a line of code with a pencil; plant with black leaves, stool, mug, braces, check and squiggle doodles. Shows the 60-unit dot tiles, the 0.86 frame scale, typing and pencil hands.
- \`train-ride.svg\`: "Train Ride". A woman with a black bun sits on a metro bench, laptop on her raised thigh, typing with both hands; train window with a passing landscape, hanging straps, black tote on the floor, chat-bubble and squiggle doodles. Shows a seated pose, graded stipple, and (on the trousers) the tone that was too dark.
- \`design-critique.svg\`: "Design Critique". A man in a black tee leans over a drafting table and circles a button on a printout; a woman in a dotted sweater and black trousers stands with her chin in her hand and a takeaway cup at her hip. Shows the leaning pose, a sheared table top, the chin-in-hand grip and solid black garments.

## Workflow

Run commands from this skill's folder.

1. **Brief.** Name the subject and the one action that shows it ("a mentor explains a bug on a student's laptop").
2. **Choose the pose and the hero object.** One or two figures and one piece of furniture or device. For each hand write down LEFT or RIGHT, palm or back, finger direction, and what it touches.
3. **Block.** In \`card.src.svg\`, rough each figure as a stick skeleton (2.0 lines) plus the furniture outline; compile and render; check figure height, floor y and margins before detailing.
4. **Draw.** Back to front: floor pools and strokes, furniture, the far figure parts, near figure parts, hands last, then doodles. Paper fill → \`<stip>\` → open outline for every toned shape.
5. **Compile:** \`node scripts/halftone.mjs card.src.svg card.svg --prefix oh- --seed 41\`.
6. **Render:** \`node scripts/render.mjs card.svg card.png\`.
7. **Sheet next to the examples:** \`node scripts/render.mjs --sheet sheet.png examples/*.svg card.svg\`. Same line weight, same dot size, same paper, same amount of bare paper?
8. **Zoom** every hand, face, foot and contact: \`node scripts/render.mjs card.svg hand.png --zoom 180,170,60,50 --scale 8\`. Thumb proof: in a throwaway copy of the source, set the thumb's paper fill to \`#ff0000\` and the index finger's to \`#0000ff\`, compile, zoom, check, delete. In an \`H.hand\`, the index is the first finger path after the palm.
9. **Critique** against the five criteria in \`references/craft.md\`, harshly; fix in the source, never in the compiled SVG; repeat 5–9. Expect four rounds.
10. **Lint:** \`node scripts/lint.mjs card.svg --prefix oh- --palette style.json\`. Any WARN is a stray colour: remove it.

## Verify

- [ ] Paper rect \`#f4f1ea\` is the first element, full-bleed, no \`rx\`.
- [ ] Only \`#111\` and \`#f4f1ea\` appear; no opacity, gradient or blur besides the one wobble filter.
- [ ] The wobble filter wraps the whole art group and nothing else.
- [ ] Main line 2.0; secondary 1.6–1.7; creases 1.3–1.6; nothing under 1.1.
- [ ] Every object's outline has at least one deliberate gap; lines stop short at joins.
- [ ] Dotted tones are 0.19 or 0.36–0.38 (graded within 0.08–0.38); nothing dotted darker than 0.4.
- [ ] 3–5 solid black masses, spread across the card.
- [ ] Heads in profile with nose wedge, dot eye, small smile; hair with a broken silhouette; figures 5.5–6 heads tall.
- [ ] Each figure's heels at least 26 apart; feet rest on a floor stroke.
- [ ] Each hand: separate outlined fingers, a thumb on the correct side, wrist and cuff connected to an arm.
- [ ] Every foot and base has a floor stroke and a two-tone dotted pool; no continuous floor line.
- [ ] 2–4 doodles in open paper, clear of the figures.
- [ ] Ink box 78–82% wide, 73–80% tall; margins 37–55 px (75–110 px on the 2x render); most of the card is open paper.
- [ ] The subject reads at 1x without a caption.
- [ ] \`scripts/lint.mjs\` passes with \`--prefix\` and \`--palette style.json\`.
`,
  'ink-sketch': `---
name: illustration-ink-sketch
description: Draws hand-inked cartoon critters and living objects as SVG cards (480x360), each acting out a coding or design idea. Identified by thick black brush-pen outlines that swell and taper and break into separate strokes, loose marker-and-watercolour fills that slip past the line, diagonal hatching instead of solid shadow, huge googly eyes with two specular dots, and stray ink hairs and flecks, in tomato red, leaf green, sunflower yellow, sky blue and teal on white. Covers palette, brush numbers, mascot construction (eyes, blush, mouths, 3-finger hands), props, ground patches and a tested, seeded brush kit. Use when asked for ink sketch, hand-drawn, brush pen, sketchy, doodle, marker or watercolour-cartoon illustrations, googly-eyed mascots or critters, playful empty states, onboarding, 404 or error pages, loading states, blog headers, feature spots or marketing cards.
---

# Illustration: Ink sketch

Sketchy, hand-inked cartoons: a googly-eyed critter or object (a snail, a pair of worms, a potted cactus) whose body carries the coding metaphor, drawn with a wobbly brush pen over loose marker colour. It suits playful product moments: loading, errors, greetings, conflicts.

Boundary: for clean, even ~2 px ink outlines on people with flat fills, use \`illustration-outlined-cartoon\`. For people drawn with a black brush marker and one mint second colour, use \`illustration-two-colour-brush\`. For soft, unoutlined cosy animals with grain, use \`illustration-grainy-gouache\`.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence
Every edge is a filled black brush polygon that swells from about 1 to 4.4 px and tapers to points, laid in a few separate strokes over a colour fill that slips 2 to 3.6 px past it, with dark areas hatched rather than filled.

## Palette
Measured from the examples. Each colour family is base / dark / light; the dark goes into mottle and marker streaks, the light into one lit streak.

| Role | Hex | Where it goes |
|---|---|---|
| Card background | \`#ffffff\` (none drawn) | Don't draw a background rect. |
| Ink | \`#1d1a18\` | Every outline, hatch line, hair, fleck, pupil, letter. Never pure black. |
| Red | \`#f0563d\` / \`#b8311f\` / \`#ff8a6a\`, deep \`#9a2414\` | Shells, pots, one worm |
| Yellow | \`#ffc83d\` / \`#ef9a24\` / \`#fff1b0\` | Snail body, spark bursts, flower centres; \`#fff1b0\` also bubble shadows |
| Green | \`#5cb946\` / \`#2f8a38\` / \`#a6dc62\` | Grass patches, cactus |
| Blue | \`#66cdea\` / \`#2a8fbf\`, drop \`#bfe8f7\` | Slime, mugs, progress fill, sweat drops |
| Teal | \`#2fb5a7\` / \`#167a71\` / \`#8fe3d6\`, deep \`#0f5c55\` | A second character beside a red one |
| Wood | \`#eaa85c\` / \`#b8722f\` / \`#f8d6a0\`, deep \`#8a5320\` | Desks, tables |
| Blush | \`#ff7f86\` (op 0.5 to 0.75), ticks \`#d9434f\` or \`#c8303f\` | Cheek discs with three ticks; tongue |
| Eye shade | \`#c9d6ea\` | The crescent inside each eye white |
| Paper | \`#fffaf0\`, fold \`#d9d2c4\` | Stickers, scraps, labels |
| Singles | mouth \`#3b1f1a\`, petal \`#ff8fa0\`, soil \`#5b3b2c\`, coffee \`#6b4330\`, soft shadow \`#7f97ab\` (op 0.22) | One-off details |
| White | \`#ffffff\` | Eye whites, gloss swipes, speech bubbles, highlights |

- Use two colour families for the subject plus green for ground (red + yellow snail, red vs teal worms, green cactus + red pot + wood desk). A third family only for a small prop.
- Never gradients. Opacity only on mottle, streaks, gloss and blush. Never a solid black area larger than a pupil: hatch it.

## Line and fill
All ink is filled polygons from the brush (\`stroke()\` in the kit), never SVG strokes: the examples contain zero \`stroke\` attributes.

| Mark | Numbers at 480 wide |
|---|---|
| Outline | \`OUT(centre)\`: w 4.6, max 4.4, min 1.0, press 0.4 (wavelength 26), nib 0.3, thicker on the down-right shadow side (k 0.3 to 0.36). Tapers t0/t1 3 to 30 px. 3 to 6 separate strokes per shape, one gap on the lit top-left, one overshoot of 2 to 14 px |
| Secondary line (rims, bubble tails, mouths) | w 2.4 to 3.2, nib 0.45, press 0.4, pf 8 |
| Detail (ribs, creases, wood grain) | w 1.1 to 1.8, ink at op 0.55 to 0.85 |
| Hatching | w 1.0 to 1.15, spacing 2 to 3.2, angle -48 to -58 deg (mirror to -130 on a right-lit shape), ends jittered inside the edge |
| Hairs | 2 to 5 per outline stroke, w 0.9 to 1.5, length 2.5 to 7, pointing outward on the shadow side |
| Flecks | 9 to 11 per card, size 0.8 to 1.7, in the empty margins |
| Fill | base colour, slipped 2 to 3.6 px off the outline (\`fillShape\` off), control points jittered 1.2 to 1.6 |
| Mottle | dark colour at op 0.36 to 0.5 through the mottle filter, over every fill |
| Marker streaks | dark colour, w 4 to 16, op 0.3 to 0.55, 1 to 3 along the shadow side, clipped to the shape |
| Gloss | white, w 2.4 to 6, op 0.85 to 0.95, one or two swipes on the lit upper-left of round forms |

Two filters per card, both prefixed: \`rough\` (fractal noise 0.45, displacement 0.7) wraps the whole card so every edge trembles; \`mottle\` (noise 0.035 x 0.06, 3 octaves, alpha 2.6/-1.25) masks the watercolour patches. \`svgOut\` writes both.

## Characters
No people. The hero is a critter or a living object (snail, worms, cactus; equally a mug, a bug, a robot vacuum) whose body IS the metaphor: the shell is a loading spinner, the worms' thin tails are git branches with commit dots, the pot wears a \`</>\` sticker.
- **Body:** tubes along a spine with a width function (\`tube()\`), or a closed blob through 12 to 24 control points. Heads swell at the end of a tube (body 40, head 49). The subject spans about 60 to 70% of the card width.
- **Eyes, the signature:** huge googly eyes, radius 19 to 27.5 (40 to 55 px across, 1/3 to 1/2 of the head width), usually a pair of slightly different sizes touching or overlapping. White disc, \`#c9d6ea\` shade crescent at the lower right, a rim that swells and overshoots its start, a pupil of radius 0.5 x the eye offset 4 to 10 px toward what the critter looks at, one big and one small white specular. Lids in the body colour (h 0.34 to 0.38, tilted 17 deg) make them grumpy.
- **Face:** blush ellipses 8 x 4.6 with three short red ticks; a mouth of one curved stroke with tiny end ticks (smile), a filled dark mouth with a pink tongue (cheer), a white gritted-teeth shape with two tooth lines (anger), a down-turned stroke with a lower lip (pout).
- **Hands, when a critter needs them:** the limb colour, a palm and 3 fingers plus a thumb as capsules, inked open at the knuckles, a knuckle crease, a dark streak on the shadow side (\`hand()\` in the kit). Sized like the cactus: fingers 12 to 14.5 long at scale 1.25. Put the thumb where the handedness table in \`references/craft.md\` says.
- **Antennae, stalks, tails:** tapered tubes with the outline on both sides, or single spiral brush strokes. Stick legs, if used, are single brush strokes 2.4 to 3 wide ending in small filled ovals.
- **Stubby legs and paws (small mammals):** short tubes 9 to 14 wide via \`shadeTube\` + \`limbOutline({ under: bodyLoop })\`, ending in a petal-pink oval 5.4 x 3.2 with a short ink underline. Draw the far pair before the body, the near pair after; angle the back leg behind the hip and the front leg ahead of the shoulder so a run reads.
- **Effort and emotion marks:** sweat drops, an anger mark of four bowed brackets, motion arcs (two concentric strokes, 2.4 and 1.8 wide, tapering), steam curls.

## Decor and props
- **Ground (pick one):** a ragged grass patch spanning x 52 to 428, top edge y 272 to 280, bottom bowing up at the ends, with dry-brush ends, blade flicks and one or two tall tufts at the ends (\`grassPatch\`, \`tuft\`); or a wooden desk top seen slightly from above with grain lines and one hatched leg.
- **Contact:** a hatched ellipse right under each resting part (w 1.0, sp 3 to 3.2, op 0.85 to 0.9), plus a darker streak at the base of the body. Props stand on something: a sign goes on a stake planted in the grass, a mug on the desk. Only bubbles, flung scraps and marks may float.
- **Props, 1 to 3:** a \`</>\` code sticker, a speech bubble with hand-lettered text, a torn paper scrap with code chevrons, a mug with steam curls, a progress bar (white track, hatched blue fill, hand-lettered %), commit dots, a spark burst star, a flower.
- **Lettering:** hand-lettered with brush strokes (w 2.4 to 2.6, glyphs 12 to 17 px tall), never a font.
- **Never:** clean geometric vector shapes without a brush outline, gradients, drop shadows, solid black fills, background scenery, people.

## Composition
- No background rect. Everything inside x 36 to 444 and y 40 to 340; only dry-brush ground ends may reach x 36.
- The subject sits centre-bottom on its ground, about 60 to 70% of the card wide and 60% tall; its eyes are the focal point in the upper half. One bubble, scrap or mark fills the emptiest upper corner. A round or tall subject (a wheel, a pot) is only about 50% wide: give it one grounded side prop to fill the width.
- Every number in this skill is at card size. Inside a scaled group, draw at size / scale, and put contacts (paws on a rim, a pot on a desk) in card space first, then map them into the group: \`const G = w => [B0[0] + (w[0] - B0[0]) / S, B0[1] + (w[1] - B0[1]) / S]\`.
- Draw the subject at design size inside \`<g transform="translate(cx gy) scale(1.12) translate(-cx -gy)">\` about its ground point, with \`setWScale(1/1.12)\` so line widths stay true, then \`setWScale(1)\` after.
- \`svgOut(file, {shift: [0, -8]})\` nudges the whole card to balance the margins.

## Techniques
\`scripts/ink-kit.mjs\` is the seeded brush library the three examples were generated with: run with it in place of the original, the Merge Conflict and Hello World generators reproduce every mark of the shipped cards exactly (the only diff is a stray text node the old file writer left in \`<defs>\`). Every mark takes a string key with its own random stream, so editing or adding one mark never reshuffles the rest; change a key to re-roll a single mark.

\`\`\`js
// card.mjs, next to a copy of ink-kit.mjs
import * as K from './ink-kit.mjs';
const { PAL, OUT } = K;
K.setPrefix('xx-');                                        // every id: filters and clip paths
K.grassPatch('grass', { x0: 60, x1: 420, top: 276, bot: 320 });
K.hatch('cast', K.arc(240, 286, 70, 6, 0, 360, 10), { ang: -58, sp: 3, w: 1.0, inset: 1.2, over: 0.4, op: 0.9 });
const ctrl = [];                                          // a round body: control points
for (let a = 0; a < 360; a += 30) ctrl.push([240 + 70 * Math.cos(a * K.deg), 220 + 62 * Math.sin(a * K.deg)]);
const loop = K.fillShape('body', ctrl, PAL.red.c, { off: [-3, 2], j: 1.4 });   // slipped fill
K.mottle(loop, PAL.red.d, 0.46);
K.clipOpen(loop);                                         // shading stays inside
K.stroke('streak', K.arc(240, 220, 60, 54, -10, 120, 6), { w: 13, t0: 20, t1: 25, wob: 1.5 }, PAL.red.d, 0.45);
K.stroke('gloss', K.arc(240, 220, 52, 48, 198, 236, 4), { w: 6, t0: 8, t1: 12 }, '#ffffff', 0.95);
K.clipClose();
const dl = K.resample(K.catmull(ctrl, true, 10), 1);      // outline in two strokes: gap top-left, overshoot
const o1 = K.stroke('o1', K.loopSlice(dl, 0.62, 1.18), { ...OUT([240, 220]), dense: true, t0: 12, t1: 10 });
K.stroke('o2', K.ext(K.loopSlice(dl, 0.2, 0.58), 3), { ...OUT([240, 220]), dense: true, t0: 8, t1: 6 });
K.hairs('hairs', o1.C, 4, { c: [240, 220] });
K.eye('eyeL', [216, 172], 21, [223, 176], 10.5);
K.eye('eyeR', [262, 168], 23, [269, 173], 11.5);
K.blush('blL', 206, 222); K.blush('blR', 280, 218);
[[96, 120, 1.5], [400, 96, 1.2], [420, 230, 1.1]].forEach((p, i) => K.fleck('fk' + i, ...p));
K.svgOut(new URL('./card.svg', import.meta.url).pathname, { label: 'Title, Ink sketch style' });   // next to card.mjs
\`\`\`

Parts in the kit: \`stroke\` (the brush), \`OUT(c)\` (outline preset), \`hatch\`, \`fillShape\`, \`mottle\`, \`clipOpen/clipClose\`, \`hairs\`, \`fleck\`, \`dry\`, \`eye\` (with \`lid\`), \`tube\` plus \`across\`/\`acrossLine\`, \`shadeTube\` (fill, mottle, streak, gloss and rib for a limb or body), \`limbOutline\` (inks only the parts of a limb outside the body), \`hand\`, \`grassPatch\`, \`blade\`/\`tuft\`, \`blush\`, \`sweatDrop\`, \`codeSticker\`, \`paperScrap\` (torn note; returns T(x, y) for what you write on it), \`fillRing\` (a wheel or donut face-on: even-odd fill plus mottle), \`arc\`, \`loopSlice\`, \`ext\`, \`runsOutside\`, \`setWScale\`, \`svgOut\`.

A symbol drawn as one brush stroke, e.g. the infinity sign (a lemniscate, 26 px wide):
\`\`\`js
const inf = []; for (let t = 0; t <= 2 * Math.PI + 0.35; t += 0.07) { const s = Math.sin(t), c = Math.cos(t), d = 1 + s * s; inf.push([x + 13 * c / d, y + 13 * s * c / d]); }
K.stroke('inf', inf, { w: 3, t0: 3, t1: 5, nib: 0.45, press: 0.3, pf: 8 });
\`\`\`

\`node scripts/ink-kit.mjs --demo $W/demo.svg\` writes a demo card and prints \`wrote <path> 203.5KB 316 elements\`: a red googly-eyed blob waving a 3-finger hand on a grass patch, with hatching, a code sticker, a sweat drop and flecks. It lints clean with \`--prefix ikd-\`.

## Failure modes
- **Clip-art line.** Uniform-width strokes or SVG \`stroke\` attributes read as vector. Every line is a brush polygon with taper and pressure.
- **Sealed outlines.** One closed loop round a shape looks traced. Break each outline into 3 to 6 strokes with one gap on the lit side and one overshoot.
- **Fill locked inside the line.** It reads as colouring-book vector. Slip each fill 2 to 3.6 px, a different direction per shape.
- **Flat colour.** A fill with no mottle, streak or gloss looks printed. Every fill gets mottle plus at least one dark streak and one gloss swipe on round forms.
- **Solid black shadow.** Hatch it; fade the hatch density toward the light with \`keep\`.
- **Dead googly eyes.** Centred pupils or a missing specular stare blankly. Offset pupils 4 to 10 px toward the action; always two white dots.
- **Hair everywhere.** More than 5 hairs per stroke turns the line furry. 2 to 5, on the shadow side.
- **Floating subject.** No hatched contact ellipse and no dark base streak, and the critter hovers over the grass.
- **Line weights drift in a scaled group.** Forgetting \`setWScale(1/s)\` makes every line 12% too thick.
- **Everything reshuffles after one edit.** Reusing or renumbering keys re-rolls marks; give each mark a stable, unique key.
- **Two cards on one page share a filter.** Call \`setPrefix\` with a unique prefix per card; lint with \`--prefix\`.
- **Typeset text.** A font in a bubble breaks the hand. Letter it with brush strokes, or say it with marks (tally strokes, chevrons, a symbol) when the glyphs would take longer than the joke.
- **Face jammed against a prop.** In testing, a hamster's nose, mouth and paws merged into a wheel rim. Keep 25 px clear round the face and never end a limb at the mouth.
- **Marks off the paper.** Tally dots spilled past a scrap's torn edge and read as stray ink. Keep marks 4 px inside their paper.
- **A floating sign.** A note hanging in the air beside the subject reads as a mistake; plant it on a stake with a hatched contact.

## Examples
- \`slow-build.svg\` (Slow Build): a sweating snail on a progress bar at 27%, its shell a spiral loading spinner with a hatched comet sweep; shows eyestalks, a code sticker, the grass patch, hand-lettered %, the soft contact shadow.
- \`merge-conflict.svg\` (Merge Conflict): a red and a teal worm butt heads where their branch lines meet; shows tube bodies with segment rings, grumpy lids, gritted teeth and a pout, commit dots, a spark burst, an anger mark, a flung \`<<<<\` scrap.
- \`hello-world.svg\` (Hello World): a potted cactus on a desk waves and says "hello, world" beside a coffee mug; shows a 3-finger waving hand with correct thumb, an arm resting over the pot rim, ribs with spine ticks, wood grain, steam curls, hand lettering in a speech bubble.

## Workflow
Run from this skill folder. \`render.mjs\` needs \`playwright-core\` (or \`playwright\`) installed here, in the current folder or globally, plus a Chromium.

1. **Brief.** Name the subject and the metaphor: which critter, and which part of its body carries the idea. Write down the one expression (eyes, mouth, marks) that sells it at 480 px.
2. **Hero and pose.** Sketch the silhouette on paper or in comments: spine, eye positions, ground line. For every hand, write down LEFT/RIGHT and PALM/BACK (craft.md).
3. **Set up:** \`W=/tmp/ink-card; mkdir -p $W; cp scripts/ink-kit.mjs $W/\`, then write \`$W/card.mjs\` from the Techniques skeleton with a unique prefix.
4. **Block:** ground, body fills and eyes only. Render and check size, placement and the 1x read.
5. **Draw:** shading (mottle, streaks, hatching, gloss), outlines in separate strokes, hairs, face, props, lettering, flecks.
6. **Render:** \`node $W/card.mjs && node scripts/render.mjs $W/card.svg $W/card.png\` (card.mjs writes card.svg next to itself).
7. **Sheet:** \`node scripts/render.mjs --sheet $W/sheet.png examples/*.svg $W/card.svg\`. Ask "same hand, same set?"
8. **Zoom** eyes, hands, contacts and lettering at 6 to 8x: \`node scripts/render.mjs $W/card.svg $W/eyes.png --zoom x,y,w,h --scale 8\`.
9. **Critique** on the five criteria in \`references/craft.md\` and the Verify list; fix by editing the generator (never the SVG); repeat. Expect three or four rounds.
10. **Lint:** \`node scripts/lint.mjs $W/card.svg --prefix xx- --palette style.json\`. Fix every ERROR; each WARN colour must be a deliberate one-off.

## Verify
- [ ] No \`stroke=\` attribute anywhere; every line is a filled brush polygon in \`#1d1a18\`.
- [ ] Outlines swell and taper (thin about 1 px, thick about 4.4 px) and each shape's outline has a gap and an overshoot.
- [ ] Every fill visibly slips past its line by 2 to 3.6 px.
- [ ] Every fill carries mottle; round forms have a dark streak and a white gloss swipe.
- [ ] Shadows and dark areas are hatched at -48 to -58 deg, spacing 2 to 3.2; no solid black areas.
- [ ] Googly eyes 40 to 55 px across, pupils offset toward the action, two speculars each, shade crescent inside.
- [ ] 2 to 5 hairs per outline stroke; 9 to 11 flecks in the margins.
- [ ] The subject rests on a grass patch or desk with a hatched contact shadow; nothing floats by accident.
- [ ] Two colour families on the subject, green or wood for the ground, palette hexes only.
- [ ] The whole card is wrapped in the prefixed \`rough\` filter; ids all carry the prefix.
- [ ] Lettering is brush-drawn, not a font.
- [ ] The metaphor reads at 1x without the title.
`,
  'isometric-mono': `---
name: illustration-isometric-mono
description: Draws true-isometric diorama illustrations of developer and design workspaces in one green ramp, generated as SVG with a bundled scene kit. Traits: one rounded off-white slab with a faceted bevelled edge; every face filled by the way it faces (top lightest, right darkest) from five greens; 0.9 deep-green outlines on every edge; dense fine repeated detail (rack units, ribs, vents, keys, code lines); soft green shadows and glows on the slab. Covers projection, shading, line weights, object vocabulary, layout and the iso.mjs kit (racks, databases, laptops, containers, cards, badges, books, plants, cables, status tower). Use when someone asks for isometric illustration, an iso scene, 2.5D tech art, monochrome or green isometric art, a server room, dev stack or cloud picture, or art for empty states, onboarding, 404 pages, blog headers, feature spots or marketing cards in this style.
---

# Illustration: Isometric mono

A small world on a slab: seven to ten developer or design objects arranged on one rounded platform, drawn in true isometric with a single green ramp, every edge inked and every face shaded by its orientation. It reads as a precise, technical, calm product illustration, and suits infrastructure, tooling and workflow subjects: dev stacks, pipelines, studios, data centres.

Boundary: there are no people here. For a character acting out a tech moment use \`illustration-flat-with-black\` or \`illustration-outlined-cartoon\`; for one hero object with a hard offset shadow and floating extras use \`illustration-teal-spot\`; for chunky navy-extruded pop geometry use \`illustration-bold-pop\`.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards. Design Studio and CI Pipeline both scored 8.5 on their first judged round; both were built on the kit that ships in \`scripts/iso.mjs\`.

## The look in one sentence
Every surface is a flat face of a true-isometric solid, filled from one green ramp by the direction it faces and outlined in 0.9 deep green, standing on a single bevelled off-white slab with soft green light pooled around it.

## Palette

| Role | Hex | Where it goes |
|---|---|---|
| Card background | \`#ffffff\` | No background rect; the slab floats on white |
| Outline | \`#0f3d30\` | Every visible edge (0.9), insets and panels (0.5–0.55), tiny parts (0.35–0.45) |
| Off-white | \`#fbf8f1\` | Slab top, top faces of light and mid objects, label plates, paper |
| Pale mint | \`#c9f3d6\` | Slab chamfer, lit LEDs, highlighted code lines, trackpads, tape |
| Mint | \`#8de8a6\` | Left (+y) faces of light objects, slab band, code lines, leaf faces |
| Mid green | \`#5cc58a\` | Right (+x) faces of light objects, left faces of mid objects, glows, detail lines |
| Deep green | \`#2f9e6c\` | Right faces of mid objects, keys, shadow starts, fine ribs, slab bottom bevel |
| Very deep | \`#0b4a3a\` | Screens, keyboards' wells, rack units, mug interiors, terminal cards |

- Faces get colour from \`shade(normal, material)\`, which blends top/left/right colours by the face normal. Curved and rotated faces therefore produce in-between hexes (50–140 per card). They are correct; check them with \`scripts/ramp-check.mjs\`, not by eye. \`lint.mjs --palette\` lists them all as warnings by design.
- Materials (top / left / right): \`M.light\` off-white / mint / mid (default objects), \`M.pale\` off-white / pale / mint (plugs, coasters), \`M.mid\` off-white / mid / deep (racks, monitors, pots, cabinets), \`M.deep\` very deep / mid / deep (flat dark cards), \`M.dark\` deep / deep / very deep.
- Opacity only on floor decals (shadows, glows, the slab's under-shadow), screen sheens (\`#5cc58a\` 0.16–0.22) and highlight bands. No other hue ever: no greys, no accent colour, no text colour outside the ramp.

## Line and fill
Numbers in SVG units at 480 wide (the kit already scales plan units by K = 0.91).

- **Outline 0.9 \`#0f3d30\`** on every visible edge of every solid, drawn once per edge (\`poly3\`, \`prismZ\` and \`platform\` do this). Round joins and caps.
- **Face fills** carry a 0.35 stroke in their own colour so neighbouring faces don't show hairline gaps. Do the same whenever you \`fillP\` a face yourself.
- **Panels and insets** 0.5–0.55 (door insets at stroke-opacity 0.7, plinth lines at 0.6). **Tiny parts** (plugs, corner castings, swatches) 0.35–0.45.
- **Detail lines in ramp greens:** ribs and vents 0.45–0.6 in \`#2f9e6c\` or \`#0b4a3a\` (opacity 0.55–0.75 on the right faces), container ribs every 2.6, vents every 2.2, rack units every 6.4 with LEDs r 0.7–0.8, book page lines every 1.15, code lines 1.0–1.2 in pale/mint/mid on very deep screens, a \`>_\` prompt at 2.4.
- **Platform:** inner rim \`#5cc58a\` 0.6 at opacity 0.75, 6.5 inside the edge; bevel seams 0.5 at opacity 0.55; a soft under-shadow \`#5cc58a\` at 0.2 offset 4 and blurred 4.
- **Cables:** three strokes along one Catmull-Rom curve: outline 3.0, mid green 1.55, a 0.5 mint highlight offset (−0.35, −0.45). A thinner gauge: 2.46 and 1.09.

## Characters
This style draws no people. The hero-object rules take their place:
- **One hero**, usually at the slab centre (plan x and y within ±30): a laptop with code, a monitor with a design tool, a conveyor. It carries the most detail and gets a mid-green glow in front of it (\`glow(..., 0.5)\` about 52 x 30). A hero that is a tall row (a rack row) runs along an upper edge instead, with its glow on the floor in front of it.
- **Supporting objects** are 40–70% of the hero's footprint and each tells one part of the subject. Build every one from boxes, rounded prisms, cylinders and extrusions; nothing is a flat icon stuck on the slab except deliberate flat cards (z ≤ 3).
- **Every object has one face of fine repeated detail** (units, ribs, keys, pages, slats) and at least one glyph that names it (\`</>\`, a tick, an upload arrow, a \`>_\`).
- **Heights vary in four bands:** flat 2–3 (cards, sketchbooks), low 18–30 (mugs, books, containers), mid 40–60 (cabinets, gates), tall 68–90 (racks, shelves, towers, monitors). Tall pieces stand only along the upper edges; a row of identical racks counts as one piece.

## Decor and props
- **Kit props** (\`scripts/iso.mjs\`): \`rack\`, \`database\`, \`laptop\`, \`container\`, \`mug\`, \`card\` (terminal), \`cloudBadge\`, \`books\`/\`book\`, \`plant\`, \`tower\` (status lights), \`cable\` with \`cableShadow\`. Primitives: \`box\`, \`rbox\` (rotated), \`prismZ\` over \`rring\`/\`circle\` (rounded slabs, cylinders), \`poly3\` (any convex solid), \`extrude\` (standing badges and icons), \`textOn\`. Detail helpers: \`hatch\`, \`dotGrid\`, \`fan\`.
- **Example-only props** worth copying from the generators' structure: monitor with design UI, shelf, drawing tablet, sketchbook, pen cup, swatches, mood board (Design Studio); conveyor, gates, robot arm, pallet stack, dashboard card, rocket badge (CI Pipeline). Read them in \`examples/*.svg\` for layout and detail density.
- **Reuse with care:** take at most three kit props straight from any one example; build the rest for the subject from primitives (a cooling unit is a box with \`fan\` and \`hatch\`, a drive crate is an open box with thin boxes inside, gas cylinders are \`prismZ\` cylinders with a label band).
- **Floor light:** a cast shadow for every object; a dark contact pool (\`#2f9e6c\` at 0.3–0.34) under every small object; one to four mid-green glows (0.46–0.6) in front of screens, LEDs and lit panels; \`halo()\` for lamps and stack lights.
- **Text:** none, or at most two monospace labels laid on a face with \`textOn()\` (\`ui-monospace\` 5.6, weight 700, pale mint on very deep). Draw glyphs as lines.
- **Never:** people, sky, background shapes, a second slab, floating objects off the slab, sparkles, confetti, any non-green hue, perspective.

## Composition
- One slab: \`platform()\` with half size 122 and corner radius 26 in plan units. It projects to x 55.5–424 (77% of the card width), its bottom edge at y 330.5. With objects the ink box is 368.5 x 287–297: margins left and right 56, bottom 30, top 34–44.
- Card ink coverage 22–24%. Seven to ten objects (a flat floor element such as tiles or a card counts) with 12–25 plan units between footprints; keep every footprint within ±110 so it stays clear of the rim line.
- Where plan points land on the card: \`screen x = 240 + 0.788·(x − y)\`, \`screen y = 204 + 0.455·(x + y) − 0.91·z\`.

| Slab part | Plan | Card |
|---|---|---|
| Back corner (top) | (−122, −122) | (240, 93) |
| Left corner | (−122, 122) | (48, 204) |
| Right corner | (122, −122) | (432, 204) |
| Front corner (bottom) | (122, 122) | (240, 315) |
| Upper-left edge / upper-right edge | x = −122 / y = −122 | |

- Depth runs from the back corner (small x + y) to the front corner (large x + y). Put tall pieces along the two upper edges, flat cards and small items toward the left, right and front corners. Fill all four quadrants of the slab.
- **The slab centre (plan 0, 0; card 240, 204) always holds an object.** Usually that is the hero. When the subject is itself a tall row (racks, shelves), the row runs along an upper edge and a low object takes the centre; an empty centre reads as a hole.
- **Spread objects in screen x, not just in plan.** Objects with similar \`x − y\` stack in one column on the card and overlap each other; give neighbours in depth different \`x − y\`.
- Leave at least 4 px on the card between neighbouring silhouettes, or overlap them clearly; a cylinder top just kissing a base plate reads as a tangent.
- One or two cables tie the hero to back objects and lie on the slab (z 1.1), climbing into ports at the ends.
- Light comes from −x (upper left): every shadow falls toward +x (lower right).

## Techniques

**1. The projection and the shading come from the kit.** Plan coordinates \`(x, y, z)\` map with \`P(x, y, z) = [240 + (x − y)·cos30°·0.91, 204 + ((x + y)/2 − z)·0.91]\`. Build solids and let the kit pick each face's fill:

\`\`\`js
import * as I from '/abs/path/illustration-isometric-mono/scripts/iso.mjs';
I.init('dc-'); I.floorDefs(); I.platform();
// ...every castShadow / glow / cableShadow, then I.flushFloor() (technique 3)...
I.box(-20, 20, -30, 30, 0, 40, I.M.mid);                                   // a cabinet
I.prismZ(I.rring(60, 60, 18, 12, 3, 0, 3), 0, 3, I.M.deep);                 // a rounded flat card
I.prismZ(I.circle(-60, 60, 12, 12), 0, 24, I.M.light);                      // a cylinder
\`\`\`

**2. Draw on faces with face mappers.** \`onLeft(y)\` maps \`(x, z)\` onto the +y face, \`onRight(x)\` maps \`(y, z)\` onto the +x face, \`onTop(z)\` maps \`(x, y)\`. Combine with \`quad()\` and \`line()\`:

\`\`\`js
const F = I.onLeft(30);                                                    // front (+y) face of the cabinet
I.both(I.D(I.quad(F, -16, 4, 16, 36)), I.VD, I.OUT, 0.5);                  // dark door panel
let ribs = ''; for (let x = -13; x <= 13; x += 2) ribs += I.line(F, [[x, 8], [x, 32]]);
I.strokeP(ribs, I.DG, 0.5);                                                // fine repeated detail
\`\`\`

**3. Floor first, then objects back to front.** All \`castShadow\`, \`glow\` and \`cableShadow\` calls go before \`flushFloor()\`, which clips them to the slab and blurs them by 1.6. Shadow length is \`h · 0.62\` plan units toward +x; for very tall objects pass \`h · 0.35–0.45\` so the shadow doesn't run off the slab.

\`\`\`js
I.castShadow(I.rectFoot(-20, 20, -30, 30), 40, 0.62, 0.24);                // footprint, height, length k, alpha
I.glow(60, 60, 26, 20, I.DG, 0.32);                                        // contact pool under a small object
I.glow(0, 50, 52, 30, I.MG, 0.5);                                          // screen spill in front of the hero
I.flushFloor();
\`\`\`

Then draw objects in ascending \`x + y\` of their footprint centres. When one object reaches both behind and in front of another (a conveyor through gates, a robot arm over a belt), split it into back and front calls, as the CI Pipeline card does.

**4. Fine repeated detail has helpers.** \`hatch(F, u0, u1, w0, w1, step, dir, colour, width)\` draws ribs, slats, vents, bays and louvres inside a face rectangle (\`dir 'w'\` lines run along w, \`'u'\` along u); \`dotGrid(F, ...)\` draws perforations and cork; \`fan(F, uc, wc, r)\` draws a round fan grille. Put each feature on a face that has open slab in front of it: a +x face needs clear slab toward +x, a +y face toward +y. A fan drawn on a +x face six units from a taller rack was hidden entirely. Reserve a clear strip on a face for a cable socket; a socket drawn over a battery panel looks like a mistake.

\`\`\`js
const R = I.onRight(-90);                                                  // +x face of a cooling unit at x = -90
I.fan(R, -46, 34, 13);                                                     // fan centred at y -46, z 34
I.hatch(R, -62, -30, 7, 18, 2.2, 'u', I.DG, 0.5);                          // louvres under it
I.dotGrid(I.onTop(1.2), -82, -70, -64, -54, 2.4, I.DG, 0.7, 0.7);          // perforated floor tile
\`\`\`

**5. Standing shapes are extrusions.** For a badge, logo or icon standing on the slab, describe its outline in \`(u, w)\` and pass a front-face mapper to \`extrude()\` (or copy \`cloudBadge()\`): side walls are sorted and shaded automatically, concave notches get crease lines.

A full worked card: \`scripts/dev-stack.gen.mjs\` rebuilds \`examples/dev-stack.svg\` from a layout table (identical to within anti-aliasing). Start every new card by copying it.

## Failure modes
- **Objects float.** The first Dev Stack round had no cast shadows or contact pools and every object looked pasted on; give each object a \`castShadow\` and each small one a dark pool.
- **Wireframe objects.** An early container drawn as outlines and ribs read as a cage; fill every face from a material.
- **Empty slab region.** The first layout left the front right quarter bare; spread seven to ten objects over all four quadrants.
- **Empty centre.** With the racks along the back edge, a first Data Center layout left plan (0, 0) bare and the card read as a ring of objects round a hole; put a low object there.
- **A column of objects.** Three props placed at different plan depths but the same \`x − y\` stacked on top of each other on the card; vary \`x − y\`.
- **Detail on a hidden face.** A fan grille on a face that a taller neighbour covers is wasted; check which faces stay visible before decorating.
- **The slab floats.** Removing the platform's blurred under-shadow makes the whole diorama hover; keep \`platform()\` intact.
- **Painter's order wrong.** An object drawn after a nearer one covers it; sort by \`x + y\` and split straddling objects. Open containers (crates, trays, shelves) need three passes: the box and its dark opening, then the contents back to front, then the near walls (+y and +x faces) and their top rims again. Drawn in one pass, drives in a crate hung in front of its front wall.
- **A rearranged example.** A first Data Center draft reused six kit props from Dev Stack (card, books, cloud, database, rack, mug) and read as Dev Stack moved around; use at most three props from any one example and build the rest for the subject.
- **Shadows in two directions.** Mixed light reads as a mistake at once; every shadow goes toward +x.
- **Hairline seams between faces.** A face filled without its 0.35 self-coloured stroke shows a white crack against its neighbour at 2x.
- **Heavy or uneven lines.** Edges thicker than 0.9 turn it into an icon set; detail heavier than 0.6 clogs. Keep the two tiers.
- **Coarse detail.** Plain boxes without ribs, units or keys read as a low-detail stock icon; every object needs one face of fine repeats.
- **A non-green colour.** Any accent hue breaks the monochrome; \`ramp-check.mjs\` fails on it.
- **Fake isometric.** Angles from a 2:1 pixel grid or a perspective camera don't match the kit's 30°; only ever place points through \`P()\`.
- **Text instead of glyphs.** Words on objects look like labels on a diagram; draw \`</>\`, ticks and arrows as lines.

## Examples
- \`examples/dev-stack.svg\`: "Dev Stack". A laptop with code cabled to two server racks, a database stack, a shipping container, a terminal card, a cloud upload badge, books and a mug. Shows racks, cylinders, the laptop screen UI, cables and contact pools. Rebuilt by \`scripts/dev-stack.gen.mjs\`.
- \`examples/design-studio.svg\`: "Design Studio". A monitor running a design tool on a stand, a drawing tablet with stylus, a bookshelf, a mood board, a sketchbook, swatches, a pen cup, a snake plant and a mug. Shows screen UI on a vertical face, leaning books and frames, the plant leaves.
- \`examples/ci-pipeline.svg\`: "CI Pipeline". Code boxes ride a conveyor out of a repo cabinet through build and test gates to a robot arm that stacks them on a pallet, with a status tower, a container, a dashboard card and a rocket badge. Shows split back/front drawing, text on a face, halos and a story told left to right.

## Workflow
Run every command from the skill folder (the folder that holds this file).

1. **Brief.** Name the subject and list seven to ten objects that tell it, with one hero. Say what glyph names each object.
2. **Layout table.** Copy \`scripts/dev-stack.gen.mjs\` to your work folder as \`card.gen.mjs\`, change its import to \`scripts/iso.mjs\` by absolute path, and replace the layout table: footprints in plan units within ±110, heights in the four bands, tall pieces along the upper edges, something at the centre. Before drawing, convert each footprint centre to card coordinates with the formula in Composition and check that no two objects share a screen column.
3. **Floor.** One \`castShadow\` per object, contact pools for small objects, one to four glows, cable shadows, then \`flushFloor()\`.
4. **Objects back to front.** Kit props first; write new props as functions in \`card.gen.mjs\` from \`box\`, \`prismZ\`, \`poly3\`, \`extrude\` and face mappers, each with one face of fine detail and one glyph.
5. **Render:** \`node /path/card.gen.mjs card.svg "Card Title" && node scripts/render.mjs card.svg card.png\`
6. **Sheet with the examples:** \`node scripts/render.mjs --sheet sheet.png examples/*.svg card.svg\`. Ask "same kit, same set?"
7. **Zoom** each object at 4–6x: \`node scripts/render.mjs card.svg z-obj.png --zoom x,y,w,h --scale 6\`. Check seams, outline weights, painter's order, shadow contact, cable ends in their ports.
8. **Critique** on the five criteria in references/craft.md (criterion 2 becomes "object drawing": construction, detail density, glyphs). Fix and repeat from step 5; expect three or four rounds.
9. **Lint and colour check:** \`node scripts/lint.mjs card.svg --prefix xx-\` must PASS, then \`node scripts/ramp-check.mjs card.svg\` must report 0 strays.

## Verify
- [ ] Every point comes from \`P()\`: edges run at exactly ±30° or vertical.
- [ ] One slab, 368.5 wide, side margins 56, bottom margin 30; nothing leaves the slab.
- [ ] Seven to ten objects in all four quadrants, one at the slab centre; tall pieces along the upper edges.
- [ ] Each face's fill matches its orientation: top lightest, +y face mid, +x face darkest (dark \`M.deep\` slabs excepted).
- [ ] Every visible edge is outlined at 0.9; all detail strokes are 0.6 or finer (except code lines, glyph strokes, bars and cables).
- [ ] No white hairline cracks between faces at 4x.
- [ ] Every object casts a shadow toward the lower right; small objects sit in a dark contact pool.
- [ ] The hero has a mid-green glow in front of it and the most detail.
- [ ] Every object has a face of fine repeated detail and a glyph that names it, on a face with open slab in front of it.
- [ ] No two silhouettes kiss: 4 px or more apart on the card, or clearly overlapped.
- [ ] Cables lie on the slab and end inside a plug on a face.
- [ ] No people, no non-green hue, at most two monospace labels.
- [ ] \`ramp-check.mjs\` reports 0 strays and \`lint.mjs --prefix\` passes.
- [ ] The subject reads at 1x from the objects alone.
`,
  'line-interior': `---
name: illustration-line-interior
description: Draws original hand-written SVG spot scenes in the Line interior style, wide airy rooms or terraces where slim, realistic people do design and coding work. A thin uniform indigo outline (1.4 px at 480 wide) runs around mostly white fills. Sparse flat accents (teal, sage, coral, mustard, lavender, peach wood) cover under 7% of the card. Pale lavender 1 px background decor (brick clusters, pendant lamps, framed posters) sits behind, and a long floor line with end dashes runs under it all. Covers the palette, line weights, heads and hands from a parts toolkit, composition and a render-critique loop. Use when asked for line-art, thin-line or outline illustrations, indigo line art, office, desk, home-workspace, remote-work or team scenes, or interior spot illustrations for empty states, onboarding screens, 404 pages, blog headers, feature spots, landing sections or marketing cards.
---

# Illustration: Line interior

A calm, editorial line style: a whole room at small scale, people at about one seventh head-to-height, every shape outlined once in thin indigo and filled white, with a few flat accents. It suits product marketing that wants "people at work" without loud colour.
Use \`illustration-outlined-cartoon\` for big-headed characters with a near-black ~2.4 px ink line and bold fills. Use \`illustration-framed-panel\` when the scene should sit inside a coloured panel on a pastel card. Use \`illustration-flat\` when there should be no outlines at all.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence
One thin, uniform indigo outline (1.4 px) around white-filled shapes in a wide, airy room, with flat colour on under 7% of the card.

## Palette
Measured from the three examples (fills and strokes, 1x renders). White and the card make up about 85% of the pixels, indigo line about 2%, accents 4–7%.

| Role | Hex | Where it goes |
|---|---|---|
| Indigo ink | \`#3a2d66\` | every outline, the floor line, eye dots, indigo hair (hair is a filled ink shape) |
| Wall line | \`#cfc9e0\` | background decor strokes only (bricks, lamps, posters, clouds, birds, skyline, railing). Never a fill |
| White | \`#ffffff\` | default fill for everything: furniture, shirts, screens, pots, books, sneakers, mugs |
| Peach wood | \`#f9c99a\` | wood: ladder rails and boards, posts, stool, crate, a striped pot |
| Mustard | \`#f5c35a\` | one book, a duck, bulbs, sneakers, sticky notes, earring stud, a top |
| Orange | \`#f6a85e\` | a pot, trousers, a duck beak, shine arcs on brown hair, one code dash |
| Coral | \`#ef5b5b\` | sneakers or soles, a label, a marker tip, a mug band, one code dash, window dot |
| Teal | \`#3fa58a\` | a book, a top, a mug band, a hammock stripe, a check mark |
| Sage / Leaf | \`#8cc79b\` / \`#5fae7a\` | light and dark leaves, alternating leaf by leaf |
| Lavender | \`#ab9ee6\` | a book, a top, page lines, keyboard lines, a sneaker sole |
| Purple | \`#7f6cc4\` | a book, trousers, shine arcs on indigo hair, one code dash |
| Denim | \`#7f9fdc\` | jeans |
| Brown | \`#7b4b3a\` | brown hair, coffee in a cup |
| Skin | \`#f3cdb0\` \`#e2a57c\` \`#b47852\` \`#7a4b33\` | light, medium, deep, dark; two people in a card get two different tones |

- Never: gradients, opacity, drop shadows, hatching, black, grey fills, the wall-line colour as a fill, a coloured background rect.
- One accent per object. A person wears at most two accents plus white: top, trousers, and sneakers where either the upper or the sole is white.
- No two large accent shapes of the same hue touch (a coral shoe on a coral rug). Keep the big shapes (shelf, board, desk, hammock) white or peach.

## Line and fill
- Two layers. Background: \`<g id="xx-bg" fill="none" stroke="#cfc9e0" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">\`. Foreground: \`<g id="xx-fg" stroke="#3a2d66" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">\`. Shapes inherit the stroke; each sets its own \`fill\`.
- Outlines are strokes on filled shapes, never filled outline shapes. Every foreground shape gets a fill (white if nothing else), so overlap hides what is behind. Depth comes only from overlap order: draw back to front, far limbs before the torso.
- Weights at 480 wide: 1.4 for every outline; 1 for detail lines (fabric folds, leaf veins, book bands, lace ticks, ear inner, brows, nose, mouth, steam, x marks, hair shine); 0.9 for finger separations; 1.2 for whiteboard diagram strokes; 1.7–1.8 coloured dashes for code on screens; 2.2 for bullet dots (\`M190 146h0.1\`).
- Shading: none. No tone steps, no hatching, no highlights. A fold is one 1 px curve, 4–8 px long, 2–3 per garment.
- Texture: tiny x marks (\`xm()\`, 3 px, stroke 1), 2–4 per pot or box. Never on clothing.
- Lettering: \`font-family="ui-monospace, monospace" font-weight="700"\`, 4.4–5.2 px, 2–5 letters (JS, CSS, UX, API, CACHE) on a small label rect, \`stroke="none"\`.
- Rounded corners: rx 0.6–1 on books and bricks, 1.5–2.5 on furniture tops and frames.

## Characters
- Proportions: a standing figure is 229–235 px from crown to sole; the head (chin to crown) is 33–36 px, so 1:7. Slim: shoulders about 30 wide, legs with hip half-width 9.6–11 tapering to 5.6–5.8 at the hem.
- Head: build it with \`head()\` from the toolkit. It draws a 3/4 profile facing left or right: one face path with the nose and chin in the contour, an ear on the back side, a near eye dot (r 1.15) and a far eye dot (r 1.0) 4.9 apart, two 1 px brows, a nostril tick and a short mouth arc. No cheek colour, no pupils, no open mouths. Calm, slightly smiling.
- Hair: one flat shape in indigo \`#3a2d66\` (1–4 shine arcs in purple \`#7f6cc4\`) or brown \`#7b4b3a\` (shine in orange \`#f6a85e\`). Presets: \`afro\`, \`bun\`, \`side\`, \`crop\` (+ \`beard\`, \`glasses\`, \`earring\`). The afro's back mass returns as \`behind\`: draw it before the torso.
- \`head(x, y, rot, opts)\` rotates in screen degrees (+ = clockwise). That nods a right-facing head DOWN and a left-facing head UP. Tilt 4–9° toward what the person looks at.
- Neck and torso: \`torso(hx, hy, { style: 'tee' | 'top', facing, fill, skin })\` draws the neck, a soft shirt shape 30–34 wide (crew-neck tee or fitted top with a small V collar) and two 1 px folds, all placed from the head centre. \`TORSO_ANCHORS[style]\` gives the shoulder, hip and waistband points relative to the head centre. Mirror their x for a left-facing figure. Tops are white or one accent.
- Sleeves: \`sleeve(S, arm.u, 13, 5.8)\` caps the upper arm; drawn after the arm. A flatter sleeve (half-width under 6) avoids a shoulder-pad look.
- Arms: \`bentArm()\` with half-widths 4.4–5 shoulder, 4–4.4 elbow, 3.2–3.4 wrist. It gives a pointed outer elbow; add the 3 px crease line from \`arm.I\`. Upper arm 27–40, forearm 24–33. Use \`solveElbow(S, wrist, 35, 30, flip)\` and try both \`flip\` values: the right one hangs the elbow below the shoulder-to-wrist line. Keep the wrist 45–60 px from the shoulder. Closer, and the arm folds into a chicken wing.
- Put a fingertip on a target with \`wristFor(HANDS[name].tip, target, angle, scale, flip)\`. It returns the wrist point to solve the arm to.
- The far arm in a profile view: show it. Swing it back behind the hip (or forward behind a held object), drawn before the torso, so a forearm and a \`rest\` hand show below the torso. A figure with one arm reads as "an arm is missing".
- Hands (toolkit \`HANDS\`): 17 local units at scale 1.05–1.15, so 18–20 px long, about the face from chin to brow. Fingers are 3–4 rounded bands with 0.9 separation lines; the middle finger is longest, the little finger shortest. Shapes: \`type\` (palm down on keys), \`cup\` (wrapped round a mug, thumb over the rim), \`wrap\` (same, thumb hidden behind the object), \`marker\` (fist round a pen, with \`HANDS.marker.pen()\`), \`point\` (index out, thumb tucked), \`rest\` (relaxed).
- Every hand shape has its thumb on local −y. Decide LEFT or RIGHT and PALM or BACK with the table in \`references/craft.md\`, then pass \`flip = true\` when the thumb belongs on +y.
- Legs and feet: \`trouserLeg()\` for standing legs (tapered, flat hem, 5.2 px rolled cuff band, 4–10 px of ankle skin); \`bentLeg()\` + \`cuffAndAnkle()\` for sitting or stepping. \`sneaker()\` is 25 × 10.6 with a 3 px sole band and two lace ticks; heel at the floor point, mirrored with \`scale(-1 1)\`. End each trouser leg at the shoe's \`shoeOpening(heel, rot, mirror)\`.
- Rear foot on its toes: \`heel = liftedHeel(toeX, 22–28, mirror)\`, then \`sneaker(\\\`translate(heel) rotate(deg)\\\`)\`. For a mirrored shoe use \`rotate(-deg) scale(-1 1)\` and \`shoeOpening(heel, -deg, true)\`.
- Poses that work: reaching up to a shelf or board, or pressing a button, with the upper body leaning 4–9° (rotate the upper-body group about the hip and the shoulder points with \`rotAbout()\`); the rear heel lifted so only the toe touches the floor; lying in a hammock with the laptop on the thighs; sitting on a stool, one foot on the rung, holding a cup.

## Decor and props
- Background layer (wall line, unfilled), all of it pale and secondary: 2–3 brick clusters of 3–5 bricks (\`bricks()\`, 14 × 6, rows 7 apart), 1–2 pendant lamps hanging from the card's top edge (\`lampDome()\`, \`lampCone()\`), 1 framed poster on a nail (\`poster()\`) with a simple icon inside. Outdoors: 2–3 outline clouds, 2–3 birds, a skyline and a railing instead of bricks.
- Foreground, per card: one hero prop in the middle that carries the subject (ladder shelf 98 × 203, whiteboard on wheels 160 × 256, hammock between posts 260 wide); one tall plant in a pot at one end (60–68 wide, 150–185 tall); one secondary piece at the other end (desk with a monitor and mug, a short snake plant, a stool with a colleague); 2–4 small props (mug with two 1 px steam curls, books with band lines and labels, a rubber duck, sticky notes, a monitor with window dots and coloured code dashes).
- Plants: \`leaf()\` (lance leaves with veins), \`figLeaf()\` (fiddle-leaf fig), \`blade()\` (snake plant), stems as 1.4 px open curves from the pot, leaves alternating sage and leaf green. Pots: \`pot()\`, white with x marks, peach with 1 px bands, or orange.
- Never: sparkles, confetti, floating icons, speech bubbles, shadows under objects, rugs, more than two items on the floor beside the hero.

## Composition
- No background rect: the card is white (the examples have none). If the host page is not white, add a square full-bleed \`#ffffff\` rect first.
- Floor line at y 308: \`M56 308H424M40 308h10M430 308h10\`. Every foot, pot, leg and caster stands on it. The band below (y 308–360) stays empty.
- Content spans x 33–445. Only lamp cords touch an edge (the top). Everything else stays at y ≥ 25.
- Left to right: tall plant (x 33–121) | hero prop with the figure acting on it (x 115–335) | secondary furniture or plant (x 330–445). Mirror this freely, but keep the hero central.
- Figures: 94–190 px wide, 235 tall standing. One focal action, at the figure's hands.
- Density: about 10–14 foreground objects including plant leaves; generous white space between groups. Busy is wrong here.
- Group transforms the examples use: \`translate(-8 0)\` to nudge a whole figure; \`rotate(-7 284 180)\` on the upper-body group (neck, torso, head, sleeve) to lean it over the hips.

## Techniques

**1. A parts toolkit.** \`scripts/interior.mjs\` (no dependencies) has every repeated part with the examples' numbers: layers, floor, bricks, lamps, poster, cloud, leaves, pots, \`limb\`, \`bentArm\`, \`solveElbow\`, \`sleeve\`, \`torso\`, \`trouserLeg\`, \`bentLeg\`, \`cuffAndAnkle\`, \`sneaker\`, \`shoeOpening\`, \`liftedHeel\`, \`rotAbout\`, \`HANDS\` + \`hand()\` + \`place()\` + \`wristFor()\`, \`head()\` and \`mirrorPath()\`. Run \`node scripts/interior.mjs --demo /abs/work/demo.svg\` from the skill folder (write it into your work folder, not the skill) and render it to see every part. The demo output is a parts sheet: four heads, six hands with thumbs up, two plants, the lamps, the bricks and a standing figure built from the parts.

A complete figure, tested: a woman facing left points at a chart. Save it as \`card.mjs\` next to your card, fix the import path, and run \`node card.mjs\`.

\`\`\`js
import fs from 'node:fs';
import * as LI from '/abs/path/to/illustration-line-interior/scripts/interior.mjs';
const { W, C, SKIN, FL, P, f } = LI, id = 'sn-', sk = SKIN.medium;
const HC = [300, 102], A = LI.TORSO_ANCHORS.top, rel = q => [HC[0] - q[0], HC[1] + q[1]];  // facing left: mirror x
const LEAN = -5, PV = [300, 188];                                   // lean toward the left, about the hips
const h = LI.head(HC[0], HC[1], -4, { hair: 'bun', facing: 'left', skin: sk, hairColor: C.brown, earring: true });
const heelB = LI.liftedHeel(300, 24, true);                         // rear heel up, toe on the floor
const legF = LI.trouserLeg([[296, 188], [293, 230], [291, 270], [290, 291]], [10, 8, 6.2, 5.8], LI.shoeOpening([297, FL], 0, true), C.denim, sk);
const legB = LI.trouserLeg([[306, 188], [309, 230], [313, 262], [316, 282]], [10.6, 8.4, 6.4, 5.8], LI.shoeOpening(heelB, -24, true), C.denim, sk);
let fg = LI.floor(id);
fg += \`<rect x="150" y="96" width="70" height="54" rx="2" fill="\${W}"/><path d="M158 138l14-16 10 9 12-15 16 12" fill="none" stroke="\${C.teal}" stroke-width="1.8"/>\`;
fg += legB.skin + LI.sneaker(\`translate(\${P(heelB)}) rotate(-24) scale(-1 1)\`, C.coral, W) + legB.leg;
fg += legF.skin + LI.sneaker(\`translate(297 \${FL}) scale(-1 1)\`, C.coral, W) + legF.leg;
fg += \`<rect x="284" y="\${HC[1] + A.waistTop}" width="33" height="5" rx="0.8" fill="\${C.denim}"/>\`;
fg += \`<g transform="rotate(\${LEAN} \${P(PV)})">\${LI.torso(HC[0], HC[1], { style: 'top', facing: 'left', fill: C.lav, skin: sk })}\${h.front}</g>\`;
// near arm = LEFT (she faces left); back of the hand visible, index pointing left -> thumb UP.
// HANDS.point keeps its thumb on local -y; at 186 deg local -y points DOWN, so flip = true.
const S = LI.rotAbout(rel(A.nearShoulder), LEAN, PV), ang = 186, tip = [221, 124];
const Wr = LI.wristFor(LI.HANDS.point.tip, tip, ang, 1.1, true);
const arm = LI.bentArm(S, LI.solveElbow(S, Wr, 36, 30), Wr, 4.6, 4.2, 3.3);
fg += \`<path d="\${arm.d}" fill="\${sk}"/><path d="M\${P(arm.I)}l\${f(-arm.u[0] * 3)} \${f(-arm.u[1] * 3)}" fill="none" stroke-width="1"/>\`;
fg += \`<path d="\${LI.sleeve(S, arm.u, 13, 5.8)}" fill="\${C.lav}"/>\` + LI.place(LI.hand('point', sk), Wr[0], Wr[1], ang, true, id + 'hand', 1.1);
const bg = LI.bgLayer(id, LI.bricks(60, 80, [[0, 0], [15, 0], [7, 7]]) + LI.lampDome(380, 40));
fs.writeFileSync('card.svg', LI.svgWrap(bg + LI.fgLayer(id, fg), 'Snippet test, Line interior style'));
\`\`\`
It still needs the far arm, a plant, the hero prop and the room. It shows the order: legs → waistband → leaned torso and head → near arm → sleeve → hand.

**2. Hands without a wrist wedge.** Draw the hand outline twice: once filled with \`stroke="none"\`, once as an open path (the \`Z\` removed), then the 0.9 finger lines, then the thumb. \`hand()\` does this. A closed stroke across the wrist draws a dark wedge where the forearm meets the hand.

**3. Lean by group rotation.** Put the torso (with its neck), any backpack or strap and the head in one \`<g transform="rotate(-7 hipX hipY)">\`. Solve the arms in card coordinates from \`rotAbout(shoulder, -7, [hipX, hipY])\`, so the hand still lands on the object, and draw the arm, sleeve and hand outside the group.

**4. Screen and board content in colour, not ink.** Code on a monitor is 4–6 rows of round-capped dashes, \`stroke-width="1.8"\`, each dash one accent (purple, teal, coral, lavender, orange), on a white screen with three window dots (coral, mustard, teal, r 0.9). Diagrams are 1.2 px boxes and arrows in ink, one box in coral and one in teal.

## Failure modes
- **Too much colour.** The first Books draft (scored 6) had a mustard top, a brown shelf, an orange pot and x marks on the clothes. The redraw that reached 8 used colour more sparingly. Keep big shapes white or peach, and accents under 7% (white ≥ 83%).
- **The subject reads as something else.** A developer standing at a desk read as "standing desk", not "Books". The figure must do the subject: pull the book off the shelf, draw on the board.
- **Bolt-upright clip-art figure.** Lean the upper body 4–9°, put the weight on one leg, lift the rear heel. Front-facing symmetric poses score a point lower.
- **Dark wedge at the wrist.** A closed outline across the wrist. Use \`hand()\` (fill pass plus open outline).
- **Thumb on the wrong side.** Two shipped hands were copies of a right-hand template on a left arm (Remote Work's far typing hand, Whiteboard's mug hand), and both had to be mirrored. Work out handedness per hand, then \`flip\`.
- **Mitten or rake hands.** Fingers must be grouped bands of different lengths with rounded tips, 18–20 px long. Larger reads as a glove.
- **Arm with no elbow.** A straight tube from shoulder to object reads as a prosthetic. Use \`bentArm()\` and the crease line.
- **Chicken-wing arm.** The target sat 33 px from the shoulder, so a 66 px arm folded up with the elbow out. Move the prop or the figure until the wrist is 45–60 px from the shoulder, and try the other \`flip\`.
- **One-armed figure.** A profile figure with the far arm hidden reads as missing an arm. Swing the far arm back so its forearm and hand show behind the hip.
- **Stray ticks.** A 1 px fold line within 4 px of a limb's edge, or a strap end poking 2 px out from under a sleeve, reads as a slip. End a covered shape at least 3 px inside the shape that covers it, and keep folds away from other contours.
- **Floating feet or pots.** Sneaker heels sit at y 308 exactly. A rotated rear shoe touches the floor with its toe. Check every contact at 8x.
- **X marks on clothes.** They read as stains. Keep them on pots and boxes.
- **Background competing with the figure.** Decor drawn in indigo or filled looks like foreground clutter. It is wall-line \`#cfc9e0\`, 1 px, unfilled, and sits at least 8 px clear of the figure's head.
- **Weight drift.** A 2 px outline or a 0.6 px detail breaks the style at once. Use exactly 1.4, 1 and 0.9.

## Examples
- \`examples/books.svg\`: "Books". A reaching pose with a −7° lean and a bent near arm gripping a book on the shelf (thumb on top). The far hand holds an open book at the hip. Afro back hair is drawn behind the torso. Ladder shelf with labelled books, a duck, a desk with a monitor, lance-leaf plant.
- \`examples/remote-work.svg\`: "Remote Work". Lying in a hammock with both hands on a laptop (\`type\` hands, mirrored for left and right). Outdoor variant of the background (clouds, birds, skyline, railing), string lights, a crate with a mug, monstera leaves, a snake plant. A \`clipPath\` hides the legs behind the hammock rim.
- \`examples/whiteboard.svg\`: "Whiteboard". Two people: one reaching up with a \`marker\` fist and a \`wrap\` hand on a mug, one seated on a stool with a \`cup\` hand, beard and glasses. Diagram content in 1.2 px ink and accent strokes, sticky notes, casters on the floor line, fig plant.

## Workflow
Run every command from this skill's folder. Card paths can be absolute.
1. **Brief.** Name the subject in a few words and write the one action that shows it (who does what to which prop). Pick the hero prop and the pose.
2. **Plan the layout** on the 480 × 360 grid: floor y 308, plant at one end, hero prop centred, secondary piece at the other end. Pick the skin tones, hair presets and the 2 accents each person wears. Choose an id prefix (\`ob-\`).
3. **Write a generator** (\`card.mjs\`) that imports \`scripts/interior.mjs\` by absolute path and writes \`card.svg\`. Start from the Techniques snippet. Look at the \`--demo\` parts sheet once. Hand-place the figure and the hero prop; take everything repeated from the toolkit. Print the solved shoulder, elbow and wrist points so you can find them when you zoom.
4. **Hands first, on paper.** For each hand, write down LEFT or RIGHT, PALM or BACK, and the finger direction, then the thumb side (see \`references/craft.md\`). Choose the \`HANDS\` shape and \`flip\`.
5. **Render:** \`node scripts/render.mjs card.svg card.png\`.
6. **Sheet with the examples:** \`node scripts/render.mjs --sheet sheet.png examples/books.svg examples/remote-work.svg examples/whiteboard.svg card.svg\`. Ask "same hand, same set?": line weight, white share, density, floor, decor.
7. **Zoom** every hand, face, foot and contact: \`node scripts/render.mjs card.svg z-hand.png --zoom x,y,w,h --scale 8\`. Do the thumb proof from \`references/craft.md\` for every hand.
8. **Critique** against the five criteria in \`references/craft.md\` and the Verify list below. Fix, re-render, re-sheet. Expect four or more rounds.
9. **Lint:** \`node scripts/lint.mjs card.svg --prefix ob- --palette style.json\`. Fix every ERROR. Each WARN must be a deliberate tint.

## Verify
- [ ] Every foreground outline is \`#3a2d66\` at 1.4; details are 1, finger lines 0.9; no other weights apart from code dashes (1.8) and diagram strokes (1.2).
- [ ] Background decor is \`#cfc9e0\`, 1 px, unfilled, and never overlaps a head.
- [ ] On the sheet, the colour looks no heavier than the examples (they measure 84–86% white pixels, accents 4–7%). The big shapes are white or peach, and nothing uses a gradient, opacity or shadow.
- [ ] Floor line at y 308 with both end dashes, and every foot, pot, leg and caster touches it.
- [ ] Lamps hang from y 0; nothing else touches a card edge; the y 308–360 band is empty.
- [ ] A standing person is about 230 px tall with a head about 34 px (1:7).
- [ ] Each person wears at most two accents plus white; two people have different skin tones.
- [ ] Every hand is 18–20 px long, has 3–4 grouped fingers with 0.9 separation lines, and its thumb is on the side the craft table gives (thumb proof done).
- [ ] Every arm has a shoulder, a pointed elbow with a crease, and a wrist narrower than the hand. Both arms show, even in profile.
- [ ] The upper body leans or twists; the weight is on one leg or on a seat.
- [ ] The subject reads at 1x from the figure's action alone, without the labels.
- [ ] No x marks on clothing; 2–4 on pots or boxes at most.
- [ ] \`lint.mjs --palette style.json\` passes with no unexplained WARN.
`,
  'one-line': `---
name: illustration-one-line
description: Draws original hand-written SVG spot illustrations in the One-line style, joyful action figures doing design and coding work. One continuous uniform black line (2.3 px at 480 wide) loops and doubles back to draw the whole figure. Flat coral, periwinkle and white patches sit behind the line, wobbly and deliberately knocked 2–6 px out of register like a misprinted riso. Tops carry coral stripe lines, and there is no ground plane, only a squiggle, a curl or a few speed strokes, all on warm beige paper. Covers the palette, a route-building toolkit (tube limbs, hand and shoe loops, wobble patches, masks), poses, composition and a render-critique loop. Use when asked for one-line, single-line, continuous-line, misregistered, riso-style or playful doodle illustrations, for empty states, onboarding, 404 pages, blog headers, feature spots, launch announcements or marketing cards.
---

# Illustration: One-line

A loose, energetic style: a figure in mid-action drawn as one long wandering black line, with colour laid underneath as offset patches, as if a second print colour slipped. It suits upbeat product moments (launches, sprints, flow, celebrations) where an interior scene would be too heavy.
Use \`illustration-halftone-line\` for black open line with dot-screen tones and no colour. Use \`illustration-ink-sketch\` for a wobbly brush outline around a cute critter. Use \`illustration-two-colour-brush\` for thick brush outlines with solid black shapes and one mint ink.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence
One continuous black line draws the whole figure, and flat coral, periwinkle and white patches sit behind it, deliberately knocked 2–6 px out of register.

## Palette
Measured from the three examples (1x renders): paper 87–89% of the pixels, ink about 2%, white patches about 3%, periwinkle 2.3–3.7%, coral 0.8–2.8%.

| Role | Hex | Where it goes |
|---|---|---|
| Paper | \`#ece7da\` | full-bleed background rect, square, no \`rx\` |
| Ink | \`#1d1b1a\` | the one line, every prop line, code glyphs, speed strokes, the eye, solid dots |
| Coral | \`#f2846e\` | face and hand patches, stripe lines on tops, a sun, one accent patch per prop, code dashes |
| Periwinkle | \`#8790f4\` | trousers, hair, screens and props, ground patches, code dashes |
| White | \`#ffffff\` | tops and sleeves, shoes, cups, clouds, ground patches |

- Masks use \`#fff\` and \`#000\` inside \`<mask>\` only; they never show.
- Never: other colours, gradients, opacity, outlines on patches, grey, a second ink colour, black fills larger than a 1.9 px dot.
- Coral is skin and small accents; it never fills trousers or a whole top. Periwinkle never fills skin.

## Line and fill
- One ink group: \`<g id="xx-ink" fill="none" stroke="#1d1b1a" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">\`. Every ink path inherits it.
- Weights at 480 wide: 2.3 for the figure line and props; 2.0–2.1 for a long motion path or clock hands; 1.8 for code glyphs (\`</>\`); coral stripe lines 1.9; coded colour dashes 2.3.
- The figure is ONE path (\`id="xx-figure"\`) of smooth cubic segments, 1-decimal coordinates. Separate short strokes are allowed only for the eye, a hem or cuff, and props. Each prop is its own single wandering line too.
- Smoothness comes from the spline: every route point is \`[x, y]\` or \`[x, y, k]\` with tension k (1 smooth, 0.4–0.6 soft corner at elbows, knees and collars, 0 sharp for glyph corners).
- Colour is never bounded by the line. Patches are separate closed blobs drawn first, in \`<g id="xx-patches">\`, then stripes and dashes in \`<g id="xx-accents">\`, then the ink on top.
- Off-register: offset each patch 2–6 px from the shape it colours (\`T(pts, dx, dy)\`), and wobble its edge (\`wobble\`, amp 0.8–1.5 for hands and faces, 1.4–2.4 for limbs, 2.2–3 for big areas). Use a different integer seed per patch. Let patches fall short of one side and spill past the other.
- Stripes: 3–5 coral lines across a top, following the body's curve, stopping 2–4 px short of the contour, 1.9 wide. Sleeves get 1–2 short stripes.
- Masks: where the line passes behind something (an arm over a laptop, a fist round a baton, a motion path behind a juggled object), knock it out with a \`<mask>\` holding the front shape's silhouette in black. Add a black stroke of 2–10 px to open a gap. \`C.mask()\` builds it.

## Characters
- Proportions: figures 190–240 px tall in action (53–67% of the card height). The head is 41–48 px tall, so about 1:5. Limbs are tubes: arms 18–21 px wide at the shoulder tapering to 8.6–9.5 at the wrist; legs 27–28 at the hip to 12–13.5 at the ankle.
- Head: a profile facing the direction of travel, 41–48 px tall. Route it in either direction. Up the throat into \`FACE_R\` (chin, lips, nose, brow as soft corners), over the crown and hair, down a ROUND back of the skull to the nape. Or the reverse, \`rev(FACE_R)\`. The \`EAR_R\` C-loop is optional. Drop it if it doesn't read at 8x: an ear plus a flat hairline made a test head read as a helmet. The eye is a separate short closed-lid arc (\`EYE_R\`) and there is no mouth stroke (the profile carries the smile). A coral face patch covers the front half of the face, offset 1–2 px toward the profile, and leaves the back of the head bare paper.
- Hair: a periwinkle patch behind the hair outline (ponytail, bun loop, short crop), or curly hair drawn as trochoid loops (\`curls()\`, r 3–3.5, 4–5 loops) with no patch.
- Torso: there is no separate torso outline. The back contour, the arm sides and the belly are all parts of the route. A white top patch covers the chest, offset −4, −3, plus white sleeve patches built with \`blob()\` from the arm centreline.
- Limbs: build each with \`tube(centreline, widths)\` and route DOWN one side, round the hand or shoe, and back UP the other side. Put tension 0.4–0.6 on the elbow or knee point so it bends crisply. Keep a gripping wrist 45–60 px from its shoulder: a handle 48 px from the shoulder folded a test arm into a chicken wing (forearm 15 px, upper arm 33).
- Joints with hands and shoes: check where a limb side meets a placed shape at 8x. If the shape's first point sits behind the limb edge, the line hooks back on itself. Drop that point (\`shape.slice(1)\`) or shift the shape 3–4 px.
- Sitting astride or on a prop (a rocket, a stool, a chair): draw only the near leg, in front of the prop, and mask the prop's line with the figure's own route used as a silhouette (\`C.mask('m-rider', [[route, 5]])\`). For that, start and end the route at the same place, such as the heel.
- Hands are small loose loops, 19–27 px long (local shapes × 1.1–1.3), with a coral patch behind, offset 2–3 px. Shapes in the toolkit: \`HAND.mitten\` (swinging, thumb notch), \`HAND.fist\` (round a handle, knuckle bumps), \`HAND.tray\` (open palm carrying something), \`HAND.open\` (catching, thumb hooked out), \`spreadHand()\` (waving, four separate finger loops and a thumb), \`CLAMP\` (fist from the side gripping an edge). Never a plain oval.
- Handedness: decide LEFT or RIGHT, PALM or BACK and the finger direction with the table in \`references/craft.md\`, then flip the shape (\`place(..., flip)\`) so its thumb lobe lands on that side. The comment above each shape in \`scripts/oneline.mjs\` says which side its thumb is on.
- Feet: \`SHOE\` loops, 30–35 px long (× 1.25–1.3), with a white patch, offset 3–4 px. A small heel loop is allowed on one shoe.
- Loops: 2–4 cursive loops per figure, radius 3–5, at a waistband, a heel, a knee, a bun or the end of a ponytail (\`loopAt()\`, \`cornerLoop()\`). More reads as scribble. A loop in the middle of a leg reads as a mistake.
- Poses: big and diagonal, never standing still. Leaping between two objects, sprinting with the body pitched 11° forward, balancing on one leg while juggling. Lean the upper body by rotating its points about the hips (\`rot()\`) before routing.

## Decor and props
- 1–3 context props, each one wandering line plus one offset patch: braces \`{ }\`, a laptop with \`</>\`, a stopwatch, a coffee cup, a bug, a sun drawn as a loading ring. Props tie into the motion: a squiggle trails into a stopwatch, one looping path threads the juggled objects.
- Motion: 3 parallel speed strokes behind the figure (26–52 px long, 13–16 apart), or a squiggle trail with one loop.
- Ground: no ground plane. Use a short squiggle with a loop under the planted foot (90–110 px wide, 1 px under the sole) with a white or periwinkle patch, or nothing when the figure is airborne.
- Code: \`</>\` glyphs in 1.8 px ink on a screen or baton, and "code" as rows of coral and periwinkle squiggle dashes (\`squig()\`, 2.3 px).
- Never: text, UI panels, sparkles, confetti, outlined boxes, a horizon line, shadows.

## Composition
- Card: \`<rect id="xx-paper" x="0" y="0" width="480" height="360" fill="#ece7da"/>\` first. Then \`<defs>\` (masks), patches, accents, ink.
- The whole drawing spans about 245–377 px wide and 240–284 px tall, centred. Keep 30–40 px clear at every edge (top ≥ 36).
- The figure carries the card: 190–240 px tall, placed so its direction of travel has more room ahead than behind. Props sit in the open space it moves toward or past.
- Density: sparse. Paper 86–89% of the pixels; about 12–17 patches and 15–40 ink paths in total.
- A big prop (rocket, board) gets a patch covering 60–75% of it, offset 4–6 px. A patch filling the whole prop reads as a solid white shape and outweighs the figure. Keep the figure 190 px or taller next to a big prop: scale the upper body about the hip if it looks small.
- Build in a local frame and map it to the card with one function: \`makeCard('sd-', { map: pts => … })\` applies it to every line, patch, accent, mask and dot (scale 1.05–1.1 about a centre, plus a shift). To face the other way, mirror x in the map (\`map: pts => mirrorX(pts, 240)\`), and draw \`</>\` glyphs and any lettering with \`C.raw.line(...)\`, which skips the map, so they don't mirror.

## Techniques

**1. The toolkit.** \`scripts/oneline.mjs\` (no dependencies, seeded) holds the curve maths and the card assembly: \`smooth\`, \`tube\`, \`blob\`, \`wobble\`, \`place\`, \`T\`, \`rev\`, \`rot\`, \`lowest\`, \`curls\`, \`squig\`, \`loopAt\`, \`cornerLoop\`, \`arc\`, the local shapes (\`HAND.*\`, \`spreadHand()\`, \`CLAMP\`, \`SHOE\`, \`FACE_R\`, \`EYE_R\`, \`EAR_R\`) and \`makeCard(prefix, { map })\` with \`line\`, \`accent\`, \`patch\`, \`mask\`, \`dot\` (all mapped), \`raw.*\` (the same, unmapped), \`dots\` (debug) and \`svg(debug, ariaLabel)\`. Patches and lines share one id namespace, so name patches after their colour (\`porthole-peri\`, \`shoe-white\`): a test card failed lint with two \`porthole\` ids. Run \`node scripts/oneline.mjs --demo /abs/work/demo.svg\` from the skill folder (write it into your work folder, not the skill) and render it: an arm with a mitten, a leg with a shoe on a ground squiggle, a profile head, patches, a stripe and code dashes.

**2. A limb route.** Down the R side, round the hand, back up the L side:
\`\`\`js
import { makeCard, tube, blob, place, rev, T, ang, HAND, PERI, WHITE, CORAL } from '/abs/path/to/illustration-one-line/scripts/oneline.mjs';
const C = makeCard('sd-');
const arm = [[150, 120], [170, 132], [190, 146, 0.5], [212, 136], [232, 124]];   // shoulder, elbow (k 0.5), wrist
const W = [18, 16, 13.5, 11, 9], a = tube(arm, W);
const hand = place(HAND.mitten, arm[4], ang(arm[3], arm[4]), 1.2);           // +y wrist corner first
C.line('arm', [...a.R, ...hand, ...rev(a.L)]);                               // in a figure, splice this into the one route
C.patch('sleeve', T(blob(arm.slice(0, 3), W.slice(0, 3), 1.05), 3, -3), WHITE, 1.4, 4);
C.patch('hand', T(place([[0, -5], [12, -5], [17, 0], [12, 7], [2, 6]], arm[4], ang(arm[3], arm[4]), 1.2), 2, -3), CORAL, 0.8, 5);
\`\`\`
Local shapes run from their +y wrist corner, round the tip, to the −y corner. Going down a limb's L side instead, use \`rev(shape)\` or \`flip = true\`.

**3. Knock-out masks.** \`const m = C.mask('m-arm', [[armSilhouettePts, 2]]); C.line('laptop', lapPts, m);\` hides the laptop's line under the arm. For a path that threads several objects, pass each object's silhouette with stroke 9–10 so the path stops short of them with a gap.

**4. Ground the planted foot.** \`const sole = lowest(route);\` then draw the squiggle at \`sole[1] + 1.1\` with \`T(pts, sole[0], sole[1] + 1.1)\`. A foot meant to stand must sit on it, not float above.

**5. A whole-figure route order** (the sprinter in \`examples/hackathon-sprint.svg\`, authored facing right). Every contour is visited once:
ground squiggle behind → planted shoe top → front of the trailing leg up → crotch → lead leg underside → lead shoe → shin front → knee → thigh top into the belly → far arm underside → fist → far arm top → shoulder → short neck → \`FACE_R\` → crown → ponytail → back of the skull → ear → nape → near arm top → mitten → near arm underside → armpit → back → waistband loop → seat → back of the trailing leg → heel loop → sole → toe → ground squiggle ahead.
A seated rider runs heel → calf → thigh underside → seat → back → raised arm → hand → nape → skull → bun loop → \`rev(FACE_R)\` → throat → near arm → fist → belly → thigh top → shin → shoe → back to the heel.

**6. Patch recipe** (offsets \`T(dx, dy)\`, wobble amp, from the examples' generators). Top: the chest outline, (−4, −3), amp 2.4–2.6. Sleeves: \`blob(arm.slice(0, 3), W, 0.95–1.05)\`, (±2–3, −3), amp 1.4–1.6. Trousers: \`blob(leg, W, 1.0)\`, (5, 3), amp 2.2–2.4. Face: head-local \`[[6,-12],[16,-8],[22,2],[19,13],[9,15],[5,2]]\`, (2, −1), amp 1.1–1.5. Hair: (−3, −2), amp 1.2–1.6. Hands: a 5–6 point blob of the hand, (2–3, ±2–3), amp 0.8–1.2. Shoes: \`[[-6,-2],[10,-3],[22,3],[22,10],[4,11],[-7,8]]\` through the shoe's own \`place()\`, (3–4, 2–3), amp 1.2. Props: (3–5, ±3), amp 1–1.8. Every seed different.

## Failure modes
- **Hackathon Sprint shipped at 6.5.** Judges named the head shape, the planted back foot and a weak hackathon cue. On the card, the skull is small next to the ponytail, the planted loop shoe reads as a blob, and a \`</>\` baton plus a stopwatch don't say "hackathon". Don't copy that card's head or back foot, and give the subject a prop that names it.
- **Mitten blobs for hands.** The first Flow State hands were ovals. Use a shape with a thumb lobe or separate fingers, and a coral patch behind it.
- **A loop on the knee reads as a mistake.** The first Flow State legs had a loop mid-leg and crossing lines. Put loops at ends (heel, waistband, hair) and taper legs from hip to ankle with a clean knee bend.
- **The colour fits the line exactly.** Then it is an ordinary flat fill and the print-slip look is gone. Offset every patch 2–6 px, let it spill on one side and fall short on the other.
- **Patches read as stains.** Wobble amp above 3, or blobs with no relation to a body part. Keep amp 0.8–3 and one patch per part.
- **It became a normal line drawing.** Too many separate strokes (a torso outline, each finger, a separate face). Keep the figure one route; only the eye, hems and props are separate.
- **Line crossings behind objects.** The route passes under an arm or a held object and both lines show. Mask the hidden part.
- **Weight drift.** A 1.4 px or 3 px stroke anywhere breaks the set. Use 2.3 for ink, 1.8 for glyphs and 1.9 for stripes.
- **Floating feet.** A planted foot hovering above its squiggle. Measure the sole with \`lowest()\` and place the squiggle 1.1 px under it.
- **Duplicate ids.** A patch and a line given the same name. Suffix every patch with its colour.
- **Hooks at joints and a chicken-wing arm.** See Characters. Both showed up in the self-test card and only at 8x zoom.

## Examples
- \`examples/flow-state.svg\`: "Flow State". A leap with one arm flung back (\`spreadHand\`-style open hand) and the near arm clamping a laptop (\`CLAMP\`, masked). Curly hair from \`curls()\`, headphones, two code braces drawn as single strokes with white patches, code dashes, a sun as a loading ring, speed strokes, a trail squiggle.
- \`examples/hackathon-sprint.svg\`: "Hackathon Sprint". A sprint facing left: the figure is authored facing right and mirrored in \`G\`, with \`</>\` drawn in card space. A \`fist\` round a baton (masked), a swinging \`mitten\`, a ponytail, a waistband loop, a stopwatch tied into a squiggle, speed strokes. The weakest card: see Failure modes.
- \`examples/juggling-tasks.svg\`: "Juggling Tasks". Balancing on one leg with a \`tray\` hand under a laptop and an \`open\` hand just releasing. One looping motion path threads a cup and a bug (masked with stroke 9–10), a short ground squiggle with a periwinkle patch, a bun loop.

## Workflow
Run every command from this skill's folder. Card paths can be absolute.
1. **Brief.** Name the subject and the one action that shows it. Pick 1–3 props that say the subject without text.
2. **Pose.** Sketch the skeleton as numbers: hip, shoulders, head centre, and centrelines for each limb (4–5 points each) with widths. Choose the facing and the lean. Choose an id prefix (\`sd-\`).
3. **Write a generator** (\`card.mjs\`) that imports \`scripts/oneline.mjs\` by absolute path. Build tubes, place hands and shoes, and write ONE route for the figure: start at a free end (a hand, a foot or a ground squiggle), go round every limb, and end at another free end. Render with \`C.svg(true)\` to see numbered route points while you work.
4. **Hands on paper.** For each hand write LEFT or RIGHT, PALM or BACK and the finger direction, then the thumb side (\`references/craft.md\`). Pick the shape and the flip.
5. **Colour.** Add patches (offset, wobble, distinct seeds), stripes, masks.
6. **Render:** \`node scripts/render.mjs card.svg card.png\`.
7. **Sheet:** \`node scripts/render.mjs --sheet sheet.png examples/flow-state.svg examples/hackathon-sprint.svg examples/juggling-tasks.svg card.svg\`. Ask "same hand, same set?": line weight, how loose, patch offsets, density, paper share.
8. **Zoom** hands, head, feet, every joint where a limb meets a hand or shoe, and every crossing: \`node scripts/render.mjs card.svg z.png --zoom x,y,w,h --scale 8\`. Do the thumb proof from \`references/craft.md\`. The hands live inside the one route, so you can't recolour them. Instead, in a throwaway copy, put a red circle (r 2.2) on the thumb tip and a blue one on the index tip, both mapped through the same \`place()\` call, then delete the copy.
9. **Critique** on the five criteria in \`references/craft.md\` and the Verify list. Fix, re-render, re-sheet. Four or more rounds is normal.
10. **Lint:** \`node scripts/lint.mjs card.svg --prefix sd- --palette style.json\`.

## Verify
- [ ] Paper rect \`#ece7da\` full-bleed, no \`rx\`; only paper, ink, coral, periwinkle and white appear.
- [ ] The figure is one \`<path>\`; apart from it there are only the eye, hems, props, speed strokes and squiggles.
- [ ] Every ink stroke is 2.3 (glyphs 1.8, a long motion path 2.0–2.1); stripes 1.9 coral; caps and joins round.
- [ ] No patch matches its contour: each is offset 2–6 px and wobbly, and no two share a seed.
- [ ] The face patch is coral, covers the front of the face only, and the eye is a closed-lid arc.
- [ ] Hands have a thumb lobe or separate fingers, a coral patch, and the thumb on the correct side (thumb proof done).
- [ ] 2–4 loops at ends (hair, heel, waistband, a knee at most once); no loop mid-limb.
- [ ] Lines that pass behind an arm or object are masked; no accidental crossings at 8x.
- [ ] The pose is a diagonal action; the planted foot sits 1 px on its squiggle, or the figure is clearly airborne.
- [ ] 30–40 px clear at every edge; paper looks as dominant as on the examples (they measure 87–89%); 12–17 patches; a big prop's patch covers only 60–75% of it.
- [ ] The subject reads at 1x from the action and props, with no text.
- [ ] Patch ids carry a colour suffix, and \`lint.mjs --palette style.json\` passes with no ERROR or WARN.
`,
  'outlined-cartoon': `---
name: illustration-outlined-cartoon
description: Draws original hand-authored SVG spot illustrations in an outlined cartoon style for design and coding subjects. Identifying traits: a warm near-black ink outline on every flat fill in three weights (2.5 / 2 / 1.5 px), tapered ink slivers for folds, brows and finger splits, big-headed characters with huge white eyes, thick brows, open smiles and pink blush, blob hair with white highlight dashes, and a small decor set of "+" sparkle crosses, outline rings, squares and coloured dots on a transparent card. Covers one character with one hero prop, gripping and holding hands, sneakers, clothing folds and UI props. Use when someone asks for an outlined, inked, comic, sticker or doodle-style cartoon, a friendly character or mascot, or a spot illustration for an empty state, onboarding, 404 or error page, success state, blog header, feature spot or marketing card.
---

# Illustration: Outlined cartoon

A cheerful character illustration: one big-headed person in a lively pose, acting on one large hero prop, every shape flat-filled and ringed with hand-inked near-black line. It suits friendly product moments (success, onboarding, empty states) where a face and a gesture carry the message.
Use \`illustration-bold-pop\` instead for a dense, saturated object cluster with navy extrusions and hatching; \`illustration-flat\` when you want no outlines at all; \`illustration-line-interior\` for thin single-weight line, mostly white fills and realistic slim people in a wide room.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence
Every flat-filled shape sits inside a warm near-black ink line that varies by role (2.5 px silhouettes, 2 px parts, 1.5 px details), and every interior mark (folds, brows, finger and hair splits, white highlights) is a tapered sliver that swells in the middle and ends in two points, so the drawing reads as inked by hand, never as a uniform marker line.

## Palette
Measured from the three examples. Flat fills only.

| Role | Hex | Where it goes |
|---|---|---|
| Ink | \`#1e1b1b\` | every outline, pupils, brows, folds, code tokens, decor strokes. Never \`#000\` |
| White | \`#ffffff\` | eye whites, sneaker soles and toe caps, socks, screens, cards, highlight dashes, check ticks |
| Periwinkle / shade | \`#6b7fd4\` / \`#4c5fb6\` | hoodies, trousers, laptops, card headers, sneakers; shade only as fold slivers |
| Periwinkle pale / glass | \`#c4ccf0\` / \`#dfe4f8\` | secondary UI bars; lens glass tint (at fill-opacity 0.22) |
| Tomato red / shade | \`#e5281d\` / \`#a9180f\` | hair, tees, sneakers, trophy base, comment bubbles, grips |
| Warm yellow / shade | \`#f6c343\` / \`#d99a1e\` | trousers, trophies, blond hair, rims, poles, avatar dots |
| Leaf green / shade / light | \`#4ea54a\` / \`#2f7f2c\` / \`#7cc777\` | check badges, success buttons, paint |
| Blush pink / shade / light | \`#f6a3b6\` / \`#dc7393\` / \`#fde0e5\` | sweaters, avatar dots, tape, diff highlight rows |
| Skin salmon (+ crease, blush) | \`#f5a39c\` (\`#d97e77\`, \`#ec7d78\`) | light skin, cool |
| Skin peach (+ crease, blush) | \`#fbd2c0\` (\`#e39c86\`, \`#f2898a\`) | light skin, warm |
| Skin brown (+ crease, blush) | \`#c97a5a\` (\`#9c5238\`, \`#e0625a\`) | brown skin |
| Mouth / tongue | \`#8a1b1b\` / \`#ec7d78\` | open mouth fill, tongue |
| Dark hair | \`#2b2525\` | black hair (red \`#e5281d\` and yellow \`#f6c343\` hair are the other two) |
| Greys | \`#b9b4c4\`, \`#d6d2df\`, \`#c9c6d6\`, \`#e6e3ee\` | gutter dashes and label lines, dividers, shading on white garments, metal wire |
| Row tint | \`#e3f2df\` | approved/added rows in a code card |

The pencil wood \`#f3d9a8\` in Designer is the one deliberate off-palette tint; \`lint --palette\` warns on it.

- No background: the card is transparent and the page supplies white. No gradients, patterns, filters, opacity tricks or textures (the one exception is the 0.22 glass tint).
- Shade colours appear only as fold slivers or one small shadow band, never as big flat shadow shapes.
- One saturated colour per garment; give the hero prop a colour the clothes don't already use heavily (yellow trophy against a blue hoodie, green button against a red tee).

## Line and fill
All widths are final card px at 480 wide.
- **Outlines are strokes** on the filled shape, \`stroke="#1e1b1b"\`, \`stroke-linejoin="round" stroke-linecap="round"\`.
  - 2.5 px (\`WO\`): head, hair, torso, sleeves, trousers, shoes, the hero prop's silhouette.
  - 2.0 px (\`W\`): hands, cuffs, collars, necks, ears, small prop parts.
  - 1.5 px (\`WI\`): eye whites, screen insets, small inner panels. Fingers and thumbs 1.7–1.8.
  - Decor is unscaled: big "+" 2.0, small "+" 1.7 and 1.6, rings and squares 1.7, check badge 1.9, emphasis ticks 1.8.
- **Union outlines:** shapes of one colour that join (torso + both sleeves, pelvis + front leg, palm + forearm) share ONE outline: ink copies stroked at 2× the width underneath, then the fills on top (\`union()\` in the kit). Separate outlines at a join read as a seam.
- **Folds are filled slivers, not strokes:** \`fold(points, w)\` swells to \`w\` and tapers to 0.35 px at both ends.
  - Clothing folds 1.3–1.9 px in ink or the garment's shade colour; brows 4.0 / 3.6; upper eyelid 2.0; nose hook 1.8; hair splits 1.4–1.5; finger splits 1.15; white highlight dashes 1.8–2.4.
  - Rib bands (hems, cuffs): vertical shade-colour slivers every 8 units, 1.3 px.
- Rods, cords and wires: an ink stroke 2×outline wider underneath, the colour stroke on top (\`tubeStroke\`).
- The scene is drawn in local units and scaled by 0.84 (\`compose()\`), so a stroke written as 2.5 appears in the file as 2.98. Never scale a group without dividing its stroke widths, or the weights drift.

## Characters
- **Proportions:** head with hair is about 37 % of standing height (code-review figure: hair top to sole 227 px, hair top to chin 85 px). Face 45 × 52 px. Short torso, short legs, round soft limbs.
- **Head:** a soft rounded box (\`head()\` in the kit), 3/4 turned toward the action, ears as 5 × 7.2 ellipses with an inner fold, a neck that narrows into the collar.
- **Eyes:** big white ellipses (near 6.2 × 7.4, far 5.4 × 7.0 local units), ink pupil r 3.7 / 3.4 with a white highlight r 1.25 up-right, a heavy upper-lid sliver 2.0. Glasses, when worn, are ink rings r 10 at 2 px.
- **Brows:** thick, tapered, 4.0 and 3.6 px. Thin brows were a judge note on the first card.
- **Mouth:** open, dark red fill with a tongue, outlined 1.9; a grin adds a white top-teeth band. Pink blush ellipses (4.8 × 2.8) under each eye, no outline.
- **Hair:** a scalloped blob (arcs between points, \`hair()\`), 2.5 outline, 2–3 white highlight dashes plus one white dot, and 3–5 split slivers in ink or the hair's shade. Buns and pencils behind the ear are hair accessories.
- **Hands** (follow references/craft.md for handedness, then check here):
  - Built cuff → tapered forearm (12 → 10 local units) → palm unioned into the forearm (no wrist seam) → a finger band → a thumb.
  - Fingers are one band with scalloped knuckle bumps; separations are short ink slivers (1.15 px) running in from the knuckle edge, 2.5–2.8 units long. Never separate sausage fingers, never stripes.
  - The thumb's root has no outline across it: only its two sides and tip are inked, so it grows out of the palm.
  - Hand length about 0.6 × face width. \`fist()\` in the kit draws both grip views and returns which hand it is.
  - Holding a flat object (laptop, tray): palm up under the base, finger band along the underside, thumb hooked over the front lip. A laptop balanced on fingertips was the first card's main fault.
  - Two hands on one handle: the near shoulder is the back one, so the NEAR hand takes the grip nearer the body and the FAR hand the grip further along. Keep fist centres at least 40 local units apart (a fist is about 28 wide plus its thumb) so a stretch of handle shows between them.
  - Reach: two 36-unit bones reach 72 local units. Place each wrist first, within reach of its shoulder, then get the grip centre with \`gripFromWrist()\`. Pick \`elbow()\`'s side so the elbow bends down and outward (below the shoulder-to-wrist line for a low grip); an elbow bending upward reads as a broken arm.
- **Feet:** chunky sneakers about 40 local units long (\`shoe()\`): white sole 2.5, coloured upper 2.5, white toe cap, two white lace ticks, optional white ankle eyelet, one shade sliver at the heel; ankle socks (white or light pink) and rolled hems (23 units wide with one shade sliver).
- **Clothing:** hoodie (kangaroo pocket, white strings, hood band), sweater with rib hem and crew neck over collar points, tee, dungarees with bib, straps and yellow buttons. Folds at elbows, knees, crotch and the shaded side.
- **Poses that worked:** a leap with one fist raised (Awards), a lunge leaning 14° into a magnifier with both hands on the handle (Code Review), a braced push leaning back 5° on a long pole (Designer). Rotate the upper body as a group about the hip to lean; bend the knees; never stand bolt upright.

## Decor and props
- **One hero prop**, big: 35–50 % of the group's width (PR card 145 × 200 px, button pill 197 × 54 px, trophy 50 × 90 px). It carries the subject. Small UI inside it is abstract: rounded ink or colour bars (5.6 px ink lines, 4.4 px colour bars with a 1.15 outline), gutter dashes in \`#b9b4c4\`, check badges, avatar dots.
- **Decor set per card (7–9 marks):** one sparkle cluster (big "+" 17 px across at 2.0, small ones at (+16, −13) and (+15, +14) sized 6.8 and 5.6), 2–3 outline rings r 4.4–4.6, three filled dots (yellow r 3.6, blue r 3.4, red r 5.2–5.4), one outline square 10 × 10 rx 1.5 rotated 18°, optional green check badge r 7.6, optional three emphasis ticks at the action point.
- Put the sparkle cluster in the top corner opposite the heaviest mass; scatter the rest in the empty corners, 15–40 px clear of any contour.
- Never: ground lines, cast shadows, clouds, plants, background panels, speech text longer than two words.

## Composition
- Transparent 480 × 360 card. Whole group (figure, prop, decor) inside x 70–430, y 40–310: margins 40–48 px top, 50–58 px bottom, at least 50 px each side.
- Figure height 230–260 px standing (65–72 % of the card), about 200 px in a deep crouch. Figure on one side, hero prop on the other, joined by the action (the magnifier, the roller pole); the prop may overlap the figure's reach but not the face.
- Feet share one implicit baseline; no line is drawn.
- Group structure the examples use: \`<g id="xx-card"><g id="xx-card-decor">…</g><g id="xx-card-scene" transform="translate(TX TY) scale(0.84)">…</g></g>\` (\`compose()\`).

## Techniques
The kit \`scripts/outline-kit.mjs\` holds every repeated mark. Run its self-test from the skill folder: \`node scripts/outline-kit.mjs demo.svg\` (add \`--proof\` to paint thumbs red and index fingers blue).

\`\`\`js
import * as K from '/abs/path/to/illustration-outlined-cartoon/scripts/outline-kit.mjs';
const { C, SKIN, W, WO, fold, limb, union, path, head, hair, dash, fist, shoe, hem, compose } = K;
// a tapered sleeve unioned with the torso: one silhouette, no seam
const arm = limb([[220, 178], [199, 190], [180, 200]], [24, 22, 19], 'round', 'flat');
scene.push(union([K.TORSO, arm], C.blue, WO));
// a fold: swells to 1.5 px, pointed ends
scene.push(fold([[187, 192], [181, 193.6], [175, 191.5]], 1.5));
\`\`\`

A fist on a rod (\`fist()\`): decide the hand from the arm first, then read \`hand\` back and compare.
\`\`\`js
const v = K.unit(handleEnd, malletHead);         // along the handle, toward the business end
const wrist = K.at(shoulderN, [0.79, 0.62], 66); // wrists first, within 72 of the shoulder
const c = K.gripFromWrist(wrist, v, shoulderN);
const e = K.elbow(shoulderN, wrist, 36, 36, 1);  // side chosen so the elbow drops
const cuff = K.lerp(e, wrist, 0.42);
const h = fist({ c, v, elbow: e, from: cuff, rr: 5, view: 'back', ...SKIN.brown });
if (h.hand !== 'right') throw new Error('near arm of a figure facing right is the RIGHT hand');
scene.push(h.behind, sleeve, rod, h.front, cuffBand);   // the cuff band goes last: in the back view the forearm is in \`front\`
\`\`\`
\`view: 'palm'\` puts the curled fingers across the front of the rod with the thumb over the index; \`view: 'back'\` shows the back of the hand with a knuckle row and the thumb wrapping the business end. Thumb and index always sit toward \`v\`.

Union outline by hand, when you don't use the kit:
\`\`\`xml
<path d="M…torso…" fill="#1e1b1b" stroke="#1e1b1b" stroke-width="5" stroke-linejoin="round"/>
<path d="M…sleeve…" fill="#1e1b1b" stroke="#1e1b1b" stroke-width="5" stroke-linejoin="round"/>
<path d="M…torso…" fill="#6b7fd4"/><path d="M…sleeve…" fill="#6b7fd4"/>
\`\`\`

## Failure modes
- **Line reads as a uniform marker.** Every interior mark was a round-capped stroke of one width. Use \`fold()\` slivers and the three outline weights.
- **Weak, generic face.** Brows were thin lines; draw them as 3.6–4.0 px tapered slivers with a heavy upper lid.
- **Decor reads as noise.** Marks were sprinkled evenly. Group them: one sparkle cluster, then a few rings, dots and one square in the empty corners.
- **Prop balanced on fingertips.** A laptop sat on the fingertips; hold flat objects from below with the thumb over the lip.
- **Thumb on the wrong side.** A designer rejected a whole pass of hands for this. Decide left/right and palm/back per craft.md, use \`fist()\` and check its \`hand\`, then render a \`--proof\`-style copy at 8×.
- **Mitten or pasted-on fist.** No forearm taper, no wrist, no finger splits. Build cuff → forearm → palm → finger band → thumb.
- **Seam lines where parts join.** Sleeves outlined separately from the torso. Union same-colour shapes.
- **Knee notches.** Two separate trouser tubes overlapping at the crotch. Union the pelvis with the front leg; outline the back leg on its own behind it.
- **Weights drift after scaling.** A group was scaled without dividing its stroke widths. Use \`compose()\` or divide by the scale.
- **Thumb root outlined across the palm.** A closed thumb shape drew a seam over the hand; ink only its sides (\`fist()\` does this).
- **Elbow bends upward.** \`elbow()\` was given the wrong side; the arm read as broken. Flip \`side\` until the elbow drops.
- **Two fists merge into one blob.** Grip centres 30 units apart; the handle vanished between them. Keep 40+.
- **Arms can't reach, hands float.** Grip points chosen from the prop, then arms stretched to them. Place wrists from the shoulders first.
- **Hidden subject.** A squashed bug drawn under a mallet head vanished at 1x. Let anything pinned under a prop poke out at least 40 % on the open side, away from feet and other contours.
- **Decor lost or stray.** Decor is drawn first, under the scene, so a dot placed under a prop disappears; emphasis ticks fanned onto a prop read as stray scratches. Check each mark is in clear space.

## Examples
- \`examples/awards.svg\`: leaping figure in hoodie and glasses, laptop held palm-up from below, trophy raised in a fist; front-facing head, red blob hair, motion ticks under the jump.
- \`examples/code-review.svg\`: brown-skinned figure lunging with a magnifier held in two fists, a big PR card with diff rows, check badges and a red comment bubble; the lens magnifies the card under a clip path.
- \`examples/designer.svg\`: blond figure with bun and pencil braced against a long roller pole painting a green "Sign up" button, dashed outline for the unpainted part, drips, paint tray and taped swatches; two grip views on one pole.

## Workflow
Commands run from the skill folder (Playwright must resolve: \`npm i -D playwright-core\` there or globally).
1. **Brief:** name the subject and the one gesture that shows it. Pick the hero prop and what it shows at 1x.
2. **Pose:** decide the lean, which arm is near, where each hand grips. For each hand write down LEFT/RIGHT, PALM/BACK, finger direction (references/craft.md).
3. **Block:** write a generator next to your card (\`card.gen.mjs\`) that imports the kit by absolute path. Place the prop first, then the hip pivot, ground y and shoulders, then wrists within reach, grips (\`gripFromWrist()\`), elbows (\`elbow()\`), ankles. Print the key points and the \`hand\` of each fist.
4. **Draw** back to front: far arm, legs and shoes, torso group (rotated about the hip), head, prop, near arm, hands, then decor in card px. \`compose({ id: 'xx-subject', label, decor, scene, TX, TY })\`.
5. **Render:** \`node scripts/render.mjs card.svg card.png\`.
6. **Sheet:** \`node scripts/render.mjs --sheet sheet.png examples/*.svg card.svg\`. Ask "same hand, same set?".
7. **Zoom:** \`node scripts/render.mjs card.svg z-hand.png --zoom x,y,w,h --scale 8\` for every hand, the face, both shoes and every contact. Make a thumb-proof copy (\`fist({ …, proof: true })\`) and zoom it.
8. **Critique** against the five criteria in references/craft.md, harshly. Fix and re-render. Expect 3–4 rounds.
9. **Lint:** \`node scripts/lint.mjs card.svg --prefix xx- --palette style.json\`. Only deliberate one-offs may warn.

## Verify
- [ ] Every filled shape has an ink \`#1e1b1b\` outline; no shape is outline-only except decor rings, the square and dashed guides.
- [ ] Three outline weights are visible: silhouettes heavier than hands, hands heavier than eye whites.
- [ ] Folds, brows, hair splits and finger splits are tapered slivers with pointed ends (zoom 8× on one).
- [ ] Brows are thick (3.6–4 px) and the eyes are white ellipses with a pupil and a white highlight.
- [ ] Pink blush ellipses with no outline sit under the eyes; the mouth is open with a tongue.
- [ ] Hair is a scalloped blob with at least two white highlight dashes.
- [ ] Each hand: cuff, tapering forearm, palm, finger band with short splits, thumb on the side craft.md requires (proof render checked).
- [ ] Same-colour joins (sleeve to torso, pelvis to leg) show no seam line.
- [ ] Sneakers have a white sole and toe cap; trousers end in rolled hems.
- [ ] Exactly one sparkle cluster (big + two small); 7–9 decor marks in total, none touching a contour or hidden under a prop.
- [ ] No ground line, shadow, gradient, texture or background rect.
- [ ] Group inside x 70–430, y 40–310; figure 230–260 px tall; the subject reads at 1x.
- [ ] \`lint.mjs --palette style.json\` passes with only deliberate warnings.
`,
  'teal-spot': `---
name: illustration-teal-spot
description: Draws original spot illustrations of one hero object as SVG cards (480x360) in a teal-on-white style. Identifying traits are a single object in a fixed oblique 3/4 view showing top, front and right faces; white main faces with teal only on side faces and accents; thin dark-teal outlines on every edge; a hard, unblurred deep-teal drop shadow pushed down-right; and two to four small floating extras (coins, tilted UI cards, badges) with their own hard shadows, plus 4-point sparkles. No people. Covers design and coding concepts as objects: keyboards, databases, git graphs, inboxes, devices. Use when someone asks for a teal spot, teal icon illustration, isometric spot object, 3D line spot, empty-state art, onboarding step art, a 404 or error spot, a feature spot, a blog header object, a marketing card or a product icon scene in teal, mint or green-teal.
---

# Illustration: Teal spot

One object, shown as if it were a small physical model, sits alone on a light grey card. It reads like a product icon blown up to card size: white faces, a teal side, a crisp dark outline and a hard deep-teal shadow. Small floating extras hint at the action. Use it for empty states, feature spots and onboarding steps that need one strong object and no people.

Boundary: for a whole isometric scene of 6–8 objects on a platform slab with soft glows, use \`illustration-isometric-mono\`. For people at work, use a character style such as \`illustration-framed-panel\` or \`illustration-outlined-cartoon\`. For saturated multi-colour clusters with navy extrusions, use \`illustration-bold-pop\`.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence

A single white object in one fixed oblique projection, teal only on its right-facing sides, outlined in 1.2 px dark teal and dropped onto flat grey by a hard, unblurred deep-teal shadow that always falls down and to the right.

## Palette

Eleven colours, measured from the examples. Nothing else.

| Role | Hex | Where it goes |
|---|---|---|
| Card background | \`#ebebeb\` | full-bleed rect, nothing else |
| Ink | \`#0e3f3d\` | every outline, glyph strokes on pale faces |
| Deep teal | \`#0e4a48\` | all hard shadows, sparkles, dark glyphs, the right side of teal parts |
| Teal dark | \`#299c96\` | front and left sides of teal parts, recess walls |
| Teal | \`#36c3b0\` | right side of white parts, tops of accent parts, LEDs, highlighted UI rows |
| Mid teal | \`#7fd8ca\` | sides of pale parts, recess floors, coin sides |
| Pale-mid | \`#a8e5e0\` | arc ticks only |
| Pale teal | \`#d8f2ed\` | sides of keys and cards, highlight streaks on white, search fields |
| White | \`#ffffff\` | the hero's top, front and left faces; card tops; glyphs on teal |
| Grey | \`#d5d8d8\` | label pills, placeholder text bars, switch stems |
| Grey dark | \`#b9c0c0\` | right side of small grey parts |

- No gradients, no opacity, no filters, no blur, no \`<text>\`: letters and digits are stroked paths.
- White faces are the majority of the object. If teal covers more than about a third of the hero's visible area, it stops being this style.
- Deep teal \`#0e4a48\` touches the grey background only as shadow or sparkle, never as a face of the hero.

## Line and fill

- Outlines: \`#0e3f3d\`, **1.2** at 480 wide, \`stroke-linejoin="round"\`, round caps on open creases. Small UI parts on a card face: 1.0–1.1 with \`vector-effect="non-scaling-stroke"\` (the face transform would otherwise distort them). LEDs and tiny dots: 0.8.
- Outlines are strokes drawn over flat fills: per solid, the silhouette hull, the top ring and the vertical creases where two face colours meet. No inner contour lines on a single flat face.
- Plates (shields, clouds, bars) use the stroke-behind trick: each side quad is filled ink with a **2.9** stroke, then refilled in the side colour with a 0.5 self-stroke, then the face is drawn with a 1.2 outline. This is why \`stroke-width="2.9"\` dominates the examples.
- Shading is one tone step by facing, never a gradient:

| Part | Top (cap) | Front, left, back | Right-facing side |
|---|---|---|---|
| Hero body | white | white | teal \`#36c3b0\` |
| Pale part (key, UI card) | white | pale \`#d8f2ed\` | mid \`#7fd8ca\` |
| Accent part (button, branch disc) | teal | teal dark \`#299c96\` | deep \`#0e4a48\` |
| Coin (data token) | pale | mid | teal |
| Accent coin (badge, count) | teal | teal dark | deep |
| Small recess (socket, well) | (opening) | walls teal dark | floor mid |
| Large open recess (tray, more than a quarter of the top) | (opening) | walls mid | floor pale |

- Glyphs: white on teal faces (2.8–5 wide), deep or ink on white and pale faces (2.4–2.8 wide), round caps and joins. A flat detail printed on a floor or face is a teal disc or rounded square with a 1.0–1.1 ink outline and a white glyph.

- Highlight streaks: two dashes, one long and one short with a gap of about 6 % of the edge, 2.2 wide (1.8–1.9 on small parts), round caps, drawn 8 units under the top edge of a white front face in pale \`#d8f2ed\`; on teal faces use teal or mid. One streak per face, at most four on the card.
- Every shadow is a hard flat \`#0e4a48\` shape (self-stroke 0.6 to close seams). Floor shadow: the footprint pushed by \`SHD = [0.78, -0.48]\` world units per unit of height. Floating extras: the item's screen hull offset by (8.5, 7.6) px.

## Characters

None. This style has no people, hands or faces. The hero object takes their place:

- **One solid object.** The subject is a single physical thing (a tile, a drum, a keyboard case). Ideas that are really diagrams (a git graph, a pipeline) get mounted on or built into one solid, never scattered as loose parts.
- **Real thickness.** Bodies are 28–40 units tall; keys and cards 8–14; coins 5.5; plates 7–8. Corners are rounded (radius 18–24 on a body, 4–9 on keys and cards).
- **Detail on the front face is product detail:** one highlight streak, one grey label pill (26–30 × 4.4, radius 2.2) and one teal LED (4.6–5 round, 0.8 outline) near the front-right of the top rim or the face. To lay a flat shape on the front face of a box of depth D, map its (x, z) points with \`pr([x, -D / 2 - 0.05, z])\`; on the top rim use \`pr([x, y, H + 0.01])\`.
- **Action** is shown by parts that lift out of the object (a key popped out of its socket, a disc raised on an arch), with the empty socket or shadow left behind.
- **Give a generic shape its tell.** A plain rounded box reads as "a box". Add the one feature that names the object: keycaps for a keyboard, grooves for a database drum, a finger scoop for a letter tray (\`scoop()\`), a slot for a card reader.

## Decor and props

- **Floating extras: 2–4**, each a small solid in the same projection: a tilted UI card (about 84–114 × 50–58, 8–9 thick, tilted back 28°), a coin (radius 17–19, a digit or icon on it), an upright plate (shield, cloud, envelope; 7–8 deep). Each casts its own hard shadow (offset 8.5, 7.6) or a small ground ellipse (radius 10–17) on the floor or tile below it.
- **Sparkles: 3 per card**, 4-point concave stars in deep teal: a big one (size 6–7) with a small one (3.6–5) 12–16 px from it, beside one extra, and a single small one (4–5) beside an extra on the other side.
- **Arc ticks: 0–3**, short arcs (20–40°) hugging a floating item at its radius plus 7–9, 3.4–3.6 wide, pale-mid or teal. They say "this just moved"; Backup has none, Command K has three around its two popped keys.
- UI content on cards: grey bars 4.4 high with radius 2.2; one teal highlighted row (radius 4–6) with white bars; small square icons radius 4 in teal with a white glyph.
- Never: people, plants, outline clouds as background doodles, ground lines, platforms under the whole scene, text labels, glows.

## Composition

- Background: a square full-bleed \`<rect width="480" height="360" fill="#ebebeb">\`, no \`rx\`.
- The whole group (hero, shadows, extras) is centred with its bounding box at (240, 181). It spans **58–90 % of the card width and 58–75 % of its height**; margins are at least 30 px on every side. The hero alone takes about 55 % of the card.
- The hero sits slightly below centre; the extras orbit it in the top-left, top-right and left gaps, so no quadrant is empty and nothing touches the hero's outline.
- Stagger the extras at different heights (one high, one level with the hero's rim). Three extras in a level row across the top read as a toolbar, not a scatter.
- The bounding box includes every extra, so moving one extra outward shrinks the hero after centring. Read the width % that \`card()\` prints after every move and keep it at 90 % or less.
- The hard floor shadow is part of the silhouette: it extends 20–60 px down-right of the base and anchors the object.
- Structure of every example file: \`<rect id="P-bg">\`, then \`<g id="P-scene" transform="translate(TX TY)">\` holding everything projected, then \`<g id="P-decor">\` with sparkles and arcs in card coordinates.

## Techniques

All of them come from \`scripts/teal3d.mjs\` (no dependencies, deterministic). \`scripts/starter.mjs\` builds a complete card with each one; copy both files to your work folder and edit the scene.

1. **The camera.** One orthographic camera for everything: \`makeCam({ TH: -25, PH: 36, S })\`, \`S\` 0.84–1.05. World +x runs to the lower right, +y away (upper right), +z up. Don't hand-draw a "roughly isometric" box: faces drift out of parallel and the set stops matching.
2. **Solids and plates.** \`solid({ fr, r0, z0, r1, z1, col })\` extrudes between two rings (\`rrect\`, \`circle\`) and colours each visible side run by facing; give a smaller top ring for keycaps. \`slab({ fr, pts, depth, face, side })\` extrudes any flat outline (shield, cloud, envelope) and returns \`.shadow()\`. \`mat(fr, z)\` maps flat 2D art onto a face: \`<g transform="\${mat(fr, z)}">…glyph…</g>\`.
3. **Hard shadows.**
   \`\`\`js
   put(\`<path d="\${poly(floorShadow(rrect(0, 0, W, D, R), H * 1.05))}" fill="\${C.deep}"/>\`); // first
   put(liftShadow(card.hull) + card.svg);                                                     // floating extra
   put(env.shadow() + env.svg);                                                               // floating plate (slab)
   put(well.onFloor(\`<path d="\${poly(castShadow(pts3, zFloor))}" fill="\${C.deep}"/>\`));     // part standing on a surface
   \`\`\`
   \`castShadow(pts3, z, 0.6)\` drops a standing part's world points onto the surface it stands on (the git-graph discs on their tile). Use it only for parts that touch that surface; a floating plate cast onto the floor far below becomes a thin dark bar nowhere near the plate, so floating items always use the screen offset.
4. **Recesses and wells.** \`recess({ ring, z, depth, id: 'P-well' })\` cuts an opening into a top face (teal-dark walls, mid floor, clipped; pass \`wall: C.mid, floor: C.pale\` for a large tray). \`well.onFloor(art)\` clips art to the visible floor, for printed details and cast shadows. Parts sitting inside it are drawn after it, back to front by \`dot(centre, cam.V)\`. \`scoop({ xa, xb, depth, y0, y1, zTop })\` cuts a shallow arc down through a front wall (from its outer face y0 to its inner face y1): the cut shows the floor colour, its inner faces follow the facing rule, and both edges are inked.
5. **Decor.** \`spark(x, y, size)\` and \`arc(cx, cy, r, a0, a1)\` in card coordinates, placed from the shifted bounding boxes that \`card({ prefix, scene, BOX, decor })\` hands you.

Draw order: floor shadow → hero (back parts first) → face details → recesses → parts inside recesses, sorted back to front → for each extra, its shadow then its body → decor.

A torus (\`torus().piece()\`) and swept tubes (\`tube()\`) are there for rings and pipes; draw the back half of a ring before the part that passes through it and the front half after. The kit warns \`[fold]\` when a tube outline self-intersects; shorten or thicken the tube until it stops.

## Failure modes

- **Scattered parts read as a diagram, not a spot.** Git Merge's first version was loose rings and tubes floating on grey and scored 7; mounting the same graph on one thick white tile took it to 8. Build one object.
- **A teal-fronted object belongs to another set.** Early Command K drafts had a teal case front; the shipped one is white on the front and top, teal only on the right side.
- **A thin shadow reads as a stroke, not a drop.** Backup's floor shadow was enlarged by about a quarter in its polish pass (the drum and ring footprints are pushed 40–46 units) so a solid crescent shows beyond the ring. Check that the shadow is at least 15 px wide at its widest.
- **Shadows in two directions break the light.** Every floor shadow, ground ellipse and floating offset goes down-right; never mirror one to balance the layout.
- **Hairline seams between side colours.** Without the base fill under the side runs (built into \`solid\`) a 1 px grey line shows at 2x. Keep the base fill when you write a custom solid.
- **Distorted UI strokes on tilted faces.** A stroke inside a \`mat()\` transform shears with the face; add \`vector-effect="non-scaling-stroke"\` to UI rects.
- **Tube outlines that loop.** A tight bend on a thick tube folds its silhouette into a swallowtail; the kit prints \`[fold]\`. Reduce the bend or the radius.
- **Decor clutter.** Background outline clouds were cut from Command K; decor is three sparkles and up to three arc ticks, nothing more.
- **A big teal hole turns the hero teal.** An empty tray with teal-dark walls and a mid floor read as a teal object from above (self-test, Inbox Zero). Step a large recess lighter: walls mid, floor pale.
- **A plain container doesn't name itself.** The self-test's empty tray read as "a tray" until a finger scoop was cut into its front wall; then it read as a letter tray at 1x.
- **A floating plate's floor shadow becomes a stray bar.** Casting an upright envelope onto a tray floor 90 units below gave a thin dark strip in the wrong place (self-test). Floating items use the (8.5, 7.6) screen offset.
- **Extras touching the hero.** A floating item whose shadow lands on the hero's outline reads as a collision; keep at least 12 px of grey between an extra (with its shadow) and the hero's silhouette.

## Examples

- \`examples/command-k.svg\`: Command K. A keyboard case with a recessed key tray; the ⌘ key (teal) and the K key (pale) float above their empty sockets, a command-palette card tilts above. Shows recesses, keycaps with smaller top rings, sockets as shadows, a tilted UI card.
- \`examples/git-merge.svg\`: Git Merge. A thick white tile carrying a square-bar git graph; a teal branch arches up through a raised commit disc and plugs into the merge disc. Shows shadows cast on a tile top (clipped to it), commit discs, a PR card and a commit coin with ground ellipses.
- \`examples/backup.svg\`: Backup. A three-disc database drum wearing a lifebuoy (torus split into white and teal bands), with a shield-check plate, a cloud-upload plate and two data coins (1 and 0). Shows cylinders with grooves, a torus drawn in back and front halves, a shadow cast onto the drum, upright plates.

## Workflow

Run commands from this skill's folder. \`WORK\` is your own work folder (any path); the card is \`$WORK/card.svg\` with id prefix \`xx-\`.

1. **Brief.** Name the subject and the one object that embodies it. Write one line: hero object, the part that moves or lifts out, 2–4 extras that support the subject. If the subject is a process, find the physical object that holds it.
2. **Set up the generator.**
   \`\`\`sh
   mkdir -p "$WORK" && cp scripts/teal3d.mjs scripts/starter.mjs "$WORK/" && mv "$WORK/starter.mjs" "$WORK/gen.mjs"
   \`\`\`
   Change \`P\` to your prefix and the \`label\`.
3. **Block the hero** with \`solid\` and \`slab\` only (no details), render, and check the silhouette and the shadow read at 1x.
4. **Draw** face details, recesses, lifted parts, then the extras and decor. Keep the draw order above.
5. **Render** (headless, 2x): \`node "$WORK/gen.mjs" "$WORK/card.svg" && node scripts/render.mjs "$WORK/card.svg" "$WORK/card.png"\`
6. **Sheet next to the examples:** \`node scripts/render.mjs --sheet "$WORK/sheet.png" examples/*.svg "$WORK/card.svg"\`. Ask "same hand, same set?": face colours, outline weight, shadow direction and size, amount of white.
7. **Zoom** the places faults hide, re-rendered from vector: \`node scripts/render.mjs "$WORK/card.svg" "$WORK/z1.png" --zoom x,y,w,h --scale 8\`. Check creases where colours meet, recess edges, glyphs on faces and every shadow edge.
8. **Critique** against the five criteria in \`references/craft.md\` (criterion 2 becomes "the hero object's construction": thickness, corners, product detail, believable parts). Fix and repeat; expect three or more rounds.
9. **Lint:** \`node scripts/lint.mjs "$WORK/card.svg" --prefix xx- --palette style.json\`. Fix every ERROR. In this style there should be no off-palette WARN at all.

\`references/craft.md\` holds the file contract, originality rules and scoring that apply to every illustration style.

## Verify

- [ ] Background is one \`#ebebeb\` full-bleed rect without \`rx\`; nothing else touches the card edge.
- [ ] Exactly one hero object; no person, plant, platform or ground line.
- [ ] Every face is flat: top and front of the hero white, its right side teal; pale parts have pale sides and a mid right side.
- [ ] All outlines are \`#0e3f3d\` at 1.2 (UI 1.0–1.1, LEDs 0.8); no outline in any other colour.
- [ ] Every shadow is flat \`#0e4a48\` and falls down-right; the floor shadow is at least 15 px wide at its widest.
- [ ] Every floating extra has its own hard shadow or ground ellipse, in the same direction.
- [ ] 2–4 extras, 3 sparkles (one big-small pair plus a single), 0–3 arc ticks.
- [ ] Group bounding box centred at about (240, 181), 58–90 % of the width, margins ≥ 30 px.
- [ ] One highlight streak per white front face (long dash + short dash, pale, 2.2).
- [ ] Glyphs and digits are stroked paths with round caps; no \`<text>\`.
- [ ] At 8x, no hairline seam between side colours and no gap between a fill and its outline.
- [ ] Only the 11 palette colours appear (\`lint.mjs --palette style.json\` prints no WARN).
- [ ] The subject reads at 1x without a caption.
`,
  'two-colour-brush': `---
name: illustration-two-colour-brush
description: Draws original design and coding scenes as hand-authored SVG cards (480x360) in a two-colour brush-marker style. Identifying traits: thick wobbly black marker lines with blobby ends, built as filled ribbons; one second ink, mint green, in flat blocks that slip 2-10 px off the line like a misregistered print; solid black hair, trousers and shoes with mint highlight dashes; and a crinkly squiggle camo on cream areas, all on warm cream paper. Characters are chunky, with profile heads, big noses, dot eyes, big hands and feet. It covers people coding, thinking, carrying and resting with laptops, mugs, chairs and rubber ducks. Use when someone asks for brush, marker, felt-tip, two-colour, duotone, riso-print, zine, mint-and-black or doodle illustrations, or for empty states, onboarding, 404 pages, blog headers, feature spots or marketing cards with a bold hand-made look.
---

# Illustration: Two-colour brush

Loose, confident marker drawings in two inks, black and mint, on cream paper. A chunky character does one readable thing, drawn with fat wobbly lines; mint sits in flat blocks that never quite line up with the black. It suits playful product moments that want energy and a human hand: empty states, onboarding, error pages, editorial headers.

Boundary: for a wobbly brush line with hatching and full colour, use \`illustration-ink-sketch\`. For a single continuous line with off-register colour, use \`illustration-one-line\`. For thin black line with halftone dot shading, use \`illustration-halftone-line\`. For flat colour with solid black shapes and no marker texture, use \`illustration-flat-with-black\`.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence

Every line is a fat, wobbling, blob-ended black marker ribbon, and the only other ink is flat mint green laid as a second plate that slips a few pixels off those lines, on cream paper.

If the lines go even-width or the mint registers exactly inside the outlines, it stops being this style.

## Palette

Four colours, measured from the examples. Nothing else is ever drawn.

| Role | Hex | Where it goes |
|---|---|---|
| Paper | \`#f1ede3\` | full-bleed card, skin (faces, hands, necks), knockout halos behind front objects |
| Ink | \`#141412\` | every line; solid hair, beards, trousers, hoodies, shoes, laptop lids, mugs, night panes |
| Mint | \`#4fd592\` | offset plates on bodies and props, highlight dashes on black, floor bands, screen glow, stickers |
| Off-white | \`#f7f4ec\` | shirts and chair upholstery under camo, toe caps, glints on black, bubbles, beaks, laptop shells |
| (clip only) | \`#000\` | fill of \`<clipPath>\` shapes; never visible |

Never: a third hue, grey, tints or opacity, gradients, filters, drop shadows, or \`stroke=\` lines (the only stroked paths are paper halos). Skin is paper, not a skin tone. Mint never touches mint: separate two mint areas with a black line or paper.

## Line and fill

- **Every line is a filled ribbon** from \`scripts/brush.mjs\`, never an SVG stroke. On the 480 card the nominal width \`w\` renders at \`w x 1.42\` (w >= 4), \`w x 1.28\` (3.3-3.9) or \`w x 1.1\` (below 3.3), whatever the fit scale.
- **Widths in use (card px):** floor line w 5.2-5.8 (7.4-8.2); big silhouettes (duck, armchair, hair) w 4.4-4.8 (6.2-6.8); standard outlines (body, limbs, props) w 4.0-4.2 (5.7-6.0); hands, mugs, small props w 3.0-3.8 (3.3-4.9); inner lines, glyphs, creases, tread w 2.0-2.8 (2.2-3.1); camo w 2.5-2.8.
- **Wobble:** width varies ±34% along a stroke, the start blob swells 38-78% and the end 26-66%, long strokes get 1-3 swells, and the centre-line wanders 0.95 px. Keep the defaults; pass \`v: 0.05-0.15\` only for small glyphs and clock hands.
- **Outlines** of closed shapes are ONE \`loop()\` stroke that starts somewhere (\`start\` 0-1) and overlaps its own start by 4%. A visible overlap blob is correct. \`part: 0.93\` leaves a deliberate gap.
- **Solid black shapes** (hair, trousers, shoes, hoodie): \`fillShape(ink)\` then a \`loop()\` outline round them, so the edge is lumpy.
- **The mint plate:** fill the shape with paper or off-white, then the SAME shape in mint shifted by (dx, dy), then the black outline. Offsets on the examples run from 2 to 10 px, mostly up-left (-3..-7, -2..-6), a few down-right. On black shapes, put the shifted mint BEFORE the black fill so mint peeks out along one edge.
- **Halos:** where a front object crosses a black shape, lay \`halo(shape, 3-12)\` first: a paper fill plus paper stroke that cuts a clean gap. Shoes 10-11, a front leg 8.5, a laptop lid 6-8, hair 9, arms 6, palms 5, thumbs 3.
- **Highlights:** 2-4 mint dashes (w 2.4-3.0, 8-16 long) along the inside edge of each black shape, 4-5 in from the outline; off-white dashes (w 2.4-3.0) for glints on shoes, mugs and lids.
- **Squiggle camo** on off-white areas only: 3-7 crinkled wandering lines, 1-3 closed puddles and 1-4 small o-rings (r 3.4-4.2) per area, w 2.5-2.8, clipped to the shape with \`clipped()\`, drawn before the outline.
- **Stipple:** clusters of 3-5 dots r 1.0-1.5 in ink or mint beside a form (a cushion, a cheek, a belly).

## Characters

- **Proportions:** chunky. The head with hair is about 1/3.5 of a seated figure's height; limbs are fat tubes (legs 38 → 23 wide, arms 30 → 24, in scene units before fit); hands about as long as the face; shoes about as long as the head is wide.
- **Head:** profile or 3/4, facing the action. Paper fill; the outline runs only down the face side as two open strokes (forehead → big bulbous nose → upper lip, then chin → jaw), w 4.0. The nose sticks out about 15 units and is the largest feature. \`profileHead(x, y, { deg, scale, facing, hair, eye, mouth })\` in \`scripts/brush.mjs\` draws the set's head with a neck block: hair \`curly\` | \`bun\` | \`ponytail\`, eye \`open\` | \`shut\` (straining) | \`tired\`, mouth \`smile\` | \`talk\` | \`teeth\` | \`flat\`; \`facing: -1\` mirrors it. Scale 1.1-1.3.
- **Hair:** a lumpy black blob of 20-26 control points with a \`loop()\` outline (w 4.0) and 2-4 short mint dashes inside. Curly hair, buns and beards are all solid black.
- **Face:** a dot eye r 3.6-3.9 (ink) with an off-white glint r 1.0 up and toward the nose; a brow arc w 3.0-3.2 above; an ear (paper fill, C-stroke w 3.4, inner curl w 2.8); a smile or flat mouth w 3.0-3.4. Tired: a heavy lid stroke plus a bag line w 2.4.
- **Neck:** a paper block with one side line w 3.2-3.4.
- **Clothing:** off-white shirts and sweaters carry camo; trousers and hoodies are solid black with mint dashes; cuffs are mint tubes or a single stroke across the wrist.
- **Hands, open:** \`openHand()\` with five tapered fingers of different lengths, from local angles thumb -58°, index -14°, middle -3° (longest, 23), ring 9-10°, little 24-25° (shortest, 15); a paper fill plus one open outline w 3.2-4.0; a short tapered palm crease w 2.6. The thumb leaves the palm near the wrist at about 45°.
- **Hands, gripping:** a paper palm block (loop w 3.0-3.2), separate finger tubes 7.4 → 6.6 wide and 14-18 long with round ends, about 7.5 apart, laid across the object (each its own \`loop()\` w 2.6), and a thumb tube 9 → 7 closing over from the other face, with a 3 px halo. A block hand can instead show three finger-separation dashes (w 2.0) from the edge inward. \`fist(x, y, deg, { thumb: 'top' | 'bottom' })\` draws the back-of-hand fist round a bar or rope (knuckles along \`deg\`, the forearm direction). A far hand behind the bar shows only a palm block plus three fingertip tubes curling over the bar's front. Put every thumb where \`references/craft.md\` handedness says, and run the thumb proof.
- **Feet:** big shoes: black upper, off-white toe cap, a mint sole plate offset 1.5-2.5, three tread strokes (w 2.4), two off-white lace dashes. Cross-legged figures show the soles. Slippers are mint with an off-white rim. \`shoe(ankle, deg, scale, facing)\` draws the shoe; a negative \`deg\` (-25 to -30) tips the toe up for a heel dug into the floor.
- **Poses that work:** sitting cross-legged on a cushion talking with one big open hand (Rubber Ducking); striding in profile with a lean, one arm steadying a load (Coffee-Driven); slumped in an armchair with a laptop on the lap and a mug raised (Night Owl). Hauling (the self-test's Deadline): the body is one straight line from the front heel to the head at about 35° off vertical, both heels dug in with the toes up, arms straight to two fists at waist height on a taut rope, the far fist at least 15 units in front of the chest line so its forearm shows.

## Decor and props

- **Emphasis ticks:** 4 marker strokes (w 4.0-4.2, 9-14 long) fanned from -150° to -55° round the head, 44-62 units from its centre. Over a black shape, lay a paper underlay first.
- **Accents:** a speech bubble (off-white, loop w 4.2) with \`{…}\` or \`!\`; \`?!\` marks; 3 speed lines (w 3.6-4.0, 40-54 long); 2 steam squiggles (w 3.0, 4 points); 4-point stars (off-white or mint) only inside a night window.
- **Props:** laptop (off-white or black lid, mint \`</>\` sticker, key dashes), mugs and takeaway cups (black or off-white with mint), rubber duck, floor cushion, armchair with camo upholstery, window with a mint moon, wall clock, plug and coiled cable.
- **Per card:** one figure, 1-3 big props, 2-4 small accents. Never a background shape, a frame, confetti, logos, or text beyond code glyphs (\`</>\`, \`{…}\`, \`!\`, \`?\`).

## Composition

- **Card:** \`<rect id="p-paper" width="480" height="360" fill="#f1ede3"/>\`, then one \`<g id="p-art">\` holding the fitted scene.
- **Size:** \`build()\` fits the control-point bounding box into 392 x 278 centred on (240, 184): the art spans about x 44-436 and y 45-323, so margins are about 44 px left and right, 45 top, 37 bottom. \`build()\` prints the fit scale \`S\`: the figure should land 200-250 px tall on the card (its height in scene units x S). A prop parked at the far edge widens the box and shrinks everything; in the self-test a laptop on the floor pushed S to 0.91 and the figure went small. Move or drop it.
- **Ground:** one or two black floor strokes (w 5.2-5.8) under the feet, often with a mint band (w 8.5) or a mint rug plate under them. Every foot, chair leg and object touches it.
- **Focal point:** the face and the gesturing hand, in the upper-middle third; the joke or prop sits beside it, never behind it.
- **Density:** sparse. Leave the paper open around the group; one cluster of marks, not an all-over pattern.

## Techniques

\`scripts/brush.mjs\` is the marker engine from the shipped cards (seeded, no dependencies). Check it from the skill folder:

\`\`\`bash
node scripts/brush.mjs --demo /tmp/brush-demo.svg && node scripts/render.mjs /tmp/brush-demo.svg /tmp/brush-demo.png
\`\`\`

A card generator (keep it in your own work folder and import the helper by absolute path; an ES import resolves against the generator file, not the cwd):

\`\`\`js
import { createBrush } from '/abs/path/to/illustration-two-colour-brush/scripts/brush.mjs';
const B = createBrush({ prefix: 'dl-', seed: 11 });
const { INK, MINT, PAPER, OFF, stroke, loop, fillShape, halo, dot, tube, xf, openHand, camo, clipped, ticks, rr,
        profileHead, shoe, fist, add, sub, mul, lerp } = B;
B.build(() => {
  const L = [], P = s => L.push(s);
  P(stroke([[60, 330], [200, 331], [340, 329]], { w: 5.6, v: 0.15, nobb: true }));    // floor
  const torso = [[150, 138], [120, 170], [114, 236], [165, 262], [210, 238], [190, 154]];
  P(fillShape(torso, OFF));                                                             // off-white shirt
  P(clipped(torso, camo([[[114, 176], [146, 178], [178, 176], [210, 182]]], [], [[140, 220, 4]])));
  P(loop(torso, { w: 4.2, start: 0.55 }));                                              // one-stroke outline
  const leg = tube([[234, 250], [220, 272], [208, 298], [200, 322]], [38, 34, 27, 23]);
  P(halo(leg, 8)); P(fillShape(leg, MINT, -4, -3)); P(fillShape(leg, INK)); P(loop(leg, { w: 4.2 }));
  P(stroke([[214, 276], [208, 290]], { w: 2.8, fill: MINT }));                           // highlight dash
  return L.join('\\n');
}, 'card.svg', { label: 'Deadline, Two-colour brush style' });
\`\`\`

- Draw in any units; \`build()\` runs the scene twice (measure, then fit). Use \`nobb: true\` on floor lines and decor that should not widen the fit.
- Keep all randomness in \`B.rnd()\` so a re-run gives the same card; adding a stroke early changes every later wobble, so append new strokes at the end of a section when tuning.
- \`xf(points, x, y, deg, scale)\` places a local shape on the card; \`tube(centre, widths)\` returns control points for limbs; \`rr()\` gives rounded rectangles; \`ticks(cx, cy, angles, r0, r1)\` draws emphasis ticks; \`star()\` a 4-point sparkle.
- Character parts: \`profileHead()\`, \`shoe()\`, \`fist()\` and \`openHand()\` reproduce the shipped cards' construction. Use them rather than redrawing heads and shoes from scratch.

## Failure modes

- **The joke didn't read at 1x.** Coffee-Driven ("stack overflow") scored 7: five small cups on a laptop read as a stack, not an overflow. Make the gag object the second-biggest mass, exaggerate it (taller than the head, tilting, spilling over), and check the 1x render without its title.
- **The sitting pose read as standing.** Night Owl scored 7.5: the legs dropped straight from the hoodie to the floor in front of the chair. Show the lap: thighs as a foreshortened block toward the viewer, knees at or above the hips, shins hanging from the knees in front of the seat edge.
- **Thumbs on the wrong side.** Both Night Owl hands and the lower Coffee-Driven hand were mirror-swapped and had to be redrawn. Decide left/right, palm/back and finger direction before drawing each hand.
- **Rake hands and blob shoes.** Rubber Ducking's first hand had five equal sausage lobes and a stub thumb, and its shoes were fat ovals. Taper the fingers, vary their lengths, angle the thumb out about 45° with a web; draw shoes with uppers, toe caps, soles and tread.
- **Even, mechanical lines.** SVG strokes or \`v\` near 0 on big outlines read as vector, not marker. Use ribbons with the default wobble and blob ends.
- **Colouring-book mint.** Mint filled exactly inside the outline loses the two-plate print feel. Offset it 2-10 px.
- **Grey mush at 1x.** Dense, even camo or too many stipple dots turns cream areas grey. Keep camo to off-white areas, 3-7 lines per area, with open gaps.
- **Overlaps that tangle.** A front limb drawn over a black shape without a halo merges into it. Halo it.
- **The figure hugs the prop.** In the self-test's first rounds the puller stood inside the clock's outline and read as hugging it, then as crouching. Keep the figure's silhouette clear of the big prop; only hands, a rope or a tool cross over. Build the pose as one readable line of action first, then add parts.
- **A fist with no arm.** A far hand placed behind the torso edge floats. Move it forward until its forearm shows.

## Examples

- \`examples/rubber-ducking.svg\` (Rubber Ducking): a curly-haired developer sitting cross-legged on a mint cushion, talking to a giant rubber duck with an open hand, laptop on the knee, \`{…}\` bubble, \`?\` over the duck. Shows the open hand, profile head, camo sweater, crossed legs with soles, the duck's big mint offset plate.
- \`examples/coffee-driven.svg\` (Coffee-Driven): a developer with a hair bun striding right, carrying an open laptop like a tray with a toppling tower of coffee cups. Shows a walking lean, speed lines, a palm-up grip and a flat palm steadying the stack, drips, the shoe build.
- \`examples/night-owl.svg\` (Night Owl): a tired developer slumped in a camo armchair at 3 a.m., laptop on the lap, mug raised, night window with a mint moon, clock, plug and cable. Shows camo upholstery, a lid grip and a mug grip, mint screen glow on the face, slippers on a mint rug.

## Workflow

Run commands from the skill folder (the one holding this file).

1. **Brief:** name the subject and the one gesture that sells it at 1x. Write the gag in one line if there is one ("pushing the clock's hand back").
2. **Pose and hero:** pick the figure's pose and the 1-3 props. For each hand write down left or right, palm or back, finger direction and thumb side (\`references/craft.md\`).
3. **Block:** write \`gen.mjs\` next to your card, importing \`scripts/brush.mjs\` by absolute path. Place control points for floor, props and the body as \`fillShape\`s only; build and render.
4. **Draw:** add \`loop()\` outlines, the mint plates with offsets, halos where things overlap, camo, highlight dashes, face, hands, shoes, ticks and accents.
5. **Render:** \`node scripts/render.mjs card.svg card.png\`.
6. **Sheet:** \`node scripts/render.mjs --sheet sheet.png examples/*.svg card.svg\`. Same hand, same set? Compare line weight and mint area.
7. **Zoom:** \`node scripts/render.mjs card.svg z-hand.png --zoom x,y,w,h --scale 8\` on every hand, the face, each shoe and each contact.
8. **Critique** on the five criteria in \`references/craft.md\`; fix; rebuild. Expect 4 rounds. Do the thumb proof for each hand.
9. **Lint:** \`node scripts/lint.mjs card.svg --prefix dl- --palette style.json\`. There should be no WARN at all.

## Verify

- [ ] Only \`#141412\`, \`#4fd592\`, \`#f1ede3\`, \`#f7f4ec\` appear (plus \`#000\` inside clipPaths); lint shows no WARN.
- [ ] No \`stroke=\` except on paper halos and tick underlays; every line is a filled ribbon.
- [ ] Big outlines are visibly uneven at 2x, with blob ends; no long line has constant width.
- [ ] Every mint block is offset from its outline by 2-10 px; no mint area touches another.
- [ ] Hair, trousers and shoes are solid black, each with 2-4 mint or off-white highlight dashes.
- [ ] Camo appears only on off-white areas, clipped, with open gaps.
- [ ] Faces: profile, big nose, dot eye with a glint, brow, ear; skin is paper.
- [ ] Every hand traces back to a cuff and an arm, has tapered fingers of different lengths, and its thumb is on the correct side.
- [ ] Feet and every resting object touch the floor line or a surface; a seated figure shows a lap.
- [ ] Front objects that cross black shapes have halos; no accidental tangents.
- [ ] Art is fitted by \`build()\` (about 44 px side margins); nothing touches the card edge.
- [ ] The subject reads at 1x (480 wide) without a caption.
- [ ] Every id starts with the prefix.
`,
  'vintage-emblem': `---
name: illustration-vintage-emblem
description: Draws original hand-authored SVG badge illustrations in a vintage emblem style for design and coding subjects. Identifying traits: a seven-colour screen-print palette (green-black ink, cream, terracotta, sand, tan, pale, a touch of teal) with no gradients; one chunky hero object in thick 3.6 px ink outlines, shaded with woodcut gouges and lit with pale streaks; a terracotta sun disc behind it, cut free by a 7.5 px cream keyline; a hard horizontal edge slicing the scene into a dark splash band with cream droplets punched out; a heavy condensed wordmark over a letterspaced serif tagline. Covers lockups, hero objects, gulls, splash bands and lettering. Use when someone asks for a vintage emblem, retro badge, crest, logo-style, screen-print, poster, sticker, patch or merch-style illustration, or a badge card for a team, event, release, empty state, 404 page, blog header or marketing card.
---

# Illustration: Vintage emblem

A screen-printed badge on cream paper: one bold object on a sun disc, a splash of ink along a hard bottom edge, and a heavy condensed wordmark with a small serif tagline. It suits named things (a club, a release, a principle, a team ritual) where the words are part of the picture.
Use \`illustration-two-colour-brush\` instead for loose brush-painted scenes in two inks; \`illustration-teal-spot\` for a single-colour spot object with no lettering; \`illustration-flat-with-black\` for a flat character scene with solid black shapes.

Extracted from a set of 42 original design-and-coding cards in 14 styles; the three cards in examples/ are this style's shipped cards.

## The look in one sentence
One chunky object, outlined in thick green-black ink and shaded with carved ink wedges, stands on a terracotta sun disc that a 7.5 px cream keyline cuts it free from, while a hard horizontal edge slices the scene into a dark splash band with cream droplets punched out, all locked up over a heavy condensed wordmark.

## Palette
Measured from the examples. Seven flat colours, nothing else.

| Role | Hex | Where it goes |
|---|---|---|
| Card | \`#f8f0e3\` | full-bleed background (78–85 % of the rendered card), keyline, cream highlights, droplets cut into the ink, the billow |
| Ink | \`#1f2b25\` | outlines, shadow wedges, splash band, gulls, wordmark, tagline (45–51 % of all non-cream pixels, wordmark included) |
| Terracotta | \`#c8693f\` | the sun disc; one repeat on the subject (nose cone, beetle shell, porthole ring, flame) |
| Sand | \`#d9a873\` | main fill of the subject (fins, crown, lens rim, flame core) |
| Tan | \`#b5824f\` | darker fill: trunks, grips, the shaded tone under sand |
| Pale | \`#ecd2a8\` | highlight streaks, rock faces, glass |
| Teal | \`#3f8273\` | accent only: one band, ring, collar or set of node dots per card, 2–4 % of non-cream pixels |

- Never: gradients, opacity, textures, hatching, filters, pure black or white, a sixth hue.
- Terracotta never touches the sun: anything terracotta on the subject sits inside the keyline.
- Teal never fills a large shape; a teal fin set was cut from the first card.

## Line and fill
All numbers are in lockup units (the lockup is scaled 0.95–0.97, so on the card they come out about 4 % smaller).
- **Subject outlines: 3.6** ink strokes, \`stroke-linejoin="round"\` (\`OUT\` in the kit). Small inner parts 2.2–2.8 (nozzle, collar, porthole ring 2.0).
- **Union outlines:** shapes that read as one mass (trunk + roots, a cluster of puffs) get one outline: an ink underlay stroked at 7.2 (2 × OUT), then the fills (\`unionOutline\`).
- **Keyline:** the subject's silhouette shapes again, filled and stroked cream at **15** (a 7.5 px cream gap), drawn after the sun and before the subject. Include every lobe, handle and spike, or the subject melts into the disc.
- **Shade is ink cut into colour**, on the right/lower side (light from the upper left):
  - woodcut gouges: \`wedge()\` 1.8–4.2 wide (10 on a trunk), blunt base, sharp tip;
  - crescents inside round parts (\`crescent()\`, thickness 2–4.2);
  - a two-tone offset for puffy masses: tan underneath, sand shifted (−2.6, −7.6) on top, so tan shows as a lower-right crescent (\`puffs()\`).
- **Light is pale or cream streaks** on the upper left: \`streak()\` half-width 1–2.4, both ends sharp; 2–5 per object. Short round-capped pale strokes (1.8–3.6) are fine on narrow parts.
- Flat fills only. No outline on the gulls, splash, droplets or wordmark (the wordmark uses a 2.2 same-colour stroke only to round its corners).

## Characters
No people. The hero object is the character:
- **One hero**, chunky and nearly symmetric, 80–210 px wide, built from 3–8 big shapes. Secondary structures compete with it: a launch tower beside the rocket was cut.
- It breaks the sun's circle: the rocket's nose rises above the disc, the tree crown is wider than the disc, the magnifier sits left so the disc shows as a crescent.
- Each big shape: flat fill, 3.6 outline, one ink shadow shape or 1–3 gouges on the right, 1–3 pale streaks on the left.
- Detail is carved, not drawn: rivets as ink dots r 1.15, grain as gouges, a code glyph \`</>\` in cream strokes 2.4 inside a porthole.
- Coding cues live inside the object (a \`</>\` porthole, roots laid out as a git graph with cream-and-teal nodes, a beetle under a lens) or in the splash (curly braces and chevrons as ink strokes 5.2–5.4).
- Creatures are cut like woodcuts: ink head and legs (tapered tubes with round joints), coloured shell with ink striae and pale streaks.
- **Round objects** (lens, dial, porthole, wheel), the Debug Club recipe: a sand ring outlined 3.6; inside a clip of the ring, a tan ring offset (+2.4, +2.4), an ink crescent on the right (thickness 4–4.6) and 5–6 short gouges on the right; a cream arc highlight on the upper left of the ring (stroke 2.6, two dashes); then the glass or dial in pale outlined 3.6, with a sand ring offset (+6, +6) and cream streaks on the upper left, all clipped to the glass.
- Small parts that stick out of a round object (crown, pushers, handle collar) are stadiums or quads standing on its rim, sand or tan, each outlined 3.6 and each in the keyline.

## Decor and props
- **Gulls:** 2–4 ink "m" silhouettes (\`gull(x, y, s)\`, s 7–10.5), in the sky beside or above the disc, never overlapping the subject, sizes varied, one mirrored.
- **Splash band** along the crop (\`foam()\`): an ink band from x 96–100 to 380–384, rising to a crest near y 216–224, 5 lobes a side (r 6.5–13.7, mirrored about x 240); cream holes r 1–3.2 punched into the dark (8–15 of them), teardrop drops r 1.8–3.2 flung outward at ±48–72°, 4–6 loose specks r 1–1.5.
- **Centre of the band** is the subject's base and changes per card: a cream cloud billow with ink lobes behind (rocket), a dark knoll with pale boulders and grass tufts (tree), ink spikes with drop tips (magnifier). A cloud bank is ONE outlined mass shaped like a mound, tallest under the hero: \`puffs(list, { merge: true, dark: PALE, light: CREAM })\`; draw part of it after the hero so the hero sits in it.
- Optional ink flecks: tiny triangle chips, grass blades as \`wedge()\` tufts.
- Never: stars, sparkles, frames, ribbons, banners, circles of text, dates, a second sun or moon.

## Composition
- **Card:** full-bleed \`<rect width="480" height="360" fill="#f8f0e3">\`, square corners.
- **Emblem:** sun disc r 86–88 at (240, 114–118); the scene clipped by \`<clipPath><rect width="480" height="229"/></clipPath>\` so everything ends on one hard horizontal edge at y 229. Emblem 276–328 px wide, about 205 px tall.
- **Wordmark:** top at y 258–260, centred on x 240, scale 0.68–0.95, cap 38–53 lockup units (the CLI prints it), 190–310 px wide on the card. Words of 12+ letters need \`--max-width 320\` (or \`wmMaxWidth: 320\` in \`card()\`) to keep the cap at 38. **Tagline** baseline = wordmark top + cap + 19.
- **Lockup:** everything in \`<g transform="translate(240 180) scale(0.95–0.97) translate(-240 -cy)">\` with cy = (top of the emblem + tagline baseline) / 2, so the whole badge is centred. Shipped lockups span y 30–331 (84 % of the card height).
- One focal point, dead centre, symmetric weight; the sky stays clean except gulls.

## Techniques
Two helpers in \`scripts/\`, no dependencies. From the skill folder:
- \`node scripts/wordmark.mjs "RELEASE DAY" --tagline "TAG • SHIP • REST" --prefix rd-\` prints the wordmark \`<g>\`, the tagline \`<text>\` and the lockup numbers. A–Z, 0–9 and \`- . ! '\`. \`--max-width 280\` (default) sets the scale; \`node scripts/wordmark.mjs --sheet alphabet.svg\` renders every glyph. It reproduces the shipped OPEN SOURCE and DEBUG CLUB wordmarks exactly.
- \`node scripts/emblem-kit.mjs demo.svg\` writes a self-test card. \`card()\` builds the whole SVG shell (card, crop, sun, keyline, lockup centring, wordmark, tagline). When the hero rises above the sun (a rocket nose, a bow), pass \`top:\` its highest y, or the lockup centres on the sun and sits low.

\`\`\`js
import * as K from '/abs/path/to/illustration-vintage-emblem/scripts/emblem-kit.mjs';
const P = 'rd-', fo = K.foam();                       // the Debug Club band; pass lobes/holes/flung to vary it
const body = 'M210 60 L270 60 L270 200 L210 200Z';     // your hero's silhouette paths
const svg = K.card({ prefix: P, label: 'Release Day', word: 'RELEASE DAY', tag: 'TAG • SHIP • REST',
  keyline: \`<path d="\${body}"/>\` + fo.keyline,          // silhouettes: cream, stroked 15
  emblem: \`<g fill="\${K.INK}"><path d="\${K.gull(150, 60, 9)}"/></g>
    \${K.outlined(body, K.SAND)}
    <path d="\${K.wedge(262, 196, 258, 90, 4, 0)}" fill="\${K.INK}"/>
    <path d="\${K.streak(218, 80, 220, 150, 2, 0)}" fill="\${K.PALE}"/>
    <g fill="\${K.INK}">\${fo.ink}</g><g fill="\${K.CREAM}">\${fo.holes}</g>\` });
\`\`\`

A cloud bank the hero sits in: back puffs, hero, front puffs, each set under one outline; every puff also goes in the keyline.
\`\`\`js
const rnd = K.rng(23);
const back = [K.puff(190, 206, 30, 12, 9.5, rnd), K.puff(292, 206, 30, 12, 9.5, rnd)];
const front = [K.puff(240, 214, 36, 17, 11.5, rnd), K.puff(196, 222, 26, 11, 9.5, rnd), K.puff(284, 222, 26, 11, 9.5, rnd)];
const pb = K.puffs(back, { prefix: P + 'b', dark: K.PALE, light: K.CREAM, merge: true });
const pf = K.puffs(front, { prefix: P + 'f', dark: K.PALE, light: K.CREAM, merge: true });
// defs: pb.defs + pf.defs; keyline: [...back, ...front].map(c => K.puffShape(c, K.OUT)).join('')
// emblem: splash, pb.svg, hero, pf.svg
\`\`\`

Carving inside a shape, clipped so gouges never cross the outline (as the rocket body and beetle shell do):
\`\`\`xml
<clipPath id="rd-bodyclip"><path d="M…body…"/></clipPath>
<g clip-path="url(#rd-bodyclip)">
  <path d="M243 55 C244 66 243 78 242 88 … L262 146 V55Z" fill="#1f2b25"/>   <!-- shadow side -->
  <path d="M245.6 86 C246.6 96 … Z" fill="#d9a873"/>                         <!-- reflected light in it -->
</g>
<path d="M…body…" fill="none" stroke="#1f2b25" stroke-width="4.2" stroke-linejoin="round"/>  <!-- outline last -->
\`\`\`

## Failure modes
- **Hero lost among props.** A launch tower beside the rocket split the focus; one hero only.
- **Teal everywhere.** Teal fins made the badge read as a different palette; keep teal to one band or ring.
- **Busy base.** A row of separately outlined cloud puffs looked like bubble wrap (the self-test hit this again with \`puffs()\` defaults); use one merged cream billow (\`merge: true\`) in the centre and ink lobes with punched holes at the sides.
- **Flat cloud sausage.** Equal-height puffs in a row read as a bolster; make the bank a mound, tallest under the hero.
- **Wordmark too small.** A 13-letter word at the default width came out with a 33-unit cap; widen to \`--max-width 320\` before shortening the words.
- **Crown reads as balls or a mushroom.** Plain circles for foliage; build clumps from bump rings with ink curls under the top bumps, gouges up from the bottom and the two-tone offset (\`puffs()\`).
- **Roots or lines read as scribble.** Free diagonal shapes; lay them out as lanes with vertical tangents (\`gstep\`), like a git graph, with nodes.
- **Subject melts into the sun.** Keyline missing on a lobe or handle; every silhouette shape goes into the keyline group.
- **Wordmark looks typed.** A system font in \`<text>\` changes per machine; build the wordmark with \`wordmark.mjs\`. Only the 12.5 px tagline may be \`<text>\` (Georgia bold, tracking 2), as in Ship It.
- **Wordmark letters fold over.** A corner radius wider than half the inner width makes cream slivers inside round glyphs; \`wordmark.mjs\` clamps it, so keep custom glyphs within it too.
- **Lockup off centre.** The scale was applied without re-centring; compute cy from the emblem top and the tagline baseline (\`card()\` does).

## Examples
- \`examples/ship-it.svg\`: rocket lifting off a cream billow, terracotta nose and porthole ring with a \`</>\` glyph, teal band, sand fins; carved shadow down the right of the body; wordmark at scale 0.95 with a \`<text>\` tagline.
- \`examples/open-source.svg\`: old tree on a dark knoll with pale boulders; crown of two-tone leafy clumps; roots as git-graph lanes with cream-and-teal nodes; grass tufts in the splash; wordmark scale 0.74.
- \`examples/debug-club.svg\`: big magnifier offset left so the sun shows as a crescent, a carved beetle in the glass, grip with ink bands and a teal collar; ink spikes, braces and chevrons in the splash; wordmark scale 0.84.

## Workflow
Commands run from the skill folder (Playwright must resolve for render: \`npm i -D playwright-core\` there or globally).
1. **Brief:** name the subject, pick ONE hero object that says it, and write the wordmark (1–3 words) and a three-beat tagline with \`•\` separators.
2. **Hero:** sketch its silhouette in 3–8 big shapes; decide how it breaks the sun's circle and what sits at its base in the splash band.
3. **Words:** \`node scripts/wordmark.mjs "WORD" --tagline "A • B • C" --prefix xx-\` to see the scale and cap height. If the cap is under 38, rerun with \`--max-width 320\`; only then shorten the words.
4. **Block:** write a generator (\`card.gen.mjs\`) that imports \`emblem-kit.mjs\` by absolute path. Silhouettes first (they feed the keyline), then fills, ink shade, pale streaks, splash, gulls. Use \`K.card()\` for the shell.
5. **Render:** \`node scripts/render.mjs card.svg card.png\`.
6. **Sheet:** \`node scripts/render.mjs --sheet sheet.png examples/*.svg card.svg\`. Same weight of ink, same palette share, same lockup size?
7. **Zoom:** \`node scripts/render.mjs card.svg z.png --zoom x,y,w,h --scale 6\` on the keyline, the carving, the splash holes and the wordmark joins.
8. **Critique** on the five criteria in references/craft.md (character drawing = the hero object's construction). Fix and re-render; expect 3–4 rounds.
9. **Lint:** \`node scripts/lint.mjs card.svg --prefix xx- --palette style.json\`. It should pass with no warnings.

## Verify
- [ ] Only the seven palette colours appear; \`lint --palette\` prints no WARN.
- [ ] Cream full-bleed card rect, square corners.
- [ ] A terracotta sun disc r 86–88 sits behind the hero, and the hero breaks its circle.
- [ ] A cream keyline about 7.5 px wide separates every part of the hero from the disc.
- [ ] Every hero shape has a 3.6 ink outline; shade is ink wedges or crescents, light is pale streaks.
- [ ] No gradients, opacity, hatching, textures or filters.
- [ ] The scene ends on one hard horizontal edge, with an ink splash band, punched cream holes and flung drops.
- [ ] 2–4 gulls, none touching the hero.
- [ ] Teal appears once or twice, small.
- [ ] Wordmark is paths from \`wordmark.mjs\`, cap 38–53 lockup units, centred, at most 310 px wide; tagline 12.5 serif bold with \`•\`.
- [ ] Lockup centred vertically: equal space above the emblem and below the tagline (± 6 px).
- [ ] The subject reads at 1x without the words.
`,
};