# Buymed Quick Order App

A simplified mobile application designed for pharmacy staff to search for products and create quick orders efficiently.
This project was developed as a technical assessment for the **Middle Mobile Software Engineer** position at Buymed.

## 📱 Features Implemented

### Core Requirements
- **Product List:** Displays products with name, price, and category. Includes an **"Rx" badge** for prescription items.
- **Search & Filter:**
  - Search by product name (Case-insensitive).
  - Filter by Category (Tabs).
- **Cart Management:**
  - Add/Remove items with quantity validation (Min: 0, Max: 99).
  - Real-time calculation of **Total SKUs**, **Total Quantity**, and **Total Amount**.
- **UX/UI:**
  - Handles Empty States when no results are found.
  - Safe Area handling for Android (Translucent Status Bar) and iOS (Notch).

### 🌟 Bonus Features
- **Performance Optimization:** Implemented **Debounce (300ms)** for the search input to prevent excessive re-renders.
- **Data Persistence:** The cart state is saved to `AsyncStorage` and automatically restored when the app reloads.
- **Unit Testing:** Included Jest unit tests for the core cart calculation logic.

---

## 🚀 How to Run the App

### Prerequisites
- Node.js > 18
- React Native CLI environment setup (Android Studio / Xcode)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <YOUR_REPO_URL>
   cd BuymedQuickOrder

Install dependencies:

Bash
npm install
# or
yarn install
Install Pods (iOS only):

Bash
cd ios && pod install && cd ..
Run the application:

For Android:

Bash
npm run android
# or
npx react-native run-android
For iOS:

Bash
npm run ios
# or
npx react-native run-ios
Run Unit Tests:

Bash
npm test
🏗 Architecture & Logic Organization
I strictly followed the Separation of Concerns (SoC) principle to ensure the codebase is clean, testable, and maintainable. The project is structured as follows:

src/
├── components/      # Presentational Components (UI only)
├── hooks/           # Business Logic & State Management
├── screens/         # Screen Containers
├── types/           # TypeScript Definitions
├── utils/           # Pure Functions & Helpers
└── constants/       # Mock Data & Config
1. Business Logic Layer (src/hooks/useQuickOrder.ts)
Instead of cluttering the UI component with logic, I extracted all business logic into a Custom Hook called useQuickOrder.

Responsibilities:

Manages all local state (cart, searchText, selectedCategory).

Handles side effects (Persistence with AsyncStorage, Debounce timer).

Optimization: The cart is stored as a Map (Object) { [id]: quantity } instead of an Array. This allows O(1) complexity when looking up product quantities, significantly improving performance compared to Array.find (O(n)).

2. Presentation Layer (src/components/ProductItem.tsx)
These are "Dumb" Components. They only receive props and render the UI.

Wrapped in React.memo to prevent unnecessary re-renders. For example, updating the quantity of "Product A" will not trigger a re-render for "Product B".

3. Pure Logic Layer (src/utils/calculations.ts)
The logic for calculating totals (Price, Qty, SKUs) is extracted into pure functions.

Why? Pure functions are deterministic and easier to Unit Test without mocking React hooks or components.

⚖️ Trade-offs & Future Improvements
Due to the time constraints of this assessment, I made some architectural trade-offs. If I had more time, I would improve the app in the following areas:

1. State Management
Current: Local State + Context (implicit).

Improvement: For a production-scale app with multiple screens (e.g., Checkout, Profile), I would migrate to Redux Toolkit or Zustand. This prevents "prop drilling" and makes global state management more predictable.

2. List Performance
Current: FlatList.

Improvement: While FlatList is sufficient for a small dataset, handling thousands of pharmaceutical products requires better performance. I would switch to FlashList (by Shopify) to leverage its recycling architecture (similar to RecyclerView in Android).

3. Data Handling
Current: Mock data (src/constants/mockData.ts) and Client-side filtering.

Improvement: Integrate with a real Backend API.

Implement Server-side pagination and search to reduce initial load time.

Use React Query (TanStack Query) for caching, background refetching, and handling loading/error states robustly.

4. Testing Strategy
Current: Unit Tests for logic.

Improvement: Add E2E Testing (using Detox or Maestro) to automate critical user flows (e.g., "User searches for Panadol -> Adds to cart -> Sees total price update").
