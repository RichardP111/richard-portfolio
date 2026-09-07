export type Socials = {
  GITHUB: string;
  LINKEDIN: string;
  INSTAGRAM: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
};

export type CaseStudy = {
  problem: string;
  approach: string;
  result: string;
  /** Optional images shown alongside each section. 2+ images render as a swipeable gallery. */
  media?: {
    problem?: CaseStudyImage[];
    approach?: CaseStudyImage[];
    result?: CaseStudyImage[];
  };
};

export type Project = {
  slug?: string;
  title: string;
  description: string;
  tag: string;
  tech: string[];
  mediaType: 'video' | 'image';
  mediaSrc: string;
  github?: string;
  downloadLink?: string;
  schematic?: string;
  designFile?: string;
  mediaAspect?: 'portrait';
  /** Optional. When present, the project gets a full case-study page at /projects/[slug]. */
  caseStudy?: CaseStudy;
};

export const CONFIG = {
  NAME: 'Richard Pu',
  EMAIL: 'r3pu@uwaterloo.ca',
  RESUME: '/resume',
  RESUME_FILE: '/resume.pdf',
  LOCATION: 'Ontario, Canada',
  ROLE: 'Computer Engineering',
  AVAILABILITY: 'Available for Winter 2027 co-op (Jan–Apr)',
  PROFILE_IMAGE_SRC: '/profile.jpg',
  HERO_IMAGE_SRC: '/profile-hero.jpg',
  SOCIALS: {
    GITHUB: 'https://github.com/RichardPu',
    LINKEDIN: 'https://www.linkedin.com/in/purichard/',
    INSTAGRAM: 'https://www.instagram.com/_._.richard/',
  } as Socials,
  EDUCATION: {
    school: 'University of Waterloo',
    program: 'Computer Engineering (BASc Co-op)',
    note: 'Edit the timeframe/year in the EDUCATION block in page.tsx.',
  },
  PROJECTS: [
    {
      title: 'Smart Chess Board',
      slug: 'smart-chess-board',
      description:
        'A smart chess board powered by an NVIDIA Jetson Orin Nano. Moves are entered via physical buttons or a web dashboard, with Stockfish AI, online play, and an LED board that lights up legal moves and game state in real time.',
      tag: 'Hardware Engineering',
      tech: ['Jetson Orin Nano', 'Neopixels', 'OLED Display'],
      mediaType: 'image' as const,
      mediaSrc: '/images/chessBoard.jpg',
      github: 'https://github.com/RichardPu/jetson-chess',
      designFile: 'https://github.com/RichardPu/jetson-chess/tree/main/3D%20models',
      caseStudy: {
        problem:
          'This project was actually an intergenerational project that was first created by a few students who graduated. They followed an old tutorial which used an Arduino and Raspberry Pi, but the software and GPIO communication between the boards ended up not working. So I took on the project in Grade 11. I converted it to an SPI connection and the board ended up working, but it would overheat and the startup time was almost a minute. The issue was that over time, due to updates, the board stopped working again. A new solution to the project had to be thought of.',
        approach:
          "Our teacher had gotten access to the cutting-edge Nvidia Jetson Orin Nano, and it was the perfect use case. The GPIO pins could be used to wire all the buttons, lights, and OLED screen, while also being powerful enough to run its own AI engine. Stockfish was used to handle offline AI play at a difficulty the player chooses, the Lichess board API handles online games, and there's a local two-player mode. Sixty-four WS2812B LEDs under the board animate everything from illegal moves, hints, captures, and check states, with a small OLED display showing the eval bar and game state. Ten physical buttons handle move input, undo, and pawn promotion. A Flask web dashboard mirrors the board in real time, lets you build custom LED themes, download PGNs to replay over the board, and select moves. The issue was the old case didn't fit the Jetson, so I had to remodel and design parts of the case for airflow, easy access to the device, and long-term repairability.",
        result:
          "Other than the board working, the startup times improved by over 50%. Smaller touches were also added, like the ability to see everything in real time, how it automatically detects if a USB is inserted so it can save, or even smaller touches like pawn promotion, which in the past design was always a queen. The hardware itself is a modified version of an open-source DIYMachines chess board design, adapted with a Jetson electronics bay, fan airflow cutouts, and a repositioned OLED and button layout. Sources and credits can be found in the GitHub repo.",
        media: {
          approach: [
            { src: '/images/chess_panel.jpg', alt: 'Button panel and wiring on the smart chess board' },
            { src: '/images/chess_bay.jpg', alt: 'Electronics cage with the logic level shifter' },
            { src: '/images/chessBoard_1.jpg', alt: 'The smart chess board main board' },
          ],
        },
      },
    },
    {
      title: 'Red Light, Green Light',
      slug: 'red-light-green-light',
      description:
        'An AI-powered Red Light, Green Light game inspired by Squid Game, running on an NVIDIA Jetson Orin Nano. The system uses vision-based movement detection to decide when players move.',
      tag: 'AI & Hardware',
      tech: ['Jetson Orin Nano', 'Python', 'Computer Vision', 'Ultralytics YOLO'],
      mediaType: 'image' as const,
      mediaSrc: '/images/rlgl.jpg',
      github: 'https://github.com/RichardPu/jetson-rlgl',
      designFile: 'https://github.com/RichardPu/jetson-rlgl/tree/main/3D_files',
      mediaAspect: 'portrait' as const,
      caseStudy: {
        problem:
          "Our high school had a day where Grade 7s would come and learn about STEM. We needed an activity where students would have fun but also be interested in learning about AI and the cool technology we have in the world. The idea was to recreate red light, green light from Squid Game, where we would make the doll, and it would use computer vision to detect if a player has moved when it's red.",
        approach:
          "The game was built end to end on a Jetson Orin Nano, and Cindy X painted the 3D-printed doll to make it look realistic. For tracking, I used YOLOv8-pose for real-time multi-player movement, while also keeping each player's identity remembered. The projector screen showed the UI, the camera view, and what state it was in. It drew outlines of every player and waited for everyone to step behind the start line before starting. A servo-driven head turns between green and red-light phases, and caught players are identified by their clothes and called out over a PA speaker via ElevenLabs text-to-speech.",
        result:
          'The game ran smoothly but there was still some challeneges. Getting there took a handful of optimizations: pre-resizing camera frames before feeding the model instead of leaving that to the model itself, running shirt-colour detection only at catch/win moments instead of every frame, and locking the Jetson at max clocks. I also built three dedicated calibration GUIs which made it much easier to get the whole system dialed in before event day.',
        media: {
          approach: [
            { src: '/images/rlgl_print.jpg', alt: '3D printing the doll enclosure' },
            { src: '/images/rlgl_programing.jpg', alt: 'Calibrating the system with the debug GUI' },
          ],
          result: [
            { src: '/images/rlgl_closeup.jpg', alt: 'Close-up of the doll electronics' },
            { src: '/images/rlgl_headturn.jpg', alt: 'The doll turned around during red light phase' },
          ],
        },
      },
    },
    {
      title: 'BenumZombs',
      description:
        'A scratch-built 2D survival shooter using Java Graphics2D and OOP principles. Features custom vector physics, object-pooling for entity management, and a personalized asset library.',
      tag: 'Java Game',
      tech: ['Java', 'Graphics2D', 'OOP'],
      mediaType: 'image' as const,
      mediaSrc: '/images/benumZombsGame.png',
      github: 'https://github.com/RichardPu/BenumZombs',
      downloadLink: '/jar/BenumZombs.jar',
    },
    {
      title: 'Truck Game',
      description:
        'A high-speed object-avoidance game on an Arduino Uno, using the LiquidCrystal library for dynamic 16x2 display updates and a low-latency coordinate system for real-time physics and analog joystick input.',
      tag: 'Circuit Design',
      tech: ['Arduino Uno', 'Joystick', 'LCD 16x2'],
      mediaType: 'video' as const,
      mediaSrc: '/videos/truckGameVideo.mp4',
      github: 'https://github.com/RichardPu/arduino-truck-game',
      schematic: '/schematic?file=/truckGameSchematic.pdf&title=Truck%20Game%20Schematic',
    },
    {
      title: 'Memory Matrix',
      description:
        'A reaction-time assessment tool built on an Arduino I2C architecture, synchronizing LED matrices with user input. Optimized interrupt service routines achieve millisecond precision in measuring pattern retention.',
      tag: 'Circuit Design',
      tech: ['Arduino', 'I2C', 'LED'],
      mediaType: 'video' as const,
      mediaSrc: '/videos/memoryGameVideo.mp4',
      github: 'https://github.com/RichardPu/arduino-memory-game',
      schematic: '/schematic?file=/memoryGameSchematic.pdf&title=Memory%20Matrix%20Schematic',
    },
  ] as Project[],
  SKILLS: [
    { title: 'Languages', items: ['Java', 'Python', 'C++', 'HTML / CSS'] },
    { title: 'Hardware & Design', items: ['Arduino', 'Raspberry Pi', 'NVIDIA Jetson Orin Nano', '3D Design & Printing'] },
    { title: 'Tools & Ecosystems', items: ['VS Code', 'Eclipse', 'Arduino IDE', 'GitHub', 'Docker'] },
  ],
};