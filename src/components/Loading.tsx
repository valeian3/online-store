const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div className="h-full bg-blue-500 animate-progress-bar" />
    </div>
  )
}

export default Loading
