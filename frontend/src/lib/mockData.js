export const mockDonations = [
  { id: '1', userId: 'user1', ngoId: 'ngo1', ngoName: 'Hope Foundation', amount: 5000, date: '2025-01-15', category: 'Education' },
  { id: '2', userId: 'user1', ngoId: 'ngo2', ngoName: 'Care Together', amount: 3000, date: '2025-02-10', category: 'Healthcare' },
  { id: '3', userId: 'user1', ngoId: 'ngo1', ngoName: 'Hope Foundation', amount: 2000, date: '2025-03-05', category: 'Food & Nutrition' },
  { id: '4', userId: 'user2', ngoId: 'ngo1', ngoName: 'Hope Foundation', amount: 10000, date: '2025-01-20', category: 'Education' },
  { id: '5', userId: 'user3', ngoId: 'ngo2', ngoName: 'Care Together', amount: 7500, date: '2025-02-15', category: 'Healthcare' },
  { id: '6', userId: 'user1', ngoId: 'ngo1', ngoName: 'Hope Foundation', amount: 4500, date: '2025-03-12', category: 'Shelter' },
  { id: '7', userId: 'user1', ngoId: 'ngo2', ngoName: 'Care Together', amount: 2500, date: '2025-03-20', category: 'Clean Water' },
  { id: '8', userId: 'user1', ngoId: 'ngo1', ngoName: 'Hope Foundation', amount: 3500, date: '2025-04-01', category: 'Women Empowerment' },
  { id: '9', userId: 'user1', ngoId: 'ngo2', ngoName: 'Care Together', amount: 1500, date: '2025-04-10', category: 'Education' },
  { id: '10', userId: 'user1', ngoId: 'ngo1', ngoName: 'Hope Foundation', amount: 2800, date: '2025-04-15', category: 'Healthcare' },
];

export const mockNGOs = [
  {
    id: 'ngo1',
    name: 'Hope Foundation',
    totalReceived: 17000,
    necessitiesPercent: 90,
    miscPercent: 10,
    categories: [
      { name: 'Education', amount: 10000 },
      { name: 'Food', amount: 5000 },
      { name: 'Administration', amount: 2000 },
    ],
  },
  {
    id: 'ngo2',
    name: 'Care Together',
    totalReceived: 10500,
    necessitiesPercent: 92,
    miscPercent: 8,
    categories: [
      { name: 'Healthcare', amount: 7500 },
      { name: 'Food', amount: 2160 },
      { name: 'Administration', amount: 840 },
    ],
  },
];

export const mockLeaderboard = [
  { rank: 1, name: 'John Doe', totalDonations: 10000, donationCount: 5 },
  { rank: 2, name: 'Jane Smith', totalDonations: 7500, donationCount: 3 },
  { rank: 3, name: 'Bob Johnson', totalDonations: 5000, donationCount: 2 },
  { rank: 4, name: 'Alice Williams', totalDonations: 3000, donationCount: 4 },
  { rank: 5, name: 'Charlie Brown', totalDonations: 2000, donationCount: 1 },
];
