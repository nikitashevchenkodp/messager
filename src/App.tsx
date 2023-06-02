import { SocketProvider } from 'contexts/SocketContexts';
import { AuthLayout, MainLayout } from 'layouts';
import { Route, Routes } from 'react-router-dom';
import Protected from 'router/Protected';
import Public from 'router/Public';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <SocketProvider>
                <MainLayout />
              </SocketProvider>
            </Protected>
          }
        />
        <Route
          path="/auth"
          element={
            <Public>
              <AuthLayout />
            </Public>
          }
        />
      </Routes>
    </>
  );
}

export default App;
