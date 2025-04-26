export function FullScreenLoader({ message = "Carregando..." }: { message?: string }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-700 font-medium">{message}</p>
            </div>
        </div>
    )
}
