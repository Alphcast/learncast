
// ===== DATA =====
const EXAM_DATA = {
    JAMB: { icon: '🎓', subjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Commerce', 'Accounting', 'Literature in English', 'Government', 'CRS', 'Islamic Studies', 'Yoruba', 'Arabic'] },
    WAEC: { icon: '📘', subjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Economics', 'Commerce', 'Financial Accounting', 'Literature in English', 'Government', 'CRS', 'Civic Education', 'Computer Studies'] },
    NECO: { icon: '📗', subjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Economics', 'Commerce', 'Literature in English', 'Government', 'CRS'] },
    GCE: { icon: '📙', subjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Economics'] },
    NABTEB: { icon: '🛠️', subjects: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Economics', 'Commerce'] }
};

// ===== QUESTION BANK =====
function generateQuestions(subject) {
    const banks = {
        'Mathematics': [
            { id: 'm1', question: 'If 2x + 3 = 11, what is the value of x?', options: ['A. 2', 'B. 3', 'C. 4', 'D. 5'], answer: 'C. 4', explanation: '2x + 3 = 11 → 2x = 8 → x = 4' },
            { id: 'm2', question: 'The sum of angles in a triangle is?', options: ['A. 90°', 'B. 180°', 'C. 270°', 'D. 360°'], answer: 'B. 180°', explanation: 'The interior angles of any triangle always sum to 180 degrees.' },
            { id: 'm3', question: 'What is 15% of 200?', options: ['A. 20', 'B. 25', 'C. 30', 'D. 35'], answer: 'C. 30', explanation: '15% × 200 = 0.15 × 200 = 30' },
            { id: 'm4', question: 'Simplify: √144', options: ['A. 10', 'B. 11', 'C. 12', 'D. 13'], answer: 'C. 12', explanation: '√144 = 12 because 12 × 12 = 144' },
            { id: 'm5', question: 'If a rectangle has length 8cm and width 5cm, what is its area?', options: ['A. 13 cm²', 'B. 26 cm²', 'C. 40 cm²', 'D. 45 cm²'], answer: 'C. 40 cm²', explanation: 'Area = length × width = 8 × 5 = 40 cm²' },
            { id: 'm6', question: 'Solve: 3² + 4² = ?', options: ['A. 25', 'B. 30', 'C. 24', 'D. 49'], answer: 'A. 25', explanation: '3² = 9, 4² = 16; 9 + 16 = 25' },
            { id: 'm7', question: 'What is the LCM of 4 and 6?', options: ['A. 8', 'B. 10', 'C. 12', 'D. 24'], answer: 'C. 12', explanation: 'Multiples of 4: 4,8,12. Multiples of 6: 6,12. LCM = 12' },
            { id: 'm8', question: 'Convert 0.75 to a fraction in lowest terms', options: ['A. 1/2', 'B. 3/4', 'C. 2/3', 'D. 7/10'], answer: 'B. 3/4', explanation: '0.75 = 75/100 = 3/4 after dividing by 25' },
            { id: 'm9', question: 'A car travels at 60 km/h. How far does it travel in 2.5 hours?', options: ['A. 120 km', 'B. 140 km', 'C. 150 km', 'D. 160 km'], answer: 'C. 150 km', explanation: 'Distance = Speed × Time = 60 × 2.5 = 150 km' },
            { id: 'm10', question: 'What is the value of π (pi) approximately?', options: ['A. 3.14', 'B. 3.41', 'C. 3.16', 'D. 3.12'], answer: 'A. 3.14', explanation: 'π ≈ 3.14159... commonly approximated as 3.14' },
            { id: 'm11', question: 'If 5x = 35, then x =?', options: ['A. 5', 'B. 6', 'C. 7', 'D. 8'], answer: 'C. 7', explanation: '5x = 35 → x = 35÷5 = 7' },
            { id: 'm12', question: 'What is the perimeter of a square with side 9cm?', options: ['A. 18 cm', 'B. 27 cm', 'C. 36 cm', 'D. 81 cm'], answer: 'C. 36 cm', explanation: 'Perimeter of square = 4 × side = 4 × 9 = 36 cm' },
            { id: 'm13', question: 'Factorize: x² - 9', options: ['A. (x+3)(x-3)', 'B. (x+9)(x-1)', 'C. (x-3)²', 'D. (x+3)²'], answer: 'A. (x+3)(x-3)', explanation: 'Difference of two squares: x² - 9 = x² - 3² = (x+3)(x-3)' },
            { id: 'm14', question: 'What is the mean of 3, 7, 5, 9, 6?', options: ['A. 5', 'B. 6', 'C. 7', 'D. 8'], answer: 'B. 6', explanation: 'Mean = (3+7+5+9+6)/5 = 30/5 = 6' },
            { id: 'm15', question: 'A triangle has base 10cm and height 6cm. What is its area?', options: ['A. 25 cm²', 'B. 30 cm²', 'C. 35 cm²', 'D. 60 cm²'], answer: 'B. 30 cm²', explanation: 'Area of triangle = ½ × base × height = ½ × 10 × 6 = 30 cm²' },
            { id: 'm16', question: 'What is 2³ × 2²?', options: ['A. 2⁵', 'B. 2⁶', 'C. 4⁵', 'D. 2¹'], answer: 'A. 2⁵', explanation: 'When multiplying same base, add exponents: 2³ × 2² = 2^(3+2) = 2⁵ = 32' },
            { id: 'm17', question: 'The probability of picking a red ball from a bag with 3 red and 7 blue balls is?', options: ['A. 3/10', 'B. 7/10', 'C. 3/7', 'D. 1/3'], answer: 'A. 3/10', explanation: 'P(red) = 3/(3+7) = 3/10' },
            { id: 'm18', question: 'Find the gradient of a line passing through (0,0) and (4,8)', options: ['A. 1', 'B. 2', 'C. 3', 'D. 4'], answer: 'B. 2', explanation: 'Gradient = (y₂-y₁)/(x₂-x₁) = (8-0)/(4-0) = 8/4 = 2' },
            { id: 'm19', question: 'What is the next term in: 2, 5, 8, 11, __?', options: ['A. 13', 'B. 14', 'C. 15', 'D. 16'], answer: 'B. 14', explanation: 'The common difference is 3. So next term = 11 + 3 = 14' },
            { id: 'm20', question: 'If log₁₀ 100 = x, find x', options: ['A. 1', 'B. 2', 'C. 10', 'D. 100'], answer: 'B. 2', explanation: 'log₁₀ 100 = log₁₀ 10² = 2' },
            { id: 'm21', question: 'What is 25% of 80?', options: ['A. 15', 'B. 20', 'C. 25', 'D. 30'], answer: 'B. 20', explanation: '25% × 80 = 0.25 × 80 = 20' },
            { id: 'm22', question: 'The circumference of a circle with radius 7cm is (π = 22/7)?', options: ['A. 22 cm', 'B. 44 cm', 'C. 154 cm²', 'D. 22 cm²'], answer: 'B. 44 cm', explanation: 'C = 2πr = 2 × (22/7) × 7 = 44 cm' },
            { id: 'm23', question: 'Expand (x + 2)(x + 3)', options: ['A. x² + 5x + 6', 'B. x² + 6x + 5', 'C. x² + 5x + 5', 'D. x² + 6x + 6'], answer: 'A. x² + 5x + 6', explanation: '(x+2)(x+3) = x² + 3x + 2x + 6 = x² + 5x + 6' },
            { id: 'm24', question: 'In what ratio does the point (2, 3) divide the line from (0,0) to (4,6)?', options: ['A. 1:1', 'B. 1:2', 'C. 2:1', 'D. 3:2'], answer: 'A. 1:1', explanation: '(2,3) is exactly the midpoint of (0,0) and (4,6), so ratio = 1:1' },
            { id: 'm25', question: 'What is the HCF of 12 and 18?', options: ['A. 3', 'B. 4', 'C. 6', 'D. 9'], answer: 'C. 6', explanation: 'Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. HCF = 6' },
            { id: 'm26', question: 'Solve for y: 2y – 4 = 10', options: ['A. 5', 'B. 6', 'C. 7', 'D. 8'], answer: 'C. 7', explanation: '2y = 10 + 4 = 14 → y = 7' },
            { id: 'm27', question: 'Convert 45° to radians', options: ['A. π/6', 'B. π/4', 'C. π/3', 'D. π/2'], answer: 'B. π/4', explanation: '45° × (π/180°) = π/4 radians' },
            { id: 'm28', question: 'What type of number is √2?', options: ['A. Rational', 'B. Integer', 'C. Irrational', 'D. Complex'], answer: 'C. Irrational', explanation: '√2 cannot be expressed as a fraction; it is an irrational number ≈ 1.41421...' },
            { id: 'm29', question: 'If P = {1,2,3} and Q = {2,3,4}, what is P∩Q?', options: ['A. {1,2,3,4}', 'B. {2,3}', 'C. {1,4}', 'D. {}'], answer: 'B. {2,3}', explanation: 'Intersection contains elements common to both sets: P∩Q = {2,3}' },
            { id: 'm30', question: 'What is the value of 0! (zero factorial)?', options: ['A. 0', 'B. 1', 'C. Undefined', 'D. ∞'], answer: 'B. 1', explanation: 'By definition, 0! = 1. This is a mathematical convention.' },
        ],
        'Use of English': [
            { id: 'e1', question: 'Choose the word closest in meaning to "BENEVOLENT"', options: ['A. Wicked', 'B. Kind', 'C. Angry', 'D. Greedy'], answer: 'B. Kind', explanation: '"Benevolent" means well-meaning and kindly; a benevolent person wishes good to others.' },
            { id: 'e2', question: 'Identify the grammatical name of the underlined: "The boy who came late was punished." (Who came late)', options: ['A. Noun Clause', 'B. Relative Clause', 'C. Adverbial Clause', 'D. Noun Phrase'], answer: 'B. Relative Clause', explanation: '"Who came late" is a relative clause modifying the noun "boy."' },
            { id: 'e3', question: 'Choose the option that is opposite in meaning to "OPAQUE"', options: ['A. Dense', 'B. Solid', 'C. Transparent', 'D. Foggy'], answer: 'C. Transparent', explanation: 'Opaque means not able to be seen through; transparent is its antonym.' },
            { id: 'e4', question: 'Which of these sentences is correct?', options: ['A. He dont know', 'B. He doesn\'t know', 'C. He do not knows', 'D. He not know'], answer: 'B. He doesn\'t know', explanation: 'Third-person singular requires "doesn\'t" (does not) with the base form of the verb.' },
            { id: 'e5', question: 'The plural of "phenomenon" is:', options: ['A. Phenomenons', 'B. Phenomena', 'C. Phenomenas', 'D. Phenomenon'], answer: 'B. Phenomena', explanation: '"Phenomenon" is from Greek; its correct plural form is "phenomena."' },
            { id: 'e6', question: 'Choose the word that BEST completes: "The thief was caught _____ the act."', options: ['A. at', 'B. on', 'C. in', 'D. by'], answer: 'C. in', explanation: 'The idiom is "caught in the act" meaning caught while doing something.' },
            { id: 'e7', question: 'Which sentence uses the passive voice?', options: ['A. The dog bit the man', 'B. The man was bitten by the dog', 'C. The man bit the dog', 'D. The dog bites the man'], answer: 'B. The man was bitten by the dog', explanation: 'Passive voice: subject receives the action. "was bitten" is the passive construction.' },
            { id: 'e8', question: 'Identify the figure of speech: "The wind whispered through the trees."', options: ['A. Simile', 'B. Metaphor', 'C. Personification', 'D. Hyperbole'], answer: 'C. Personification', explanation: 'Personification gives human qualities (whispering) to non-human things (wind).' },
            { id: 'e9', question: 'Choose the correctly spelled word:', options: ['A. Accomodation', 'B. Accommodation', 'C. Acommodation', 'D. Accommodaton'], answer: 'B. Accommodation', explanation: '"Accommodation" has double c and double m: ac-com-mo-da-tion' },
            { id: 'e10', question: 'The sentence "Akin and his brother are here" uses:', options: ['A. Singular subject', 'B. Compound subject', 'C. Simple subject', 'D. Collective noun'], answer: 'B. Compound subject', explanation: 'Two subjects joined by "and" form a compound subject, requiring plural verb "are."' },
            { id: 'e11', question: 'What part of speech is "quickly" in: "She ran quickly"?', options: ['A. Adjective', 'B. Noun', 'C. Adverb', 'D. Verb'], answer: 'C. Adverb', explanation: '"Quickly" modifies the verb "ran," making it an adverb.' },
            { id: 'e12', question: 'The word "METICULOUS" means:', options: ['A. Careless', 'B. Very careful about details', 'C. Fast-moving', 'D. Extremely angry'], answer: 'B. Very careful about details', explanation: '"Meticulous" describes a person who is very careful and precise about details.' },
            { id: 'e13', question: 'Choose the best word: "The teacher gave a ____ lecture."', options: ['A. boring', 'B. bored', 'C. bore', 'D. bores'], answer: 'A. boring', explanation: '"Boring" is an adjective describing the lecture itself. "Bored" describes the feeling of the audience.' },
            { id: 'e14', question: 'Identify the tense: "By tomorrow, she will have finished the project."', options: ['A. Simple Future', 'B. Future Perfect', 'C. Present Perfect', 'D. Future Continuous'], answer: 'B. Future Perfect', explanation: '"Will have finished" is the future perfect tense, expressing completion before a future point.' },
            { id: 'e15', question: 'A word that imitates a sound is called:', options: ['A. Oxymoron', 'B. Alliteration', 'C. Onomatopoeia', 'D. Euphemism'], answer: 'C. Onomatopoeia', explanation: 'Onomatopoeia: words that phonetically imitate sounds, e.g. "buzz", "crash", "sizzle."' },
            { id: 'e16', question: 'Which option is a CONCRETE noun?', options: ['A. Freedom', 'B. Love', 'C. Chair', 'D. Happiness'], answer: 'C. Chair', explanation: 'Concrete nouns are physical objects you can touch. Freedom, Love, and Happiness are abstract.' },
            { id: 'e17', question: '"She is as fast as a cheetah." This is an example of:', options: ['A. Personification', 'B. Simile', 'C. Metaphor', 'D. Hyperbole'], answer: 'B. Simile', explanation: 'A simile makes a comparison using "as...as" or "like". Here "as fast as a cheetah" compares using "as."' },
            { id: 'e18', question: 'The word "VERBOSE" means:', options: ['A. Brief and concise', 'B. Using too many words', 'C. Speaking quietly', 'D. Highly educated'], answer: 'B. Using too many words', explanation: '"Verbose" describes speech or writing that uses more words than necessary.' },
            { id: 'e19', question: 'Choose the antonym of "INDIGENOUS":', options: ['A. Native', 'B. Local', 'C. Foreign', 'D. Domestic'], answer: 'C. Foreign', explanation: '"Indigenous" means originating from a place; its antonym is "foreign" or "alien."' },
            { id: 'e20', question: 'In the sentence "Unless you study, you will fail," the word "Unless" introduces a:', options: ['A. Time clause', 'B. Reason clause', 'C. Conditional clause', 'D. Contrast clause'], answer: 'C. Conditional clause', explanation: '"Unless" means "if not" and introduces a conditional clause expressing a condition.' },
            { id: 'e21', question: 'Which word correctly completes: "I am looking forward ___ seeing you"?', options: ['A. to', 'B. for', 'C. at', 'D. in'], answer: 'A. to', explanation: '"Look forward to" is a fixed phrasal verb. "to" is the correct preposition, followed by a gerund.' },
            { id: 'e22', question: 'The literary device in "She has a heart of gold" is:', options: ['A. Simile', 'B. Metaphor', 'C. Irony', 'D. Alliteration'], answer: 'B. Metaphor', explanation: '"Heart of gold" is a metaphor — it directly states she IS generous without using "like" or "as."' },
            { id: 'e23', question: 'Choose the correctly punctuated sentence:', options: ['A. Its raining,outside', 'B. Its raining outside.', 'C. It\'s raining outside.', 'D. Its\' raining outside.'], answer: 'C. It\'s raining outside.', explanation: '"It\'s" is the contraction of "it is". The apostrophe shows the omission of the letter "i."' },
            { id: 'e24', question: 'The word "AMBIGUOUS" means:', options: ['A. Clear and direct', 'B. Open to more than one interpretation', 'C. Impossible to achieve', 'D. Full of energy'], answer: 'B. Open to more than one interpretation', explanation: '"Ambiguous" describes something with more than one possible meaning or interpretation.' },
            { id: 'e25', question: 'Identify the mood: "If I were rich, I would travel the world."', options: ['A. Indicative', 'B. Imperative', 'C. Subjunctive', 'D. Interrogative'], answer: 'C. Subjunctive', explanation: 'The subjunctive mood expresses hypothetical or contrary-to-fact situations. "If I were" uses subjunctive.' },
            { id: 'e26', question: 'Which sentence is in the active voice?', options: ['A. The cake was eaten by him', 'B. He ate the cake', 'C. The cake has been eaten', 'D. Cake was being eaten'], answer: 'B. He ate the cake', explanation: 'Active voice: subject (He) performs the action (ate). All other options are passive constructions.' },
            { id: 'e27', question: '"A blessing in disguise" means:', options: ['A. A fake blessing', 'B. Something good that seemed bad at first', 'C. A hidden curse', 'D. A religious ceremony'], answer: 'B. Something good that seemed bad at first', explanation: 'This idiom means something that appears negative but turns out to have a positive outcome.' },
            { id: 'e28', question: 'The prefix "mis-" in "misunderstand" means:', options: ['A. Again', 'B. Before', 'C. Wrongly', 'D. Against'], answer: 'C. Wrongly', explanation: 'The prefix "mis-" means wrongly or badly: misunderstand = understand wrongly.' },
            { id: 'e29', question: 'Which is a compound sentence?', options: ['A. She sings.', 'B. She sings and he dances.', 'C. She sings because she is happy.', 'D. While singing, she danced.'], answer: 'B. She sings and he dances.', explanation: 'A compound sentence has two independent clauses joined by a coordinating conjunction (and, but, or).' },
            { id: 'e30', question: 'The word "EXORBITANT" most nearly means:', options: ['A. Very cheap', 'B. Extremely expensive', 'C. Highly educated', 'D. Very excited'], answer: 'B. Extremely expensive', explanation: '"Exorbitant" describes something (usually a price) that is unreasonably high or excessive.' },
        ],
        'Physics': [
            { id: 'p1', question: 'What is the SI unit of force?', options: ['A. Joule', 'B. Watt', 'C. Newton', 'D. Pascal'], answer: 'C. Newton', explanation: 'Force is measured in Newtons (N), named after Sir Isaac Newton. 1 N = 1 kg·m/s²' },
            { id: 'p2', question: 'Which of the following is a scalar quantity?', options: ['A. Velocity', 'B. Force', 'C. Speed', 'D. Acceleration'], answer: 'C. Speed', explanation: 'Scalar quantities have only magnitude, not direction. Speed is scalar; velocity is its vector counterpart.' },
            { id: 'p3', question: 'What is the speed of light in a vacuum?', options: ['A. 3×10⁶ m/s', 'B. 3×10⁸ m/s', 'C. 3×10¹⁰ m/s', 'D. 3×10⁴ m/s'], answer: 'B. 3×10⁸ m/s', explanation: 'The speed of light in vacuum, c ≈ 3×10⁸ m/s (exactly 299,792,458 m/s).' },
            { id: 'p4', question: 'Ohm\'s Law states that:', options: ['A. V = I/R', 'B. V = IR', 'C. I = VR', 'D. R = VI'], answer: 'B. V = IR', explanation: 'Ohm\'s Law: Voltage (V) = Current (I) × Resistance (R), assuming constant temperature.' },
            { id: 'p5', question: 'The unit of electrical resistance is:', options: ['A. Volt', 'B. Ampere', 'C. Ohm', 'D. Watt'], answer: 'C. Ohm', explanation: 'Electrical resistance is measured in Ohms (Ω), named after physicist Georg Ohm.' },
            { id: 'p6', question: 'Which law states that every action has an equal and opposite reaction?', options: ['A. Newton\'s 1st Law', 'B. Newton\'s 2nd Law', 'C. Newton\'s 3rd Law', 'D. Hooke\'s Law'], answer: 'C. Newton\'s 3rd Law', explanation: 'Newton\'s Third Law: For every action, there is an equal and opposite reaction.' },
            { id: 'p7', question: 'What type of wave is sound?', options: ['A. Transverse', 'B. Electromagnetic', 'C. Longitudinal', 'D. Surface'], answer: 'C. Longitudinal', explanation: 'Sound waves are longitudinal waves — particle vibration is parallel to the direction of wave propagation.' },
            { id: 'p8', question: 'The phenomenon of light bending as it passes from one medium to another is called:', options: ['A. Reflection', 'B. Diffraction', 'C. Refraction', 'D. Dispersion'], answer: 'C. Refraction', explanation: 'Refraction occurs when light passes between media of different optical densities, changing its speed and direction.' },
            { id: 'p9', question: 'What is the unit of power?', options: ['A. Joule', 'B. Newton', 'C. Watt', 'D. Pascal'], answer: 'C. Watt', explanation: 'Power is the rate of doing work. 1 Watt = 1 Joule per second (1 W = 1 J/s).' },
            { id: 'p10', question: 'The gravitational acceleration on Earth\'s surface is approximately:', options: ['A. 8.9 m/s²', 'B. 9.8 m/s²', 'C. 10.8 m/s²', 'D. 11 m/s²'], answer: 'B. 9.8 m/s²', explanation: 'Standard gravitational acceleration on Earth\'s surface: g ≈ 9.8 m/s² (often approximated as 10 m/s²).' },
            { id: 'p11', question: 'Which of these is NOT a form of electromagnetic radiation?', options: ['A. X-rays', 'B. Radio waves', 'C. Sound waves', 'D. Gamma rays'], answer: 'C. Sound waves', explanation: 'Sound waves require a medium to travel; they are mechanical, not electromagnetic waves.' },
            { id: 'p12', question: 'The principle that states "energy cannot be created or destroyed" is:', options: ['A. Archimedes\' Principle', 'B. Conservation of Energy', 'C. Bernoulli\'s Principle', 'D. Pascal\'s Law'], answer: 'B. Conservation of Energy', explanation: 'The Law of Conservation of Energy states that total energy in an isolated system remains constant.' },
            { id: 'p13', question: 'What is the formula for kinetic energy?', options: ['A. mgh', 'B. ½mv²', 'C. mv', 'D. F×d'], answer: 'B. ½mv²', explanation: 'Kinetic Energy = ½mv², where m is mass (kg) and v is velocity (m/s). Units are Joules.' },
            { id: 'p14', question: 'A convex lens is also called a:', options: ['A. Diverging lens', 'B. Concave lens', 'C. Converging lens', 'D. Plane lens'], answer: 'C. Converging lens', explanation: 'A convex (converging) lens focuses parallel rays to a point. A concave lens is diverging.' },
            { id: 'p15', question: 'The loudness of sound depends on its:', options: ['A. Frequency', 'B. Amplitude', 'C. Wavelength', 'D. Speed'], answer: 'B. Amplitude', explanation: 'Loudness (intensity) of sound is determined by amplitude — greater amplitude means louder sound.' },
            { id: 'p16', question: 'Which particle carries a negative charge?', options: ['A. Proton', 'B. Neutron', 'C. Electron', 'D. Positron'], answer: 'C. Electron', explanation: 'Electrons carry a negative charge (-1). Protons carry positive charge (+1). Neutrons are neutral.' },
            { id: 'p17', question: 'Pressure = Force / Area. This is best demonstrated by:', options: ['A. A rolling ball', 'B. A sharp pin pressing into wood', 'C. A floating boat', 'D. A falling leaf'], answer: 'B. A sharp pin pressing into wood', explanation: 'A sharp pin has a tiny area, creating high pressure with a small force (P = F/A).' },
            { id: 'p18', question: 'The Doppler Effect refers to:', options: ['A. Light dispersion through a prism', 'B. Change in observed frequency due to relative motion', 'C. Sound absorption', 'D. Magnetic field around a wire'], answer: 'B. Change in observed frequency due to relative motion', explanation: 'The Doppler Effect: frequency appears higher as a source approaches and lower as it moves away.' },
            { id: 'p19', question: 'Which thermometric property is used in a mercury thermometer?', options: ['A. Change in color', 'B. Change in electrical resistance', 'C. Linear expansion of liquid', 'D. Bimetallic strip'], answer: 'C. Linear expansion of liquid', explanation: 'Mercury thermometers use the fact that mercury expands linearly with temperature rise.' },
            { id: 'p20', question: 'A body is in equilibrium when the net force on it is:', options: ['A. Maximum', 'B. Zero', 'C. Minimum', 'D. Constant'], answer: 'B. Zero', explanation: 'A body is in equilibrium when the resultant (net) force and torque acting on it are both zero.' },
            { id: 'p21', question: 'The process by which heat is transferred through a solid is called:', options: ['A. Convection', 'B. Radiation', 'C. Conduction', 'D. Evaporation'], answer: 'C. Conduction', explanation: 'Conduction is heat transfer through a solid via vibration of atoms, without the material moving.' },
            { id: 'p22', question: 'What is the formula for work done?', options: ['A. W = F×t', 'B. W = F×d', 'C. W = m×a', 'D. W = P×V'], answer: 'B. W = F×d', explanation: 'Work = Force × Distance (in direction of force). Unit is Joule = Newton × metre.' },
            { id: 'p23', question: 'Which colour of light has the highest frequency?', options: ['A. Red', 'B. Orange', 'C. Green', 'D. Violet'], answer: 'D. Violet', explanation: 'In visible light, violet has the shortest wavelength and therefore the highest frequency.' },
            { id: 'p24', question: 'Nuclear fission involves:', options: ['A. Combining of light nuclei', 'B. Splitting of heavy nuclei', 'C. Emission of electrons', 'D. Absorption of photons'], answer: 'B. Splitting of heavy nuclei', explanation: 'Nuclear fission: a heavy nucleus (like uranium-235) splits into smaller nuclei releasing enormous energy.' },
            { id: 'p25', question: 'The SI unit of electric current is:', options: ['A. Volt', 'B. Ohm', 'C. Watt', 'D. Ampere'], answer: 'D. Ampere', explanation: 'Electric current is measured in Amperes (A), named after André-Marie Ampère.' },
            { id: 'p26', question: 'Which law relates pressure and volume at constant temperature?', options: ['A. Charles\' Law', 'B. Gay-Lussac\'s Law', 'C. Boyle\'s Law', 'D. Avogadro\'s Law'], answer: 'C. Boyle\'s Law', explanation: 'Boyle\'s Law: At constant temperature, pressure × volume = constant (P₁V₁ = P₂V₂).' },
            { id: 'p27', question: 'What is the frequency of mains electricity in Nigeria?', options: ['A. 50 Hz', 'B. 60 Hz', 'C. 100 Hz', 'D. 220 Hz'], answer: 'A. 50 Hz', explanation: 'Nigeria (like most of Africa and Europe) uses 50 Hz mains frequency at 220-240V.' },
            { id: 'p28', question: 'Which mirror produces a virtual, upright and diminished image?', options: ['A. Convex mirror', 'B. Concave mirror', 'C. Plane mirror', 'D. Both A and C'], answer: 'A. Convex mirror', explanation: 'Convex mirrors always produce virtual, upright, and diminished images regardless of object position.' },
            { id: 'p29', question: 'The energy stored in a stretched spring is:', options: ['A. Kinetic energy', 'B. Chemical energy', 'C. Elastic potential energy', 'D. Nuclear energy'], answer: 'C. Elastic potential energy', explanation: 'A stretched or compressed spring stores elastic potential energy: E = ½kx², where k is spring constant.' },
            { id: 'p30', question: 'If the distance between two charges is doubled, the electrostatic force:', options: ['A. Doubles', 'B. Halves', 'C. Quadruples', 'D. Reduces to one-quarter'], answer: 'D. Reduces to one-quarter', explanation: 'Coulomb\'s Law: F ∝ 1/r². Doubling distance (×2) means force ∝ 1/4 — reduces to one-quarter.' },
        ],
        'Chemistry': [
            { id: 'c1', question: 'What is the chemical symbol for Gold?', options: ['A. Go', 'B. Gd', 'C. Au', 'D. Ag'], answer: 'C. Au', explanation: 'Gold\'s symbol Au comes from the Latin word "Aurum." Silver\'s symbol Ag is from "Argentum."' },
            { id: 'c2', question: 'How many electrons can the first shell of an atom hold?', options: ['A. 2', 'B. 4', 'C. 8', 'D. 18'], answer: 'A. 2', explanation: 'The first electron shell (K shell) can hold a maximum of 2 electrons (2n² where n=1).' },
            { id: 'c3', question: 'pH 7 indicates a solution is:', options: ['A. Acidic', 'B. Neutral', 'C. Basic', 'D. Strongly acidic'], answer: 'B. Neutral', explanation: 'pH scale: 0-6 is acidic, 7 is neutral, 8-14 is basic/alkaline. Pure water has pH = 7.' },
            { id: 'c4', question: 'What is the chemical formula for water?', options: ['A. H₂O₂', 'B. HO', 'C. H₂O', 'D. OH₂'], answer: 'C. H₂O', explanation: 'Water (H₂O) consists of 2 hydrogen atoms and 1 oxygen atom covalently bonded.' },
            { id: 'c5', question: 'Which gas makes up about 78% of Earth\'s atmosphere?', options: ['A. Oxygen', 'B. Carbon dioxide', 'C. Argon', 'D. Nitrogen'], answer: 'D. Nitrogen', explanation: 'Earth\'s atmosphere: ~78% nitrogen (N₂), ~21% oxygen (O₂), ~1% argon, trace CO₂.' },
            { id: 'c6', question: 'The process of converting liquid to gas by heating is called:', options: ['A. Condensation', 'B. Vaporisation', 'C. Sublimation', 'D. Precipitation'], answer: 'B. Vaporisation', explanation: 'Vaporisation (evaporation/boiling) is the phase change from liquid to gas by heating.' },
            { id: 'c7', question: 'Atoms of the same element with different number of neutrons are called:', options: ['A. Isobars', 'B. Isotopes', 'C. Isomers', 'D. Allotropes'], answer: 'B. Isotopes', explanation: 'Isotopes: same number of protons (same element) but different numbers of neutrons. E.g., C-12, C-14.' },
            { id: 'c8', question: 'NaCl is the chemical formula for:', options: ['A. Sodium sulphate', 'B. Sodium carbonate', 'C. Sodium chloride', 'D. Sodium nitrate'], answer: 'C. Sodium chloride', explanation: 'NaCl = Sodium (Na) + Chloride (Cl). Common table salt. It dissociates into Na⁺ and Cl⁻ in solution.' },
            { id: 'c9', question: 'Which of the following is an example of a physical change?', options: ['A. Burning wood', 'B. Rusting iron', 'C. Melting ice', 'D. Cooking an egg'], answer: 'C. Melting ice', explanation: 'Physical change: no new substance formed. Melting ice is reversible (H₂O remains). Others are chemical changes.' },
            { id: 'c10', question: 'What is the atomic number of Carbon?', options: ['A. 4', 'B. 6', 'C. 8', 'D. 12'], answer: 'B. 6', explanation: 'Carbon has 6 protons (atomic number = 6). Its mass number is 12 (6 protons + 6 neutrons).' },
            { id: 'c11', question: 'An acid turns litmus paper:', options: ['A. Blue', 'B. Green', 'C. Red', 'D. Purple'], answer: 'C. Red', explanation: 'Acids turn blue litmus paper red. Bases/alkalis turn red litmus paper blue.' },
            { id: 'c12', question: 'The noble gases are found in group:', options: ['A. I', 'B. II', 'C. VII', 'D. VIII (0)'], answer: 'D. VIII (0)', explanation: 'Noble gases (He, Ne, Ar, Kr, Xe, Rn) are in Group VIII (also called Group 0 or Group 18).' },
            { id: 'c13', question: 'What type of bond is formed by sharing of electrons?', options: ['A. Ionic bond', 'B. Covalent bond', 'C. Metallic bond', 'D. Hydrogen bond'], answer: 'B. Covalent bond', explanation: 'Covalent bonds form when atoms share electron pairs. Ionic bonds involve transfer of electrons.' },
            { id: 'c14', question: 'The number of moles in 18g of water (H₂O, molar mass = 18g/mol) is:', options: ['A. 0.5', 'B. 1', 'C. 2', 'D. 18'], answer: 'B. 1', explanation: 'Moles = mass ÷ molar mass = 18g ÷ 18g/mol = 1 mole' },
            { id: 'c15', question: 'Which of these is a greenhouse gas?', options: ['A. Nitrogen', 'B. Oxygen', 'C. Carbon dioxide', 'D. Argon'], answer: 'C. Carbon dioxide', explanation: 'CO₂ is a greenhouse gas that traps heat in the atmosphere, contributing to global warming.' },
            { id: 'c16', question: 'Alloys are:', options: ['A. Pure metals', 'B. Non-metallic elements', 'C. Mixtures of metals', 'D. Chemical compounds'], answer: 'C. Mixtures of metals', explanation: 'Alloys are mixtures of two or more metals (sometimes with non-metals). E.g., Brass = Copper + Zinc.' },
            { id: 'c17', question: 'The periodic table was developed by:', options: ['A. John Dalton', 'B. Antoine Lavoisier', 'C. Dmitri Mendeleev', 'D. Robert Boyle'], answer: 'C. Dmitri Mendeleev', explanation: 'Dmitri Mendeleev arranged elements by increasing atomic mass and similar properties in 1869.' },
            { id: 'c18', question: 'What is the chemical symbol for Iron?', options: ['A. Ir', 'B. In', 'C. Fe', 'D. I'], answer: 'C. Fe', explanation: 'Iron\'s symbol Fe comes from the Latin "Ferrum." Atomic number 26, a transition metal.' },
            { id: 'c19', question: 'What happens in an exothermic reaction?', options: ['A. Heat is absorbed', 'B. Heat is released', 'C. Temperature decreases', 'D. No energy change'], answer: 'B. Heat is released', explanation: 'Exothermic reactions release heat to surroundings (temperature rises). Endothermic reactions absorb heat.' },
            { id: 'c20', question: 'Which gas is produced when zinc reacts with dilute HCl?', options: ['A. Oxygen', 'B. Chlorine', 'C. Hydrogen', 'D. Carbon dioxide'], answer: 'C. Hydrogen', explanation: 'Zn + 2HCl → ZnCl₂ + H₂↑. Metal + acid reaction produces hydrogen gas and a salt.' },
            { id: 'c21', question: 'Electrolysis involves decomposition of a substance using:', options: ['A. Heat', 'B. Light', 'C. Electricity', 'D. Pressure'], answer: 'C. Electricity', explanation: 'Electrolysis uses electrical energy to decompose an electrolyte into its constituent elements.' },
            { id: 'c22', question: 'The IUPAC name of CH₄ is:', options: ['A. Ethane', 'B. Methane', 'C. Propane', 'D. Butane'], answer: 'B. Methane', explanation: 'CH₄ = Methane (1 carbon). Ethane = C₂H₆, Propane = C₃H₈, Butane = C₄H₁₀.' },
            { id: 'c23', question: 'Rusting of iron is an example of:', options: ['A. Physical change', 'B. Oxidation', 'C. Reduction', 'D. Neutralisation'], answer: 'B. Oxidation', explanation: 'Rusting: 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃. Iron gains oxygen (oxidised) forming iron oxide (rust).' },
            { id: 'c24', question: 'A catalyst in a chemical reaction:', options: ['A. Is consumed in the reaction', 'B. Increases the activation energy', 'C. Speeds up the reaction without being consumed', 'D. Slows down the reaction'], answer: 'C. Speeds up the reaction without being consumed', explanation: 'A catalyst increases reaction rate by providing an alternative pathway with lower activation energy.' },
            { id: 'c25', question: 'The chemical formula for carbon dioxide is:', options: ['A. CO', 'B. CO₂', 'C. C₂O', 'D. C₂O₂'], answer: 'B. CO₂', explanation: 'Carbon dioxide: 1 carbon atom and 2 oxygen atoms. CO is carbon monoxide (a toxic gas).' },
            { id: 'c26', question: 'What is the formula for sulphuric acid?', options: ['A. HCl', 'B. HNO₃', 'C. H₂SO₄', 'D. H₃PO₄'], answer: 'C. H₂SO₄', explanation: 'Sulphuric acid = H₂SO₄. HCl = hydrochloric acid, HNO₃ = nitric acid, H₃PO₄ = phosphoric acid.' },
            { id: 'c27', question: 'The lightest element on the periodic table is:', options: ['A. Helium', 'B. Lithium', 'C. Hydrogen', 'D. Carbon'], answer: 'C. Hydrogen', explanation: 'Hydrogen (H) has atomic number 1 and is the lightest and most abundant element in the universe.' },
            { id: 'c28', question: 'Photosynthesis can be described as a:', options: ['A. Exothermic reaction', 'B. Reduction reaction only', 'C. Endothermic reaction', 'D. Decomposition reaction'], answer: 'C. Endothermic reaction', explanation: 'Photosynthesis absorbs light energy to convert CO₂ and H₂O into glucose — it is endothermic.' },
            { id: 'c29', question: 'Which of these is NOT a property of metals?', options: ['A. Good conductors of heat', 'B. Malleable', 'C. Brittle at room temperature', 'D. Lustrous'], answer: 'C. Brittle at room temperature', explanation: 'Metals are generally ductile and malleable, not brittle. Brittleness is a property of non-metals like carbon.' },
            { id: 'c30', question: 'The process by which a solid changes directly into gas is called:', options: ['A. Evaporation', 'B. Boiling', 'C. Sublimation', 'D. Condensation'], answer: 'C. Sublimation', explanation: 'Sublimation: direct solid → gas transition without passing through the liquid phase. E.g., dry ice (CO₂).' },
        ],
        'Biology': [
            { id: 'b1', question: 'The powerhouse of the cell is the:', options: ['A. Ribosome', 'B. Mitochondria', 'C. Nucleus', 'D. Golgi apparatus'], answer: 'B. Mitochondria', explanation: 'Mitochondria generate ATP (energy) through cellular respiration, earning the nickname "powerhouse of the cell."' },
            { id: 'b2', question: 'Photosynthesis takes place in which organelle?', options: ['A. Mitochondria', 'B. Ribosome', 'C. Chloroplast', 'D. Vacuole'], answer: 'C. Chloroplast', explanation: 'Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells.' },
            { id: 'b3', question: 'DNA stands for:', options: ['A. Deoxyribose Nucleic Acid', 'B. Deoxyribonucleic Acid', 'C. Diribonucleic Acid', 'D. Derived Nucleic Acid'], answer: 'B. Deoxyribonucleic Acid', explanation: 'DNA = Deoxyribonucleic Acid. It carries the genetic information in the cells of living organisms.' },
            { id: 'b4', question: 'Which blood type is the universal donor?', options: ['A. A', 'B. B', 'C. AB', 'D. O'], answer: 'D. O', explanation: 'Type O negative blood lacks A, B, and Rh antigens, making it compatible with all blood types.' },
            { id: 'b5', question: 'The process by which cells divide to produce two identical daughter cells is:', options: ['A. Meiosis', 'B. Mitosis', 'C. Fission', 'D. Fusion'], answer: 'B. Mitosis', explanation: 'Mitosis produces two genetically identical diploid daughter cells. Meiosis produces 4 haploid cells (for reproduction).' },
            { id: 'b6', question: 'Which organ produces insulin?', options: ['A. Liver', 'B. Kidney', 'C. Pancreas', 'D. Spleen'], answer: 'C. Pancreas', explanation: 'The pancreatic beta cells produce insulin, which regulates blood glucose levels.' },
            { id: 'b7', question: 'What is the basic unit of life?', options: ['A. Tissue', 'B. Organ', 'C. Cell', 'D. Molecule'], answer: 'C. Cell', explanation: 'The cell is the basic structural and functional unit of all living organisms (Cell Theory).' },
            { id: 'b8', question: 'Haemoglobin is found in:', options: ['A. White blood cells', 'B. Platelets', 'C. Red blood cells', 'D. Plasma'], answer: 'C. Red blood cells', explanation: 'Haemoglobin is the iron-containing protein in red blood cells that carries oxygen throughout the body.' },
            { id: 'b9', question: 'Which part of the brain controls balance and coordination?', options: ['A. Cerebrum', 'B. Cerebellum', 'C. Medulla oblongata', 'D. Hypothalamus'], answer: 'B. Cerebellum', explanation: 'The cerebellum coordinates voluntary movements, posture, balance, and spatial orientation.' },
            { id: 'b10', question: 'The scientific name for humans is:', options: ['A. Homo erectus', 'B. Homo neanderthalensis', 'C. Homo sapiens', 'D. Homo habilis'], answer: 'C. Homo sapiens', explanation: '"Homo sapiens" means "wise man" in Latin. Modern humans belong to this species.' },
            { id: 'b11', question: 'Osmosis is the movement of water from:', options: ['A. High concentration to low concentration', 'B. Low solute to high solute concentration (through semi-permeable membrane)', 'C. High temperature to low temperature', 'D. Cytoplasm to vacuole'], answer: 'B. Low solute to high solute concentration (through semi-permeable membrane)', explanation: 'Osmosis: water moves from dilute (low solute) to concentrated (high solute) solution through a semi-permeable membrane.' },
            { id: 'b12', question: 'Which vitamin is produced when skin is exposed to sunlight?', options: ['A. Vitamin A', 'B. Vitamin B12', 'C. Vitamin C', 'D. Vitamin D'], answer: 'D. Vitamin D', explanation: 'UV-B radiation from sunlight converts 7-dehydrocholesterol in skin to Vitamin D3.' },
            { id: 'b13', question: 'The longest bone in the human body is the:', options: ['A. Tibia', 'B. Fibula', 'C. Femur', 'D. Humerus'], answer: 'C. Femur', explanation: 'The femur (thigh bone) is the longest, strongest bone in the human body.' },
            { id: 'b14', question: 'Which gas do plants absorb during photosynthesis?', options: ['A. Oxygen', 'B. Nitrogen', 'C. Carbon dioxide', 'D. Hydrogen'], answer: 'C. Carbon dioxide', explanation: 'Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Plants absorb CO₂ and release O₂.' },
            { id: 'b15', question: 'The theory of evolution by natural selection was proposed by:', options: ['A. Gregor Mendel', 'B. Louis Pasteur', 'C. Charles Darwin', 'D. Robert Hooke'], answer: 'C. Charles Darwin', explanation: 'Charles Darwin published "On the Origin of Species" in 1859, introducing natural selection as the mechanism of evolution.' },
            { id: 'b16', question: 'Which of the following is NOT a function of the liver?', options: ['A. Detoxification', 'B. Bile production', 'C. Insulin production', 'D. Glycogen storage'], answer: 'C. Insulin production', explanation: 'Insulin is produced by the pancreas. The liver detoxifies, produces bile, stores glycogen, and makes plasma proteins.' },
            { id: 'b17', question: 'Aerobic respiration produces:', options: ['A. Lactic acid only', 'B. CO₂, water, and ATP', 'C. Ethanol and CO₂', 'D. ATP only'], answer: 'B. CO₂, water, and ATP', explanation: 'Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP (energy-efficient process).' },
            { id: 'b18', question: 'Which kingdom do mushrooms belong to?', options: ['A. Plantae', 'B. Animalia', 'C. Fungi', 'D. Protista'], answer: 'C. Fungi', explanation: 'Mushrooms are members of kingdom Fungi. They are heterotrophs and absorb nutrients from organic matter.' },
            { id: 'b19', question: 'The study of heredity and genes is called:', options: ['A. Ecology', 'B. Genetics', 'C. Taxonomy', 'D. Cytology'], answer: 'B. Genetics', explanation: 'Genetics is the branch of biology studying genes, heredity, and genetic variation in organisms.' },
            { id: 'b20', question: 'Which part of the plant conducts water from roots to leaves?', options: ['A. Phloem', 'B. Cambium', 'C. Epidermis', 'D. Xylem'], answer: 'D. Xylem', explanation: 'Xylem vessels transport water and minerals upward from roots. Phloem transports food (sugars) produced in leaves.' },
            { id: 'b21', question: 'The immune system\'s first line of defense includes:', options: ['A. Antibodies', 'B. T-cells', 'C. Skin and mucous membranes', 'D. B-lymphocytes'], answer: 'C. Skin and mucous membranes', explanation: 'First line of defense: physical barriers (skin, mucous membranes) that prevent pathogen entry.' },
            { id: 'b22', question: 'How many pairs of chromosomes do humans have?', options: ['A. 23', 'B. 46', 'C. 22', 'D. 44'], answer: 'A. 23', explanation: 'Humans have 46 chromosomes arranged in 23 pairs (22 autosome pairs + 1 sex chromosome pair).' },
            { id: 'b23', question: 'Which type of reproduction does not require gametes?', options: ['A. Sexual reproduction', 'B. Asexual reproduction', 'C. Fertilisation', 'D. Meiosis'], answer: 'B. Asexual reproduction', explanation: 'Asexual reproduction (budding, binary fission, fragmentation) produces offspring without fertilisation.' },
            { id: 'b24', question: 'Malaria is caused by:', options: ['A. A bacterium', 'B. A virus', 'C. A protozoan (Plasmodium)', 'D. A fungus'], answer: 'C. A protozoan (Plasmodium)', explanation: 'Malaria is caused by Plasmodium parasites transmitted through female Anopheles mosquito bites.' },
            { id: 'b25', question: 'The structural unit of the kidney is:', options: ['A. Alveolus', 'B. Nephron', 'C. Neuron', 'D. Villi'], answer: 'B. Nephron', explanation: 'The nephron is the functional unit of the kidney responsible for filtering blood and producing urine.' },
            { id: 'b26', question: 'Pollination is the transfer of pollen from:', options: ['A. Stigma to anther', 'B. Anther to stigma', 'C. Root to leaf', 'D. Stamen to sepal'], answer: 'B. Anther to stigma', explanation: 'Pollination: pollen grains transfer from the anther (male) to the stigma (female) of a flower.' },
            { id: 'b27', question: 'Which mineral is essential for strong bones and teeth?', options: ['A. Iron', 'B. Potassium', 'C. Calcium', 'D. Sodium'], answer: 'C. Calcium', explanation: 'Calcium is essential for bone mineralisation and tooth enamel formation. It also aids muscle contraction.' },
            { id: 'b28', question: 'The outer layer of the skin is called the:', options: ['A. Dermis', 'B. Hypodermis', 'C. Epidermis', 'D. Subcutaneous layer'], answer: 'C. Epidermis', explanation: 'The epidermis is the outermost skin layer. Below it is the dermis, then the hypodermis (subcutaneous tissue).' },
            { id: 'b29', question: 'Enzymes are biological:', options: ['A. Lipids', 'B. Carbohydrates', 'C. Catalysts (proteins)', 'D. Minerals'], answer: 'C. Catalysts (proteins)', explanation: 'Enzymes are protein-based biological catalysts that speed up chemical reactions in living organisms.' },
            { id: 'b30', question: 'Which organelle is responsible for protein synthesis?', options: ['A. Mitochondria', 'B. Ribosome', 'C. Nucleus', 'D. Endoplasmic reticulum'], answer: 'B. Ribosome', explanation: 'Ribosomes translate mRNA into proteins. They can be free in the cytoplasm or on the rough ER.' },
        ],
        'Economics': [
            { id: 'ec1', question: 'Economics is best defined as the study of:', options: ['A. How money is printed', 'B. How to manage a business', 'C. How scarce resources are allocated', 'D. How to invest in stocks'], answer: 'C. How scarce resources are allocated', explanation: 'Economics studies how individuals, firms, and governments allocate scarce resources to satisfy unlimited wants.' },
            { id: 'ec2', question: 'The law of demand states that:', options: ['A. Price and quantity demanded move in same direction', 'B. Higher prices lead to higher demand', 'C. As price rises, quantity demanded falls (ceteris paribus)', 'D. Demand is always constant'], answer: 'C. As price rises, quantity demanded falls (ceteris paribus)', explanation: 'Law of Demand: inverse relationship between price and quantity demanded, all other things being equal.' },
            { id: 'ec3', question: 'What does GDP stand for?', options: ['A. General Domestic Product', 'B. Gross Domestic Product', 'C. Government Development Plan', 'D. Gross Development Period'], answer: 'B. Gross Domestic Product', explanation: 'GDP (Gross Domestic Product) measures the total monetary value of all goods and services produced in a country.' },
            { id: 'ec4', question: 'Inflation means:', options: ['A. Fall in general price levels', 'B. Rise in unemployment', 'C. Sustained rise in general price levels', 'D. Increase in production'], answer: 'C. Sustained rise in general price levels', explanation: 'Inflation is a sustained increase in the average price level in an economy over time.' },
            { id: 'ec5', question: 'A monopoly exists when:', options: ['A. Many firms compete', 'B. Two firms share the market', 'C. A single firm controls the entire market', 'D. Government controls all businesses'], answer: 'C. A single firm controls the entire market', explanation: 'Monopoly: one seller dominates the market with no close substitutes, giving it price-making power.' },
            { id: 'ec6', question: 'The Central Bank of Nigeria (CBN) is responsible for:', options: ['A. Collecting taxes', 'B. Monetary policy and currency issuance', 'C. Building roads', 'D. Managing public schools'], answer: 'B. Monetary policy and currency issuance', explanation: 'The CBN formulates monetary policy, issues the naira, supervises banks, and manages foreign exchange.' },
            { id: 'ec7', question: 'Price elasticity of demand measures:', options: ['A. How much quantity demanded changes with income', 'B. How sensitive quantity demanded is to price changes', 'C. How supply responds to price', 'D. The size of a market'], answer: 'B. How sensitive quantity demanded is to price changes', explanation: 'PED = % change in quantity demanded ÷ % change in price. |PED| > 1 = elastic; < 1 = inelastic.' },
            { id: 'ec8', question: 'Which of the following is a public good?', options: ['A. A car', 'B. A loaf of bread', 'C. Street lighting', 'D. A cinema ticket'], answer: 'C. Street lighting', explanation: 'Public goods are non-excludable and non-rival: everyone can use them simultaneously. Street lighting fits.' },
            { id: 'ec9', question: 'Opportunity cost is:', options: ['A. The total cost of a product', 'B. The value of the next best alternative foregone', 'C. The cost of opportunity for everyone', 'D. A cost that has already been paid'], answer: 'B. The value of the next best alternative foregone', explanation: 'Opportunity cost: the benefit you give up by choosing one option over the next best alternative.' },
            { id: 'ec10', question: 'Stagflation combines:', options: ['A. High inflation and low unemployment', 'B. Stagnant growth with rising inflation', 'C. Deflation and recession', 'D. Growth with low inflation'], answer: 'B. Stagnant growth with rising inflation', explanation: 'Stagflation is the unusual combination of stagnant economic growth, high unemployment, and high inflation.' },
            { id: 'ec11', question: 'Supply increases when:', options: ['A. Price of the good falls', 'B. Cost of production falls', 'C. Consumer income falls', 'D. Tastes shift away from the good'], answer: 'B. Cost of production falls', explanation: 'Lower production costs allow producers to supply more at the same price, shifting supply curve right.' },
            { id: 'ec12', question: 'The Nigerian currency is called:', options: ['A. Pound', 'B. Dollar', 'C. Naira', 'D. Cedi'], answer: 'C. Naira', explanation: 'Nigeria\'s official currency is the Naira (₦), subdivided into 100 Kobo, issued by the CBN.' },
            { id: 'ec13', question: 'Which sector of the economy involves farming and mining?', options: ['A. Tertiary sector', 'B. Secondary sector', 'C. Primary sector', 'D. Quaternary sector'], answer: 'C. Primary sector', explanation: 'Primary sector: extraction of natural resources — agriculture, mining, fishing, forestry.' },
            { id: 'ec14', question: 'Perfect competition is characterised by:', options: ['A. Few sellers and unique products', 'B. Many sellers, homogenous products, free entry/exit', 'C. One seller controlling the market', 'D. Government control of prices'], answer: 'B. Many sellers, homogenous products, free entry/exit', explanation: 'Perfect competition: many small firms, identical products, perfect information, free entry/exit — firms are price-takers.' },
            { id: 'ec15', question: 'What is barter trade?', options: ['A. Trading with foreign currency', 'B. Exchange of goods for goods without money', 'C. Trade via the internet', 'D. Buying goods on credit'], answer: 'B. Exchange of goods for goods without money', explanation: 'Barter is the direct exchange of goods/services without using money as an intermediary.' },
            { id: 'ec16', question: 'Devaluation of currency means:', options: ['A. Official reduction in exchange rate value', 'B. Increase in currency value', 'C. Printing more money', 'D. Reduction of taxes'], answer: 'A. Official reduction in exchange rate value', explanation: 'Devaluation: a government-decreed reduction in a fixed exchange rate value relative to other currencies.' },
            { id: 'ec17', question: 'Which type of unemployment occurs due to changes in the economy\'s structure?', options: ['A. Frictional unemployment', 'B. Seasonal unemployment', 'C. Cyclical unemployment', 'D. Structural unemployment'], answer: 'D. Structural unemployment', explanation: 'Structural unemployment results from structural changes in the economy making certain skills obsolete (e.g., automation).' },
            { id: 'ec18', question: 'The difference between a country\'s exports and imports is called:', options: ['A. National income', 'B. Balance of trade', 'C. GDP', 'D. Budget deficit'], answer: 'B. Balance of trade', explanation: 'Balance of trade = value of exports – value of imports. Positive = trade surplus; negative = trade deficit.' },
            { id: 'ec19', question: 'Microeconomics is concerned with:', options: ['A. National income', 'B. Individual firms and consumers', 'C. Total employment in the economy', 'D. Government budgets'], answer: 'B. Individual firms and consumers', explanation: 'Microeconomics analyses individual economic agents (firms, households) and specific markets.' },
            { id: 'ec20', question: 'A budget deficit occurs when:', options: ['A. Tax revenue exceeds government spending', 'B. Imports exceed exports', 'C. Government spending exceeds revenue', 'D. Inflation exceeds 10%'], answer: 'C. Government spending exceeds revenue', explanation: 'Budget deficit: government spends more than it earns in tax revenue, often requiring borrowing.' },
            { id: 'ec21', question: 'The multiplier effect in economics refers to:', options: ['A. Multiple interest rates', 'B. How initial spending leads to larger overall economic impact', 'C. Multiplication of taxes', 'D. Effect of population growth'], answer: 'B. How initial spending leads to larger overall economic impact', explanation: 'Multiplier effect: an initial injection of spending circulates through the economy, multiplying total output.' },
            { id: 'ec22', question: 'A commercial bank\'s primary function is:', options: ['A. Setting interest rates', 'B. Printing money', 'C. Accepting deposits and giving loans', 'D. Collecting government revenue'], answer: 'C. Accepting deposits and giving loans', explanation: 'Commercial banks are financial intermediaries that accept savings deposits and provide loans to borrowers.' },
            { id: 'ec23', question: 'OPEC stands for:', options: ['A. Oil Producing and Exporting Countries', 'B. Organization of Petroleum Exporting Countries', 'C. Organisation of Petroleum and Energy Countries', 'D. Oil Processing and Exchange Centre'], answer: 'B. Organization of Petroleum Exporting Countries', explanation: 'OPEC coordinates petroleum production policies among member countries to stabilize oil markets.' },
            { id: 'ec24', question: 'VAT stands for:', options: ['A. Value Added Tax', 'B. Variable Asset Tax', 'C. Volume Asset Tax', 'D. Verified Annual Tax'], answer: 'A. Value Added Tax', explanation: 'VAT is a consumption tax levied on the value added at each stage of production/distribution.' },
            { id: 'ec25', question: 'An increase in aggregate demand will likely cause:', options: ['A. Decrease in prices', 'B. Rise in prices (inflation)', 'C. Decrease in employment', 'D. Fall in GDP'], answer: 'B. Rise in prices (inflation)', explanation: 'When aggregate demand rises faster than supply can respond, it creates demand-pull inflation.' },
            { id: 'ec26', question: 'What is comparative advantage?', options: ['A. Absolute efficiency in all goods', 'B. Ability to produce a good at lower opportunity cost', 'C. Largest economy in a region', 'D. Advantage from military strength'], answer: 'B. Ability to produce a good at lower opportunity cost', explanation: 'Comparative advantage: ability to produce a good at a lower opportunity cost than another producer.' },
            { id: 'ec27', question: 'The Naira was introduced as Nigerian currency in:', options: ['A. 1960', 'B. 1970', 'C. 1973', 'D. 1980'], answer: 'C. 1973', explanation: 'The Naira replaced the Nigerian Pound on January 1, 1973, at a rate of 1 Naira = 2 old Shillings.' },
            { id: 'ec28', question: 'Fiscal policy involves:', options: ['A. Central bank interest rate decisions', 'B. Government taxation and spending decisions', 'C. Exchange rate management', 'D. Trade tariff negotiations'], answer: 'B. Government taxation and spending decisions', explanation: 'Fiscal policy: government uses taxation and public spending to influence macroeconomic conditions.' },
            { id: 'ec29', question: 'Which curve shows the relationship between price and quantity supplied?', options: ['A. Demand curve', 'B. Indifference curve', 'C. Supply curve', 'D. Lorenz curve'], answer: 'C. Supply curve', explanation: 'The supply curve shows the positive relationship between price and quantity supplied, sloping upward.' },
            { id: 'ec30', question: 'Subsistence farming means:', options: ['A. Farming for commercial export', 'B. Farming only to feed the farm family', 'C. Large-scale mechanised farming', 'D. Government-owned farming'], answer: 'B. Farming only to feed the farm family', explanation: 'Subsistence farming: producing food primarily for the farmer\'s own consumption, with little or no surplus to sell.' },
        ],
        'Commerce': [
            { id: 'cm1', question: 'Commerce is best defined as:', options: ['A. Buying and selling only', 'B. Production of goods', 'C. All activities involved in distribution of goods and services', 'D. Manufacturing of goods'], answer: 'C. All activities involved in distribution of goods and services', explanation: 'Commerce covers trade and aids to trade such as transport, banking, insurance, and advertising.' },

            { id: 'cm2', question: 'Which of the following is a direct aid to trade?', options: ['A. Advertising', 'B. Banking', 'C. Transport', 'D. Communication'], answer: 'C. Transport', explanation: 'Transport directly helps in moving goods from producers to consumers.' },

            { id: 'cm3', question: 'Trade can be classified into:', options: ['A. Retail and wholesale', 'B. Home and foreign', 'C. Internal and external', 'D. Production and consumption'], answer: 'C. Internal and external', explanation: 'Trade is broadly divided into internal (home) and external (foreign) trade.' },

            { id: 'cm4', question: 'Which type of trade involves buying and selling within a country?', options: ['A. External trade', 'B. Foreign trade', 'C. Internal trade', 'D. Bilateral trade'], answer: 'C. Internal trade', explanation: 'Internal trade occurs within the geographical boundaries of a country.' },

            { id: 'cm5', question: 'Retail trade involves:', options: ['A. Selling in large quantities', 'B. Selling directly to final consumers', 'C. Importing goods', 'D. Manufacturing goods'], answer: 'B. Selling directly to final consumers', explanation: 'Retailers sell goods in small quantities to final users.' },

            { id: 'cm6', question: 'A wholesaler mainly sells to:', options: ['A. Consumers', 'B. Producers', 'C. Retailers', 'D. Government'], answer: 'C. Retailers', explanation: 'Wholesalers buy in bulk and sell to retailers.' },

            { id: 'cm7', question: 'Which document is issued by a seller to a buyer showing details of goods sold?', options: ['A. Receipt', 'B. Invoice', 'C. Credit note', 'D. Debit note'], answer: 'B. Invoice', explanation: 'An invoice contains details of goods sold, prices, and total amount payable.' },

            { id: 'cm8', question: 'Which of the following is NOT a function of a wholesaler?', options: ['A. Breaking bulk', 'B. Warehousing', 'C. Manufacturing goods', 'D. Financing retailers'], answer: 'C. Manufacturing goods', explanation: 'Wholesalers do not produce goods; they distribute them.' },

            { id: 'cm9', question: 'The process of promoting sales through media is called:', options: ['A. Banking', 'B. Advertising', 'C. Insurance', 'D. Transportation'], answer: 'B. Advertising', explanation: 'Advertising creates awareness and persuades consumers to buy goods.' },

            { id: 'cm10', question: 'Which form of transport is fastest?', options: ['A. Road', 'B. Rail', 'C. Water', 'D. Air'], answer: 'D. Air', explanation: 'Air transport is the fastest means of moving goods and passengers.' },

            { id: 'cm11', question: 'Insurance is best described as:', options: ['A. Saving money', 'B. Sharing of risk', 'C. Borrowing money', 'D. Investing money'], answer: 'B. Sharing of risk', explanation: 'Insurance spreads risk among many policyholders.' },

            { id: 'cm12', question: 'The document that acknowledges payment is:', options: ['A. Invoice', 'B. Receipt', 'C. Statement', 'D. Ledger'], answer: 'B. Receipt', explanation: 'A receipt is issued as proof of payment.' },

            { id: 'cm13', question: 'Which of the following is a function of banks?', options: ['A. Production', 'B. Warehousing', 'C. Accepting deposits', 'D. Advertising'], answer: 'C. Accepting deposits', explanation: 'Banks accept deposits and provide loans.' },

            { id: 'cm14', question: 'E-commerce refers to:', options: ['A. Electronic production', 'B. Buying and selling online', 'C. Trading in markets', 'D. Government trade'], answer: 'B. Buying and selling online', explanation: 'E-commerce involves conducting business transactions via the internet.' },

            { id: 'cm15', question: 'Which of the following is NOT a means of payment?', options: ['A. Cheque', 'B. Cash', 'C. Invoice', 'D. Bank transfer'], answer: 'C. Invoice', explanation: 'An invoice is a document requesting payment, not a payment method.' },

            { id: 'cm16', question: 'The term "balance of trade" refers to:', options: ['A. Total imports only', 'B. Total exports only', 'C. Difference between exports and imports', 'D. Government spending'], answer: 'C. Difference between exports and imports', explanation: 'Balance of trade = exports minus imports.' },

            { id: 'cm17', question: 'Which of the following is an example of visible trade?', options: ['A. Banking services', 'B. Tourism', 'C. Import of cars', 'D. Insurance'], answer: 'C. Import of cars', explanation: 'Visible trade involves physical goods.' },

            { id: 'cm18', question: 'The main purpose of packaging is to:', options: ['A. Increase price', 'B. Protect goods', 'C. Reduce quality', 'D. Delay sales'], answer: 'B. Protect goods', explanation: 'Packaging protects goods and makes them attractive.' },

            { id: 'cm19', question: 'A partnership business is owned by:', options: ['A. One person', 'B. Two or more persons', 'C. Government', 'D. Shareholders'], answer: 'B. Two or more persons', explanation: 'A partnership consists of 2–20 persons sharing profits and losses.' },

            { id: 'cm20', question: 'A sole proprietorship is owned by:', options: ['A. Many people', 'B. Government', 'C. One person', 'D. Shareholders'], answer: 'C. One person', explanation: 'A sole trader owns and manages the business alone.' },

            { id: 'cm21', question: 'Which document shows goods returned by buyer?', options: ['A. Debit note', 'B. Credit note', 'C. Invoice', 'D. Receipt'], answer: 'A. Debit note', explanation: 'A debit note is issued by the buyer when returning goods.' },

            { id: 'cm22', question: 'Which of the following is NOT a function of advertising?', options: ['A. Informing customers', 'B. Persuading buyers', 'C. Reducing demand', 'D. Creating awareness'], answer: 'C. Reducing demand', explanation: 'Advertising increases awareness and demand.' },

            { id: 'cm23', question: 'Communication in commerce helps to:', options: ['A. Delay information', 'B. Pass information quickly', 'C. Reduce profit', 'D. Increase cost'], answer: 'B. Pass information quickly', explanation: 'Effective communication ensures smooth business operations.' },

            { id: 'cm24', question: 'Which of the following is NOT a type of insurance?', options: ['A. Life insurance', 'B. Fire insurance', 'C. Transport insurance', 'D. Banking insurance'], answer: 'D. Banking insurance', explanation: 'Banking is not a type of insurance.' },

            { id: 'cm25', question: 'The middleman between producer and retailer is:', options: ['A. Consumer', 'B. Wholesaler', 'C. Banker', 'D. Agent'], answer: 'B. Wholesaler', explanation: 'Wholesalers connect producers and retailers.' },

            { id: 'cm26', question: 'Hire purchase allows payment:', options: ['A. Once', 'B. Before delivery', 'C. In installments', 'D. After many years'], answer: 'C. In installments', explanation: 'Hire purchase allows gradual payment while using the goods.' },

            { id: 'cm27', question: 'Which of the following is a disadvantage of sole proprietorship?', options: ['A. Easy to form', 'B. Quick decisions', 'C. Unlimited liability', 'D. Full control'], answer: 'C. Unlimited liability', explanation: 'The owner bears all losses personally.' },

            { id: 'cm28', question: 'External trade includes:', options: ['A. Retail trade', 'B. Wholesale trade', 'C. Import and export', 'D. Buying and selling locally'], answer: 'C. Import and export', explanation: 'External trade involves trade between countries.' },

            { id: 'cm29', question: 'Which of the following is an example of communication?', options: ['A. Banking', 'B. Telephone', 'C. Insurance', 'D. Warehousing'], answer: 'B. Telephone', explanation: 'Telephone is a communication tool used in commerce.' },

            { id: 'cm30', question: 'Warehousing helps to:', options: ['A. Destroy goods', 'B. Store goods until needed', 'C. Reduce production', 'D. Increase waste'], answer: 'B. Store goods until needed', explanation: 'Warehousing ensures goods are stored safely until required.' }
        ],
        'Accounting': [
            { id: 'ac1', question: 'Accounting is best defined as:', options: ['A. Recording only', 'B. The process of recording, classifying, and summarizing financial transactions', 'C. Keeping money', 'D. Auditing accounts'], answer: 'B. The process of recording, classifying, and summarizing financial transactions', explanation: 'Accounting involves identifying, recording, and communicating financial information to users.' },

            { id: 'ac2', question: 'The book of original entry is also known as:', options: ['A. Ledger', 'B. Journal', 'C. Trial balance', 'D. Cash book'], answer: 'B. Journal', explanation: 'The journal is where transactions are first recorded before posting to the ledger.' },

            { id: 'ac3', question: 'Which accounting concept assumes that a business will continue to operate indefinitely?', options: ['A. Accrual concept', 'B. Consistency concept', 'C. Going concern concept', 'D. Dual aspect concept'], answer: 'C. Going concern concept', explanation: 'The going concern concept assumes the business will not be liquidated in the foreseeable future.' },

            { id: 'ac4', question: 'The accounting equation is:', options: ['A. Assets = Liabilities', 'B. Assets = Capital - Liabilities', 'C. Assets = Liabilities + Capital', 'D. Capital = Assets + Liabilities'], answer: 'C. Assets = Liabilities + Capital', explanation: 'This is the fundamental accounting equation showing the relationship between resources and claims.' },

            { id: 'ac5', question: 'Which of the following is a liability?', options: ['A. Cash', 'B. Debtors', 'C. Creditors', 'D. Stock'], answer: 'C. Creditors', explanation: 'Creditors are amounts owed by the business and are liabilities.' },

            { id: 'ac6', question: 'A trial balance is prepared to:', options: ['A. Detect all errors', 'B. Check arithmetic accuracy of ledger accounts', 'C. Prepare invoices', 'D. Calculate profit'], answer: 'B. Check arithmetic accuracy of ledger accounts', explanation: 'Trial balance ensures total debits equal total credits.' },

            { id: 'ac7', question: 'Which of the following is a capital expenditure?', options: ['A. Purchase of goods for resale', 'B. Payment of wages', 'C. Purchase of machinery', 'D. Electricity bill'], answer: 'C. Purchase of machinery', explanation: 'Capital expenditure is spent on acquiring fixed assets for long-term use.' },

            { id: 'ac8', question: 'Depreciation is:', options: ['A. Increase in asset value', 'B. Decrease in asset value over time', 'C. Loss of cash', 'D. Increase in capital'], answer: 'B. Decrease in asset value over time', explanation: 'Depreciation allocates the cost of an asset over its useful life.' },

            { id: 'ac9', question: 'Which document is used to return goods to the supplier?', options: ['A. Invoice', 'B. Debit note', 'C. Credit note', 'D. Receipt'], answer: 'B. Debit note', explanation: 'A debit note is issued by the buyer when returning goods.' },

            { id: 'ac10', question: 'The ledger is used to:', options: ['A. Record transactions first', 'B. Classify transactions', 'C. Summarize transactions', 'D. Prepare trial balance'], answer: 'B. Classify transactions', explanation: 'The ledger groups transactions into accounts.' },

            { id: 'ac11', question: 'Which of the following is an asset?', options: ['A. Loan', 'B. Rent payable', 'C. Cash at bank', 'D. Creditors'], answer: 'C. Cash at bank', explanation: 'Cash at bank is a current asset of the business.' },

            { id: 'ac12', question: 'Double entry principle means:', options: ['A. One debit entry', 'B. One credit entry', 'C. Every transaction has debit and credit aspects', 'D. Entries are made twice'], answer: 'C. Every transaction has debit and credit aspects', explanation: 'Every transaction affects at least two accounts.' },

            { id: 'ac13', question: 'Which of the following is a nominal account?', options: ['A. Cash account', 'B. Capital account', 'C. Rent account', 'D. Debtors account'], answer: 'C. Rent account', explanation: 'Nominal accounts record expenses and incomes.' },

            { id: 'ac14', question: 'Gross profit is calculated as:', options: ['A. Sales - Expenses', 'B. Sales - Cost of sales', 'C. Profit - Expenses', 'D. Sales + Purchases'], answer: 'B. Sales - Cost of sales', explanation: 'Gross profit measures profit before deducting operating expenses.' },

            { id: 'ac15', question: 'Net profit is:', options: ['A. Sales only', 'B. Gross profit - expenses', 'C. Purchases - sales', 'D. Capital - liabilities'], answer: 'B. Gross profit - expenses', explanation: 'Net profit is the final profit after all expenses are deducted.' },

            { id: 'ac16', question: 'Which of the following is not a subsidiary book?', options: ['A. Purchases day book', 'B. Sales day book', 'C. Cash book', 'D. Ledger'], answer: 'D. Ledger', explanation: 'Ledger is not a subsidiary book but a principal book.' },

            { id: 'ac17', question: 'A bank overdraft is:', options: ['A. An asset', 'B. A liability', 'C. Capital', 'D. Income'], answer: 'B. A liability', explanation: 'It represents money owed to the bank.' },

            { id: 'ac18', question: 'Which account is debited when cash is received?', options: ['A. Cash account', 'B. Capital account', 'C. Creditor account', 'D. Expense account'], answer: 'A. Cash account', explanation: 'Cash increases, so it is debited.' },

            { id: 'ac19', question: 'Which of the following errors can be detected by a trial balance?', options: ['A. Error of omission', 'B. Error of principle', 'C. Arithmetical error', 'D. Compensating error'], answer: 'C. Arithmetical error', explanation: 'Trial balance detects errors in addition or balancing.' },

            { id: 'ac20', question: 'The cash book records:', options: ['A. Only credit transactions', 'B. Only debit transactions', 'C. Cash and bank transactions', 'D. Assets only'], answer: 'C. Cash and bank transactions', explanation: 'Cash book records all cash and bank dealings.' },

            { id: 'ac21', question: 'Drawings refer to:', options: ['A. Owner investment', 'B. Owner withdrawal for personal use', 'C. Business expenses', 'D. Sales revenue'], answer: 'B. Owner withdrawal for personal use', explanation: 'Drawings reduce the capital of the owner.' },

            { id: 'ac22', question: 'Which of the following is an expense?', options: ['A. Sales', 'B. Commission received', 'C. Wages', 'D. Capital'], answer: 'C. Wages', explanation: 'Wages are costs incurred in running the business.' },

            { id: 'ac23', question: 'Which statement shows the financial position of a business?', options: ['A. Trading account', 'B. Profit and loss account', 'C. Balance sheet', 'D. Cash book'], answer: 'C. Balance sheet', explanation: 'Balance sheet shows assets, liabilities, and capital.' },

            { id: 'ac24', question: 'Prepaid expenses are:', options: ['A. Expenses paid in advance', 'B. Expenses not paid', 'C. Income received', 'D. Capital expenses'], answer: 'A. Expenses paid in advance', explanation: 'These are payments made before the period they relate to.' },

            { id: 'ac25', question: 'Accrued expenses are:', options: ['A. Paid expenses', 'B. Expenses not yet paid', 'C. Income received', 'D. Assets'], answer: 'B. Expenses not yet paid', explanation: 'Accrued expenses are outstanding obligations.' },

            { id: 'ac26', question: 'Which of the following is a current asset?', options: ['A. Building', 'B. Machinery', 'C. Stock', 'D. Land'], answer: 'C. Stock', explanation: 'Stock (inventory) is expected to be used or sold within a year.' },

            { id: 'ac27', question: 'Bad debts are:', options: ['A. Profits', 'B. Losses from customers who fail to pay', 'C. Capital', 'D. Assets'], answer: 'B. Losses from customers who fail to pay', explanation: 'Bad debts reduce profit as they are irrecoverable.' },

            { id: 'ac28', question: 'Which account is credited when goods are sold for cash?', options: ['A. Sales account', 'B. Cash account', 'C. Purchases account', 'D. Debtors account'], answer: 'A. Sales account', explanation: 'Sales increase revenue, so sales account is credited.' },

            { id: 'ac29', question: 'The matching concept states that:', options: ['A. Revenue equals profit', 'B. Expenses should match revenue in the same period', 'C. Assets equal liabilities', 'D. Cash equals profit'], answer: 'B. Expenses should match revenue in the same period', explanation: 'Matching ensures accurate profit calculation.' },

            { id: 'ac30', question: 'Capital is best defined as:', options: ['A. Money spent', 'B. Owner’s investment in the business', 'C. Business expenses', 'D. Sales revenue'], answer: 'B. Owner’s investment in the business', explanation: 'Capital represents the owner’s equity in the business.' }
        ],
        'Literature in English': [
            { id: 'lt1', question: 'Literature is best defined as:', options: ['A. Scientific writing', 'B. Written works of artistic expression', 'C. Business communication', 'D. Historical records only'], answer: 'B. Written works of artistic expression', explanation: 'Literature involves creative writing such as prose, poetry, and drama that expresses human experiences.' },

            { id: 'lt2', question: 'Which of the following is NOT a genre of literature?', options: ['A. Prose', 'B. Drama', 'C. Poetry', 'D. Mathematics'], answer: 'D. Mathematics', explanation: 'The three major genres of literature are prose, drama, and poetry.' },

            { id: 'lt3', question: 'A narrative that teaches a moral lesson is called:', options: ['A. Myth', 'B. Fable', 'C. Epic', 'D. Ballad'], answer: 'B. Fable', explanation: 'Fables are short stories, often with animals as characters, that teach moral lessons.' },

            { id: 'lt4', question: 'The main character in a literary work is known as:', options: ['A. Antagonist', 'B. Narrator', 'C. Protagonist', 'D. Chorus'], answer: 'C. Protagonist', explanation: 'The protagonist is the central character around whom the story revolves.' },

            { id: 'lt5', question: 'A character that opposes the protagonist is called:', options: ['A. Hero', 'B. Villain', 'C. Antagonist', 'D. Narrator'], answer: 'C. Antagonist', explanation: 'The antagonist creates conflict for the protagonist.' },

            { id: 'lt6', question: 'Drama is best described as:', options: ['A. Written to be read silently', 'B. Written to be performed on stage', 'C. Only poetry', 'D. A form of essay'], answer: 'B. Written to be performed on stage', explanation: 'Drama is meant for performance and involves dialogue and action.' },

            { id: 'lt7', question: 'A tragedy is a play that:', options: ['A. Ends happily', 'B. Focuses on humor', 'C. Ends in suffering or death', 'D. Is written in prose'], answer: 'C. Ends in suffering or death', explanation: 'Tragedies often involve the downfall of the protagonist.' },

            { id: 'lt8', question: 'Comedy is a type of drama that:', options: ['A. Ends in sadness', 'B. Focuses on tragic events', 'C. Aims to entertain and provoke laughter', 'D. Has no characters'], answer: 'C. Aims to entertain and provoke laughter', explanation: 'Comedy deals with humorous situations and usually ends happily.' },

            { id: 'lt9', question: 'Prose is:', options: ['A. Writing in verse', 'B. Ordinary written or spoken language', 'C. Only poetry', 'D. Dramatic dialogue'], answer: 'B. Ordinary written or spoken language', explanation: 'Prose includes novels, short stories, and essays written in normal sentence form.' },

            { id: 'lt10', question: 'Poetry is characterized by:', options: ['A. Use of figures of speech and rhythm', 'B. Only narration', 'C. Lack of structure', 'D. No emotions'], answer: 'A. Use of figures of speech and rhythm', explanation: 'Poetry uses imagery, rhythm, and figurative language.' },

            { id: 'lt11', question: 'A stanza in poetry is:', options: ['A. A line', 'B. A paragraph', 'C. A group of lines forming a unit', 'D. A word'], answer: 'C. A group of lines forming a unit', explanation: 'A stanza is like a paragraph in poetry.' },

            { id: 'lt12', question: 'The repetition of consonant sounds is called:', options: ['A. Assonance', 'B. Alliteration', 'C. Rhyme', 'D. Rhythm'], answer: 'B. Alliteration', explanation: 'Alliteration is the repetition of initial consonant sounds.' },

            { id: 'lt13', question: 'The repetition of vowel sounds is known as:', options: ['A. Assonance', 'B. Alliteration', 'C. Irony', 'D. Metaphor'], answer: 'A. Assonance', explanation: 'Assonance is repetition of vowel sounds in nearby words.' },

            { id: 'lt14', question: 'A comparison using “like” or “as” is called:', options: ['A. Metaphor', 'B. Simile', 'C. Personification', 'D. Irony'], answer: 'B. Simile', explanation: 'Simile compares two things using “like” or “as”.' },

            { id: 'lt15', question: 'A metaphor is:', options: ['A. Direct comparison without using like or as', 'B. Repetition of sounds', 'C. A type of rhyme', 'D. A stanza'], answer: 'A. Direct comparison without using like or as', explanation: 'Metaphor states one thing is another for emphasis.' },

            { id: 'lt16', question: 'Personification is:', options: ['A. Giving human qualities to non-living things', 'B. Comparing two objects', 'C. Repetition of words', 'D. Exaggeration'], answer: 'A. Giving human qualities to non-living things', explanation: 'Example: “The wind whispered.”' },

            { id: 'lt17', question: 'Hyperbole is:', options: ['A. Understatement', 'B. Exaggeration for emphasis', 'C. Comparison', 'D. Irony'], answer: 'B. Exaggeration for emphasis', explanation: 'Hyperbole is used to create strong effect.' },

            { id: 'lt18', question: 'Irony occurs when:', options: ['A. Words mean exactly what they say', 'B. The opposite of what is expected happens', 'C. There is repetition', 'D. There is comparison'], answer: 'B. The opposite of what is expected happens', explanation: 'Irony involves contrast between expectation and reality.' },

            { id: 'lt19', question: 'A plot is:', options: ['A. The setting of a story', 'B. The sequence of events in a story', 'C. The theme', 'D. The characters'], answer: 'B. The sequence of events in a story', explanation: 'Plot is how the story unfolds from beginning to end.' },

            { id: 'lt20', question: 'Setting refers to:', options: ['A. Characters only', 'B. Time and place of a story', 'C. Theme', 'D. Conflict'], answer: 'B. Time and place of a story', explanation: 'Setting includes location and time period.' },

            { id: 'lt21', question: 'Theme is:', options: ['A. The main idea of a work', 'B. The title', 'C. The setting', 'D. The author'], answer: 'A. The main idea of a work', explanation: 'Theme is the central message or lesson.' },

            { id: 'lt22', question: 'Conflict in literature means:', options: ['A. Agreement', 'B. Struggle between opposing forces', 'C. Happiness', 'D. Setting'], answer: 'B. Struggle between opposing forces', explanation: 'Conflict drives the plot of a story.' },

            { id: 'lt23', question: 'A narrator who knows everything is:', options: ['A. First-person narrator', 'B. Omniscient narrator', 'C. Limited narrator', 'D. Second-person narrator'], answer: 'B. Omniscient narrator', explanation: 'Omniscient narrator knows all characters’ thoughts.' },

            { id: 'lt24', question: 'A play written by William Shakespeare is:', options: ['A. Things Fall Apart', 'B. Hamlet', 'C. The Gods Are Not to Blame', 'D. Second Class Citizen'], answer: 'B. Hamlet', explanation: 'Hamlet is one of Shakespeare’s famous tragedies.' },

            { id: 'lt25', question: 'Who wrote "Things Fall Apart"?', options: ['A. Wole Soyinka', 'B. Chinua Achebe', 'C. Ola Rotimi', 'D. Ngugi wa Thiong’o'], answer: 'B. Chinua Achebe', explanation: 'Chinua Achebe is a renowned Nigerian author.' },

            { id: 'lt26', question: 'A tragic hero is a character who:', options: ['A. Always wins', 'B. Has a tragic flaw leading to downfall', 'C. Is perfect', 'D. Is not important'], answer: 'B. Has a tragic flaw leading to downfall', explanation: 'Tragic heroes possess hamartia (fatal flaw).' },

            { id: 'lt27', question: 'The emotional release felt by the audience in tragedy is called:', options: ['A. Catharsis', 'B. Irony', 'C. Plot', 'D. Theme'], answer: 'A. Catharsis', explanation: 'Catharsis is the purification of emotions.' },

            { id: 'lt28', question: 'A ballad is:', options: ['A. A short story', 'B. A dramatic play', 'C. A poem that tells a story', 'D. An essay'], answer: 'C. A poem that tells a story', explanation: 'Ballads often tell stories in simple language.' },

            { id: 'lt29', question: 'An epic is:', options: ['A. A short poem', 'B. A long narrative poem about heroic deeds', 'C. A play', 'D. A song'], answer: 'B. A long narrative poem about heroic deeds', explanation: 'Epics focus on great heroes and adventures.' },

            { id: 'lt30', question: 'Foreshadowing is:', options: ['A. Flashback', 'B. Hint of future events', 'C. Theme', 'D. Plot ending'], answer: 'B. Hint of future events', explanation: 'Foreshadowing gives clues about what will happen later.' }
        ],
        'Government': [
            { id: 'gv1', question: 'Government is best defined as:', options: ['A. A group of soldiers', 'B. The machinery for making and enforcing laws', 'C. Only the president', 'D. Political parties'], answer: 'B. The machinery for making and enforcing laws', explanation: 'Government refers to institutions and processes through which a state is governed.' },

            { id: 'gv2', question: 'A state must have the following except:', options: ['A. Population', 'B. Territory', 'C. Government', 'D. Religion'], answer: 'D. Religion', explanation: 'The four elements of a state are population, territory, government, and sovereignty.' },

            { id: 'gv3', question: 'Sovereignty means:', options: ['A. Power to vote', 'B. Supreme authority of a state', 'C. Military rule', 'D. Political party'], answer: 'B. Supreme authority of a state', explanation: 'Sovereignty is the ultimate power of a state over its affairs.' },

            { id: 'gv4', question: 'Democracy is a system of government in which:', options: ['A. Military rules', 'B. Power belongs to the people', 'C. One person rules', 'D. Only elites vote'], answer: 'B. Power belongs to the people', explanation: 'Democracy allows citizens to participate in governance directly or through representatives.' },

            { id: 'gv5', question: 'Which form of government is ruled by a king or queen?', options: ['A. Democracy', 'B. Republic', 'C. Monarchy', 'D. Oligarchy'], answer: 'C. Monarchy', explanation: 'Monarchy is a system where a king or queen is the head of state.' },

            { id: 'gv6', question: 'The doctrine of separation of powers was propounded by:', options: ['A. Karl Marx', 'B. John Locke', 'C. Montesquieu', 'D. Aristotle'], answer: 'C. Montesquieu', explanation: 'Montesquieu advocated dividing powers among the executive, legislature, and judiciary.' },

            { id: 'gv7', question: 'The legislature is responsible for:', options: ['A. Executing laws', 'B. Interpreting laws', 'C. Making laws', 'D. Enforcing laws'], answer: 'C. Making laws', explanation: 'The legislature makes laws for the state.' },

            { id: 'gv8', question: 'The executive arm of government is responsible for:', options: ['A. Making laws', 'B. Implementing laws', 'C. Interpreting laws', 'D. Amending constitution'], answer: 'B. Implementing laws', explanation: 'The executive carries out and enforces laws.' },

            { id: 'gv9', question: 'The judiciary is responsible for:', options: ['A. Making laws', 'B. Executing laws', 'C. Interpreting laws', 'D. Creating policies'], answer: 'C. Interpreting laws', explanation: 'The judiciary interprets laws and settles disputes.' },

            { id: 'gv10', question: 'A constitution is:', options: ['A. Set of religious laws', 'B. Body of rules guiding a state', 'C. Military decree', 'D. Party manifesto'], answer: 'B. Body of rules guiding a state', explanation: 'A constitution outlines the structure and functions of government.' },

            { id: 'gv11', question: 'Which type of constitution is written and codified?', options: ['A. Flexible constitution', 'B. Unwritten constitution', 'C. Rigid constitution', 'D. Federal constitution'], answer: 'C. Rigid constitution', explanation: 'Rigid constitutions are written and difficult to amend.' },

            { id: 'gv12', question: 'Rule of law means:', options: ['A. Rule by the army', 'B. Law applies equally to all', 'C. Government controls courts', 'D. Only leaders obey laws'], answer: 'B. Law applies equally to all', explanation: 'Rule of law ensures equality before the law.' },

            { id: 'gv13', question: 'A federal system of government is one in which:', options: ['A. Power is centralized', 'B. Power is shared between central and state governments', 'C. Only one government exists', 'D. Military rules'], answer: 'B. Power is shared between central and state governments', explanation: 'Federalism divides powers between levels of government.' },

            { id: 'gv14', question: 'Nigeria operates a:', options: ['A. Unitary system', 'B. Federal system', 'C. Confederal system', 'D. Military system'], answer: 'B. Federal system', explanation: 'Nigeria practices federalism with powers shared among levels.' },

            { id: 'gv15', question: 'The head of state in Nigeria is the:', options: ['A. Governor', 'B. Chief Justice', 'C. President', 'D. Speaker'], answer: 'C. President', explanation: 'The President is both head of state and government.' },

            { id: 'gv16', question: 'The Nigerian legislature is called:', options: ['A. Parliament', 'B. Congress', 'C. National Assembly', 'D. Senate only'], answer: 'C. National Assembly', explanation: 'It consists of the Senate and House of Representatives.' },

            { id: 'gv17', question: 'The upper chamber of the National Assembly is:', options: ['A. House of Commons', 'B. Senate', 'C. House of Assembly', 'D. Cabinet'], answer: 'B. Senate', explanation: 'The Senate is the upper legislative chamber.' },

            { id: 'gv18', question: 'Political parties are formed to:', options: ['A. Promote military rule', 'B. Contest elections and form government', 'C. Enforce laws', 'D. Interpret constitution'], answer: 'B. Contest elections and form government', explanation: 'Parties seek political power through elections.' },

            { id: 'gv19', question: 'An election is:', options: ['A. Appointment', 'B. Process of choosing leaders by voting', 'C. Military takeover', 'D. Court judgment'], answer: 'B. Process of choosing leaders by voting', explanation: 'Elections enable citizens to select their leaders.' },

            { id: 'gv20', question: 'Universal adult suffrage means:', options: ['A. Only men vote', 'B. Only elites vote', 'C. All adults have the right to vote', 'D. Only politicians vote'], answer: 'C. All adults have the right to vote', explanation: 'It allows all eligible adults to vote regardless of status.' },

            { id: 'gv21', question: 'Pressure groups aim to:', options: ['A. Form government', 'B. Influence government policies', 'C. Rule the country', 'D. Conduct elections'], answer: 'B. Influence government policies', explanation: 'Pressure groups advocate for specific interests.' },

            { id: 'gv22', question: 'Which of the following is an example of a pressure group?', options: ['A. Political party', 'B. Trade union', 'C. Judiciary', 'D. Executive'], answer: 'B. Trade union', explanation: 'Trade unions represent workers’ interests.' },

            { id: 'gv23', question: 'Local government is responsible for:', options: ['A. Foreign policy', 'B. Defense', 'C. Grassroots administration', 'D. National budgeting'], answer: 'C. Grassroots administration', explanation: 'Local governments handle local affairs and development.' },

            { id: 'gv24', question: 'The United Nations (UN) was established in:', options: ['A. 1914', 'B. 1945', 'C. 1960', 'D. 1975'], answer: 'B. 1945', explanation: 'The UN was formed after World War II to promote peace.' },

            { id: 'gv25', question: 'Nigeria became independent in:', options: ['A. 1957', 'B. 1960', 'C. 1963', 'D. 1979'], answer: 'B. 1960', explanation: 'Nigeria gained independence on October 1, 1960.' },

            { id: 'gv26', question: 'The first military coup in Nigeria occurred in:', options: ['A. 1960', 'B. 1963', 'C. 1966', 'D. 1975'], answer: 'C. 1966', explanation: 'The first coup in Nigeria took place in January 1966.' },

            { id: 'gv27', question: 'The principle of checks and balances ensures:', options: ['A. One arm dominates', 'B. No arm of government becomes too powerful', 'C. Only judiciary works', 'D. Military control'], answer: 'B. No arm of government becomes too powerful', explanation: 'Each arm can check the powers of others.' },

            { id: 'gv28', question: 'Public opinion refers to:', options: ['A. Government decisions', 'B. Views of the majority of people', 'C. Military views', 'D. Judicial rulings'], answer: 'B. Views of the majority of people', explanation: 'Public opinion influences policy and governance.' },

            { id: 'gv29', question: 'Diplomacy is:', options: ['A. Military action', 'B. Management of international relations', 'C. Internal politics', 'D. Economic policy'], answer: 'B. Management of international relations', explanation: 'Diplomacy involves negotiation between countries.' },

            { id: 'gv30', question: 'ECOWAS stands for:', options: ['A. Economic Community of West African States', 'B. European Council of West African States', 'C. Economic Council of World African States', 'D. External Community of West African States'], answer: 'A. Economic Community of West African States', explanation: 'ECOWAS promotes economic integration among West African countries.' }
        ],
        'Islamic Studies': [
            { id: 'is1', question: 'Islam means:', options: ['A. Peace and submission to Allah', 'B. War', 'C. Freedom only', 'D. Religion of Arabs'], answer: 'A. Peace and submission to Allah', explanation: 'Islam means total submission to the will of Allah and attaining peace.' },

            { id: 'is2', question: 'The holy book of Islam is:', options: ['A. Bible', 'B. Torah', 'C. Qur’an', 'D. Psalms'], answer: 'C. Qur’an', explanation: 'The Qur’an is the final revelation from Allah to Prophet Muhammad (SAW).' },

            { id: 'is3', question: 'The first revelation to Prophet Muhammad (SAW) was in:', options: ['A. Madinah', 'B. Makkah', 'C. Taif', 'D. Jerusalem'], answer: 'B. Makkah', explanation: 'The first revelation occurred in the cave of Hira in Makkah.' },

            { id: 'is4', question: 'The Angel who delivered revelation to the Prophet was:', options: ['A. Mikail', 'B. Israfil', 'C. Jibril', 'D. Malik'], answer: 'C. Jibril', explanation: 'Angel Jibril (Gabriel) was responsible for conveying Allah’s message.' },

            { id: 'is5', question: 'The five pillars of Islam include all except:', options: ['A. Shahadah', 'B. Salat', 'C. Zakat', 'D. Jihad'], answer: 'D. Jihad', explanation: 'The five pillars are Shahadah, Salat, Zakat, Sawm, and Hajj.' },

            { id: 'is6', question: 'Shahadah means:', options: ['A. Prayer', 'B. Fasting', 'C. Declaration of faith', 'D. Charity'], answer: 'C. Declaration of faith', explanation: 'Shahadah is the testimony that there is no god but Allah and Muhammad is His messenger.' },

            { id: 'is7', question: 'Muslims pray how many times daily?', options: ['A. 3', 'B. 4', 'C. 5', 'D. 6'], answer: 'C. 5', explanation: 'The five daily prayers are Fajr, Dhuhr, Asr, Maghrib, and Isha.' },

            { id: 'is8', question: 'Zakat is:', options: ['A. Fasting', 'B. Charity given to the poor', 'C. Pilgrimage', 'D. Prayer'], answer: 'B. Charity given to the poor', explanation: 'Zakat is a compulsory charity to help the needy.' },

            { id: 'is9', question: 'Fasting in Islam is observed during:', options: ['A. Shawwal', 'B. Muharram', 'C. Ramadan', 'D. Rajab'], answer: 'C. Ramadan', explanation: 'Muslims fast during the month of Ramadan.' },

            { id: 'is10', question: 'Hajj is performed in:', options: ['A. Madinah', 'B. Jerusalem', 'C. Makkah', 'D. Cairo'], answer: 'C. Makkah', explanation: 'Hajj is the pilgrimage to Makkah.' },

            { id: 'is11', question: 'Tawhid refers to:', options: ['A. Unity of Allah', 'B. Prayer', 'C. Fasting', 'D. Charity'], answer: 'A. Unity of Allah', explanation: 'Tawhid is the belief in the oneness of Allah.' },

            { id: 'is12', question: 'The migration of the Prophet from Makkah to Madinah is called:', options: ['A. Hijrah', 'B. Jihad', 'C. Da’wah', 'D. Sunnah'], answer: 'A. Hijrah', explanation: 'Hijrah marks the beginning of the Islamic calendar.' },

            { id: 'is13', question: 'The first mosque built in Islam is:', options: ['A. Kaabah', 'B. Masjid Quba', 'C. Masjid Nabawi', 'D. Al-Aqsa'], answer: 'B. Masjid Quba', explanation: 'Masjid Quba was the first mosque established by the Prophet.' },

            { id: 'is14', question: 'Hadith refers to:', options: ['A. Qur’an verses', 'B. Sayings and actions of the Prophet', 'C. Islamic law', 'D. Mosque'], answer: 'B. Sayings and actions of the Prophet', explanation: 'Hadith records the teachings and practices of Prophet Muhammad (SAW).' },

            { id: 'is15', question: 'Sunnah means:', options: ['A. Obligatory acts', 'B. Traditions of the Prophet', 'C. Charity', 'D. Fasting'], answer: 'B. Traditions of the Prophet', explanation: 'Sunnah includes the Prophet’s practices and lifestyle.' },

            { id: 'is16', question: 'The Kaabah is located in:', options: ['A. Madinah', 'B. Makkah', 'C. Taif', 'D. Egypt'], answer: 'B. Makkah', explanation: 'The Kaabah is the sacred house of Allah in Makkah.' },

            { id: 'is17', question: 'Which of the following is NOT a revealed book?', options: ['A. Qur’an', 'B. Torah', 'C. Bible', 'D. Hadith'], answer: 'D. Hadith', explanation: 'Hadith is not a revealed book but sayings of the Prophet.' },

            { id: 'is18', question: 'The night journey of the Prophet is called:', options: ['A. Hijrah', 'B. Isra and Mi’raj', 'C. Jihad', 'D. Da’wah'], answer: 'B. Isra and Mi’raj', explanation: 'It refers to the miraculous journey from Makkah to Jerusalem and to the heavens.' },

            { id: 'is19', question: 'Which Prophet built the Kaabah?', options: ['A. Musa', 'B. Isa', 'C. Ibrahim', 'D. Nuh'], answer: 'C. Ibrahim', explanation: 'Prophet Ibrahim (AS) and his son Ismail built the Kaabah.' },

            { id: 'is20', question: 'The Qur’an was revealed over a period of:', options: ['A. 10 years', 'B. 15 years', 'C. 23 years', 'D. 30 years'], answer: 'C. 23 years', explanation: 'Revelation occurred gradually over 23 years.' },

            { id: 'is21', question: 'Shirk means:', options: ['A. Belief in Allah', 'B. Associating partners with Allah', 'C. Prayer', 'D. Charity'], answer: 'B. Associating partners with Allah', explanation: 'Shirk is the gravest sin in Islam.' },

            { id: 'is22', question: 'Halal means:', options: ['A. Forbidden', 'B. Allowed', 'C. Disliked', 'D. Punishable'], answer: 'B. Allowed', explanation: 'Halal refers to what is permissible in Islam.' },

            { id: 'is23', question: 'Haram means:', options: ['A. Allowed', 'B. Recommended', 'C. Forbidden', 'D. Neutral'], answer: 'C. Forbidden', explanation: 'Haram refers to what is prohibited in Islam.' },

            { id: 'is24', question: 'Which of the following is a moral teaching of Islam?', options: ['A. Dishonesty', 'B. Justice', 'C. Oppression', 'D. Greed'], answer: 'B. Justice', explanation: 'Islam emphasizes justice, honesty, and fairness.' },

            { id: 'is25', question: 'The Islamic law is known as:', options: ['A. Sunnah', 'B. Shariah', 'C. Hadith', 'D. Fiqh'], answer: 'B. Shariah', explanation: 'Shariah is the comprehensive Islamic legal system.' },

            { id: 'is26', question: 'Fiqh refers to:', options: ['A. Islamic jurisprudence', 'B. Qur’an', 'C. Hadith', 'D. Mosque'], answer: 'A. Islamic jurisprudence', explanation: 'Fiqh is the understanding and application of Islamic law.' },

            { id: 'is27', question: 'Which battle was the first fought by Muslims?', options: ['A. Uhud', 'B. Badr', 'C. Khandaq', 'D. Hunayn'], answer: 'B. Badr', explanation: 'The Battle of Badr was the first major battle in Islam.' },

            { id: 'is28', question: 'The companions of the Prophet are called:', options: ['A. Ansar', 'B. Muhajirun', 'C. Sahabah', 'D. Tabi’un'], answer: 'C. Sahabah', explanation: 'Sahabah were the companions who met and followed the Prophet.' },

            { id: 'is29', question: 'The Qur’an is divided into how many chapters?', options: ['A. 100', 'B. 114', 'C. 120', 'D. 99'], answer: 'B. 114', explanation: 'The Qur’an contains 114 Surahs (chapters).' },

            { id: 'is30', question: 'The term “Ummah” refers to:', options: ['A. Mosque', 'B. Community of Muslims', 'C. Prayer', 'D. Charity'], answer: 'B. Community of Muslims', explanation: 'Ummah refers to the global Muslim community.' }
        ],
        'CRS': [
            { id: 'cr1', question: 'CRS stands for:', options: ['A. Christian Religious Studies', 'B. Catholic Religious Service', 'C. Christian Reform Society', 'D. Church Religious System'], answer: 'A. Christian Religious Studies', explanation: 'CRS focuses on the study of the Bible and Christian teachings.' },

            { id: 'cr2', question: 'The Bible is divided into:', options: ['A. Two parts', 'B. Three parts', 'C. Four parts', 'D. Five parts'], answer: 'A. Two parts', explanation: 'The Bible consists of the Old Testament and New Testament.' },

            { id: 'cr3', question: 'The first book of the Bible is:', options: ['A. Exodus', 'B. Genesis', 'C. Matthew', 'D. Psalms'], answer: 'B. Genesis', explanation: 'Genesis is the first book and describes creation.' },

            { id: 'cr4', question: 'Who led the Israelites out of Egypt?', options: ['A. Abraham', 'B. Moses', 'C. David', 'D. Joshua'], answer: 'B. Moses', explanation: 'Moses led the Israelites during the Exodus.' },

            { id: 'cr5', question: 'The Ten Commandments were given on Mount:', options: ['A. Zion', 'B. Sinai', 'C. Carmel', 'D. Olives'], answer: 'B. Sinai', explanation: 'God gave the commandments to Moses on Mount Sinai.' },

            { id: 'cr6', question: 'The father of faith in the Bible is:', options: ['A. Isaac', 'B. Abraham', 'C. Jacob', 'D. Joseph'], answer: 'B. Abraham', explanation: 'Abraham is regarded as the father of faith.' },

            { id: 'cr7', question: 'Who was sold into slavery by his brothers?', options: ['A. David', 'B. Joseph', 'C. Samuel', 'D. Elijah'], answer: 'B. Joseph', explanation: 'Joseph was sold by his brothers but later became powerful in Egypt.' },

            { id: 'cr8', question: 'The longest book in the Bible is:', options: ['A. Isaiah', 'B. Psalms', 'C. Proverbs', 'D. Jeremiah'], answer: 'B. Psalms', explanation: 'Psalms contains the most chapters in the Bible.' },

            { id: 'cr9', question: 'Who was known as a man after God’s own heart?', options: ['A. Saul', 'B. Solomon', 'C. David', 'D. Samuel'], answer: 'C. David', explanation: 'David was described this way because of his devotion to God.' },

            { id: 'cr10', question: 'Jesus was born in:', options: ['A. Jerusalem', 'B. Nazareth', 'C. Bethlehem', 'D. Galilee'], answer: 'C. Bethlehem', explanation: 'Jesus was born in Bethlehem according to the Gospels.' },

            { id: 'cr11', question: 'The mother of Jesus is:', options: ['A. Elizabeth', 'B. Mary', 'C. Martha', 'D. Ruth'], answer: 'B. Mary', explanation: 'Mary was chosen to give birth to Jesus.' },

            { id: 'cr12', question: 'Jesus was baptized by:', options: ['A. Peter', 'B. John the Baptist', 'C. Paul', 'D. James'], answer: 'B. John the Baptist', explanation: 'John baptized Jesus in the River Jordan.' },

            { id: 'cr13', question: 'The first miracle of Jesus was:', options: ['A. Healing the blind', 'B. Feeding 5000', 'C. Turning water into wine', 'D. Walking on water'], answer: 'C. Turning water into wine', explanation: 'This miracle took place at the wedding in Cana.' },

            { id: 'cr14', question: 'The Sermon on the Mount is found in:', options: ['A. Matthew', 'B. Mark', 'C. Luke', 'D. John'], answer: 'A. Matthew', explanation: 'It is recorded in Matthew chapters 5–7.' },

            { id: 'cr15', question: 'Who betrayed Jesus?', options: ['A. Peter', 'B. Judas Iscariot', 'C. Thomas', 'D. Andrew'], answer: 'B. Judas Iscariot', explanation: 'Judas betrayed Jesus for thirty pieces of silver.' },

            { id: 'cr16', question: 'Jesus was crucified at:', options: ['A. Bethlehem', 'B. Nazareth', 'C. Golgotha', 'D. Jericho'], answer: 'C. Golgotha', explanation: 'Golgotha is the place of crucifixion.' },

            { id: 'cr17', question: 'The resurrection of Jesus happened after:', options: ['A. One day', 'B. Two days', 'C. Three days', 'D. Seven days'], answer: 'C. Three days', explanation: 'Jesus rose from the dead on the third day.' },

            { id: 'cr18', question: 'The Holy Spirit came upon the apostles on:', options: ['A. Christmas', 'B. Easter', 'C. Pentecost', 'D. Good Friday'], answer: 'C. Pentecost', explanation: 'Pentecost marks the coming of the Holy Spirit.' },

            { id: 'cr19', question: 'Paul was formerly known as:', options: ['A. Peter', 'B. Saul', 'C. Silas', 'D. Stephen'], answer: 'B. Saul', explanation: 'Paul was originally called Saul before his conversion.' },

            { id: 'cr20', question: 'Love your neighbor as yourself is a teaching of:', options: ['A. Moses', 'B. David', 'C. Jesus', 'D. Paul'], answer: 'C. Jesus', explanation: 'This is one of the greatest commandments taught by Jesus.' },

            { id: 'cr21', question: 'The parable of the Good Samaritan teaches:', options: ['A. Hatred', 'B. Kindness and compassion', 'C. Wealth', 'D. Power'], answer: 'B. Kindness and compassion', explanation: 'It emphasizes helping others regardless of differences.' },

            { id: 'cr22', question: 'The New Testament has how many books?', options: ['A. 27', 'B. 39', 'C. 66', 'D. 12'], answer: 'A. 27', explanation: 'The New Testament consists of 27 books.' },

            { id: 'cr23', question: 'The Old Testament has how many books?', options: ['A. 27', 'B. 39', 'C. 66', 'D. 12'], answer: 'B. 39', explanation: 'The Old Testament contains 39 books.' },

            { id: 'cr24', question: 'Who built the ark?', options: ['A. Abraham', 'B. Moses', 'C. Noah', 'D. Jacob'], answer: 'C. Noah', explanation: 'Noah built the ark to survive the flood.' },

            { id: 'cr25', question: 'The fruit of the Spirit includes:', options: ['A. Anger', 'B. Love', 'C. Hatred', 'D. Pride'], answer: 'B. Love', explanation: 'Love is one of the fruits of the Spirit.' },

            { id: 'cr26', question: 'Which disciple doubted Jesus’ resurrection?', options: ['A. Peter', 'B. John', 'C. Thomas', 'D. James'], answer: 'C. Thomas', explanation: 'Thomas doubted until he saw Jesus.' },

            { id: 'cr27', question: 'The Great Commission was given by Jesus to:', options: ['A. Pharisees', 'B. Apostles', 'C. Romans', 'D. Priests'], answer: 'B. Apostles', explanation: 'Jesus commanded his disciples to preach the gospel.' },

            { id: 'cr28', question: 'Who interpreted dreams in Egypt?', options: ['A. Moses', 'B. Joseph', 'C. Daniel', 'D. Elijah'], answer: 'B. Joseph', explanation: 'Joseph interpreted Pharaoh’s dreams.' },

            { id: 'cr29', question: 'The book of Revelation was written by:', options: ['A. Paul', 'B. Peter', 'C. John', 'D. James'], answer: 'C. John', explanation: 'John wrote Revelation while on the island of Patmos.' },

            { id: 'cr30', question: 'Faith is best defined as:', options: ['A. Seeing before believing', 'B. Believing without seeing', 'C. Doubting always', 'D. Ignoring truth'], answer: 'B. Believing without seeing', explanation: 'Faith involves trust and belief in God without physical evidence.' }
        ],
        'CRS': [
            { id: 'cr1', question: 'CRS stands for:', options: ['A. Christian Religious Studies', 'B. Catholic Religious Service', 'C. Christian Reform Society', 'D. Church Religious System'], answer: 'A. Christian Religious Studies', explanation: 'CRS focuses on the study of the Bible and Christian teachings.' },

            { id: 'cr2', question: 'The Bible is divided into:', options: ['A. Two parts', 'B. Three parts', 'C. Four parts', 'D. Five parts'], answer: 'A. Two parts', explanation: 'The Bible consists of the Old Testament and New Testament.' },

            { id: 'cr3', question: 'The first book of the Bible is:', options: ['A. Exodus', 'B. Genesis', 'C. Matthew', 'D. Psalms'], answer: 'B. Genesis', explanation: 'Genesis is the first book and describes creation.' },

            { id: 'cr4', question: 'Who led the Israelites out of Egypt?', options: ['A. Abraham', 'B. Moses', 'C. David', 'D. Joshua'], answer: 'B. Moses', explanation: 'Moses led the Israelites during the Exodus.' },

            { id: 'cr5', question: 'The Ten Commandments were given on Mount:', options: ['A. Zion', 'B. Sinai', 'C. Carmel', 'D. Olives'], answer: 'B. Sinai', explanation: 'God gave the commandments to Moses on Mount Sinai.' },

            { id: 'cr6', question: 'The father of faith in the Bible is:', options: ['A. Isaac', 'B. Abraham', 'C. Jacob', 'D. Joseph'], answer: 'B. Abraham', explanation: 'Abraham is regarded as the father of faith.' },

            { id: 'cr7', question: 'Who was sold into slavery by his brothers?', options: ['A. David', 'B. Joseph', 'C. Samuel', 'D. Elijah'], answer: 'B. Joseph', explanation: 'Joseph was sold by his brothers but later became powerful in Egypt.' },

            { id: 'cr8', question: 'The longest book in the Bible is:', options: ['A. Isaiah', 'B. Psalms', 'C. Proverbs', 'D. Jeremiah'], answer: 'B. Psalms', explanation: 'Psalms contains the most chapters in the Bible.' },

            { id: 'cr9', question: 'Who was known as a man after God’s own heart?', options: ['A. Saul', 'B. Solomon', 'C. David', 'D. Samuel'], answer: 'C. David', explanation: 'David was described this way because of his devotion to God.' },

            { id: 'cr10', question: 'Jesus was born in:', options: ['A. Jerusalem', 'B. Nazareth', 'C. Bethlehem', 'D. Galilee'], answer: 'C. Bethlehem', explanation: 'Jesus was born in Bethlehem according to the Gospels.' },

            { id: 'cr11', question: 'The mother of Jesus is:', options: ['A. Elizabeth', 'B. Mary', 'C. Martha', 'D. Ruth'], answer: 'B. Mary', explanation: 'Mary was chosen to give birth to Jesus.' },

            { id: 'cr12', question: 'Jesus was baptized by:', options: ['A. Peter', 'B. John the Baptist', 'C. Paul', 'D. James'], answer: 'B. John the Baptist', explanation: 'John baptized Jesus in the River Jordan.' },

            { id: 'cr13', question: 'The first miracle of Jesus was:', options: ['A. Healing the blind', 'B. Feeding 5000', 'C. Turning water into wine', 'D. Walking on water'], answer: 'C. Turning water into wine', explanation: 'This miracle took place at the wedding in Cana.' },

            { id: 'cr14', question: 'The Sermon on the Mount is found in:', options: ['A. Matthew', 'B. Mark', 'C. Luke', 'D. John'], answer: 'A. Matthew', explanation: 'It is recorded in Matthew chapters 5–7.' },

            { id: 'cr15', question: 'Who betrayed Jesus?', options: ['A. Peter', 'B. Judas Iscariot', 'C. Thomas', 'D. Andrew'], answer: 'B. Judas Iscariot', explanation: 'Judas betrayed Jesus for thirty pieces of silver.' },

            { id: 'cr16', question: 'Jesus was crucified at:', options: ['A. Bethlehem', 'B. Nazareth', 'C. Golgotha', 'D. Jericho'], answer: 'C. Golgotha', explanation: 'Golgotha is the place of crucifixion.' },

            { id: 'cr17', question: 'The resurrection of Jesus happened after:', options: ['A. One day', 'B. Two days', 'C. Three days', 'D. Seven days'], answer: 'C. Three days', explanation: 'Jesus rose from the dead on the third day.' },

            { id: 'cr18', question: 'The Holy Spirit came upon the apostles on:', options: ['A. Christmas', 'B. Easter', 'C. Pentecost', 'D. Good Friday'], answer: 'C. Pentecost', explanation: 'Pentecost marks the coming of the Holy Spirit.' },

            { id: 'cr19', question: 'Paul was formerly known as:', options: ['A. Peter', 'B. Saul', 'C. Silas', 'D. Stephen'], answer: 'B. Saul', explanation: 'Paul was originally called Saul before his conversion.' },

            { id: 'cr20', question: 'Love your neighbor as yourself is a teaching of:', options: ['A. Moses', 'B. David', 'C. Jesus', 'D. Paul'], answer: 'C. Jesus', explanation: 'This is one of the greatest commandments taught by Jesus.' },

            { id: 'cr21', question: 'The parable of the Good Samaritan teaches:', options: ['A. Hatred', 'B. Kindness and compassion', 'C. Wealth', 'D. Power'], answer: 'B. Kindness and compassion', explanation: 'It emphasizes helping others regardless of differences.' },

            { id: 'cr22', question: 'The New Testament has how many books?', options: ['A. 27', 'B. 39', 'C. 66', 'D. 12'], answer: 'A. 27', explanation: 'The New Testament consists of 27 books.' },

            { id: 'cr23', question: 'The Old Testament has how many books?', options: ['A. 27', 'B. 39', 'C. 66', 'D. 12'], answer: 'B. 39', explanation: 'The Old Testament contains 39 books.' },

            { id: 'cr24', question: 'Who built the ark?', options: ['A. Abraham', 'B. Moses', 'C. Noah', 'D. Jacob'], answer: 'C. Noah', explanation: 'Noah built the ark to survive the flood.' },

            { id: 'cr25', question: 'The fruit of the Spirit includes:', options: ['A. Anger', 'B. Love', 'C. Hatred', 'D. Pride'], answer: 'B. Love', explanation: 'Love is one of the fruits of the Spirit.' },

            { id: 'cr26', question: 'Which disciple doubted Jesus’ resurrection?', options: ['A. Peter', 'B. John', 'C. Thomas', 'D. James'], answer: 'C. Thomas', explanation: 'Thomas doubted until he saw Jesus.' },

            { id: 'cr27', question: 'The Great Commission was given by Jesus to:', options: ['A. Pharisees', 'B. Apostles', 'C. Romans', 'D. Priests'], answer: 'B. Apostles', explanation: 'Jesus commanded his disciples to preach the gospel.' },

            { id: 'cr28', question: 'Who interpreted dreams in Egypt?', options: ['A. Moses', 'B. Joseph', 'C. Daniel', 'D. Elijah'], answer: 'B. Joseph', explanation: 'Joseph interpreted Pharaoh’s dreams.' },

            { id: 'cr29', question: 'The book of Revelation was written by:', options: ['A. Paul', 'B. Peter', 'C. John', 'D. James'], answer: 'C. John', explanation: 'John wrote Revelation while on the island of Patmos.' },

            { id: 'cr30', question: 'Faith is best defined as:', options: ['A. Seeing before believing', 'B. Believing without seeing', 'C. Doubting always', 'D. Ignoring truth'], answer: 'B. Believing without seeing', explanation: 'Faith involves trust and belief in God without physical evidence.' }
        ],
        'Yoruba': [
            { id: 'yr1', question: 'Èdè Yorùbá jẹ́:', options: ['A. Èdè ìbílẹ̀ kan', 'B. Èdè òyìnbó', 'C. Èdè ará Amẹ́ríkà', 'D. Èdè Asia'], answer: 'A. Èdè ìbílẹ̀ kan', explanation: 'Yorùbá jẹ́ èdè abinibi tí àwọn ènìyàn Yorùbá ń sọ.' },

            { id: 'yr2', question: '“Ọmọ rere” túmọ̀ sí:', options: ['A. Ọmọ búburú', 'B. Ọmọ tí ó ní ìwà rere', 'C. Ọmọ aláìgbọràn', 'D. Ọmọ aláìlera'], answer: 'B. Ọmọ tí ó ní ìwà rere', explanation: 'Ọmọ rere ni ọmọ tí ó ní ìwà pẹ̀lú ìgbọràn.' },

            { id: 'yr3', question: 'Ẹ̀ka èdè Yorùbá méjì ni:', options: ['A. Àlùfáà àti ọba', 'B. Ìsọ̀rọ̀ àti ìkọ̀wé', 'C. Òkè àti ìsàlẹ̀', 'D. Ilú àti abúlé'], answer: 'B. Ìsọ̀rọ̀ àti ìkọ̀wé', explanation: 'Èdè Yorùbá ní ìsọ̀rọ̀ (spoken) àti ìkọ̀wé (written).' },

            { id: 'yr4', question: 'Òwe jẹ́:', options: ['A. Àrọ̀ọ̀rọ̀', 'B. Ọ̀rọ̀ àgbéléwò', 'C. Ọ̀rọ̀ ìkíni', 'D. Ọ̀rọ̀ ìkànìyàn'], answer: 'B. Ọ̀rọ̀ àgbéléwò', explanation: 'Òwe jẹ́ ọ̀rọ̀ tí ó jinlẹ̀ tí a fi ń kọ́ni ní ẹ̀kọ́.' },

            { id: 'yr5', question: '“À kì í fi ọwọ́ kan ọmọ kí a fi ẹsẹ̀ lé e” túmọ̀ sí:', options: ['A. Máa jẹ ọmọ', 'B. Má ṣe fi ọmọ ṣe ẹlẹ́yà', 'C. Máa kọ́ ọmọ', 'D. Máa pa ọmọ'], answer: 'B. Má ṣe fi ọmọ ṣe ẹlẹ́yà', explanation: 'Òwe yìí kọ́ni pé kí a má ṣe fi ènìyàn ṣe ẹlẹ́yà.' },

            { id: 'yr6', question: 'Ọ̀rọ̀ ìṣe ni:', options: ['A. Orúkọ', 'B. Ìṣe tí a ń ṣe', 'C. Àpèjúwe', 'D. Ọ̀rọ̀ àkójọpọ̀'], answer: 'B. Ìṣe tí a ń ṣe', explanation: 'Ọ̀rọ̀ ìṣe (verb) fi hàn ohun tí a ń ṣe.' },

            { id: 'yr7', question: 'Àpèjúwe ni:', options: ['A. Ọ̀rọ̀ ìṣe', 'B. Ọ̀rọ̀ orúkọ', 'C. Ọ̀rọ̀ tí ń ṣàlàyé orúkọ', 'D. Ọ̀rọ̀ ìbáṣepọ̀'], answer: 'C. Ọ̀rọ̀ tí ń ṣàlàyé orúkọ', explanation: 'Àpèjúwe (adjective) ń ṣàlàyé orúkọ.' },

            { id: 'yr8', question: '“Ilé” jẹ́ àpẹẹrẹ:', options: ['A. Ọ̀rọ̀ ìṣe', 'B. Ọ̀rọ̀ orúkọ', 'C. Àpèjúwe', 'D. Òwe'], answer: 'B. Ọ̀rọ̀ orúkọ', explanation: '“Ilé” jẹ́ orúkọ nkan.' },

            { id: 'yr9', question: 'Ìkíni owurọ̀ ni:', options: ['A. Ẹ káàsán', 'B. Ẹ kú alẹ́', 'C. Ẹ káàrọ̀', 'D. Ẹ kú ìrọ̀lẹ́'], answer: 'C. Ẹ káàrọ̀', explanation: 'A máa ń lo “Ẹ káàrọ̀” ní owurọ̀.' },

            { id: 'yr10', question: '“Mo ń lọ sí ilé-iwe” túmọ̀ sí:', options: ['A. I am eating', 'B. I am going to school', 'C. I am sleeping', 'D. I am reading'], answer: 'B. I am going to school', explanation: 'Ìtumọ̀ Gẹ̀ẹ́sì ni pé ẹni náà ń lọ sí ilé-ẹ̀kọ́.' },

            { id: 'yr11', question: 'Ẹ̀dá èdè Yorùbá ni:', options: ['A. Vowel only', 'B. Consonant only', 'C. Vowel àti consonant', 'D. Number'], answer: 'C. Vowel àti consonant', explanation: 'Èdè Yorùbá ní fawẹli àti kọ́ńsónántì.' },

            { id: 'yr12', question: '“Ọlọ́run” túmọ̀ sí:', options: ['A. Man', 'B. God', 'C. House', 'D. Food'], answer: 'B. God', explanation: 'Ọlọ́run ni Ẹlẹ́dàá gbogbo ayé.' },

            { id: 'yr13', question: '“Omi” túmọ̀ sí:', options: ['A. Water', 'B. Food', 'C. Fire', 'D. Air'], answer: 'A. Water', explanation: 'Omi ni a máa ń mu.' },

            { id: 'yr14', question: 'Àṣà jẹ́:', options: ['A. Ọ̀rọ̀ ìṣe', 'B. Ìgbàgbọ́ àti ìṣe àwọn ènìyàn', 'C. Ilé', 'D. Oúnjẹ'], answer: 'B. Ìgbàgbọ́ àti ìṣe àwọn ènìyàn', explanation: 'Àṣà ni ìṣe àti ìgbàgbọ́ tí ìran kan ní.' },

            { id: 'yr15', question: '“Ọ̀rẹ́” túmọ̀ sí:', options: ['A. Enemy', 'B. Friend', 'C. Food', 'D. Work'], answer: 'B. Friend', explanation: 'Ọ̀rẹ́ ni ẹni tí o ní ìbáṣepọ̀ pẹ̀lú rẹ.' },

            { id: 'yr16', question: 'Orúkọ ni:', options: ['A. Action word', 'B. Naming word', 'C. Describing word', 'D. Linking word'], answer: 'B. Naming word', explanation: 'Orúkọ ni a fi ń pe ènìyàn, ibi tàbí nkan.' },

            { id: 'yr17', question: '“Ọjọ́” túmọ̀ sí:', options: ['A. Night', 'B. Day', 'C. Year', 'D. Time'], answer: 'B. Day', explanation: 'Ọjọ́ túmọ̀ sí ọjọ́ kan.' },

            { id: 'yr18', question: '“Ọkàn” túmọ̀ sí:', options: ['A. Two', 'B. One', 'C. Three', 'D. Four'], answer: 'B. One', explanation: 'Ọkàn jẹ́ nọ́mbà kan.' },

            { id: 'yr19', question: '“Ìwé” túmọ̀ sí:', options: ['A. Book', 'B. Pen', 'C. Bag', 'D. Table'], answer: 'A. Book', explanation: 'Ìwé ni a fi kọ́ ẹ̀kọ́.' },

            { id: 'yr20', question: '“Ẹja” túmọ̀ sí:', options: ['A. Meat', 'B. Fish', 'C. Rice', 'D. Soup'], answer: 'B. Fish', explanation: 'Ẹja jẹ́ ẹranko omi.' },

            { id: 'yr21', question: '“Àkúnya” túmọ̀ sí:', options: ['A. Boy', 'B. Girl', 'C. Man', 'D. Woman'], answer: 'D. Woman', explanation: 'Àkúnya túmọ̀ sí obìnrin.' },

            { id: 'yr22', question: '“Ọmọkùnrin” túmọ̀ sí:', options: ['A. Girl', 'B. Boy', 'C. Woman', 'D. Child'], answer: 'B. Boy', explanation: 'Ọmọkùnrin ni ọmọ ọkùnrin.' },

            { id: 'yr23', question: '“Ọmọbìnrin” túmọ̀ sí:', options: ['A. Girl', 'B. Boy', 'C. Man', 'D. Friend'], answer: 'A. Girl', explanation: 'Ọmọbìnrin ni ọmọ obìnrin.' },

            { id: 'yr24', question: '“Ilé-ẹ̀kọ́” túmọ̀ sí:', options: ['A. Market', 'B. School', 'C. House', 'D. Office'], answer: 'B. School', explanation: 'Ilé-ẹ̀kọ́ ni ibi tí a ti kọ́ ẹ̀kọ́.' },

            { id: 'yr25', question: '“Ọjà” túmọ̀ sí:', options: ['A. Market', 'B. Food', 'C. Road', 'D. House'], answer: 'A. Market', explanation: 'Ọjà ni ibi tí a ti ń rà àti tà.' },

            { id: 'yr26', question: '“Ọ̀nà” túmọ̀ sí:', options: ['A. House', 'B. Road', 'C. Food', 'D. Water'], answer: 'B. Road', explanation: 'Ọ̀nà ni a fi ń rìn.' },

            { id: 'yr27', question: '“Ọ̀run” túmọ̀ sí:', options: ['A. Earth', 'B. Sky', 'C. Water', 'D. Fire'], answer: 'B. Sky', explanation: 'Ọ̀run ni ibi tí awọ̀sanma wà.' },

            { id: 'yr28', question: '“Àgbọn” túmọ̀ sí:', options: ['A. Coconut', 'B. Orange', 'C. Banana', 'D. Apple'], answer: 'A. Coconut', explanation: 'Àgbọn jẹ́ eso.' },

            { id: 'yr29', question: '“Àdúrà” túmọ̀ sí:', options: ['A. Food', 'B. Prayer', 'C. Work', 'D. Play'], answer: 'B. Prayer', explanation: 'Àdúrà ni a fi ń bá Ọlọ́run sọ̀rọ̀.' },

            { id: 'yr30', question: '“Ọgbọ́n” túmọ̀ sí:', options: ['A. Foolishness', 'B. Wisdom', 'C. Strength', 'D. Weakness'], answer: 'B. Wisdom', explanation: 'Ọgbọ́n túmọ̀ sí ìmọ̀ àti ọgbọ́n inú.' }
        ],
        'Arabic': [
            { id: 'ar1', question: 'ما معنى كلمة "كتاب"؟', options: ['A. Pen', 'B. Book', 'C. Table', 'D. Chair'], answer: 'B. Book', explanation: 'كلمة "كتاب" تعني book في اللغة الإنجليزية.' },

            { id: 'ar2', question: 'ما معنى "مدرسة"؟', options: ['A. Market', 'B. School', 'C. House', 'D. Road'], answer: 'B. School', explanation: 'مدرسة تعني school.' },

            { id: 'ar3', question: 'ما هو جمع "كتاب"؟', options: ['A. كتب', 'B. كتابات', 'C. كتبة', 'D. كتيب'], answer: 'A. كتب', explanation: 'جمع كتاب هو كتب.' },

            { id: 'ar4', question: 'ما معنى "قلم"؟', options: ['A. Book', 'B. Pen', 'C. Bag', 'D. Paper'], answer: 'B. Pen', explanation: 'قلم يعني pen.' },

            { id: 'ar5', question: 'اختر الضمير الصحيح: ___ ذهبتُ إلى المدرسة.', options: ['A. أنا', 'B. هو', 'C. هي', 'D. نحن'], answer: 'A. أنا', explanation: 'أنا يدل على المتكلم المفرد.' },

            { id: 'ar6', question: 'ما معنى "بيت"؟', options: ['A. Car', 'B. House', 'C. Tree', 'D. River'], answer: 'B. House', explanation: 'بيت تعني house.' },

            { id: 'ar7', question: 'ما جمع "طالب"؟', options: ['A. طلاب', 'B. طالبات', 'C. طلبة', 'D. كلاهما A و C'], answer: 'D. كلاهما A و C', explanation: 'جمع طالب يمكن أن يكون طلاب أو طلبة.' },

            { id: 'ar8', question: 'ما معنى "ماء"؟', options: ['A. Fire', 'B. Water', 'C. Air', 'D. Food'], answer: 'B. Water', explanation: 'ماء تعني water.' },

            { id: 'ar9', question: 'ما معنى "طعام"؟', options: ['A. Food', 'B. Drink', 'C. House', 'D. Book'], answer: 'A. Food', explanation: 'طعام تعني food.' },

            { id: 'ar10', question: 'اختر الفعل في الجملة: "ذهب الطالب إلى المدرسة"', options: ['A. الطالب', 'B. ذهب', 'C. المدرسة', 'D. إلى'], answer: 'B. ذهب', explanation: 'ذهب هو الفعل (verb) في الجملة.' },

            { id: 'ar11', question: 'ما معنى "معلم"؟', options: ['A. Student', 'B. Teacher', 'C. Doctor', 'D. Driver'], answer: 'B. Teacher', explanation: 'معلم تعني teacher.' },

            { id: 'ar12', question: 'ما معنى "طويل"؟', options: ['A. Short', 'B. Tall/Long', 'C. Big', 'D. Small'], answer: 'B. Tall/Long', explanation: 'طويل تعني long or tall.' },

            { id: 'ar13', question: 'ما معنى "قصير"؟', options: ['A. Tall', 'B. Short', 'C. Big', 'D. Wide'], answer: 'B. Short', explanation: 'قصير تعني short.' },

            { id: 'ar14', question: 'ما معنى "جميل"؟', options: ['A. Ugly', 'B. Beautiful', 'C. Tall', 'D. Weak'], answer: 'B. Beautiful', explanation: 'جميل تعني beautiful.' },

            { id: 'ar15', question: 'ما معنى "رجل"؟', options: ['A. Woman', 'B. Man', 'C. Child', 'D. Boy'], answer: 'B. Man', explanation: 'رجل تعني man.' },

            { id: 'ar16', question: 'ما معنى "امرأة"؟', options: ['A. Man', 'B. Woman', 'C. Boy', 'D. Girl'], answer: 'B. Woman', explanation: 'امرأة تعني woman.' },

            { id: 'ar17', question: 'ما معنى "يكتب"؟', options: ['A. He writes', 'B. He reads', 'C. He runs', 'D. He eats'], answer: 'A. He writes', explanation: 'يكتب يعني he writes.' },

            { id: 'ar18', question: 'ما معنى "يقرأ"؟', options: ['A. He writes', 'B. He reads', 'C. He sleeps', 'D. He walks'], answer: 'B. He reads', explanation: 'يقرأ تعني he reads.' },

            { id: 'ar19', question: 'ما معنى "يأكل"؟', options: ['A. He drinks', 'B. He eats', 'C. He runs', 'D. He sits'], answer: 'B. He eats', explanation: 'يأكل تعني he eats.' },

            { id: 'ar20', question: 'ما معنى "يشرب"؟', options: ['A. He eats', 'B. He drinks', 'C. He sleeps', 'D. He walks'], answer: 'B. He drinks', explanation: 'يشرب تعني he drinks.' },

            { id: 'ar21', question: 'ما معنى "باب"؟', options: ['A. Window', 'B. Door', 'C. Roof', 'D. Wall'], answer: 'B. Door', explanation: 'باب تعني door.' },

            { id: 'ar22', question: 'ما معنى "نافذة"؟', options: ['A. Door', 'B. Window', 'C. Table', 'D. Chair'], answer: 'B. Window', explanation: 'نافذة تعني window.' },

            { id: 'ar23', question: 'ما معنى "سيارة"؟', options: ['A. Bus', 'B. Car', 'C. Bike', 'D. Train'], answer: 'B. Car', explanation: 'سيارة تعني car.' },

            { id: 'ar24', question: 'ما معنى "طريق"؟', options: ['A. Road', 'B. River', 'C. House', 'D. Tree'], answer: 'A. Road', explanation: 'طريق تعني road.' },

            { id: 'ar25', question: 'ما معنى "شجرة"؟', options: ['A. Tree', 'B. Flower', 'C. Grass', 'D. Leaf'], answer: 'A. Tree', explanation: 'شجرة تعني tree.' },

            { id: 'ar26', question: 'ما معنى "قريب"؟', options: ['A. Far', 'B. Near', 'C. Big', 'D. Small'], answer: 'B. Near', explanation: 'قريب تعني near.' },

            { id: 'ar27', question: 'ما معنى "بعيد"؟', options: ['A. Near', 'B. Far', 'C. Tall', 'D. Short'], answer: 'B. Far', explanation: 'بعيد تعني far.' },

            { id: 'ar28', question: 'ما معنى "سريع"؟', options: ['A. Slow', 'B. Fast', 'C. Weak', 'D. Strong'], answer: 'B. Fast', explanation: 'سريع تعني fast.' },

            { id: 'ar29', question: 'ما معنى "بطيء"؟', options: ['A. Fast', 'B. Slow', 'C. Big', 'D. Small'], answer: 'B. Slow', explanation: 'بطيء تعني slow.' },

            { id: 'ar30', question: 'ما معنى "سلام"؟', options: ['A. War', 'B. Peace', 'C. Food', 'D. Water'], answer: 'B. Peace', explanation: 'سلام تعني peace.' }
        ],

    };

    // Default fallback for subjects without specific questions
    const defaultBank = banks['Mathematics'] || [];
    return banks[subject] || defaultBank.map((q, i) => ({ ...q, id: subject.slice(0, 3) + i, question: `[${subject}] ${q.question}` }));
}

// ===== STATE =====
let state = {
    selectedExam: null,
    selectedSubject: null,
    questions: [],
    userAnswers: {},
    currentQ: 0,
    timerInterval: null,
    timeLeft: 25 * 60,
    sessionActive: false
};

// ===== INIT =====
function init() {
    renderExamGrid();
}

function renderExamGrid() {
    const grid = document.getElementById('exam-grid');
    grid.innerHTML = '';
    Object.entries(EXAM_DATA).forEach(([name, data]) => {
        const card = document.createElement('div');
        card.className = 'exam-card';
        card.innerHTML = `<div class="exam-card-icon">${data.icon}</div><div class="exam-card-name">${name}</div><div class="exam-card-count">${data.subjects.length} subjects</div>`;
        card.onclick = () => selectExam(name, card);
        grid.appendChild(card);
    });
}

function selectExam(name, card) {
    document.querySelectorAll('.exam-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.selectedExam = name;
    state.selectedSubject = null;
    renderSubjects(EXAM_DATA[name].subjects);
    document.getElementById('subject-section').style.display = 'block';
    document.getElementById('start-section').style.display = 'none';
}

function renderSubjects(subjects) {
    const grid = document.getElementById('subject-grid');
    grid.innerHTML = '';
    subjects.forEach(sub => {
        const btn = document.createElement('button');
        btn.className = 'subject-btn';
        btn.innerHTML = `<span class="subject-btn-dot"></span>${sub}`;
        btn.onclick = () => selectSubject(sub, btn);
        grid.appendChild(btn);
    });
}

function selectSubject(name, btn) {
    document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.selectedSubject = name;
    const sec = document.getElementById('start-section');
    sec.style.display = 'block';
    document.getElementById('start-desc').textContent = `${state.selectedExam} · ${name} — 20 questions, 25 minutes`;
    sec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== EXAM LOGIC =====
function shuffleFisherYates(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getSmartQuestions(subject, exam) {
    const allQ = generateQuestions(subject);
    const key = `lch_attempted_${exam}_${subject}`;
    let attempted = JSON.parse(localStorage.getItem(key) || '[]');
    let remaining = allQ.filter(q => !attempted.includes(q.id));
    if (remaining.length < 20) {
        attempted = [];
        remaining = allQ;
        localStorage.removeItem(key);
    }
    const shuffled = shuffleFisherYates(remaining);
    const selected = shuffled.slice(0, 20);
    const newAttempted = [...attempted, ...selected.map(q => q.id)];
    localStorage.setItem(key, JSON.stringify(newAttempted));
    return selected;
}

function startExam() {
    if (!state.selectedExam || !state.selectedSubject) return;
    state.questions = getSmartQuestions(state.selectedSubject, state.selectedExam);
    state.userAnswers = {};
    state.currentQ = 0;
    state.timeLeft = 25 * 60;
    state.sessionActive = true;
    showScreen('cbt-screen');
    document.getElementById('cbt-exam-badge').textContent = state.selectedExam;
    document.getElementById('cbt-subject-name').textContent = state.selectedSubject;
    renderQuestion();
    renderGrid();
    startTimer();
}

function renderQuestion() {
    const q = state.questions[state.currentQ];
    const total = state.questions.length;
    document.getElementById('q-number').textContent = `Question ${state.currentQ + 1} of ${total}`;
    document.getElementById('q-text').textContent = q.question;
    const list = document.getElementById('options-list');
    list.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const li = document.createElement('li');
        li.className = 'option-item' + (state.userAnswers[state.currentQ] === opt ? ' selected' : '');
        li.innerHTML = `<span class="option-letter">${letters[i]}</span><span class="option-text">${opt}</span>`;
        li.onclick = () => selectOption(opt, li);
        list.appendChild(li);
    });
    document.getElementById('btn-prev').disabled = state.currentQ === 0;
    document.getElementById('btn-next').disabled = state.currentQ === total - 1;
    const pct = ((state.currentQ + 1) / total) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';
    renderGrid();
}

function selectOption(opt, li) {
    state.userAnswers[state.currentQ] = opt;
    document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
    li.classList.add('selected');
    playSound('select');
    renderGrid();
}

function nextQuestion() {
    if (state.currentQ < state.questions.length - 1) {
        state.currentQ++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (state.currentQ > 0) {
        state.currentQ--;
        renderQuestion();
    }
}

function renderGrid() {
    const grid = document.getElementById('q-grid');
    grid.innerHTML = '';
    state.questions.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'q-dot' + (i === state.currentQ ? ' current' : '') + (state.userAnswers[i] ? ' answered' : '');
        dot.textContent = i + 1;
        dot.onclick = () => { state.currentQ = i; renderQuestion(); };
        grid.appendChild(dot);
    });
}

// ===== TIMER =====
function startTimer() {
    clearInterval(state.timerInterval);
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        updateTimerDisplay();
        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            showToast('⏰ Time up! Auto-submitting...');
            setTimeout(submitExam, 1500);
        }
    }, 1000);
}

function updateTimerDisplay() {
    const m = Math.floor(state.timeLeft / 60);
    const s = state.timeLeft % 60;
    const el = document.getElementById('timer-display');
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    el.className = 'timer-display' + (state.timeLeft <= 60 ? ' danger' : state.timeLeft <= 300 ? ' warning' : '');
}

function confirmSubmit() {
    const answered = Object.keys(state.userAnswers).length;
    const total = state.questions.length;
    const unanswered = total - answered;
    if (unanswered > 0) {
        if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;
    }
    submitExam();
}

function submitExam() {
    clearInterval(state.timerInterval);
    state.sessionActive = false;
    let correct = 0, wrong = 0, skipped = 0;
    state.questions.forEach((q, i) => {
        const ua = state.userAnswers[i];
        if (!ua) skipped++;
        else if (ua === q.answer) correct++;
        else wrong++;
    });
    const score = correct;
    const total = state.questions.length;
    const pct = Math.round((score / total) * 100);
    let grade, gradeEmoji;
    if (pct >= 80) { grade = 'Excellent'; gradeEmoji = '🏆'; }
    else if (pct >= 60) { grade = 'Good'; gradeEmoji = '👍'; }
    else if (pct >= 40) { grade = 'Average'; gradeEmoji = '📚'; }
    else { grade = 'Needs Improvement'; gradeEmoji = '💪'; }

    const key = `lch_last_score_${state.selectedExam}_${state.selectedSubject}`;
    localStorage.setItem(key, JSON.stringify({ score, total, pct, grade, date: new Date().toISOString() }));

    document.getElementById('res-score').textContent = score;
    document.getElementById('res-total').textContent = `/ ${total}`;
    document.getElementById('res-grade').textContent = `${grade}! ${gradeEmoji}`;
    document.getElementById('res-percent').textContent = `${pct}% Score`;
    document.getElementById('res-sub').textContent = `${state.selectedExam} · ${state.selectedSubject}`;
    document.getElementById('res-correct').textContent = correct;
    document.getElementById('res-wrong').textContent = wrong;
    document.getElementById('res-skipped').textContent = skipped;

    renderReview();
    showScreen('result-screen');
    if (pct === 100) spawnConfetti();
}

function renderReview() {
    const list = document.getElementById('review-list');
    list.innerHTML = '';
    state.questions.forEach((q, i) => {
        const ua = state.userAnswers[i];
        let status = 'skipped';
        if (ua && ua === q.answer) status = 'correct';
        else if (ua && ua !== q.answer) status = 'wrong';
        const item = document.createElement('div');
        item.className = `review-item ${status}`;
        const icon = status === 'correct' ? '✅' : status === 'wrong' ? '❌' : '⚪';
        item.innerHTML = `
      <div class="review-q">${icon} Q${i + 1}: ${q.question}</div>
      <div class="review-answers">
        <div class="review-answer-box user ${status === 'wrong' ? 'wrong-ans' : ''}">
          <label>Your Answer</label>${ua || 'Not answered'}
        </div>
        <div class="review-answer-box correct-ans">
          <label>Correct Answer</label>${q.answer}
        </div>
      </div>
      <div class="review-explanation"><span class="explanation-label">💡 Explanation</span>${q.explanation}</div>
    `;
        list.appendChild(item);
    });
}

function retryExam() {
    startExam();
}

function goHome() {
    showScreen('home-screen');
}

function downloadResult() {
    const lines = [`LearnCast Hub – Exam Result`, `Exam: ${state.selectedExam}`, `Subject: ${state.selectedSubject}`, `Date: ${new Date().toLocaleString()}`, `Score: ${document.getElementById('res-score').textContent}/${state.questions.length}`, `Percentage: ${document.getElementById('res-percent').textContent}`, `Grade: ${document.getElementById('res-grade').textContent}`, ``, `--- DETAILED REVIEW ---`, ``];
    state.questions.forEach((q, i) => {
        const ua = state.userAnswers[i];
        const status = !ua ? 'SKIPPED' : ua === q.answer ? 'CORRECT' : 'WRONG';
        lines.push(`Q${i + 1} [${status}]: ${q.question}`);
        lines.push(`Your answer: ${ua || 'Not answered'}`);
        lines.push(`Correct: ${q.answer}`);
        lines.push(`Explanation: ${q.explanation}`);
        lines.push('');
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `LearnCastHub_${state.selectedExam}_${state.selectedSubject}_Result.txt`;
    a.click();
    showToast('📄 Result saved!');
}

// ===== UTILS =====
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(msg) {
    const old = document.querySelector('.toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function toggleDark() {
    document.body.classList.toggle('dark');
    const btn = document.querySelector('.dark-toggle');
    btn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
}

function playSound(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = type === 'select' ? 880 : 440;
        gain.gain.value = 0.05;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.12);
    } catch (e) { }
}

function spawnConfetti() {
    const colors = ['#1976D2', '#66BB6A', '#F9A825', '#E91E63', '#9C27B0'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const dot = document.createElement('div');
            dot.className = 'confetti-dot';
            dot.style.cssText = `left:${Math.random() * 100}vw;background:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${1.5 + Math.random() * 2}s;animation-delay:${Math.random() * .5}s`;
            document.body.appendChild(dot);
            setTimeout(() => dot.remove(), 4000);
        }, i * 30);
    }
}

init();
