# 🎨 The Scream

**Interactive Animation – p5.js (Perlin Noise + Randomness Prototype)**  

by **Yongjie Jin, 550338785**  

Master of Interaction Design & Electronic Arts – The University of Sydney (USYD)  

2025 Individual Coding Task


------

## 🧠 Project Description

### Group Project

The group project visualises the overwhelming stress of students buried in endless assignments.
By combining Munch’s *The Scream* with a live video feed, the user becomes the central figure — overwhelmed, pixelated, and blended into the chaos of the artwork.
The humorous text **“I forgot ddl”** emphasises this emotional breakdown and injects irony into the classic painting.

------

### Individual Project

This individual work extends the group project by introducing **Perlin noise** and **randomness** as the primary drivers of animation.
Instead of focusing on user interaction or time-based control, this version gives the painting a self-generated, organic sense of distortion.

Each column of *The Scream* background is displaced vertically according to Perlin noise values, while subtle random offsets ensure the flow is never perfectly repetitive.
The result is a continuous, living background that feels unstable and emotionally charged — reflecting the student’s inner chaos before a deadline.

------

## 🕹️ How to Run & Interact

1. Host the project on a **local server** (needed for camera access).

2. Open the webpage in Chrome and **allow camera access**.

3. The animation starts automatically:

   - The background painting flows organically using Perlin noise.
   - Your **segmented live image** is placed inside the artwork using the ml5.js uNet model.
   - The humorous message **“I forgot ddl”** remains static in the composition.

4. Click **💾 Save your scream** to download your frame as an image.

This version requires **no manual input** — it runs autonomously, driven purely by generative randomness.

------

## 🧩 Individual Approach

- **Driver chosen:** `Perlin noise + randomness`
- **Concept:** Instead of time-based rhythm or direct interaction, the painting is animated through stochastic movement patterns.
   The noise field distorts each column vertically, and random offsets per column prevent uniformity.
   This gives the illusion of a trembling, breathing painting — alive, yet unstable.

------

## 🌈 Animation Method

| Animated Property         | Behaviour                                                    | Unique Aspect                                                |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Background (painting)** | Each column of pixels is vertically displaced by Perlin noise. Random variation per column ensures the flow never repeats exactly. | Focuses on *autonomous visual energy*, rather than interaction or timed rhythm. |
| **Randomness injection**  | Slight column offsets are randomized each frame, creating micro-vibrations. | Adds natural irregularity to motion — unlike time-based sine modulation. |
| **Live segmentation**     | Keeps the user visible while background moves dynamically.   | Highlights the emotional contrast between moving chaos and static human figure. |
| **Pixelation effect**     | Applies a stylised pixel filter over the final frame.        | Creates a digital aesthetic fitting the “forgot deadline” theme. |
| **Text**                  | “I forgot ddl” remains static and readable above the animation. | Serves as an emotional anchor amid chaotic motion.           |

------

## ⚙️ Technical Explanation

**Technology Stack:**

- **p5.js** — handles drawing, Perlin noise generation, pixel manipulation.
- **ml5.js (uNet)** — performs real-time person segmentation via webcam.

**Key functions:**

- `drawWavyBackground(img, waveStrength, noiseScale)`
  - Iterates through each column of the background image.
  - Uses `noise(x * noiseScale, yoff)` to compute vertical displacement for that column.
  - Adds a small random offset to each column per frame (`random(-2, 2)`), creating subtle irregular motion.
  - Reconstructs the background each frame to produce smooth, organic distortion.
- `applyPixelation()`
   Downsamples and re-renders the entire frame to create the stylised pixel look.
- `segmenter = ml5.uNet('person', modelReady)`
   Loads the pre-trained segmentation model to isolate the person in real-time.
- `drawStatusText()`
   Renders **“I forgot ddl”** text on the top quarter of the screen, staying consistent while the background evolves.

------

## 🔁 What I Changed from Group Code

- Replaced the static background rendering with a **Perlin noise–driven background**.
- Introduced **random vertical and horizontal offsets** to create an unpredictable, organic flow.
- Kept the **segmentation**, **pixelation**, and **save button** intact from the group version.
- Ensured **text and person remain stable** while the painting becomes visually alive.

------

## 💡 Inspiration & References

**Visual inspiration:**

- Edvard Munch (1893). *The Scream*. The National Gallery, Oslo. https://www.nasjonalmuseet.no/en/collection/object/NG.M.00939
- Ken Perlin (1985). *Perlin Noise: A Gradient Noise Function* — a generative method widely used in computer graphics for natural-looking motion. https://en.wikipedia.org/wiki/Perlin_noise
- From Pinterest
  - https://www.pinterest.com/pin/68749240568/
  - https://www.pinterest.com/pin/10485011644351547/
  - https://www.pinterest.com/pin/1002402829572557576/


**Conceptual inspiration:**
Inspired by how Perlin noise creates organic, non-repetitive motion. I imagined the background of *The Scream* as if it were vibrating from anxiety — an emotion that doesn’t follow perfect rhythm, but rather fluctuates unpredictably.

------

## 🧾 Additional Notes

- The randomness ensures that each run produces a slightly different animation — no two “screams” are exactly alike.
- This version emphasises **emotional instability** through continuous but irregular deformation.
- The absence of time-based rhythm (e.g. sine wave modulation) differentiates it from other team members’ work and keeps focus on natural noise-driven flow.
