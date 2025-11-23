/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{html,ts}",
];
export const theme = {
    extend: {
        // Exemplo de extensão para cores inspiradas no Material Design
        // Isso permite usar classes como 'bg-primary', 'text-secondary', etc.
        colors: {
            'primary': {
                50: '#e3f2fd',
                100: '#bbdefb',
                // ... (outras tonalidades)
                500: '#2196f3', // Azul padrão do Material
                700: '#1976d2',
                900: '#0d47a1',
            },
            'secondary': {
                // ... (cores de destaque, como verde-água ou rosa)
                500: '#00bcd4',
            },
            'accent': '#ff4081', // Cor de realce
            'surface': '#ffffff', // Cor de fundo de cards
            'background': '#f5f5f5', // Cor de fundo da tela
        },

        // Exemplo de extensão para sombras (elevações) inspiradas no Material
        boxShadow: {
            'material-2': '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
            'material-8': '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
        }
    },
};
export const plugins = [
    // Plugins úteis que expandem as funcionalidades
    require('@tailwindcss/forms'), // Para estilização de formulários
    require('@tailwindcss/typography'), // Para estilos de Markdown (se necessário)
    // Aqui você adicionaria um plugin específico se estivesse usando Material Tailwind ou similar
];