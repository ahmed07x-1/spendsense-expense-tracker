function Loading() {
  return (
    <div className="loading-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="loading-card">
          <div className="loading-circle"></div>

          <div className="loading-line short"></div>

          <div className="loading-line"></div>

          <div className="loading-line small"></div>
        </div>
      ))}
    </div>
  );
}

export default Loading;