export const uiStyles = {

    tabelaPedido: {
        classNameDefault: 'border border-gray-400 px-1 py-0.5 w-[60px]',
        classNameInputDefault: 'w-full border border-gray-300 p-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400',
        classNameInputProduto: 'w-full px-2 py-1 rounded border border-gray-300 bg-white text-black text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 truncate',
        classNameProduto: 'border border-gray-400 px-1 py-0.5 w-[400px]',
        classNameFornecedor: 'border border-gray-400 px-1 py-0.5 w-[150px]',
        classNameTotal: 'text-right font-bold border border-gray-400 px-1 py-0.5 bg-gray-100', // <--- Novo aqui
        classNameTotalValor: 'font-bold border border-gray-400 px-1 py-0.5 bg-gray-100', 
    },

    forms: {
        input: "w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700",
        label: "block mb-1 text-sm font-medium text-gray-700",
        checkbox: "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
        select: "w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700",
    },

    collections: {
        selectCustomTable: "w-full px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 truncate",
        dualListContainer: "flex gap-4 bg-white p-4 rounded-xl shadow-sm border max-h-64 overflow-y-auto",
        dualListColumn: "flex-1",
        dualListTitle: "font-semibold text-xs mb-2",
        dualListItem: "text-xs p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer truncate",
        dualListItemSelected: "text-xs p-1.5 bg-blue-100 hover:bg-blue-200 rounded cursor-pointer truncate",
    }
}