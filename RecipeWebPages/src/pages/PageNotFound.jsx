import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 text-center shadow-sm">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-zinc-50 text-zinc-700 ring-1 ring-zinc-200">
        <i className="ri-error-warning-line text-2xl" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold text-zinc-900">Page not found</h1>
      <p className="mt-2 text-sm text-zinc-600">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-200"
        >
          Go home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
