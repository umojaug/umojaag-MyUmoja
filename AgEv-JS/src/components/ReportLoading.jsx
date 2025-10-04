
const ReportLoading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-umojablue mb-4"></div>
        <p className="text-lg font-medium">Downloading report...</p>
        <p className="text-sm text-gray-600 mt-2">Please wait, do not close this window</p>
      </div>
    </div>
  )
}

export default ReportLoading