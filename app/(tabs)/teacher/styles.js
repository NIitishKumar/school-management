// Teacher dashboard Tailwind CSS utility styles

// These utility classes can be used with the className prop when using Tailwind CSS
// For React Native with Tailwind, you would typically use a library like 'twrnc' (Tailwind React Native Classnames)

export const teacherStyles = {
  // Color palette - soft blue/green theme
  colors: {
    primary: '#0a7ea4', // Main blue color
    secondary: '#4CAF50', // Green accent
    lightBlue: '#E3F2FD',
    lightGreen: '#E8F5E9',
    orange: '#FFF3E0',
    lightCyan: '#E1F5FE',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#11181C',
    textSecondary: '#687076',
    border: '#e0e0e0',
  },
  
  // Typography
  text: {
    title: 'text-lg font-bold',
    subtitle: 'text-base font-medium',
    body: 'text-sm',
    small: 'text-xs',
  },
  
  // Layout
  layout: {
    container: 'flex-1',
    row: 'flex-row',
    col: 'flex-col',
    center: 'items-center justify-center',
    between: 'justify-between',
    around: 'justify-around',
    wrap: 'flex-wrap',
  },
  
  // Components
  components: {
    card: 'rounded-xl bg-white shadow-sm p-4 mb-3',
    statCard: 'rounded-xl p-4 mb-3 w-[48%]',
    button: 'rounded-md bg-primary py-3 items-center',
    input: 'rounded-md border border-gray-300 p-3 w-full',
    navItem: 'items-center py-2',
    navIcon: 'w-10 h-10 rounded-full items-center justify-center',
    activeNavIcon: 'bg-blue-50',
  },
  
  // Spacing
  spacing: {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    gap: 'gap-3',
  },
};