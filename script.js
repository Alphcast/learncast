
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
    