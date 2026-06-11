const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-base-content/70 mb-4">
        This page doesn’t exist.
      </p>

      <a href="/" className="btn btn-primary">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;