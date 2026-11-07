# Virtual Dog Park

## 1. Project description
Virtual Dog Park is a beginner-friendly website about dogs, built with plain
HTML, CSS, and vanilla JavaScript — no frameworks, no backend, and no external
libraries or APIs. It has two parts: a **Dog Encyclopedia** with three breeds,
and an interactive **My Virtual Dog** virtual pet that you can adopt and take
care of.

## 2. Features
- **Dog Encyclopedia** with three breeds: Beagle, Golden Retriever, and Poodle.
  Each breed has an original SVG illustration and short, easy-to-read notes on
  **Size**, **Personality**, and **Everyday care**.
- **Pet buttons** in the encyclopedia that wag the dog and show a friendly message.
- **My Virtual Dog**: choose a breed, name your dog, and click **Adopt**.
  - Name validation: trimmed, cannot be blank, maximum 20 characters,
    internal spaces allowed.
  - Shows the dog's **name, breed, day number, growth stage, and happiness**.
- **Feed** and **Play** buttons that raise happiness.
- **Next Day** button that advances the day and lowers happiness.
- **Visible growth**: the dog picture grows and a progress bar fills as the dog
  ages. The growth stage is also written out as text.
- **Start Over** button that asks for confirmation before deleting the saved dog.
- **Local save**: progress is stored in the browser and restored after a refresh.
- **Responsive layout** that works on both phones and laptops.

## 3. How to preview with a local server (e.g., VS Code Live Server)
Because the page loads local image files and uses the browser's `localStorage`,
it is best to open it through a local web server rather than double-clicking the
file. A simple option is the VS Code **Live Server** extension:

1. Open the project folder in Visual Studio Code.
2. If you do not have it, install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**, or click
   **Go Live** in the status bar.
4. Your browser opens a URL such as `http://localhost:5500` showing the page.

Other easy options:
- VS Code's **Live Preview** extension.
- From the project folder, run `python3 -m http.server 8000` and visit
  `http://localhost:8000`.

(Opening `index.html` directly by double-clicking also displays the page, but a
local server gives the most reliable behavior for local files and storage.)

## 4. Growth and happiness rules
- A **new dog** starts on **Day 1**, at the **Puppy** stage, with **happiness 50**.
- **Feed** or **Play**: each adds **10** to happiness. Happiness can never go
  above **100**.
- **Next Day**: the day increases by **1**, and happiness decreases by **5**.
  Happiness can never go below **0**.
- **Growth stages** are based on the day number:
  - **Day 1** → Puppy
  - **Days 2–3** → Young Dog
  - **Day 4 and later** → Adult Dog
- The dog's picture grows and the growth bar fills as it gets older (the bar is
  full by day 7 and then stays full).

## 5. Where your pet progress is stored
Your dog's progress (name, breed, day, and happiness) is saved **locally in your
own web browser** using `localStorage`, under the key `virtualDogParkPetV1`. It
is **not** stored in a GitHub account, on a server, or on anyone else's
computer. Clearing your browser's site data for this page — or clicking
**Start Over** and confirming — removes the saved dog.

## 6. Illustrations
The dog pictures in this project are **original SVG illustrations created for
this project**. They are simple drawings, **not real dog photographs**. They are
stored in the `assets/` folder as `beagle.svg`, `golden-retriever.svg`, and
`poodle.svg`.

## 7. Manual testing checklist
- [ ] Open `index.html` through a local server (e.g., Live Server).
- [ ] Encyclopedia: each breed card shows an illustration with alt text and notes for Size, Personality, and Everyday care.
- [ ] "Pet the dog" buttons wag the picture and show a message.
- [ ] Adopt: choose a breed, type a name, click Adopt. (A blank or whitespace-only name is rejected; the name is trimmed; input stops at 20 characters.)
- [ ] Feed and Play each raise happiness by 10, never above 100.
- [ ] Next Day raises the day by 1 and lowers happiness by 5, never below 0.
- [ ] Growth updates visibly: the picture grows and the bar fills; the stage text shows Puppy → Young Dog → Adult Dog.
- [ ] Refresh the page: the dog's name, breed, day, and happiness are restored.
- [ ] Start Over → Cancel: the dog is kept.
- [ ] Start Over → Confirm: the panel closes and the dog does not return after a refresh.
