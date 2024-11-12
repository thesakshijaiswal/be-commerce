const products = [
  {
    id: 1,
    name: "Cello Venice Exclusive Edition Plastic Water Bottle | Unbreakable and Hygienic | Perfect for staying hydrated at the school,college, work, gym and outdoor adventures | 1 Litre | Set of 5, Multicolour",
    image: "/product_images/cello_bottles.jpg",
    description:
      "Manufactured with 100 percent food grade, virgin/non toxic plastic, this bottle set by Cello is BPA-free, ensuring a healthier lifestyle. These crystal clear bottles are spill proof and easy to pour. Not only are these bottles leak-proof, but are also unbreakable and extremely durable. Cello makes these bottles to be freezer safe. These reusable bottles come in various colours, giving it a vibrant edge over other bottles. Ergonomically designed, these lightweight and compact bottles are very useful for your everyday need.",
    brand: "Cello",
    category: "Home & Kitchen",
    price: 497,
    countInStock: 20,
    starRating: 4.6,
    rating: 50,
    numReviews: 0,
  },
  {
    id: 2,
    name: "boAt Bassheads 242 in Ear Wired Earphones with Mic(Active Black)",
    image: "/product_images/boat_earphones.jpg",
    description:
      "Fly into your workouts with precise tones that inspire and energize your system with its HD sound, all the time. Find a balanced audio sound set pumped through 10 mm dynamic drivers that can get real loud! Propped up by a banging bass, push your flow to higher limits. Get the sound in and sweat out with IPX 4 Water and Sweat Resistance here to elevate your game as crush those repetitions or a rigorous run. Coolly crafted midway down the cable to endorse practicality mixed with an aesthetic design that allows for communication and music playlist control. Move with unrestrained dynamic freedom via shape adaptive secure fit ear hooks made for you to lose yourself in your workouts and your music.",
    brand: "boAt",
    category: "Electronics",
    price: 449,
    countInStock: 13,
    starRating: 4.8,
    rating: 3000,
    numReviews: 0,
  },
  {
    id: 3,
    name: "Apple MacBook Air Laptop: Apple M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Space Grey",
    image: "/product_images/apple_laptop.jpg",
    description:
      "All-Day Battery Life – Go longer than ever with up to 18 hours of battery life. Powerful Performance – Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power. Superfast Memory – 8GB of unified memory makes your entire system speedy and responsive. That way it can support tasks like memory-hogging multitab browsing and opening a huge graphic file quickly and easily. Stunning Display – With a 13.3-inch/33.74 cm Retina display, images come alive with new levels of realism. Text is sharp and clear, and colors are more vibrant. Why Mac – Easy to learn. Easy to set up. Astoundingly powerful. Intuitive. Packed with apps to use right out of the box. Mac is designed to let you work, play, and create like never before.",
    brand: "Apple",
    category: "Electronics",
    price: 59990,
    countInStock: 26,
    starRating: 4.8,
    rating: 400,
    numReviews: 2,
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage)",
    image: "/product_images/samsung_smartphone.jpg",
    description: `Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 17.25cm (6.8") flat display. It's an absolute marvel of design. The legacy of Galaxy Note is alive and well. Write, tap and navigate with precision your fingers wish they had on the new, flat display. With the most megapixels on a smartphone and AI processing, Galaxy S24 Ultra sets the industry standard for image quality every time you hit the shutter. What's more, the new ProVisual engine recognizes objects — improving colour tone, reducing noise and bringing out detail. A new way to search is here with Circle to Search. While scrolling your fav social network, use your S Pen or finger to circle something and get Google Search results. Victory can be yours with the new Snapdragon 8 Gen 3 for Galaxy. Faster processing gives you the power you need for all the gameplay you want. Then, manifest graphic effects in real time with ray tracing for hyper-realistic shadows and reflections.`,
    brand: "Samsung",
    category: "Electronics",
    price: 121999,
    countInStock: 23,
    starRating: 4.5,
    rating: 200,
    numReviews: 20,
  },
  {
    id: 5,
    name: "Amazfit Active 42mm AMOLED Smart Watch, Built in GPS, 14day Battery, 5ATM Water Resistant, for iOS & Android, Accurate Readings, BT Calls, Strava Support, Temperature Sensor, VO2 Max (Midnight Black)",
    image: "/product_images/amazefit_watch.jpg",
    description: `Super-light and Stylish Design: The Amazfit Active smartwatch is like finery with a mind of a super-computer. Feel confident and ready for action, anytime and anywhere. Choose from over 100 colorful watch face options, and immerse yourself in a vivid 1.75" HD AMOLED experience.;AI-powered Training Guidance by Zepp Coach: Sometimes, the hardest part of leading an active life is just finding the time. Zepp Coach harnesses the power of AI to generate workout plans that are tailored to you. Personalize your schedule, target your training, manage your recovery and understand your progress. Bluetooth Phone Calls & Music Playback: Via Bluetooth connection to your phone, the smart watch can answer incoming calls or dial outgoing calls, control your phone's camera and music, and more. You can even store your music on the watch for phone-free playback of your favorite playlists.;Mental and Physical Readiness Analysis: Discover your daily recovery, with Readiness.Generated based on your sleep resting heart rate, sleep heart rate variability, breathing quality and temperature, your unique morning Readiness score tunes into your mental and physical condition.For a life in constant motion, master your moments of stillness. Training Templates: Create your own training templates to help you stay focused on your goal and keep track of your progress.;Sync To Your Favorite Health Apps: Through the Zepp App, you can connect and sync data to your favorite health and fitness apps like Strava, adidas Running, Apple Health, Google Fit, Relive, and komoot.; 24-hour Health Monitoring: Stay on top of your health readings. The smart watch constantly monitors your heart rate, blood-oxygen and stress levels, and provides you with alerts for abnormal readings.`,
    brand: "Amazfit",
    category: "Electronics",
    price: 5999,
    countInStock: 23,
    starRating: 3.5,
    rating: 200,
    numReviews: 20,
  },
  {
    id: 6,
    name: "Apple Watch SE (2nd Gen, 2023) [GPS 40mm] Smartwatch with Aluminum Case with Silver Sport Loop. Fitness & Sleep Tracker, Crash Detection, Heart Rate Monitor, Retina Display, Water Resistant",
    image: "/product_images/apple_watch_se.jpg",
    description: `WHY APPLE WATCH SE — All the essentials to help you be motivated and active, keep connected, track your health and stay safe. watchOS 11 brings more intelligence, personalisation and connectivity. With features like Fall Detection and enhanced workout metrics, Apple Watch SE is an incredible value. STAY CONNECTED — Send a text, take a call, listen to music and podcasts, use Siri or call for help with Emergency SOS. Apple Watch SE (GPS) works with your iPhone or Wi-Fi to keep you connected. HEALTH AND SAFETY FEATURES — Get insights into your health, including notifications if you have an irregular heart rhythm or an unusually high or low heart rate. Get help when you need it with Fall Detection, Crash Detection and Emergency SOS. Automatically notify loved ones when you arrive at your destination with Check In. SIMPLY COMPATIBLE — It works seamlessly with your Apple devices and services. Unlock your Mac automatically. Find your devices easily. SWIMPROOF AND FASHIONABLE — 50 m water resistance. Three finishes. And a colour-matched back case made with a production process that reduces its carbon emissions.`,
    brand: "Apple",
    category: "Electronics",
    price: 24900,
    countInStock: 50,
    starRating: 4.5,
    rating: 1000,
    numReviews: 450,
  },
  {
    id: 7,
    name: "Acer 80 cm (32 inches) I Pro Series HD Ready Smart LED Google TV AR32HDIGU2841AT (Black)",
    image: "/product_images/acer_tv.jpg",
    description: `Resolution: HD Ready (1366x768) | Refresh Rate: 60 Hertz | 178 Degree wide viewing angle. Connectivity: Dual band Wifi | Bluetooth 5.0 | AV, RF, Ethernet, headphone×1 | HDMI Ports 1.4 x 2 to connect personal computer, laptop, set top box, gaming console | USB 2.0x1 to connect hard drives or other USB device. Sound: 30 Watts Output | High Fidelity Speakers with Dolby Audio | 5 Sound Modes - Standard, Speech, Music, Stadium, User. Smart TV Features: Google TV with Android 14 | Content Recommendations | Dual Band WiFi | Bluetooth 5.0 | Casting option- Googlecast, Fastcast, Meeting mode | 1.5GB RAM | 16GB Storage | Watchlist | Personal Profile | Kids Profile | Google Assistant | Voice enabled Smart Remote | Hotkeys for Quick Access - Netflix, Prime Video, YouTube, Disney+Hotstar | Quad Core Processor | Screen Saver |`,
    brand: "Acer",
    category: "Electronics",
    price: 10999,
    countInStock: 15,
    starRating: 4.0,
    rating: 300,
    numReviews: 150,
  },
  {
    id: 8,
    name: "Enya NOVA Go SP1 Carbon Fiber Acoustic Electric Guitar with Smart AcousticPlus 35 Inch Travel Acustica Guitarra Starter Bundle Kit of Gig Bag, Strap, Strings, Charging/ Instrument Cable(Black)",
    image: "/product_images/enya_guitar.jpg",
    description: `The body of this Nova Go SP1 is 1/2 sized (35 in.), molded all in one piece, meaning that the bridge is a cohesive part of the top, not glued upon like traditional acoustic guitars. It would never pop off. We've also put a truss rod into the neck, giving more adjustability for the string action.`,
    brand: "Enya",
    category: "Musical Instruments",
    price: 24999,
    countInStock: 8,
    starRating: 3.0,
    rating: 40,
    numReviews: 26,
  },
  {
    id: 9,
    name: "VOOK Dual Channel Wireless-Mic with Noise Reduction for Video Recording, Support Type C Android & iPhone, Lapel Mic for YouTube, Facebook, Vlogging, Live Streaming, Instagram",
    image: "/product_images/vook_microphone.jpg",
    description: `𝗔𝗱𝘃𝗮𝗻𝗰𝗲𝗱 𝟯 𝗟𝗲𝘃𝗲𝗹 𝗡𝗼𝗶𝘀𝗲 𝗥𝗲𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗧𝗲𝗰𝗵𝗻𝗼𝗹𝗼𝗴𝘆: Featuring a DSP intelligent noise reduction chip, the VOOK wireless mic provides manual adjustable 3-level noise reduction. Enjoy professional-grade audio quality in both quiet indoor settings and noisy outdoor environments. 𝗨𝗻𝗶𝘃𝗲𝗿𝘀𝗮𝗹 𝗖𝗼𝗺𝗽𝗮𝘁𝗶𝗯𝗶𝗹𝗶𝘁𝘆 𝘄𝗶𝘁𝗵 𝗶𝗢𝗦 & 𝗔𝗻𝗱𝗿𝗼𝗶𝗱 𝗗𝗲𝘃𝗶𝗰𝗲𝘀: The VOOK wireless mic comes with a Type-C to Lightning adapter for iOS devices. It is compatible with iPhones, iPads, and Android devices with Type-C ports that support OTG function. Note: Micro USB ports are not included. 𝗢𝗺𝗻𝗶𝗱𝗶𝗿𝗲𝗰𝘁𝗶𝗼𝗻𝗮𝗹 𝗦𝗼𝘂𝗻𝗱 𝗖𝗮𝗽𝘁𝘂𝗿𝗲 & 𝗘𝗮𝘀𝘆 𝗦𝗲𝘁𝘂𝗽: The VOOK wireless lavalier microphones offer 360° sound reception with high-sensitivity microphones, ensuring every detail is captured. Simply plug the transmitter into your device for automatic pairing—no Bluetooth required.`,
    brand: "VOOK",
    category: "Musical Instruments",
    price: 12999,
    countInStock: 26,
    starRating: 3.8,
    rating: 70,
    numReviews: 45,
  },
  {
    id: 10,
    name: "LENSKART BLU | Zero Power Blue Cut Computer Glasses | Anti Glare, Lightweight & Blocks Harmful Rays | 100% UV Protected | Grey Full Rim Square | For Men and Women | Medium | LB E13529",
    image: "/product_images/lenskart_glasses.jpg",
    description: `About Blu Lens Technology: Featuring Blu Cut Lens technology which helps in protecting your eyes by blocking the harmful blue light emitted by digital devices like your smartphone and computer as well as filter the UV rays from the sun.These lenses are Anti Glare and Crack Resistant, offering UV400 protection and are hydrophobic and dust repellent. Frame Material: Featuring premium spectacles in Grey Full Rim Square from Lenskart. Made from Stainless Steel which is lightweight and offers high strength making it the ideal choice for making them the perfect pair for everyday use. Frame Size: Medium | Frame width: 136 mm | Frame Height: 41 mm | Frame Dimensions: (49-22-147)mm.`,
    brand: "LENSKART",
    category: "Health & Personal Care",
    price: 3499,
    countInStock: 44,
    starRating: 4.6,
    rating: 167,
    numReviews: 4,
  },
];
export default products;
