import { useRouteError } from "react-router-dom";

export default function ErrorView() {
  const error = useRouteError();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '1rem',
        gap: '1rem'
      }}
    >
      { error.status === 404
        ? <h1>Halaman ini tidak tersedia</h1>
        : error.status === 401
          ? <h1>Anda tidak memiliki akses</h1>
          : <h1>Terjadi error</h1>
      }
      { import.meta.env.DEV &&
        <code>{ JSON.stringify(error, null, 1) }</code>
      }
    </div>
);
}
