// Centralized restaurant data to ensure consistency across components

export interface Restaurant {
  id: string;
  name: string;
  dinoType: string;
  emoji: string;
  description: string;
  totalTables: number;
  availableTables: number;
  theme: string;
  themeDark: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 'trex-bistro',
    name: 'T-Rex Bistro',
    dinoType: 'T-Rex',
    emoji: '🦖',
    description: 'Big portions for big appetites! Our carnivore classics will make you roar with delight.',
    totalTables: 25,
    availableTables: 18,
    theme: 'bg-red-50 border-red-200',
    themeDark: 'dark:bg-red-950/30 dark:border-red-900/50'
  },
  {
    id: 'herbivore-haven',
    name: 'Herbivore Haven',
    dinoType: 'Brachiosaurus',
    emoji: '🦕',
    description: 'Fresh greens and garden delights. Tall tables for our long-necked friends!',
    totalTables: 25,
    availableTables: 12,
    theme: 'bg-green-50 border-green-200',
    themeDark: 'dark:bg-green-950/30 dark:border-green-900/50'
  },
  {
    id: 'stego-steakhouse',
    name: 'Stego Steakhouse',
    dinoType: 'Stegosaurus',
    emoji: '🦕',
    description: 'Premium cuts with our signature spiky seasoning. A true prehistoric experience.',
    totalTables: 25,
    availableTables: 8,
    theme: 'bg-orange-50 border-orange-200',
    themeDark: 'dark:bg-orange-950/30 dark:border-orange-900/50'
  },
  {
    id: 'raptor-cafe',
    name: 'Raptor Café',
    dinoType: 'Velociraptor',
    emoji: '🦖',
    description: 'Quick bites for fast diners. Smart service that\'ll make you feel clever!',
    totalTables: 25,
    availableTables: 20,
    theme: 'bg-yellow-50 border-yellow-200',
    themeDark: 'dark:bg-yellow-950/30 dark:border-yellow-900/50'
  },
  {
    id: 'tricera-tavern',
    name: 'Tricera Tavern',
    dinoType: 'Triceratops',
    emoji: '🦕',
    description: 'Three-course meals with triple the flavor. Family-friendly prehistoric dining.',
    totalTables: 25,
    availableTables: 15,
    theme: 'bg-purple-50 border-purple-200',
    themeDark: 'dark:bg-purple-950/30 dark:border-purple-900/50'
  }
];

export const restaurantThemes = {
  'trex-bistro': { 
    name: 'T-Rex Bistro', 
    emoji: '🦖', 
    theme: 'from-red-50 to-orange-50',
    themeDark: 'dark:from-red-950/20 dark:to-orange-950/20',
    availableTables: 18
  },
  'herbivore-haven': { 
    name: 'Herbivore Haven', 
    emoji: '🦕', 
    theme: 'from-green-50 to-emerald-50',
    themeDark: 'dark:from-green-950/20 dark:to-emerald-950/20',
    availableTables: 12
  },
  'stego-steakhouse': { 
    name: 'Stego Steakhouse', 
    emoji: '🦕', 
    theme: 'from-orange-50 to-yellow-50',
    themeDark: 'dark:from-orange-950/20 dark:to-yellow-950/20',
    availableTables: 8
  },
  'raptor-cafe': { 
    name: 'Raptor Café', 
    emoji: '🦖', 
    theme: 'from-yellow-50 to-amber-50',
    themeDark: 'dark:from-yellow-950/20 dark:to-amber-950/20',
    availableTables: 20
  },
  'tricera-tavern': { 
    name: 'Tricera Tavern', 
    emoji: '🦕', 
    theme: 'from-purple-50 to-pink-50',
    themeDark: 'dark:from-purple-950/20 dark:to-pink-950/20',
    availableTables: 15
  }
};

// Realistic customer names for reservations
export const customerNames = [
  'Dr. Alan Grant',
  'Dr. Ellie Sattler',
  'Ian Malcolm',
  'Sarah Harding',
  'Dr. Henry Wu',
  'Owen Grady',
  'Claire Dearing',
  'Maisie Lockwood',
  'Dr. Zia Rodriguez',
  'Franklin Webb',
  'Barry Sembène',
  'Dr. Kajal Dua',
  'Ramsay Cole',
  'Kayla Watts',
  'Lewis Dodgson',
  'Charlotte Lockwood',
  'Benjamin Lockwood',
  'Iris Carroll',
  'Dr. Laura Sorkin',
  'Gerry Harding',
  'Dennis Nedry',
  'Ray Arnold',
  'Robert Muldoon',
  'John Hammond',
  'Tim Murphy',
  'Lex Murphy',
  'Kelly Malcolm',
  'Eddie Carr',
  'Nick Van Owen',
  'Ajay Sidhu',
  'Roland Tembo',
  'Peter Ludlow',
  'Amanda Kirby',
  'Paul Kirby',
  'Billy Brennan',
  'Udesky Cooper',
  'Mark Degler',
  'Eric Kirby',
  'Charlie Degler',
  'Ben Pincus',
  'Darius Bowman',
  'Brooklynn Adams',
  'Sammy Gutierrez',
  'Yasmina Fadoula',
  'Kenji Kon'
];

// Generate unique reservation times between 18:00 and 21:00
export function generateReservationTimes(count: number): string[] {
  const times: string[] = [];
  const startHour = 18;
  const endHour = 21;
  
  // Generate all possible 15-minute intervals
  const allTimes: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      if (hour === endHour && minute > 0) break; // Don't go past 21:00
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      allTimes.push(timeString);
    }
  }
  
  // Shuffle and take the required number
  const shuffled = [...allTimes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Generate random party size between 1 and 5
export function generatePartySize(): number {
  return Math.floor(Math.random() * 5) + 1;
}

// Get a random customer name
export function getRandomCustomerName(usedNames: Set<string>): string {
  const availableNames = customerNames.filter(name => !usedNames.has(name));
  if (availableNames.length === 0) {
    // If all names are used, allow repeats
    return customerNames[Math.floor(Math.random() * customerNames.length)];
  }
  return availableNames[Math.floor(Math.random() * availableNames.length)];
}
